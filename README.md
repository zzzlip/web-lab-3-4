# 实验3与实验4

项目是原生 HTML、CSS、JavaScript 实验，无框架、无后端。

## 运行

在本文件所在的“实验成果”文件夹打开终端，执行：

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

浏览器访问 http://127.0.0.1:8000 。也可使用 VS Code 的 Live Server。建议使用固定地址和端口，以便刷新时读取同一来源下的 localStorage。

- `index.html`：博客主页、换肤、文章动态加载、搜索分类、留言增删与存储、实时时钟。
- `register.html`：用户名、邮箱、手机、密码与确认密码校验。
- `lab3.html`：三种脚本位置、JS/ES6语法执行结果、成绩统计。
- `js/data.js`：5篇模拟文章。
- `验证结果.json`：实际浏览器验证结果，25项通过；未生成页面截图。

注册页只演示前端校验，成功后输出实验数据到控制台，不创建真实账号。请使用虚构的测试数据。留言只存在当前浏览器，不会上传服务器。

## 报告截图补充顺序

1. lab3.html：脚本位置与语法输出、60分及格线统计。
2. 首页：白天、夜间或主题菜单。
3. 注册：错误提示和全部通过的状态，可同时截取控制台数据。
4. 首页：初始5篇文章、关键词或分类查询、无结果状态。
5. 留言板：提交两条留言后的列表和数量。
6. 刷新后留言恢复、删除一条后的列表；开发者工具 Application 中的 localStorage。
7. 自行上传 GitHub 或码云后，补充真实仓库页面截图与地址。

报告中的对应位置已留白，姓名、学号和仓库地址需自行补充。截图时保持同一浏览器及地址，避免切换端口后误认为留言丢失。

## 自动验证

`verify.cjs` 使用 Playwright，无截图操作。安装 Playwright 后执行 `node verify.cjs`；也支持设置 `CHROMIUM_PATH` 指向已有 Chromium。测试使用隔离的临时浏览器上下文，不影响你平时使用的留言数据。

```sh
npm install
npx playwright install chromium
npm test
```

## 实验要求对照

| 要求 | 实现位置 |
| --- | --- |
| JS基本语法与ES6 | js/basics.js |
| head、body尾部、外部JS及onload | lab3.html、js/basics.js |
| DOM查找、click成绩统计及姓名 | js/basics.js |
| 昼夜换肤、多主题与鼠标移入移出 | js/theme.js、css/style.css |
| focus、blur、submit、正则校验 | js/register.js |
| 模板字符串与innerHTML动态文章 | js/data.js、js/blog.js |
| 标题搜索、重置、分类及空结果 | js/blog.js |
| createElement与append显示多条留言 | js/blog.js |
| JSON与localStorage保存留言和数量 | js/blog.js |
| 删除指定留言、刷新恢复 | js/blog.js |
| 定时器扩展 | js/blog.js中的时钟 |
