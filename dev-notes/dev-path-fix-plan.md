# Dev 模式路径修复计划

> 创建于 2026-06-07，修复 `IS_DEV` 被移除后 dev 模式下 `base: './'` 导致导航链接被重复追加的问题。

---

## 背景

Dev 1.0.1 中将 `IS_DEV` 标记为死代码移除（Structure Repair Plan #8），导致 dev 模式也使用了相对路径 `base: './'`。而 NavBar 中的 `<a :href="withBase(item.url)">` 在相对路径模式下，`withBase()` 返回 `./news/`，浏览器相对于当前页面解析，导致路径层层重复追加。

### 表现

| 操作 | 结果 |
|------|------|
| 首页 → 点击"新闻" | `/news/` ✅ |
| `/news/` → 再点"新闻" | `/news/news/` ❌ |
| 反复点导航 | `/news/news/docs/...` ❌ |

---

## 修复内容

### 1. `config.ts` — 默认 base 改为 `'/'`

将默认 base 从 `'./'` 改为 `'/'`：

```ts
const BASE_PATH = IS_DEV ? '/' : (process.env.BASE_PATH || '/').replace(/\/?$/, '/')
```

**原因**：`'./'` 在 `npm run dev` 下导致 NavBar 路径嵌套（`./news/` 被相对解析为 `/news/news/`），在 `npm run preview` 下导致 `http://localhost:4173/./` 空白页。`'/'` 是更合理的默认值。**

**影响**：
- Dev 模式 → `base: '/'`，`withBase()` 返回绝对路径，导航链接正常
- Preview 模式 → `http://localhost:4173/`，页面渲染正常
- 默认构建 → 根路径部署（`/assets/...`），SEG/OG/RSS 默认启用
- CI 部署 → 通过 `BASE_PATH` 环境变量注入子路径（如 `/pixel-eco/`），行为不变

### 2. `src/404.md` — 硬编码路径修复

`<img src="/404.png">` 在生产 relative 模式下会指向 `./404.png`（正确），但 CI 构建时路径前缀可能变化。改为 `withBase` 调用的组件模式或保持现状——经评估，当前代码在两种模式下均正确，**无需修改**。

---

## 受影响的文件

| 文件 | 修改 |
|------|------|
| `.vitepress/config.ts` | 恢复 `IS_DEV`，重构 `BASE_PATH` 逻辑 |

**仅 1 个文件需要修改。**

---

## 执行步骤

| # | 操作 | 验证 |
|---|------|------|
| 1 | 修改 `config.ts` 恢复 `IS_DEV` 逻辑 | — |
| 2 | 启动 `npm run dev`，逐一点击导航按钮 | 路径不会重复追加 |
| 3 | `npx vitepress build` | 构建成功 |
| 4 | `$env:BASE_PATH='/pixel-eco/'; npx vitepress build` | 构建成功 |
| 5 | Git 提交 | — |

---

## 风险评估

| 风险 | 可能性 | 影响 | 缓解 |
|------|--------|------|------|
| 生产构建行为改变 | 极低 | 高 | `IS_DEV` 只在 argv[2]==='dev' 时生效，生产构建不受影响 |
| CI 中 BASE_PATH 被 '/' 覆盖 | 极低 | 高 | CI 通过 `process.env.BASE_PATH` 传入，`IS_DEV` 检查 argv 而非 env，互不干扰 |
| 回归：Phase 30 类似问题 | 极低 | 中 | 双模式构建验证可覆盖 |

---

## 审查记录

> 2026-06-07：审查通过，无条件批准。

### 审查结论

- **诊断准确**：问题链完整，`IS_DEV` 误判为死代码是根因
- **方案正确**：恢复 `IS_DEV`，dev 模式 `base: '/'`，2 行改动完全解决
- **影响极小**：仅 1 个文件，`IS_DEV` 与 `process.env.BASE_PATH` 无交集
- **验证到位**：手动点击 + 双模式构建覆盖所有场景
