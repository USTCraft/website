# USTCraft 像素艺术小组官网

本网站为 USTCraft 像素艺术小组（中国科学技术大学集成电路学院学生像素艺术研究小组）的门户网站。

**对于模板的了解与贡献，请移步 [Pixel Eco](https://github.com/Lylighte/pixel-eco) 仓库。**

## 技术栈

| 类别 | 技术                                                  |
| ---- | ----------------------------------------------------- |
| 框架 | VitePress 1.6 + Vue 3.5                               |
| 语言 | TypeScript 5.8                                        |
| 输出 | 纯静态 HTML/CSS/JS                                    |
| 字体 | Ark Pixel（标题）+ Monocraft（代码）+ Unifont（正文） |
| 搜索 | Pagefind                                              |
| RSS  | vitepress-plugin-rss                                  |

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/USTCraft/website.git
cd website

# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 浏览器打开 `http://localhost:5173` 即可看到像素风格首页。

# 构建生产版本
npm run build

# 本地预览构建结果
npm run preview

# 通过环境变量控制部署路径：
# 根路径部署 https://ustcraft.github.io/
npm run build

# 子路径部署 https://example.com/website/
BASE_PATH=/website/ SITE_URL=https://example.com/website/ npm run build
```

## 编写约定

### 图片资源约定

网站图片按用途分类存放，遵循以下约定：

| 目录 | 用途 | 说明 |
| ---- | ---- | ---- |
| `src/public/background/` | 通用大图 | 首页 Hero 背景、卡片封面、栏目配图等大尺寸图片 |
| `src/public/avatar/` | 1:1 头像 | 社交平台链接、作者头像等正方形头像（建议 1:1 比例） |
| `src/public/static/` | 行文配图 | 文章正文中的插图，按 `年/月/` 组织（如 `static/2026/07/`） |

**background 子目录说明：**

| 子目录 | 用途 |
| ------ | ---- |
| `background/101/` | 101 主题配图 |
| `background/cube/` | 方块科大相关 |
| `background/general/` | 通用配图（首页栏目、关于页等） |
| `background/group/` | 社团配图 |
| `background/mysterious/` | 神秘主题配图 |
| `background/news/` | 新闻文章封面图 |

### 编辑内容

所有页面内容均为 Markdown 文件，存放在 `src/` 目录：

| 文件                           | 内容                    |
| ------------------------------ | ----------------------- |
| `src/index.md`                 | 首页（Hero + 特色栏目）  |
| `src/about.md`                 | 关于页面                |
| `src/search.md`                | 站内搜索页              |
| `src/404.md`                   | 404 页面                |
| `src/news/index.md`            | 新闻列表                |
| `src/news/*.md`                | 新闻内容                |
| `src/docs/index.md`            | 文档中心                |
| `src/docs/*.md`                | 文档内容                |

### 添加新闻

在 `src/news/` 目录下新建 `.md` 文件，**文件名遵循 `年份-月份-关键词.md` 格式**（如 `2026-02-inchworld.md`、`2026-04-carnival.md`），并添加 frontmatter，例如：

```md
---
title: 我的新文章
date: 2026-07-01
author:
  name: 作者名
  avatar: /logo.png
  tags:
    - text: 活动
      color: '#fff'
      bg: '#1296db'
cover: /background/news/xxx.jpg
category: 新闻
brief: 文章摘要，将显示在新闻卡片上
---

# 我的新文章

正文内容……
```

**新闻写作约定：**

1. **文件名**：`年份-月份-关键词.md`，如 `2026-02-inchworld.md`
2. **封面图**：通用大图放 `background/news/`，1:1 头像放 `avatar/`，行文配图放 `static/年/月/`
3. **`brief` 字段**：必填，显示在新闻卡片上，无 `brief` 的文章不会出现在列表页
4. **`draft` 字段**：可选，设为 `true` 时仅在开发环境可见，生产构建自动隐藏
5. **`cover` 字段**：文章封面图路径，建议使用 `background/news/` 下的图片
6. **`author.tags`**：可选，用于在文章头部显示标签（如「活动」「公告」）
7. **排序**：按 `date` 字段降序排列，最新的文章排在最前

**草稿示例：**

```md
---
title: 草稿标题
date: 2026-07-01
cover: /background/19.jpg
category: 公告
brief: 这是一篇草稿。
draft: true
---
```

发布时移除 `draft: true` 或将值改为 `false`。

## 项目结构总览

```
website/
├── src/                       # 内容源文件
│   ├── index.md               # 首页（Hero + 特色栏目）
│   ├── about.md               # 关于页
│   ├── 404.md                 # 404 页面
│   ├── search.md              # 站内搜索页
│   ├── news/                  # 新闻文章
│   │   ├── index.md           # 新闻列表页
│   │   ├── 2026-02-inchworld.md
│   │   ├── 2026-04-carnival.md
│   │   └── draft-demo.md      # 草稿示例（draft: true）
│   ├── docs/                  # 文档页面
│   │   ├── index.md           # 文档中心
│   │   ├── quick-start.md     # 快速开始
│   │   └── joinus.md          # 加入我们
│   └── public/                # 静态资源
│       ├── logo.png           # 站点 Logo（主）
│       ├── logo.svg           # 站点 Logo（设计源文件）
│       ├── favicon.ico        # 浏览器图标
│       ├── 404.png            # 404 页面图片
│       ├── avatar/            # 1:1 头像资源
│       │   ├── github.png
│       │   ├── st.png
│       │   └── ustcmc-logo.png
│       ├── background/        # 通用大图（背景/封面/卡片配图）
│       │   ├── 15.jpg
│       │   ├── 19.jpg
│       │   ├── 28.jpg
│       │   ├── 44.jpg
│       │   ├── bgbtn.png
│       │   ├── 101/           # 101 主题
│       │   ├── cube/          # 方块科大
│       │   ├── general/       # 通用配图
│       │   ├── group/         # 社团合影
│       │   ├── mysterious/    # 神秘主题
│       │   └── news/          # 新闻封面
│       ├── static/            # 行文配图（按年/月组织）
│       │   └── 2026/
│       │       └── 07/        # 2026年7月文章配图
│       └── fonts/             # 像素字体文件
├── .vitepress/
│   ├── config.ts              # 站点配置（标题、导航等）
│   └── theme/
│       ├── index.ts           # 主题入口（注册组件）
│       ├── Layout.vue         # 自定义页面布局
│       ├── components/
│       │   ├── ui/            # 按钮、输入框、对话框
│       │   ├── layout/        # Hero、页脚、返回顶部
│       │   └── content/       # 卡片、侧边栏
│       ├── utils/             # 工具函数
│       │   ├── news-utils.ts  # 新闻卡片构建
│       │   └── docs-nav.ts    # 文档导航构建
│       └── styles/            # CSS 变量、字体、动画
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── eslint.config.js
├── pagefind.json
└── README.md
```

## 配置与开发

CSS 变量、字体方案、内置组件等模板配置与开发相关内容，请移步 [Pixel Eco 模板仓库](https://github.com/Lylighte/pixel-eco) 查看。

## 许可证

[MIT License](LICENSE)

本网站基于 pixel-eco 模板构建。
