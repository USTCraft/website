# src 目录迁移计划

> 创建于 2026-06-07，将内容页面（`.md`）从根目录迁移至 `src/`，利用 VitePress `srcDir` 配置实现内容与配置分离。
>
> **✅ 已完成**（2026-06-07，提交 `86c31ca`）

---

## 背景

当前项目的内容页面（`index.md`、`about.md`、`404.md`、`news/`、`docs/`）散落在根目录，与配置文件（`.vitepress/`、`package.json`、`tsconfig.json` 等）和项目治理文件（`AGENTS.md`、`CHANGELOG.md`、`README.md`、`LICENSE`）混在一起。VitePress 原生支持 `srcDir` 选项，可将内容源文件统一收纳到 `src/` 目录，使根目录更整洁。

---

## 迁移范围

### ✅ 移入 `src/` 的内容

| 源路径 | 目标路径 | 说明 |
|--------|----------|------|
| `index.md` | `src/index.md` | 首页 |
| `about.md` | `src/about.md` | 关于页 |
| `404.md` | `src/404.md` | 404 页面 |
| `news/` (3 个文件) | `src/news/` | 新闻目录（index.md + 2 篇文章） |
| `docs/` (6 个文件) | `src/docs/` | 文档目录（index.md + 5 篇指南） |
| `public/` | `src/public/` | 静态资源（VitePress `srcDir` 要求 public 在 srcDir 下） |

**共计：11 个文件 + public 目录，3 个目录。**

### ❌ 保留在根目录的

| 路径 | 原因 |
|------|------|
| `.vitepress/` | VitePress 配置和主题，**必须**在根目录 |
| `.github/` | CI/CD workflows |
| `.gitignore` / `.gitattributes` | Git 配置 |
| `.vscode/` | 编辑器配置 |
| `package.json` / `package-lock.json` | 项目依赖 |
| `tsconfig.json` | TypeScript 配置 |
| `node_modules/` | 依赖包 |
| `AGENTS.md` | 模型约束指令（已通过 `srcExclude` 排除构建） |
| `CHANGELOG.md` | 变更日志（已通过 `srcExclude` 排除构建） |
| `README.md` | 项目说明（已通过 `srcExclude` 排除构建） |
| `LICENSE` | 许可证（已通过 `srcExclude` 排除构建） |
| `dev-notes/` | 开发笔记（已通过 `srcExclude` 排除构建） |

---

## 需要修改的文件

### 1. `.vitepress/config.ts` — 添加 `srcDir`

```ts
export default defineConfig({
  srcDir: 'src',   // 新增：指定内容源目录
  // ... 其余配置不变
})
```

> **无需修改 `srcExclude`**：当前排除的 `dev-notes/`、`AGENTS.md`、`CHANGELOG.md`、`README.md`、`LICENSE` 均在根目录，`srcDir` 只影响内容查找范围，不影响 `srcExclude` 的排除逻辑。

### 2. `README.md` — 更新项目结构树

结构树中需要反映 `src/` 层级：

```
pixel-eco/
├── src/                       # 内容源文件
│   ├── index.md               # 首页
│   ├── about.md               # 关于页
│   ├── 404.md                 # 404 页面
│   ├── news/                  # 新闻文章
│   └── docs/                  # 文档页面
├── .vitepress/
│   ├── config.ts
│   └── theme/
│       ├── index.ts
│       ├── Layout.vue
│       ├── components/
│       │   ├── ui/
│       │   ├── layout/
│       │   ├── content/
│       │   └── icons/
│       └── styles/
├── public/                    # 静态资源
│   ├── logo.png
│   ├── logo.svg
│   ├── favicon.ico
│   ├── 404.png
│   ├── button.click.ogg
│   ├── background/
│   └── fonts/
├── package.json
├── tsconfig.json
└── README.md
```

### 3. `docs/quick-start.md` — 更新项目结构树

与 README 同步更新结构树，反映 `src/` 层级。

---

## 无需修改的内容

### 内部链接（Markdown 中的路径）

所有 `.md` 文件中的链接使用的是 **VitePress 路由路径**，而非文件系统路径：

| 文件 | 链接示例 | 是否需要改 |
|------|---------|-----------|
| `index.md` | 无内部链接 | ❌ |
| `about.md` | 无内部链接 | ❌ |
| `404.md` | `href="/"` | ❌ 路由路径不变 |
| `news/index.md` | `link="/news/welcome"` | ❌ 路由路径不变 |
| `docs/index.md` | `url="/docs/quick-start"` | ❌ 路由路径不变 |
| `docs/quick-start.md` | 无内部链接 | ❌ |
| `docs/customization.md` | 无内部链接 | ❌ |
| `docs/deployment.md` | 无内部链接 | ❌ |
| `docs/news.md` | 无内部链接 | ❌ |
| `docs/components.md` | 无内部链接 | ❌ |

### 静态资源引用

所有图片/字体/音效引用（如 `/background/44.jpg`、`/logo.png`、`/button.click.ogg`）指向 `src/public/`，路径不变（VitePress 自动处理）。

### 组件中的路径

所有 `.vue` 组件中的 `withBase()` 调用基于 VitePress 路由，不受 `srcDir` 影响。

### `tsconfig.json`

`include` 指向 `.vitepress/**/*.ts` 和 `.vitepress/**/*.vue`，这些文件保持在根目录，无需修改。

---

## 执行步骤

> **重要**：所有文件移动必须使用 `git mv` 而非操作系统剪切粘贴，以保留 Git 文件历史，方便未来追溯。

| 步骤 | 操作 | 验证 |
|------|------|------|
| 1 | 创建 `src/` 目录 | — |
| 2 | `git mv index.md about.md 404.md src/` | `git status` 确认 |
| 3 | `git mv news/ src/news/` | `git status` 确认 |
| 4 | `git mv docs/ src/docs/` | `git status` 确认 |
| 4.5 | `git mv public/ src/public/` | `git status` 确认 |
| 5 | 修改 `.vitepress/config.ts` 添加 `srcDir: 'src'` | — |
| 6 | 更新 `README.md` 结构树 | — |
| 7 | 更新 `src/docs/quick-start.md` 结构树 | — |
| 8 | 运行 `npx vitepress build` 验证 | 构建成功 |
| 9 | CI 模拟构建 `$env:BASE_PATH='/pixel-eco/'; npx vitepress build` | 构建成功 |
| 10 | Git 提交 | — |

---

## 风险评估

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|---------|
| 构建后路径错乱 | 低 | 高 | 双模式构建验证（relative + absolute） |
| 内部链接断裂 | 极低 | 中 | 所有链接均为路由路径，不受文件移动影响 |
| `srcExclude` 失效 | 极低 | 低 | 排除目标均在根目录，不受 `srcDir` 影响 |
| RSS 插件受影响 | 极低 | 低 | RSS 插件基于 VitePress 内容管道，自动跟随 `srcDir` |

---

## 迁移后根目录对比

### 迁移前
```
pixel-eco/
├── index.md          ← 内容
├── about.md          ← 内容
├── 404.md            ← 内容
├── news/             ← 内容
├── docs/             ← 内容
├── .vitepress/       ← 配置
├── public/           ← 静态资源
├── package.json      ← 工具
├── tsconfig.json     ← 工具
├── README.md         ← 项目
├── AGENTS.md         ← 项目
├── CHANGELOG.md      ← 项目
├── LICENSE           ← 项目
└── dev-notes/        ← 项目└── scripts/          ← 工具（已手动删除）```

### 迁移后
```
pixel-eco/
├── src/              ← 🆕 内容统一收纳
│   ├── index.md
│   ├── about.md
│   ├── 404.md
│   ├── news/
│   ├── docs/
│   └── public/        ← 静态资源（VitePress srcDir 要求）
├── .vitepress/       ← 配置
├── package.json      ← 工具
├── tsconfig.json     ← 工具
├── README.md         ← 项目
├── AGENTS.md         ← 项目
├── CHANGELOG.md      ← 项目
├── LICENSE           ← 项目
└── dev-notes/        ← 项目
```

根目录从 **15 个条目** 减少到 **9 个条目**，内容与配置/工具清晰分离。

---

## 审查记录

> 2026-06-07：审查通过，无条件批准。

### 审查结论

- **核心价值**：根目录整洁，职责分离。`src/` 承担"内容源文件"单一职责，用户直觉区分"改内容去 `src/`"和"改设置去 `.vitepress/config.ts`"。
- **技术方案**：`srcDir` 是 VitePress 一等公民功能，路由路径完全不变，`public/` 和 `srcExclude` 不受影响。
- **影响范围**：Markdown 内部链接、静态资源引用、Vue 组件 `withBase()`、`tsconfig.json` 均无需修改，边界判断精准。
- **验证措施**：双模式构建（relative + absolute）有效防范路径回归。

### 审查建议（已采纳）

1. 文件移动使用 `git mv` 保留 Git 历史（已写入执行步骤）
2. `public/` 随 `srcDir` 移入 `src/public/`（VitePress 默认行为，已更新计划）