# 刘智鹏 · 在线个人简历

> 一份**零依赖、纯原生 HTML/CSS/JS** 构建的响应式个人简历网站。适配 PC / 移动端，支持深浅色主题切换、中英标签切换、打印导出 PDF，并内置多项交互动效。

**在线预览**：见提交文档中的部署链接（GitHub Pages / Vercel / Netlify 等）。

---

## ✨ 功能特性

| 模块 | 说明 |
| --- | --- |
| 📱 响应式布局 | CSS Grid + 媒体查询，PC 双栏 / 移动端单栏自适应 |
| 🌓 深浅色主题 | 一键切换，基于 CSS 变量 + `data-theme`，本地记忆偏好 |
| 🌐 中英标签切换 | 姓名/头衔/简介/分类标题/证书标题等「标签级」内容切换为英文，正文描述保留中文 |
| 🖨️ 打印 / 导出 PDF | 独立打印样式，一键导出简历 PDF |
| 📊 数字滚动动画 | 亮点成果数字进入视口时平滑计数（IntersectionObserver + easeOutCubic） |
| 🔝 阅读进度条 | 页面顶部渐变进度条实时反馈阅读位置 |
| 🖼️ 图片灯箱 | 点击证书 / 生活照放大预览，支持 ESC 关闭 |
| 💬 Toast 轻提示 | 复制微信号 / 邮箱的轻量反馈 |
| ♿ 无障碍(ARIA) | 语义化标签、`role`/`aria-*` 属性、`prefers-reduced-motion` 降级 |
| 🚀 零外部依赖 | 图标均为内联 SVG，无任何第三方库，单文件即可部署 |

---

## 📁 目录结构

```
resume-project/
├── index.html          # 语义化页面结构 + SEO/OpenGraph 元信息
├── css/
│   └── style.css       # 设计令牌(CSS变量) → 基础重置 → 组件样式 → 响应式 → 打印
├── js/
│   ├── data.js         # 简历内容数据（单一数据源，改内容只需动这里）
│   └── main.js         # 渲染函数 + 交互逻辑（主题/语言/滚动/灯箱/进度条等）
├── assets/
│   └── img/            # 头像、微信二维码、8 张证书、3 张生活照
├── LICENSE             # MIT 开源协议
└── README.md           # 本文件
```

---

## 🚀 快速开始

### 方式一：直接打开

双击 `index.html` 即可在浏览器中查看（无需任何依赖、构建或服务器）。

### 方式二：本地静态服务器（推荐，体验完整）

```bash
# 任选其一
npx serve .                # Node.js
python -m http.server 8080 # Python
```

然后浏览器访问 `http://localhost:8080`。

---

## ☁️ 部署上线（赛题加分项）

本项目为纯静态站点，可一键部署到任意静态托管平台：

- **GitHub Pages**：将整个文件夹推送到仓库，Settings → Pages 选择分支即可。
- **Vercel / Netlify**：直接拖拽本文件夹到对应平台，或关联 Git 仓库自动部署。
- **Gitee Pages**：上传到 Gitee 仓库后开启 Pages 服务。

> 将 `index.html` 作为站点入口即可，其余资源会自动按相对路径加载。

---

## ✏️ 自定义内容

所有简历内容都集中在 **`js/data.js`** 的 `resume` 对象中，按需修改即可：

- `basics`：姓名、联系方式、学校、专业、语言、技能标签
- `highlights`：亮点成果（数字 + 描述）
- `experiences`：工作 / 实习 / 校园经历
- `projects`：项目案例
- `skills`：技能矩阵（含熟练度百分比）
- `certificates`：证书列表（图片路径指向 `assets/img/`）
- `life`：生活板块（格言 + 相册）

更换图片：把新图片放入 `assets/img/`，再更新 `data.js` 或 `index.html` 中对应的路径即可。

---

## 🛠️ 技术栈

- **HTML5**（语义化 + ARIA）
- **CSS3**（CSS 变量、Grid/Flex、媒体查询、动画、`@media print`）
- **原生 JavaScript（ES6+）**（数据驱动渲染、IntersectionObserver、Clipboard API）

---

## 👤 作者

**刘智鹏** · 长沙学院 通信工程创新班（大一）

- 微信：`liuzhipengha`
- 电话：`16670968176`

---

## 📄 License

[MIT](./LICENSE)
