# 前端面试题库

按专题归档的前端面试题库，共 14 个专题、204 道题。包含网络与协议、HTTP 缓存、JavaScript、浏览器、HTML/CSS、TypeScript、React、Vue、工程化、性能、安全、手写算法和系统设计。

- 190 道文档原题，保留题号、重点标记、代码和参考链接。
- 14 道关联的延伸题，覆盖输出题、手写题和业务场景题。
- 支持全文搜索、筛选、随机练习、收藏和掌握记录。进度保存在当前浏览器。

## 本地使用

打开 [dist/index.html](dist/index.html) 即可离线浏览。也可以用 Python 启动静态服务器。

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

在浏览器访问 [本地题库](http://127.0.0.1:8765/)。部署时将 `dist/` 用作静态站点目录。

## 更新题库

编辑 [题库原稿](前端开发工程师面试题库.md) 或 [延伸题](followups.json)，再运行 `python3 import_questions.py` 生成 `dist/questions.js`。延伸题通过 `relatedTo` 关联原题编号。

## 许可证

- 网站实现、导入脚本和界面资源采用 [MIT](LICENSE)。
- 题目和答案（包括在 Markdown、JSON 和生成数据中的副本）采用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。转载时请署名 **xuyaodegithub**，附上[题库原仓库](https://github.com/xuyaodegithub/frontend-interview-archive)和许可证链接，并说明是否修改。
- 题库链接指向的第三方资料适用各自的许可。
