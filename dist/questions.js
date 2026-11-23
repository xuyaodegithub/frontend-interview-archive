window.interviewData = {
  "topics": [
    {
      "id": "network",
      "title": "网络与协议",
      "mark": "NET",
      "tone": "blue",
      "summary": "DNS、TCP、TLS、HTTP 与实时通信"
    },
    {
      "id": "cache",
      "title": "HTTP 缓存与浏览器存储",
      "mark": "304",
      "tone": "violet",
      "summary": "缓存验证、CDN、Cookie 与离线"
    },
    {
      "id": "javascript",
      "title": "JavaScript 基础",
      "mark": "JS",
      "tone": "amber",
      "summary": "类型、作用域、原型与模块"
    },
    {
      "id": "async",
      "title": "异步与事件循环",
      "mark": "ASY",
      "tone": "violet",
      "summary": "Promise、并发、取消与调度"
    },
    {
      "id": "browser",
      "title": "浏览器与 Web API",
      "mark": "DOM",
      "tone": "blue",
      "summary": "渲染、事件、路由与 Worker"
    },
    {
      "id": "css",
      "title": "HTML CSS 与可访问性",
      "mark": "CSS",
      "tone": "rose",
      "summary": "布局、层叠、响应式与语义"
    },
    {
      "id": "typescript",
      "title": "TypeScript",
      "mark": "TS",
      "tone": "blue",
      "summary": "收窄、泛型、工具类型与接口"
    },
    {
      "id": "react",
      "title": "React",
      "mark": "RE",
      "tone": "teal",
      "summary": "组件状态、Hooks、渲染与水合"
    },
    {
      "id": "vue",
      "title": "Vue",
      "mark": "VU",
      "tone": "green",
      "summary": "响应式、组件通信与渲染"
    },
    {
      "id": "tooling",
      "title": "工程化与测试",
      "mark": "CI",
      "tone": "violet",
      "summary": "构建、发布、测试与组件库"
    },
    {
      "id": "performance",
      "title": "性能与线上排查",
      "mark": "PERF",
      "tone": "teal",
      "summary": "Web Vitals、白屏与性能优化"
    },
    {
      "id": "security",
      "title": "Web 安全与认证",
      "mark": "SEC",
      "tone": "rose",
      "summary": "跨域、会话与 Web 安全防护"
    },
    {
      "id": "coding",
      "title": "手写与算法",
      "mark": "{ }",
      "tone": "amber",
      "summary": "常见工具函数、搜索与数据结构"
    },
    {
      "id": "design",
      "title": "系统设计与项目面试",
      "mark": "SYS",
      "tone": "green",
      "summary": "业务场景、架构取舍与项目复盘"
    }
  ],
  "questions": [
    {
      "id": "001",
      "title": "从输入 URL 到页面渲染，发生了什么？",
      "featured": true,
      "topic": "network",
      "kind": "口述题",
      "answer": "浏览器解析 URL，决定发起导航还是搜索。导航可能由 Service Worker 或 HTTP 缓存提供响应。需要联网时，浏览器解析域名并建立或复用连接，HTTPS 会涉及 TLS 或 QUIC 的加密握手。收到 HTML 后，浏览器可以边解析边发现子资源，构建 DOM 和 CSSOM，执行脚本，完成样式计算、布局、绘制和合成。重定向、连接复用、缓存和流式响应都会改变实际时间线。追问时，用 Network 的 Timing 和 Performance 的主线程记录说明哪些阶段真正发生。 [Fetch 标准](https://fetch.spec.whatwg.org/) · [HTML 导航](https://html.spec.whatwg.org/multipage/browsing-the-web.html)"
    },
    {
      "id": "002",
      "title": "DNS 如何把域名变成地址？",
      "featured": false,
      "topic": "network",
      "kind": "口述题",
      "answer": "客户端通常向递归解析器查询。缓存未命中时，解析器可沿根、顶级域和权威 DNS 查找结果，按 TTL 缓存。A 对应 IPv4，AAAA 对应 IPv6，CNAME 将名称指向另一名称。浏览器或系统可能自行缓存，DNS 结果也可能受网络位置影响。 [RFC 1034](https://www.rfc-editor.org/rfc/rfc1034.html)"
    },
    {
      "id": "003",
      "title": "TCP 三次握手分别做了什么？",
      "featured": true,
      "topic": "network",
      "kind": "口述题",
      "answer": "客户端发 SYN 和初始序号，服务端回 SYN+ACK 并带自己的初始序号，客户端再 ACK。双方完成序号同步并确认收到对方的 SYN。关闭时，两端的发送方向独立关闭，常见是两组 FIN/ACK，ACK 与 FIN 也可以合并。TIME_WAIT 有助于处理最后的确认丢失并让旧报文在网络中消退。 [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293.html)"
    },
    {
      "id": "004",
      "title": "TCP、UDP 和 QUIC 有什么关系？",
      "featured": false,
      "topic": "network",
      "kind": "口述题",
      "answer": "TCP 提供可靠、有序的字节流，应用自行定义消息边界。UDP 提供数据报，交付、顺序和重传由应用或上层协议负责。QUIC 在 UDP 之上提供加密连接、流、多路复用和拥塞控制。HTTP/3 运行在 QUIC 上。 [QUIC RFC 9000](https://www.rfc-editor.org/rfc/rfc9000.html) · [HTTP/3 RFC 9114](https://www.rfc-editor.org/rfc/rfc9114.html)"
    },
    {
      "id": "005",
      "title": "流量控制与拥塞控制有什么区别？",
      "featured": false,
      "topic": "network",
      "kind": "口述题",
      "answer": "流量控制避免发送方压垮接收方，TCP 收到的接收窗口限制在途数据。拥塞控制避免压垮网络，发送端依据反馈调整拥塞窗口。有效发送规模受两者共同约束。丢包后的恢复和拥塞判断由具体算法与协议实现决定。 [RFC 5681](https://www.rfc-editor.org/rfc/rfc5681.html)"
    },
    {
      "id": "006",
      "title": "HTTP/1.1、HTTP/2、HTTP/3 有什么区别？",
      "featured": true,
      "topic": "network",
      "kind": "口述题",
      "answer": "| 版本 | 机制 | 常见瓶颈 |\n| --- | --- | --- |\n| HTTP/1.1 | 持久连接，文本形式的请求行和头部 | 同一连接的管线化响应须按序返回。浏览器通常通过多个连接获得并发 |\n| HTTP/2 | 二进制帧、流多路复用、HPACK | 同一 TCP 连接丢包可阻塞多个流的数据交付 |\n| HTTP/3 | QUIC 上的多流、QPACK | 单流丢包通常无需等待其他流重传。共享拥塞窗口和依赖仍可影响其他流 |\n\nHTTP 方法与状态码的基本语义跨版本共享。实际收益要结合 RTT、丢包和连接复用测量。 [HTTP 语义](https://www.rfc-editor.org/rfc/rfc9110.html) · [HTTP/2](https://www.rfc-editor.org/rfc/rfc9113.html) · [HTTP/3](https://www.rfc-editor.org/rfc/rfc9114.html)"
    },
    {
      "id": "007",
      "title": "HTTPS 和 TLS 1.3 为什么安全？",
      "featured": true,
      "topic": "network",
      "kind": "口述题",
      "answer": "TLS 握手协商参数，常见证书认证场景会校验可信证书链和域名，并验证服务端持有对应私钥。双方从密钥交换导出会话密钥，后续流量用认证加密保护。TLS 1.3 的 0-RTT 早期数据有重放风险，业务应限制可接受的请求。证书过期或域名不匹配时，先检查部署的证书链、域名和客户端时间。 [TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446.html)"
    },
    {
      "id": "008",
      "title": "GET、POST、PUT、PATCH、DELETE 怎么选？",
      "featured": true,
      "topic": "network",
      "kind": "口述题",
      "answer": "GET 读取，POST 让资源按自身语义处理提交，PUT 在目标 URI 创建或替换表示，PATCH 描述部分修改，DELETE 请求移除目标 URI 与当前功能的关联。GET、HEAD 属于安全方法，PUT、DELETE 具有幂等语义。幂等看重复同一请求的预期服务端效果，首次 204、再次 404 可以同时成立。支付类 POST 常用服务端幂等键约束重复提交。 [HTTP 方法语义](https://www.rfc-editor.org/rfc/rfc9110.html#name-methods) · [PATCH RFC 5789](https://www.rfc-editor.org/rfc/rfc5789.html)"
    },
    {
      "id": "009",
      "title": "常见 HTTP 状态码怎么解释？",
      "featured": true,
      "topic": "network",
      "kind": "口述题",
      "answer": "| 状态码 | 含义 |\n| --- | --- |\n| 200 / 201 / 202 / 204 | 成功 / 已创建 / 已接受但处理可能未完成 / 成功且无内容 |\n| 206 / 304 | 部分内容 / 条件请求确认缓存表示可复用 |\n| 400 / 401 / 403 / 404 | 请求有问题 / 缺少有效认证凭据 / 拒绝访问 / 未找到或不披露是否存在 |\n| 409 / 412 / 422 / 429 | 资源状态冲突 / 前置条件失败 / 内容可理解但无法处理 / 请求过多 |\n| 500 / 502 / 503 / 504 | 服务端内部错误 / 网关收到无效上游响应 / 服务暂不可用 / 网关等待上游超时 |\n\n收到 429 时优先遵守可用的 `Retry-After`，再结合退避与重试预算。 [HTTP 状态码](https://www.rfc-editor.org/rfc/rfc9110.html#name-status-codes) · [429 定义](https://www.rfc-editor.org/rfc/rfc6585.html#section-4)"
    },
    {
      "id": "010",
      "title": "301、302、303、307、308 有何区别？",
      "featured": false,
      "topic": "network",
      "kind": "口述题",
      "answer": "301、308 是永久重定向，302、307 是临时重定向。307、308 保留请求方法和请求体。301、302 在历史兼容行为中允许将 POST 改为 GET。303 常用于提交表单后让客户端以 GET 访问结果页，避免刷新时重复提交。 [重定向状态码](https://www.rfc-editor.org/rfc/rfc9110.html#name-redirection-3xx)"
    },
    {
      "id": "011",
      "title": "HTTP 请求头中哪些容易混淆？",
      "featured": false,
      "topic": "network",
      "kind": "口述题",
      "answer": "`Content-Type` 表示当前消息内容类型，`Accept` 表示客户端可接受的类型，`Content-Encoding` 表示内容编码，`Accept-Encoding` 表示可接受的编码。`Origin` 表示来源的协议、主机、端口组合，`Referer` 可包含来源 URL 信息，实际披露量由来源策略等决定。 [HTTP 语义](https://www.rfc-editor.org/rfc/rfc9110.html) · [Referrer Policy](https://www.w3.org/TR/referrer-policy/)"
    },
    {
      "id": "012",
      "title": "Range 请求怎么做断点续传？",
      "featured": false,
      "topic": "network",
      "kind": "口述题",
      "answer": "客户端通过 `Range: bytes=...` 请求部分内容，支持时服务端返回 206 与 `Content-Range`。区间无法满足时可返回 416。使用 `If-Range` 携带可用的验证器，确保续传对应同一表示。若服务端返回 200，应按完整响应处理，避免拼接新旧版本。 [HTTP Range 请求](https://www.rfc-editor.org/rfc/rfc9110.html#name-range-requests)"
    },
    {
      "id": "013",
      "title": "WebSocket、SSE 和轮询怎么选？",
      "featured": true,
      "topic": "network",
      "kind": "口述题",
      "answer": "WebSocket 提供长连接上的双向消息，适合聊天或协作。SSE 使用 `text/event-stream` 持续向客户端单向推送，适合进度和通知，`EventSource` 支持重连及经事件 ID 恢复的协议机制。轮询简单，成本取决于频率、客户端数量和空响应比例。部署时验证代理缓冲、超时、重连、鉴权和背压。 [WebSocket RFC 6455](https://www.rfc-editor.org/rfc/rfc6455.html) · [HTML SSE](https://html.spec.whatwg.org/multipage/server-sent-events.html)"
    },
    {
      "id": "014",
      "title": "CDN 如何加速？怎么判断命中？",
      "featured": false,
      "topic": "network",
      "kind": "口述题",
      "answer": "CDN 将可缓存内容放在边缘节点，减少到源站的距离和回源负载。命中受缓存键、TTL、响应头、边缘规则影响。看响应的 `Age`、供应商缓存状态头、请求链路和回源日志来确认。反向代理可以同时承担 TLS 终止、路由和负载均衡。"
    },
    {
      "id": "015",
      "title": "什么是 HSTS？",
      "featured": false,
      "topic": "network",
      "kind": "口述题",
      "answer": "站点在 HTTPS 响应中发送 `Strict-Transport-Security`，让浏览器在有效期内将该主机的后续 HTTP 访问升级到 HTTPS。可选择覆盖子域。首次接触要结合已设置的父域策略或浏览器预加载支持分析。 [HSTS RFC 6797](https://www.rfc-editor.org/rfc/rfc6797.html)"
    },
    {
      "id": "016",
      "title": "强缓存和协商缓存有何区别？",
      "featured": true,
      "topic": "cache",
      "kind": "口述题",
      "answer": "满足条件且仍新鲜的缓存响应可以直接复用。需要验证时，缓存发条件请求，服务端确认未变化可返回 304，缓存更新元数据并复用已保存的正文，变化则通常返回新表示。打开开发者工具的禁用缓存选项会影响观察。 [HTTP 缓存 RFC 9111](https://www.rfc-editor.org/rfc/rfc9111.html)"
    },
    {
      "id": "017",
      "title": "Cache-Control 常用指令怎么用？",
      "featured": true,
      "topic": "cache",
      "kind": "口述题",
      "answer": "| 指令 | 作用 |\n| --- | --- |\n| `max-age=N` | 定义响应的新鲜寿命 |\n| `s-maxage=N` | 共享缓存使用的寿命，优先于它看到的 `max-age` 或 `Expires` |\n| `no-cache` | 可以存储，复用前须成功验证 |\n| `no-store` | 要求缓存不存储该交换的请求或响应 |\n| `private` | 允许私有缓存，禁止共享缓存存储该响应 |\n| `public` | 显式允许缓存，能解除某些默认限制 |\n| `must-revalidate` | 过期后复用前必须成功验证 |\n| `immutable` | 告知客户端响应在新鲜期内不会更新 |\n\n`Expires` 提供绝对过期时间，可由适用的 `max-age` 覆盖。过期策略还受 Age、验证器及其他指令影响。 [HTTP 缓存指令](https://www.rfc-editor.org/rfc/rfc9111.html#name-cache-control) · [immutable](https://www.rfc-editor.org/rfc/rfc8246.html)"
    },
    {
      "id": "018",
      "title": "ETag 与 Last-Modified 怎么比较？",
      "featured": true,
      "topic": "cache",
      "kind": "口述题",
      "answer": "`ETag` 是服务端提供的不透明表示标记，对应 `If-None-Match`。修改时间对应 `If-Modified-Since`，秒级粒度可能漏掉短时间内的多次修改。两种条件同时存在时，`If-None-Match` 优先。弱标签以 `W/` 开头，可用于缓存验证，字节级一致性用途需要强验证器。并发更新常用 `If-Match` 与强 ETag。 [HTTP 验证器及条件请求](https://www.rfc-editor.org/rfc/rfc9110.html#name-conditional-requests)"
    },
    {
      "id": "019",
      "title": "HTML 和 JS 文件分别怎么配缓存？",
      "featured": true,
      "topic": "cache",
      "kind": "口述题",
      "answer": "入口 HTML 常用 `no-cache` 配验证器。内容哈希命名的静态资源，例如 `app.81a3.js`，可用一年 `max-age` 加 `immutable`，内容更新时换 URL。发布时先让新资源可用，再切换入口，并保留旧资源供旧页面和回滚使用。个性化响应要单独考虑共享缓存和敏感数据策略。"
    },
    {
      "id": "020",
      "title": "Vary、缓存键和个性化响应有什么关系？",
      "featured": false,
      "topic": "cache",
      "kind": "口述题",
      "answer": "HTTP 缓存匹配通常考虑请求方法和目标 URI，`Vary` 进一步要求指定请求头匹配，例如 `Vary: Accept-Encoding`。动态返回不同 `Access-Control-Allow-Origin` 时通常还需要 `Vary: Origin`。CDN 自定义缓存键必须覆盖真正影响内容的维度。用户私有数据默认走适合身份隔离的策略，避免在共享缓存中串用户。 [RFC 9111 缓存键与 Vary](https://www.rfc-editor.org/rfc/rfc9111.html#name-calculating-cache-keys-with-v)"
    },
    {
      "id": "021",
      "title": "stale-while-revalidate 是什么？",
      "featured": false,
      "topic": "cache",
      "kind": "口述题",
      "answer": "支持该指令的缓存可以在指定过期窗口内立即返回旧响应，并尝试后台验证。它降低等待时间，代价是窗口内可能看到旧数据。`stale-if-error` 则允许在规定窗口和错误条件下用旧响应兜底。余额或权限状态通常有不同的新鲜度要求。 [RFC 5861](https://www.rfc-editor.org/rfc/rfc5861.html)"
    },
    {
      "id": "022",
      "title": "刷新页面、有 304、显示 memory cache 分别说明什么？",
      "featured": false,
      "topic": "cache",
      "kind": "口述题",
      "answer": "普通加载可能复用本地响应。重新加载时，浏览器可按自身规则要求验证或绕过部分缓存。304 表示发生了条件请求，正文继续用已保存版本。`memory cache` 和 `disk cache` 是开发者工具对本地来源的实现层提示。诊断时对照实际请求头、响应头、资源 URL 与 CDN 日志。"
    },
    {
      "id": "023",
      "title": "Cookie、localStorage、sessionStorage、IndexedDB 怎么选？",
      "featured": true,
      "topic": "cache",
      "kind": "口述题",
      "answer": "Cookie 可由浏览器按请求规则自动发送，也可用 `HttpOnly` 禁止脚本直接读取。localStorage 是同步字符串存储，通常跨会话保留。sessionStorage 按源及顶层浏览上下文隔离，刷新一般保留。IndexedDB 提供异步结构化存储、索引和事务，适合离线数据。配额、分区和驱逐策略受浏览器和环境影响。 [HTML Web Storage](https://html.spec.whatwg.org/multipage/webstorage.html) · [IndexedDB](https://www.w3.org/TR/IndexedDB/)"
    },
    {
      "id": "024",
      "title": "Service Worker 与 Cache Storage 如何实现离线？",
      "featured": true,
      "topic": "cache",
      "kind": "口述题",
      "answer": "Service Worker 可在控制范围内处理请求，按策略从 Cache Storage 取响应或请求网络。带哈希资源可用 cache-first，导航可用 network-first 并配离线兜底。安装时准备新缓存，激活时按版本清理，并考虑旧页面仍在使用的资源。Cache Storage 条目通常由应用维护生命周期。 [Service Workers 规范](https://w3c.github.io/ServiceWorker/)"
    },
    {
      "id": "025",
      "title": "bfcache 与 HTTP 缓存有何区别？",
      "featured": false,
      "topic": "cache",
      "kind": "口述题",
      "answer": "bfcache 在符合条件时保留页面及其运行状态，用于前进和后退。HTTP 缓存保存可复用的响应。可在 `pageshow` 中检查 `event.persisted`，并按业务需要更新恢复页面中的敏感或时效性数据。 [bfcache 指南](https://web.dev/articles/bfcache)"
    },
    {
      "id": "026",
      "title": "前端请求缓存的 key 和失效策略怎么设计？",
      "featured": false,
      "topic": "cache",
      "kind": "口述题",
      "answer": "key 应覆盖资源路径、规范化参数、用户或租户、语言等身份和响应维度。对同一 key 可合并进行中的读取请求。写入后按受影响的查询精准失效，页面恢复或网络恢复时按新鲜度重取。退出登录要清除私有缓存及其持久化副本。"
    },
    {
      "id": "027",
      "title": "如何排查用户一直看到旧版本？",
      "featured": false,
      "topic": "cache",
      "kind": "口述题",
      "answer": "对照页面构建版本与线上 HTML，再检查资源 URL、HTML 的 Age 和缓存状态、Service Worker 控制状态及浏览器来源。验证 CDN 和源站返回的 HTML 是否一致，查看旧入口是否引用已删除的 chunk。修复可包括恢复旧资源、清理对应缓存键、调整入口策略，并验证冷启动、仍开着的旧标签页和回滚三条路径。"
    },
    {
      "id": "028",
      "title": "JS 有哪些数据类型？",
      "featured": true,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "原始类型包括 undefined、null、boolean、number、bigint、string、symbol。其余是对象，函数是可调用对象。`typeof null` 的历史结果是 `\"object\"`，`typeof NaN` 是 `\"number\"`，数组可用 `Array.isArray` 判断。"
    },
    {
      "id": "029",
      "title": "JS 传参是值传递还是引用传递？",
      "featured": true,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "传参复制值，对象值使两个变量指向同一对象。修改对象属性会影响调用方观察到的对象，给参数重新赋值只改变函数内绑定。实践中，这解释了为何浅复制对象后修改嵌套字段仍会影响原数据。"
    },
    {
      "id": "030",
      "title": "var、let、const 区别是什么？",
      "featured": true,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "`var` 是函数作用域或全局作用域，在进入作用域时通常初始化为 `undefined`。`let` 和 `const` 是块级作用域，在声明初始化前读取会因暂时性死区抛错。`const` 约束绑定的重新赋值，对象内部仍可以修改。顶层声明与全局对象的关系还取决于经典脚本和模块环境。"
    },
    {
      "id": "031",
      "title": "闭包是什么？有什么实际用途？",
      "featured": true,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "函数在定义时关联词法环境，之后调用仍可访问其外部绑定。它用于封装私有状态、工厂函数和事件处理。闭包引用的对象可持续可达，长生命周期订阅应及时清理。循环中 `let` 可创建每轮独立绑定，`var` 则共享函数级绑定。"
    },
    {
      "id": "032",
      "title": "this 如何确定？",
      "featured": true,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "普通函数的 `this` 由调用方式决定。方法调用取接收者，`call`、`apply` 或 `bind` 可指定接收者，构造调用使用新实例。严格模式下裸函数调用的 `this` 为 undefined。箭头函数从外层词法环境获取 `this`。把对象方法单独交给定时器或回调时，可绑定或写闭包保留接收者。"
    },
    {
      "id": "033",
      "title": "call、apply、bind 有何区别？",
      "featured": false,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "`call` 接收逐个参数并立即调用，`apply` 接收数组或类数组参数并立即调用，`bind` 返回绑定了接收者和部分参数的新函数。若目标可构造，使用 `new` 调用绑定函数时，构造语义优先，预绑定参数仍有效。"
    },
    {
      "id": "034",
      "title": "原型链与 class 继承怎么理解？",
      "featured": true,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "对象可通过内部原型链接委托属性查找。通常实例的原型是构造函数的 `prototype`。类的实例方法定义在原型上，公共实例字段按实例初始化。子类方法通过原型链接继承父类方法，子类构造器在读取 `this` 前要完成 `super()` 初始化。"
    },
    {
      "id": "035",
      "title": "new 做了什么？",
      "featured": false,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "对常见可构造函数，构造过程创建实例并建立原型链接，以实例为 `this` 执行初始化。构造函数显式返回对象时可以替换结果。需要保留原生构造语义时使用 `Reflect.construct`，它能处理类及 `new.target` 等行为。"
    },
    {
      "id": "036",
      "title": "instanceof 如何工作？为什么跨 iframe 会失败？",
      "featured": false,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "默认机制沿左值原型链查找右侧构造函数的 `prototype`。构造器还能经过 `Symbol.hasInstance` 自定义结果。跨 realm 的数组原型有各自身份，所以数组优先用 `Array.isArray`。"
    },
    {
      "id": "037",
      "title": "==、===、Object.is 有何区别？",
      "featured": true,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "`==` 按规则做类型转换，`===` 要求类型一致并按严格相等规则判断。`Object.is(NaN, NaN)` 为 true，`Object.is(+0, -0)` 为 false。Map 和 Set 使用 SameValueZero，把 NaN 视为相等且合并正负零。"
    },
    {
      "id": "038",
      "title": "JS 对象转为原始值有哪些步骤？",
      "featured": false,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "优先使用 `Symbol.toPrimitive`。常见对象在默认或数字提示下先尝试 `valueOf`，再试 `toString`。字符串提示下通常反序尝试，某些内建对象有自己的行为。加法先做原始值转换，只要其中一个原始操作数是字符串，就执行拼接，否则进入数值运算。例如 1 + \"2\" 得到 \"12\"，1 + true 得到 2。"
    },
    {
      "id": "039",
      "title": "为什么 0.1 + 0.2 会出现精度误差？",
      "featured": false,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "Number 使用二进制双精度浮点数表示，许多十进制小数无法有限表示。比较误差时，容差要符合值的量级与业务要求。金额可用最小货币单位的安全整数、BigInt 或十进制库，并明确舍入规则。"
    },
    {
      "id": "040",
      "title": "浅拷贝、深拷贝、structuredClone 如何选？",
      "featured": true,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "展开语法和 `Object.assign` 复制自身可枚举属性的值，嵌套对象仍共享。JSON 往返适用有限数据，循环引用会报错，Date 会序列化成字符串，Map 和 Set 无法照原结构保留。`structuredClone` 支持循环以及多种内建类型，函数通常无法克隆，自定义类原型也不应指望保留。 [HTML 结构化序列化](https://html.spec.whatwg.org/multipage/structured-data.html)"
    },
    {
      "id": "041",
      "title": "Map、Set、WeakMap、WeakSet 如何选？",
      "featured": false,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "Map 维护键值关联并支持对象键，Set 表达唯一值集合，两者可迭代。WeakMap 可存跟对象生命周期关联的元数据，弱集合不提供可枚举的完整键集合。现代规范的弱键还允许不可注册的 Symbol，常见应用仍以对象为主。 [ECMAScript 集合规范](https://tc39.es/ecma262/multipage/keyed-collections.html)"
    },
    {
      "id": "042",
      "title": "枚举对象属性的 API 有什么区别？",
      "featured": false,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "`Object.keys` 返回自身、可枚举的字符串键。对象展开还复制可枚举 Symbol 键。`for...in` 遍历可枚举字符串键，并可能包含继承的键。`Reflect.ownKeys` 返回所有自身字符串和 Symbol 键。判断是否为自身属性可用 `Object.hasOwn`。"
    },
    {
      "id": "043",
      "title": "map、filter、reduce、forEach 怎样选？数组空位呢？",
      "featured": false,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "`map` 投影，`filter` 筛选，`reduce` 累积，`forEach` 适用于副作用。很多遍历方法会跳过通常的稀疏数组空位，`map` 保留相应位置的空位，展开通常将空位读成 undefined。异步任务有串行要求时用 `for...of` 加 await，聚合并行结果时用 `Promise.all` 等。"
    },
    {
      "id": "044",
      "title": "Object.freeze 和不可变更新有什么边界？",
      "featured": false,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "`Object.freeze` 冻结对象自身属性的配置，且限制自身数据属性写入，嵌套对象需要独立处理。不可变更新通常复制变化路径上的祖先节点，其余对象可共享，有利于原有比较机制识别变化。"
    },
    {
      "id": "045",
      "title": "ESM 和 CommonJS 有何区别？循环依赖呢？",
      "featured": true,
      "topic": "javascript",
      "kind": "口述题",
      "answer": "ESM 的导入导出具有静态结构，导入是实时绑定，可通过动态 import 按需加载。CommonJS 通过 `require` 执行模块并读取其导出。ESM 循环中访问尚未初始化的绑定可能抛错，CommonJS 循环中可能读到部分初始化的导出。共享逻辑可抽到无环的第三个模块。 [ECMAScript 模块](https://tc39.es/ecma262/multipage/ecmascript-language-scripts-and-modules.html) · [Node.js CommonJS](https://nodejs.org/api/modules.html)"
    },
    {
      "id": "046",
      "title": "浏览器事件循环如何运行？",
      "featured": true,
      "topic": "async",
      "kind": "口述题",
      "answer": "浏览器从任务队列选择可运行任务，执行到栈清空，在相应时机执行微任务检查点，把微任务处理到队列为空。然后在合适的渲染机会更新界面。Promise 回调与 `queueMicrotask` 进入微任务队列。定时器回调通常以任务运行。反复排入微任务可能推迟下一次输入处理和绘制。 [HTML 事件循环](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)"
    },
    {
      "id": "047",
      "title": "下面代码按什么顺序输出？",
      "featured": true,
      "topic": "async",
      "kind": "输出题",
      "answer": "```js\nconsole.log('A')\nsetTimeout(() => console.log('B'), 0)\nPromise.resolve().then(() => {\n  console.log('C')\n  queueMicrotask(() => console.log('D'))\n})\nqueueMicrotask(() => console.log('E'))\nconsole.log('F')\n```\n\n**答案** A、F、C、E、D、B。同步打印 A、F，首批微任务按入队顺序执行 C、E，C 新排入的 D 在 E 后。B 在之后的计时器任务执行。"
    },
    {
      "id": "048",
      "title": "Promise executor 和 then 回调什么时候运行？",
      "featured": false,
      "topic": "async",
      "kind": "口述题",
      "answer": "传给 `new Promise` 的 executor 同步执行。通过 `then` 注册的处理函数异步执行，即使原 Promise 已经完成。调用 `resolve(pendingPromise)` 会锁定外层的结果走向，外层可以继续等待内层落定。 [ECMAScript Promise](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise-objects)"
    },
    {
      "id": "049",
      "title": "Promise 链如何传递值与异常？",
      "featured": true,
      "topic": "async",
      "kind": "口述题",
      "answer": "`then` 返回新 Promise。处理函数返回普通值会兑现新 Promise，返回 Promise 或 thenable 则会采用其最终状态，抛异常会拒绝新 Promise。省略成功或失败处理函数时相应状态向后传递。若 `catch` 正常返回，链条可恢复到 fulfilled。"
    },
    {
      "id": "050",
      "title": "四个 Promise 组合方法有何区别？",
      "featured": true,
      "topic": "async",
      "kind": "口述题",
      "answer": "| 方法 | 行为 | 空输入 |\n| --- | --- | --- |\n| all | 全部成功才成功，结果按输入顺序。任一拒绝即拒绝 | 兑现空数组 |\n| allSettled | 等全部落定，返回每项状态和结果 | 兑现空数组 |\n| race | 采用第一个落定的状态 | 一直 pending |\n| any | 第一个兑现即兑现，全部拒绝后以 AggregateError 拒绝 | 以 AggregateError 拒绝 |\n\n组合结果先落定时，已发出的底层任务仍会继续，取消需要任务支持相应信号。 [ECMAScript Promise 组合方法](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise-constructor)"
    },
    {
      "id": "051",
      "title": "async/await 的执行机制是什么？",
      "featured": true,
      "topic": "async",
      "kind": "口述题",
      "answer": "调用 async 函数会立即执行其同步部分并得到 Promise。遇到 await 时函数让出执行权，等结果后通过异步继续执行。返回值兑现外层 Promise，未捕获异常拒绝它。需要在本层捕获某 Promise 的拒绝时，在 `try` 中 await 它。直接 return 该 Promise 会让其拒绝传播给调用方。"
    },
    {
      "id": "052",
      "title": "下面 async/await 输出什么？",
      "featured": false,
      "topic": "async",
      "kind": "输出题",
      "answer": "```js\nasync function run() {\n  console.log(1)\n  await 0\n  console.log(2)\n}\nconsole.log(3)\nrun()\nPromise.resolve().then(() => console.log(4))\nconsole.log(5)\n```\n\n**答案** 3、1、5、2、4。调用 run 先同步打印 1，await 后续先入队，then 回调随后入队。"
    },
    {
      "id": "053",
      "title": "setTimeout(0) 为什么不是立即执行？",
      "featured": false,
      "topic": "async",
      "kind": "口述题",
      "answer": "延迟是定时器到期前的最低等待目标。回调还要等任务择机执行。浏览器可能限制嵌套计时器或后台标签页的计时器频率，主线程忙和微任务很长也会推迟执行。 [HTML 定时器](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers)"
    },
    {
      "id": "054",
      "title": "requestAnimationFrame 与定时器怎么选？",
      "featured": false,
      "topic": "async",
      "kind": "口述题",
      "answer": "`requestAnimationFrame` 让回调与浏览器渲染机会协调，适合逐帧视觉更新。以回调时间戳计算经过时间，有助于适应不同刷新率。轮询任务可用计时器。页面进入后台后，两者都可能被暂停或限频，需要将业务时间基于实际时间戳计算。"
    },
    {
      "id": "055",
      "title": "并发与串行的 Promise 应怎么写？",
      "featured": false,
      "topic": "async",
      "kind": "口述题",
      "answer": "独立任务可以先启动并通过 `Promise.all` 汇总。依赖前序结果的任务逐步 await。大量独立任务使用并发池，只有前一批腾出槽位时才继续创建。若列表里已经全是启动过的 Promise，并发池来不及限制其启动。"
    },
    {
      "id": "056",
      "title": "怎么取消 fetch 和防止搜索结果乱序？",
      "featured": true,
      "topic": "async",
      "kind": "口述题",
      "answer": "每轮创建 AbortController，启动新请求时中止旧请求，并用单调递增序号或查询 key 校验结果是否仍对应当前输入。序号防止已经完成网络阶段、仍在解析或者无法取消的旧任务写入 UI。卸载时清理定时器与进行中的请求。 [Fetch 标准](https://fetch.spec.whatwg.org/) · [DOM AbortController](https://dom.spec.whatwg.org/#interface-abortcontroller)"
    },
    {
      "id": "057",
      "title": "Promise 超时如何处理？什么时候重试？",
      "featured": false,
      "topic": "async",
      "kind": "口述题",
      "answer": "用超时信号取消支持取消的操作。`Promise.race` 可限制调用方等待时间，底层操作仍可能继续。对临时网络错误或符合策略的状态码用指数退避加抖动，设置最大尝试次数和总截止时间。写请求需先确认幂等约定及服务端是否可能已执行。"
    },
    {
      "id": "058",
      "title": "浏览器和 Node.js 的事件循环能套同一规则吗？",
      "featured": false,
      "topic": "async",
      "kind": "口述题",
      "answer": "两者都使用 Promise 微任务，但 Node.js 的宿主任务有 timers、poll、check 等阶段，`process.nextTick` 使用单独队列。顶层 ESM 与 CommonJS 也影响示例的调度上下文。比较 `setImmediate` 和 `setTimeout(0)` 时需要说明代码在顶层还是在 I/O 回调中。 [Node.js 事件循环](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick) · [Node.js process](https://nodejs.org/api/process.html#when-to-use-queuemicrotask-vs-processnexttick)"
    },
    {
      "id": "059",
      "title": "浏览器渲染流水线有哪些阶段？",
      "featured": true,
      "topic": "browser",
      "kind": "口述题",
      "answer": "HTML 解析成 DOM，CSS 解析成 CSSOM。浏览器随后计算样式和布局，生成绘制指令并栅格化，最后合成各层。不同变更会让部分阶段重新运行，浏览器也会合并工作。实际开销可用 Performance 的布局、绘制和合成记录验证。 [渲染性能](https://web.dev/articles/rendering-performance)"
    },
    {
      "id": "060",
      "title": "什么是布局抖动？如何避免？",
      "featured": true,
      "topic": "browser",
      "kind": "口述题",
      "answer": "交替写入样式和读取 `offsetWidth`、`getBoundingClientRect` 等布局信息，可能让浏览器在同一帧反复同步刷新布局。例如循环里给每行换宽度后立刻读取下一行宽度。先批量读、再批量写，并用性能录制确认布局次数下降。 [避免大型复杂布局和布局抖动](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing)"
    },
    {
      "id": "061",
      "title": "普通 script、async、defer 和模块脚本有何区别？",
      "featured": true,
      "topic": "browser",
      "kind": "口述题",
      "answer": "无属性的外部经典脚本通常阻塞 HTML 解析直到加载并执行。async 并行下载，准备好后尽快执行，多个脚本顺序不固定。defer 并行下载，在解析完成后按文档顺序执行，影响 DOMContentLoaded。模块脚本默认具有延后执行行为，还要加载依赖图，设 async 时行为会变化。 [HTML script](https://html.spec.whatwg.org/multipage/scripting.html#the-script-element)"
    },
    {
      "id": "062",
      "title": "DOMContentLoaded 与 load 有何区别？",
      "featured": false,
      "topic": "browser",
      "kind": "口述题",
      "answer": "DOMContentLoaded 在文档解析和需要等待的脚本处理完成后触发。窗口 load 等待图片、样式表等阻塞加载的资源，原生懒加载资源通常不阻塞。已有事件可能触发完毕的脚本可先读 `document.readyState` 再决定是否订阅。"
    },
    {
      "id": "063",
      "title": "事件捕获、目标、冒泡和委托怎么理解？",
      "featured": true,
      "topic": "browser",
      "kind": "口述题",
      "answer": "事件沿传播路径从祖先到目标，支持冒泡时再向上传递。委托在容器监听，用 `event.target.closest()` 找对应控件并确认仍在容器内。`target` 指事件目标或重定向后的目标，`currentTarget` 是当前监听器所在节点。focus 可用捕获监听，或用会冒泡的 focusin。 [DOM 事件模型](https://dom.spec.whatwg.org/#events)"
    },
    {
      "id": "064",
      "title": "preventDefault、stopPropagation 和 passive 有何区别？",
      "featured": false,
      "topic": "browser",
      "kind": "口述题",
      "answer": "`preventDefault` 请求阻止可取消事件的默认动作，例如阻止表单提交。`stopPropagation` 阻止事件继续传播。`stopImmediatePropagation` 还阻止当前节点剩余监听器。passive 监听器承诺不取消默认动作。滚动相关监听可在确实无需取消时使用 passive。 [DOM Event](https://dom.spec.whatwg.org/#interface-event)"
    },
    {
      "id": "065",
      "title": "IntersectionObserver、ResizeObserver、MutationObserver 各做什么？",
      "featured": false,
      "topic": "browser",
      "kind": "口述题",
      "answer": "IntersectionObserver 异步报告目标与观察根的交叉变化，适合懒加载与曝光。ResizeObserver 观察元素尺寸变化。MutationObserver 观察指定的 DOM 结构、属性或文本变化。组件卸载时断开观察，曝光统计需要额外定义可见比例和停留时间。"
    },
    {
      "id": "066",
      "title": "Web Worker、Service Worker、主线程怎么分工？",
      "featured": false,
      "topic": "browser",
      "kind": "口述题",
      "answer": "Dedicated Worker 适合计算密集任务，无权直接操纵页面 DOM，通过消息与主线程通信。Service Worker 是可处理网络请求和离线策略的事件驱动代理，其寿命由浏览器管理。大量二进制数据可用 transfer 转移所有权，避免复制。 [HTML Workers](https://html.spec.whatwg.org/multipage/workers.html) · [Service Workers](https://w3c.github.io/ServiceWorker/)"
    },
    {
      "id": "067",
      "title": "SPA 的 hash 和 history 路由有什么区别？",
      "featured": false,
      "topic": "browser",
      "kind": "口述题",
      "answer": "hash 变化通常不向服务器重新请求文档，客户端可监听 hashchange。history 路由用 `pushState` 等改路径，后退和前进可通过 popstate 感知。history 模式直接访问或刷新子路径时，服务器需要返回正确的应用入口或路由响应，API 和真实静态资源应单独处理。 [HTML History](https://html.spec.whatwg.org/multipage/nav-history-apis.html)"
    },
    {
      "id": "068",
      "title": "fetch 为什么在 404 时仍 resolve？",
      "featured": true,
      "topic": "browser",
      "kind": "口述题",
      "answer": "HTTP 404 是成功接收 HTTP 响应，`fetch` 通常兑现 Response。应用通过 status 或 ok 判断 HTTP 结果，再按响应类型解析正文。网络错误或中止等会拒绝 Promise，正文读取与 JSON 解析也有自己的失败路径。XHR 常用于需要传统上传进度事件的业务。 [Fetch 标准](https://fetch.spec.whatwg.org/) · [XHR 标准](https://xhr.spec.whatwg.org/)"
    },
    {
      "id": "069",
      "title": "为什么 Response.body 经常只能读取一次？",
      "featured": false,
      "topic": "browser",
      "kind": "口述题",
      "answer": "正文由流提供，消费后原流不能再从头读。需要独立消费者时，在读取前用 `response.clone()`，并留意速度不同的消费者可能带来缓冲开销。处理大文件时考虑逐块读取及背压。 [Fetch Body](https://fetch.spec.whatwg.org/#body-mixin)"
    },
    {
      "id": "070",
      "title": "跨标签页如何同步登录状态？",
      "featured": false,
      "topic": "browser",
      "kind": "口述题",
      "answer": "同源且分区条件满足时，可以用 BroadcastChannel 发送退出等通知。localStorage 的 storage 事件可通知其他相关页面，修改它的页面要自行更新。业务消息只表示需要重新检查状态，接收方应从可信来源获取会话信息。 [HTML BroadcastChannel](https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts)"
    },
    {
      "id": "071",
      "title": "什么是浏览器内存泄漏？如何定位？",
      "featured": false,
      "topic": "browser",
      "kind": "口述题",
      "answer": "页面离开后依然可达的对象可能持续占用内存，例如全局监听器引用组件实例或缓存持有已卸载 DOM。重复执行进入与离开流程，采集多组堆快照，比较对象数和保留路径。移除订阅、停止计时器、断开 observer，并再验证内存是否趋稳。"
    },
    {
      "id": "072",
      "title": "为什么用语义化 HTML？",
      "featured": false,
      "topic": "css",
      "kind": "口述题",
      "answer": "`button`、`a`、`nav`、`main` 等给浏览器和辅助技术提供原生语义。例如用 button 触发操作，它自带聚焦及键盘交互。链接用于导航。表单用 label 关联控件，动态错误要能被辅助技术感知。 [HTML 元素](https://html.spec.whatwg.org/multipage/indices.html#elements-3) · [WCAG 2.2](https://www.w3.org/TR/WCAG22/)"
    },
    {
      "id": "073",
      "title": "盒模型和 box-sizing 有何区别？",
      "featured": true,
      "topic": "css",
      "kind": "口述题",
      "answer": "盒子按 content、padding、border、margin 分层。`content-box` 的 width 指内容宽度。`border-box` 的指定宽度包含内容、内边距与边框。margin 在两种模型下都在盒边框之外。 [CSS Box Sizing](https://www.w3.org/TR/css-sizing-3/#box-sizing)"
    },
    {
      "id": "074",
      "title": "CSS 层叠如何决定最终样式？",
      "featured": true,
      "topic": "css",
      "kind": "口述题",
      "answer": "先筛选匹配规则，再按来源、重要性及层叠层等优先级排序，同一适用层级再比较选择器优先级、适用时的作用域接近度和声明顺序。`:where()` 优先级为零，`:is()` 通常取参数列表中最高优先级。排查时用 Computed 追踪最终声明。 [CSS Cascade](https://www.w3.org/TR/css-cascade-6/) · [Selectors](https://www.w3.org/TR/selectors-4/#specificity-rules)"
    },
    {
      "id": "075",
      "title": "BFC 有什么用？如何创建？",
      "featured": true,
      "topic": "css",
      "kind": "口述题",
      "answer": "块格式化上下文管理内部块级盒子的布局。它可包含内部浮动、避免自身与外部浮动重叠，并影响外边距折叠。用 `display: flow-root` 可显式创建 BFC。部分 overflow 值也会创建，但可能带来剪裁或滚动。"
    },
    {
      "id": "076",
      "title": "外边距何时会折叠？",
      "featured": false,
      "topic": "css",
      "kind": "口述题",
      "answer": "普通流里相邻块的垂直外边距可折叠，父子元素和空块也有特定折叠条件。折叠值要考虑正负 margin 的规则。Flex 或 Grid 项间距通常用 gap，便于控制且无块流 margin 折叠。"
    },
    {
      "id": "077",
      "title": "position 的五个常用取值有何区别？",
      "featured": true,
      "topic": "css",
      "kind": "口述题",
      "answer": "static 走普通定位，relative 保留普通流占位后产生偏移，absolute 脱离普通流并相对其包含块定位，fixed 通常相对视口定位，部分祖先属性可改变包含块。sticky 保留占位，并在滚动过程中按设定阈值约束位置。排查 sticky 时查 inset、滚动容器及滚动空间。 [CSS Positioned Layout](https://www.w3.org/TR/css-position-3/)"
    },
    {
      "id": "078",
      "title": "z-index 很大为什么仍被遮挡？",
      "featured": true,
      "topic": "css",
      "kind": "口述题",
      "answer": "子元素的 z-index 在所属层叠上下文内比较，祖先上下文的层级决定这一组元素在外部的顺序。transform、opacity 等属性在相应条件下可创建新层叠上下文。原生 dialog 用 `showModal()` 时进入顶层。排查先沿祖先找上下文，再选对容器或调整分层。"
    },
    {
      "id": "079",
      "title": "Flex 与 Grid 怎么选？",
      "featured": true,
      "topic": "css",
      "kind": "口述题",
      "answer": "Flex 适合沿主轴分配空间，例如工具栏。Grid 适合二维对齐，例如卡片矩阵。`flex: 1` 的项目可能受自动最小尺寸约束而无法收缩，常见解法是按需要设置 `min-width: 0`。Grid 中可用 `minmax(0, 1fr)` 允许轨道缩到更小。 [CSS Flexbox](https://www.w3.org/TR/css-flexbox-1/) · [CSS Grid](https://www.w3.org/TR/css-grid-2/)"
    },
    {
      "id": "080",
      "title": "水平垂直居中有哪些方案？",
      "featured": false,
      "topic": "css",
      "kind": "口述题",
      "answer": "单子项可用 Grid 的 `place-items: center`。Flex 可对主轴用 justify-content、交叉轴用 align-items。已定位元素可组合 `top: 50%`、`left: 50%` 和自身百分比平移。先明确是居中整个盒子还是其中的行内文本。"
    },
    {
      "id": "081",
      "title": "display none、visibility hidden、opacity 0 如何区分？",
      "featured": false,
      "topic": "css",
      "kind": "口述题",
      "answer": "`display: none` 移除布局盒，通常也从无障碍树移除。`visibility: hidden` 保留布局，元素默认不可见且无法交互。`opacity: 0` 保留布局，默认仍可能响应指针及接收焦点。单独设置 `pointer-events: none` 不会移除键盘焦点。"
    },
    {
      "id": "082",
      "title": "单行和多行省略怎么实现？",
      "featured": false,
      "topic": "css",
      "kind": "口述题",
      "answer": "单行在有宽度限制的盒子设置 `overflow: hidden`、`white-space: nowrap`、`text-overflow: ellipsis`。Flex 子项可能还要允许收缩。多行可按目标环境采用 line-clamp 方案，关键文本应有可访问的完整查看入口。"
    },
    {
      "id": "083",
      "title": "响应式布局、容器查询、响应式图片分别解决什么？",
      "featured": false,
      "topic": "css",
      "kind": "口述题",
      "answer": "媒体查询根据视口或设备特征切换规则，容器查询按组件所在容器尺寸决定布局。`srcset` 和 `sizes` 帮浏览器选图片分辨率，`picture` 可提供不同构图或格式。移动页面通常设置合适的 viewport 元信息，让 CSS 视口符合设备宽度。"
    },
    {
      "id": "084",
      "title": "px、rem、em、vw、dvh 如何选择？",
      "featured": false,
      "topic": "css",
      "kind": "口述题",
      "answer": "px 是 CSS 像素。rem 取根字体大小，em 在 font-size 中参考继承的字体大小，在其他属性中通常使用元素计算字体大小。vw 参考视口宽度，dvh 适应动态视口高度。移动全屏页面要用真机测试地址栏及软键盘场景。 [CSS Values and Units](https://www.w3.org/TR/css-values-4/)"
    },
    {
      "id": "085",
      "title": "CSS 动画为什么推荐先考虑 transform 和 opacity？",
      "featured": false,
      "topic": "css",
      "kind": "口述题",
      "answer": "很多动画场景中，这两类属性可由合成器更新，减少布局和绘制，但效果取决于浏览器与页面实现。用性能工具验证主线程开销，避免给大量元素长期设置 will-change。尊重 `prefers-reduced-motion`。"
    },
    {
      "id": "086",
      "title": "模态框做可访问性要注意什么？",
      "featured": false,
      "topic": "css",
      "kind": "口述题",
      "answer": "打开后焦点进入弹窗，Tab 在模态内容内循环，关闭后通常归还触发按钮。为对话框提供可访问名称，并支持适当的 Escape 交互。原生 dialog 可通过 `showModal` 让外围内容不可交互，仍应检查焦点和阅读体验。 [WAI ARIA 模态对话框模式](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)"
    },
    {
      "id": "087",
      "title": "Canvas 与 SVG 怎么选？",
      "featured": false,
      "topic": "css",
      "kind": "口述题",
      "answer": "SVG 用向量和 DOM 节点表达，适合图标、规模适中的交互图。Canvas 用像素画布，适合大量元素或高频绘制，点击命中与无障碍需要应用额外处理。高清 Canvas 常需要按设备像素比设计绘制缓冲区，并平衡显存开销。"
    },
    {
      "id": "088",
      "title": "any、unknown、never、void 有什么区别？",
      "featured": true,
      "topic": "typescript",
      "kind": "口述题",
      "answer": "any 放宽类型检查。unknown 能承接未知输入，使用前通常先缩小类型。never 表示无可能值，可用于抛错函数和穷尽检查。void 常表示调用方不依赖返回值，和显式声明返回 undefined 含义不同。 [TypeScript 函数类型](https://www.typescriptlang.org/docs/handbook/2/functions.html)"
    },
    {
      "id": "089",
      "title": "interface 和 type 怎么选？",
      "featured": true,
      "topic": "typescript",
      "kind": "口述题",
      "answer": "两者都能表达对象结构。interface 支持声明合并和 extends。type 可命名联合、交叉、元组及类型计算结果。接口扩展时成员要满足兼容性，交叉冲突属性可能收窄成 never。"
    },
    {
      "id": "090",
      "title": "什么是类型收窄和判别联合？",
      "featured": true,
      "topic": "typescript",
      "kind": "口述题",
      "answer": "TypeScript 根据 `typeof`、等值判断、`in` 等控制流信息缩小联合类型。判别联合让每个分支都有同名而值不同的字面量字段。例如加载状态用 status 区分 loading、success、error，再通过 switch 访问对应字段。用 never 检查遗漏分支。 [TypeScript Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)"
    },
    {
      "id": "091",
      "title": "泛型和泛型约束有什么价值？",
      "featured": false,
      "topic": "typescript",
      "kind": "口述题",
      "answer": "泛型保留输入之间、输入与输出之间的类型关系。取属性时用 `K extends keyof T` 限制键，返回 `T[K]` 能保留特定键的值类型。设计泛型时，参数应表达对调用方真正有用的关系。"
    },
    {
      "id": "092",
      "title": "keyof、typeof、索引访问类型怎么用？",
      "featured": false,
      "topic": "typescript",
      "kind": "口述题",
      "answer": "`keyof T` 得到属性键的联合。在类型位置使用 `typeof config` 得到现有值的类型。`T[K]` 访问属性类型。例如 `typeof options[number]` 可以从数组或元组类型获取元素类型。"
    },
    {
      "id": "093",
      "title": "映射类型、条件类型和 infer 是什么？",
      "featured": false,
      "topic": "typescript",
      "kind": "口述题",
      "answer": "映射类型按键生成新类型，条件类型以 `T extends U ? X : Y` 做类型选择，infer 在模式中提取类型，例如从 `() => infer R` 提取返回值。裸类型参数上的条件类型通常对联合分发，用元组包装判断两端可避免分发。 [TypeScript 条件类型](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)"
    },
    {
      "id": "094",
      "title": "常用工具类型有哪些？",
      "featured": true,
      "topic": "typescript",
      "kind": "口述题",
      "answer": "`Partial`、`Required`、`Readonly` 修改第一层属性修饰符。`Pick`、`Omit` 选择对象字段。`Exclude`、`Extract` 过滤联合。`Record` 表达键到值的映射。`ReturnType` 提取函数返回类型，`Awaited` 描述等待后得到的类型。 [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)"
    },
    {
      "id": "095",
      "title": "as、as const、satisfies 怎么选？",
      "featured": false,
      "topic": "typescript",
      "kind": "口述题",
      "answer": "`as` 提供编译期断言。`as const` 让字面量保留更窄的字面量类型，给对象字面量属性加 readonly，并把数组字面量推成只读元组。`satisfies` 验证表达式符合约束，同时保留表达式的具体推断信息。运行时 API 数据需要真实校验。 [TypeScript satisfies](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator)"
    },
    {
      "id": "096",
      "title": "可选属性与 string | undefined 有什么区别？",
      "featured": false,
      "topic": "typescript",
      "kind": "口述题",
      "answer": "`name?: string` 允许属性不存在。`name: string | undefined` 要求属性存在，但值可以是 undefined。`exactOptionalPropertyTypes` 开启后，显式设置 undefined 通常要求把它纳入声明。序列化、对象合并和 in 运算符都可能观察到缺失与存在的差异。 [TypeScript exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig/exactOptionalPropertyTypes.html)"
    },
    {
      "id": "097",
      "title": "JS 已经能运行，为什么还要校验接口数据？",
      "featured": false,
      "topic": "typescript",
      "kind": "口述题",
      "answer": "类型声明在多数编译产物中被擦除，服务端真实响应可能不符合声明。把外部数据视为 unknown，在 API 边界校验结构和关键业务约束，并给异常结构可观测的错误路径。"
    },
    {
      "id": "098",
      "title": "overload 与联合参数怎么选？",
      "featured": false,
      "topic": "typescript",
      "kind": "口述题",
      "answer": "相同处理逻辑和返回类型通常用联合参数，维护成本低。输入与输出类型之间有明确映射时，重载或泛型更便于调用方推断。重载签名应覆盖有效调用，公开调用以重载签名为准，具体实现处理各分支。"
    },
    {
      "id": "099",
      "title": "如何设计类型安全的异步请求结果？",
      "featured": false,
      "topic": "typescript",
      "kind": "口述题",
      "answer": "用判别联合区分成功、网络错误、业务错误或校验错误。例如成功分支 `{ ok: true, data: T }`，失败分支 `{ ok: false, error: RequestError }`。在边界解析 unknown，内部依赖已校验类型。状态值允许调用方按需展示重试、重新登录或字段错误。"
    },
    {
      "id": "100",
      "title": "React 的 render 和 commit 有何区别？",
      "featured": true,
      "topic": "react",
      "kind": "口述题",
      "answer": "Render 计算 UI 应该是什么，组件应保持纯净，框架可以重试或丢弃其结果。Commit 将选定结果应用到宿主界面和相关 ref，再执行对应阶段的副作用。DOM 是否变化取决于前后计算结果。 [React Render and Commit](https://react.dev/learn/render-and-commit)"
    },
    {
      "id": "101",
      "title": "为什么 setState 后读到旧值？",
      "featured": true,
      "topic": "react",
      "kind": "口述题",
      "answer": "组件一次渲染有自己的状态快照。setter 排队请求下次渲染，当前回调捕获的值仍属于此次渲染。依赖前一值时用 `setCount(c => c + 1)`。以 count 为 0 时，连续三次 `setCount(count + 1)` 通常得到 1，连续三次函数式更新得到 3。 [React 状态快照](https://react.dev/learn/state-as-a-snapshot) · [批量状态更新](https://react.dev/learn/queueing-a-series-of-state-updates)"
    },
    {
      "id": "102",
      "title": "React 列表为什么需要稳定的 key？",
      "featured": true,
      "topic": "react",
      "kind": "口述题",
      "answer": "同一父节点下，key 帮助匹配前后渲染中对应的子项，并参与组件状态身份判定。用索引作 key 时，插入、删除或排序可能让输入值或局部状态附着到另一条数据。稳定业务 ID 通常合适。主动改变 key 可重置子树状态。 [React 保留与重置状态](https://react.dev/learn/preserving-and-resetting-state)"
    },
    {
      "id": "103",
      "title": "useEffect 的用途、依赖和清理是什么？",
      "featured": true,
      "topic": "react",
      "kind": "口述题",
      "answer": "Effect 用于与外部系统同步，如订阅、计时器和第三方控件。依赖中列出 effect 读取的响应式值。变化时先清理旧同步，再建立新同步，卸载时清理。开发环境 Strict Mode 可能额外执行 setup 和 cleanup 来检查对称性。可由 props 和 state 直接计算的数据通常在 render 推导。 [React useEffect](https://react.dev/reference/react/useEffect)"
    },
    {
      "id": "104",
      "title": "useEffect 与 useLayoutEffect 有何区别？",
      "featured": false,
      "topic": "react",
      "kind": "口述题",
      "answer": "`useLayoutEffect` 的工作通常在浏览器绘制前执行，会阻塞绘制，适用于测量元素后立即更新位置。`useEffect` 一般用于普通外部同步，具体执行相对绘制的时序受交互和调度影响。 [React useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)"
    },
    {
      "id": "105",
      "title": "什么是 Hook 的陈旧闭包？",
      "featured": false,
      "topic": "react",
      "kind": "口述题",
      "answer": "延迟执行的回调会读取创建它那一轮渲染的值。持续订阅时按真实依赖重建或选用合适的读取方式。只依赖前一状态的更新用函数式 setter。诊断时明确当初捕获的值与触发后应读取的值。"
    },
    {
      "id": "106",
      "title": "memo、useMemo、useCallback 有什么区别？",
      "featured": true,
      "topic": "react",
      "kind": "口述题",
      "answer": "memo 可帮助跳过 props 稳定的组件渲染。useMemo 缓存计算结果，useCallback 缓存函数引用。状态和 Context 更新仍可触发组件渲染，新的对象或函数 props 也可能打破默认浅比较。先用 Profiler 找到开销，再核算缓存收益。 [React memo](https://react.dev/reference/react/memo) · [useMemo](https://react.dev/reference/react/useMemo)"
    },
    {
      "id": "107",
      "title": "useRef 与 useState 的区别是什么？",
      "featured": false,
      "topic": "react",
      "kind": "口述题",
      "answer": "ref 保持可变容器，适合 DOM 引用、计时器句柄和无需渲染的数据。改 `ref.current` 不会请求渲染。影响 UI 的值用 state。常规场景在事件或 effect 更新 ref，保持 render 纯度。 [React useRef](https://react.dev/reference/react/useRef)"
    },
    {
      "id": "108",
      "title": "受控和非受控表单怎么选？",
      "featured": false,
      "topic": "react",
      "kind": "口述题",
      "answer": "受控输入以应用状态为来源，用 value 和 onChange 同步，适合联动验证和跨控件逻辑。非受控由 DOM 保存当前值，用 defaultValue 初始化，并在需要时读取。大量输入要考虑订阅粒度，避免每次打字重渲染整张表单。 [React input](https://react.dev/reference/react-dom/components/input)"
    },
    {
      "id": "109",
      "title": "Context、全局 store 和请求缓存如何分工？",
      "featured": false,
      "topic": "react",
      "kind": "口述题",
      "answer": "低频共享配置可用 Context，例如主题。复杂客户端业务状态可用支持细粒度订阅的 store。来自服务器且要处理新鲜度、复用、刷新和失效的数据，可交给查询缓存。先明确每项状态唯一的所有者，避免手工同步多份副本。"
    },
    {
      "id": "110",
      "title": "Fiber 和并发渲染解决了什么问题？",
      "featured": false,
      "topic": "react",
      "kind": "口述题",
      "answer": "Fiber 是 React 表示和推进渲染工作的内部结构。并发能力使部分渲染工作可中断、重启或按优先级让路。用 transition 标记可延后的状态更新，例如输入后昂贵的列表刷新，输入框自身要保持紧急更新。副作用放在合适的提交相关阶段。 [React useTransition](https://react.dev/reference/react/useTransition)"
    },
    {
      "id": "111",
      "title": "Suspense 与 Error Boundary 各处理什么？",
      "featured": false,
      "topic": "react",
      "kind": "口述题",
      "answer": "Suspense 为会挂起的子树显示 fallback，例如 lazy 组件或框架支持的数据读取。Error Boundary 为后代渲染异常提供替代 UI 和记录入口。事件回调或普通异步回调的失败由相应调用路径处理。 [React Suspense](https://react.dev/reference/react/Suspense) · [Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)"
    },
    {
      "id": "112",
      "title": "水合是什么？如何定位 hydration mismatch？",
      "featured": true,
      "topic": "react",
      "kind": "口述题",
      "answer": "客户端将 React 连接到服务端已有 HTML，预期首次渲染输出相符。检查日期与随机数、地区时区、客户端专属数据、无效 HTML 嵌套以及服务端状态注入。让首屏共享确定性输入，浏览器专属信息可在水合后更新。 [React hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)"
    },
    {
      "id": "113",
      "title": "Server Component 与 SSR 有什么关系？",
      "featured": false,
      "topic": "react",
      "kind": "口述题",
      "answer": "Server Component 在服务侧执行并产生可交给 React 的结果，客户端无需下载它的组件实现。SSR 将界面输出为 HTML 以支持首屏。二者可在同一页面配合，客户端组件仍可参与服务端生成初始 HTML，随后获得交互。组件边界还要考虑可序列化数据和敏感字段。 [Next.js Server 和 Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)"
    },
    {
      "id": "114",
      "title": "Vue 2 与 Vue 3 的响应式机制区别是什么？",
      "featured": true,
      "topic": "vue",
      "kind": "口述题",
      "answer": "Vue 2 常用属性 getter/setter 和数组方法拦截，新增属性或部分直接数组操作需要特别处理。Vue 3 将对象包装为 Proxy，能够跟踪读取、写入和键迭代等操作。ref 则以 `.value` 提供可追踪的访问点。 [Vue 响应式原理](https://vuejs.org/guide/extras/reactivity-in-depth.html)"
    },
    {
      "id": "115",
      "title": "ref 和 reactive 怎么选？",
      "featured": true,
      "topic": "vue",
      "kind": "口述题",
      "answer": "ref 可包裹原始值和对象，脚本中通过 value 访问。reactive 接受对象并返回代理。直接解构 reactive 对象的原始属性会失去对该属性绑定的跟踪，需保持对象访问或用 `toRefs`。大对象仅需跟踪替换时可考虑 shallowRef。 [Vue 响应式基础](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)"
    },
    {
      "id": "116",
      "title": "computed、watch、watchEffect 怎么选？",
      "featured": true,
      "topic": "vue",
      "kind": "口述题",
      "answer": "computed 表示派生值，按响应式依赖缓存。watch 明确指定来源，适合在变化时触发请求或同步外部状态。watchEffect 自动追踪同步执行时读取的依赖，在 async 回调里第一次 await 后的读取不参与这次自动追踪。 [Vue Computed](https://vuejs.org/guide/essentials/computed.html) · [Watchers](https://vuejs.org/guide/essentials/watchers.html)"
    },
    {
      "id": "117",
      "title": "nextTick 什么时候用？",
      "featured": true,
      "topic": "vue",
      "kind": "口述题",
      "answer": "Vue 将同一轮多次响应式变更批量安排到后续更新。修改状态后要读取更新后的 DOM，可以 await nextTick。若在 watcher 回调内依赖组件更新后的 DOM，也可按需求设置 `flush: 'post'`。 [Vue DOM 更新时机](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#dom-update-timing)"
    },
    {
      "id": "118",
      "title": "v-if 与 v-show 怎么选？",
      "featured": true,
      "topic": "vue",
      "kind": "口述题",
      "answer": "v-if 条件为假时不渲染对应分支，切换会创建或销毁子树。v-show 保留节点并切换 display。经常切换且初始渲染成本可接受时用 v-show，必须延迟创建或释放组件资源时用 v-if。 [Vue 条件渲染](https://vuejs.org/guide/essentials/conditional.html)"
    },
    {
      "id": "119",
      "title": "v-for 与 v-if 同时写在一个元素会怎样？",
      "featured": false,
      "topic": "vue",
      "kind": "口述题",
      "answer": "Vue 3 中 v-if 优先，条件可能无法访问 v-for 的局部变量。过滤列表时用 computed 生成结果。按项判断时在 `<template v-for>` 内部写条件，并给循环的 template 稳定 key。 [Vue 列表渲染](https://vuejs.org/guide/essentials/list.html#v-for-with-v-if)"
    },
    {
      "id": "120",
      "title": "Vue 组件通信有哪些方式？",
      "featured": true,
      "topic": "vue",
      "kind": "口述题",
      "answer": "父到子用 props，子到父用 emits。跨层共享组件上下文可用 provide/inject，跨领域的应用状态可用 Pinia 等方案。父组件控制组件状态时可用 v-model 对应的 prop 与更新事件。组件 ref 适合少量命令式调用。"
    },
    {
      "id": "121",
      "title": "Vue 3 自定义组件的 v-model 是什么原理？",
      "featured": false,
      "topic": "vue",
      "kind": "口述题",
      "answer": "默认对应 `modelValue` 和 `update:modelValue`，命名参数对应相应的 prop 和事件。子组件接收父级值并在用户操作时通知父级。组件可以用 `defineModel` 声明模型，支持相应的修饰符用法。 [Vue 组件 v-model](https://vuejs.org/guide/components/v-model.html)"
    },
    {
      "id": "122",
      "title": "插槽与作用域插槽如何理解？",
      "featured": false,
      "topic": "vue",
      "kind": "口述题",
      "answer": "插槽由父级提供模板，子级决定渲染位置。作用域插槽允许子级通过 slot props 提供局部数据，例如表格把当前行交给自定义单元格渲染。父级模板仍可读自己的作用域。 [Vue Slots](https://vuejs.org/guide/components/slots.html)"
    },
    {
      "id": "123",
      "title": "KeepAlive 会触发卸载吗？",
      "featured": false,
      "topic": "vue",
      "kind": "口述题",
      "answer": "被缓存组件离开显示位置时通常进入停用状态，重新显示时激活，可用 onActivated、onDeactivated 处理轮询和订阅。缓存淘汰或外层卸载时仍可能真正卸载。路由复用也应单独考虑参数变化。 [Vue KeepAlive](https://vuejs.org/guide/built-ins/keep-alive.html)"
    },
    {
      "id": "124",
      "title": "Vue 3 如何优化虚拟 DOM？",
      "featured": false,
      "topic": "vue",
      "kind": "口述题",
      "answer": "编译器可识别静态部分，并以 Patch Flag 标记节点的动态更新类型。区块可以记录动态后代，减少更新时的遍历。列表仍需稳定 key，首选通过真实性能记录确定优化重点。 [Vue 渲染机制](https://vuejs.org/guide/extras/rendering-mechanism.html)"
    },
    {
      "id": "125",
      "title": "Composition API 和 Options API 如何选？",
      "featured": false,
      "topic": "vue",
      "kind": "口述题",
      "answer": "Composition API 允许按功能聚合响应式状态、副作用和方法，复杂交互可提取为 composable。Options API 按选项分类，结构简单时易于阅读。对于共享逻辑，明确 composable 的输入、清理和每次调用的状态所有权。"
    },
    {
      "id": "126",
      "title": "Vue Router 守卫、Pinia 与服务端权限如何分工？",
      "featured": false,
      "topic": "vue",
      "kind": "口述题",
      "answer": "路由守卫负责导航前的登录检查与跳转体验。Pinia 持有客户端会话和菜单状态。服务端负责接口认证和逐资源授权。刷新时并行加载必要的登录与导航信息，并为权限变化或过期会话处理 401、403。"
    },
    {
      "id": "127",
      "title": "Vite 和 webpack 的核心思路有何区别？",
      "featured": true,
      "topic": "tooling",
      "kind": "口述题",
      "answer": "Vite 开发模式利用浏览器 ESM 及按需转换，并为依赖提供预打包等能力。webpack 的典型模式从入口构建模块图并产出 bundle，也提供增量构建和 HMR。生产方案和底层工具随版本变化，选型看团队插件链、冷启动、热更新和产物数据。 [Vite 背景](https://vite.dev/guide/why) · [webpack 概念](https://webpack.js.org/concepts/)"
    },
    {
      "id": "128",
      "title": "webpack loader 和 plugin 有何不同？",
      "featured": false,
      "topic": "tooling",
      "kind": "口述题",
      "answer": "Loader 处理模块内容，例如把 Sass 转成 CSS。Plugin 通过构建生命周期访问编译过程，用于产物生成、分析或发布集成。诊断时先确定问题出在单模块转换还是全局构建阶段。 [webpack Loaders](https://webpack.js.org/concepts/loaders/) · [Plugins](https://webpack.js.org/concepts/plugins/)"
    },
    {
      "id": "129",
      "title": "Tree shaking 需要哪些条件？",
      "featured": true,
      "topic": "tooling",
      "kind": "口述题",
      "answer": "静态 ESM 导入导出帮助工具判断未使用代码。工具还要考虑模块副作用、重新导出和纯度标记，结合生产优化去掉死代码。声明 `sideEffects: false` 前要确认 CSS 导入、polyfill 或注册代码等副作用是否需要保留。 [webpack Tree Shaking](https://webpack.js.org/guides/tree-shaking/)"
    },
    {
      "id": "130",
      "title": "代码分割与懒加载怎么做？",
      "featured": false,
      "topic": "tooling",
      "kind": "口述题",
      "answer": "按路由和明显的需求边界用动态 import 拆包，例如用户打开的富文本编辑器。检查低速网络下的请求瀑布、初始化和错误提示。公共依赖拆分要权衡复用、缓存和额外请求，以首屏产物及使用路径验证。"
    },
    {
      "id": "131",
      "title": "Babel、TypeScript 编译和 polyfill 分别做什么？",
      "featured": false,
      "topic": "tooling",
      "kind": "口述题",
      "answer": "语法转换解决目标环境能否解析代码。polyfill 补齐可模拟的运行时能力。TypeScript 的类型检查发现静态类型问题，许多工具只转译 TS，因此 CI 仍要独立运行类型检查。浏览器支持范围应体现在目标配置与真实测试中。"
    },
    {
      "id": "132",
      "title": "source map 为什么要分环境处理？",
      "featured": false,
      "topic": "tooling",
      "kind": "口述题",
      "answer": "source map 将压缩后的栈定位到原源码。线上可按构建 ID 将 map 上传到受控监控服务，避免公开部署带源码的 map。核对上传版本与 CDN 实际产物，确保错误可准确还原。"
    },
    {
      "id": "133",
      "title": "lockfile、npm ci、SemVer 如何配合？",
      "featured": false,
      "topic": "tooling",
      "kind": "口述题",
      "answer": "SemVer 范围描述允许更新的版本，锁文件记录实际解析结果。`npm ci` 用于基于已有锁文件做干净安装，清单与锁文件不兼容时失败。固定 Node、包管理器版本与必要的安装选项，有助于重现构建。 [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/) · [SemVer](https://semver.org/)"
    },
    {
      "id": "134",
      "title": "Monorepo 有什么优缺点？",
      "featured": false,
      "topic": "tooling",
      "kind": "口述题",
      "answer": "共享包使用统一工具链和原子提交，跨应用重构更容易。维护成本包括任务依赖、构建规模、包所有权和发布边界。通过工作区依赖声明、按变更构建及缓存提升速度，包之间依靠明确公开接口。"
    },
    {
      "id": "135",
      "title": "微前端什么时候值得用？",
      "featured": false,
      "topic": "tooling",
      "kind": "口述题",
      "answer": "多个团队确实需要独立交付，且产品仍须统一导航与集成时，可以考虑微前端。成本包括路由和样式隔离、版本协调、重复依赖、统一认证、加载性能和故障定位。先对比模块化单体能否满足协作与发布要求。"
    },
    {
      "id": "136",
      "title": "单元、集成和端到端测试如何分工？",
      "featured": true,
      "topic": "tooling",
      "kind": "口述题",
      "answer": "单元测试验证纯逻辑和边界，集成测试验证组件与状态、路由或 API 交互，端到端覆盖真实浏览器中的关键业务路径。用独立账号、稳定测试数据和语义定位减少不稳定。针对回归，新增能在修复前失败的用例。 [Playwright 最佳实践](https://playwright.dev/docs/best-practices)"
    },
    {
      "id": "137",
      "title": "CI/CD 流水线如何设计？",
      "featured": false,
      "topic": "tooling",
      "kind": "口述题",
      "answer": "提交后运行类型、静态检查和测试，构建一次生成可追踪产物，部署到预览或候选环境，执行冒烟检查后灰度。把前端 build ID 与监控关联，准备回滚及接口兼容窗口。公开构建变量按客户端可读数据处理。"
    },
    {
      "id": "138",
      "title": "Git merge、rebase 和 revert 如何选？",
      "featured": false,
      "topic": "tooling",
      "kind": "口述题",
      "answer": "merge 合并并保留分支历史，rebase 重放提交并改写其身份，通常用于自己的分支整理。已共享的分支上可用 revert 创建反向提交，保留可审计历史。解决冲突后验证最终行为并跑相关测试。 [Git merge](https://git-scm.com/docs/git-merge) · [rebase](https://git-scm.com/docs/git-rebase) · [revert](https://git-scm.com/docs/git-revert)"
    },
    {
      "id": "139",
      "title": "如何发布可升级的组件库？",
      "featured": false,
      "topic": "tooling",
      "kind": "口述题",
      "answer": "先定义公开 API、主题令牌、无障碍行为和变更规则。输出宿主可消费的代码与类型，将框架等共享依赖按需要声明为 peer dependency。用示例和关键交互测试覆盖消费入口。破坏性变更给迁移路径，并用独立项目验证发布包。"
    },
    {
      "id": "140",
      "title": "LCP、INP、CLS 分别是什么？",
      "featured": true,
      "topic": "performance",
      "kind": "口述题",
      "answer": "LCP 衡量视口内最大合格图片或文本块等候选内容的渲染时间。INP 衡量页面对交互的响应延迟。CLS 衡量意外布局位移。良好阈值分别为 LCP ≤ 2.5 s、INP ≤ 200 ms、CLS ≤ 0.1。按页面体验的第 75 百分位判断，并分别关注移动端和桌面端。 [Web Vitals](https://web.dev/articles/vitals)"
    },
    {
      "id": "141",
      "title": "如何优化首屏 LCP？",
      "featured": true,
      "topic": "performance",
      "kind": "口述题",
      "answer": "先找 LCP 元素并拆解 TTFB、资源加载延迟、资源传输和元素渲染延迟。图片类 LCP 应尽早可发现，可用适量优先级提示，选合适尺寸和格式，避免首屏关键图懒加载。若 JS 或 CSS 推迟显示，找出阻塞依赖并缩短关键路径。 [优化 LCP](https://web.dev/articles/optimize-lcp)"
    },
    {
      "id": "142",
      "title": "INP 差该怎么排查？",
      "featured": true,
      "topic": "performance",
      "kind": "口述题",
      "answer": "从真实用户归因找慢交互，再用 Performance 定位输入等待、事件处理和呈现延迟。拆分长任务，缩减同步计算和重渲染，避免布局抖动。计算可转移到 Worker 时，再比较消息开销。 [优化 INP](https://web.dev/articles/optimize-inp)"
    },
    {
      "id": "143",
      "title": "如何降低 CLS？",
      "featured": false,
      "topic": "performance",
      "kind": "口述题",
      "answer": "给图片、视频和广告预留空间，避免在用户正在阅读的内容上方插入未占位内容，降低字体替换引起的尺寸变化。诊断时查看布局偏移记录并分析加载后交互阶段。 [优化 CLS](https://web.dev/articles/optimize-cls)"
    },
    {
      "id": "144",
      "title": "preload、prefetch、preconnect 如何区分？",
      "featured": false,
      "topic": "performance",
      "kind": "口述题",
      "answer": "preload 提示尽早取当前导航需要的资源，匹配资源类型和跨源配置。`prefetch` 提示为未来可能的访问做准备。`preconnect` 提前建立与指定源的连接。合理限制数量，并检查实际优先级、重复请求和连接是否被使用。 [HTML Link 类型](https://html.spec.whatwg.org/multipage/links.html#linkTypes)"
    },
    {
      "id": "145",
      "title": "大列表怎么做虚拟化？",
      "featured": false,
      "topic": "performance",
      "kind": "口述题",
      "answer": "只渲染可见区加少量缓冲，用占位空间模拟完整高度。定高项可以用滚动偏移直接算索引，变高项要测量并缓存高度，处理滚动锚定。验证键盘导航、焦点保持、滚动性能及返回列表位置。"
    },
    {
      "id": "146",
      "title": "如何优化图片和字体？",
      "featured": false,
      "topic": "performance",
      "kind": "口述题",
      "answer": "图片用合适尺寸和压缩，依据浏览器能力选择 WebP、AVIF 或回退格式，非首屏可延迟加载。字体按字重或字符子集裁剪，选择合适的 font-display 和回退字体度量。用实际传输量、布局位移和 LCP 验证。"
    },
    {
      "id": "147",
      "title": "JS 包很大，怎么找到主要原因？",
      "featured": false,
      "topic": "performance",
      "kind": "口述题",
      "answer": "查看产物分析图、初始路由的 chunk、重复依赖和 DevTools Coverage。区分压缩体积、解压体积和解析执行成本。针对大且使用较少的依赖，按功能拆包、缩小导入范围或替换实现，避免只优化总文件数。"
    },
    {
      "id": "148",
      "title": "白屏怎么做监控和定位？",
      "featured": true,
      "topic": "performance",
      "kind": "口述题",
      "answer": "用与页面框架独立的关键启动信号检测入口是否启动，结合 JS 错误、资源加载、未处理拒绝、路由和 API 状态诊断。关联构建版本、浏览器及采样时间，排查 chunk 404、脚本 MIME、兼容性和服务异常。防止首次上报脚本与业务一起失效。"
    },
    {
      "id": "149",
      "title": "RUM、合成监控和本地性能工具各看什么？",
      "featured": false,
      "topic": "performance",
      "kind": "口述题",
      "answer": "RUM 观察真实用户分布和设备、网络差异。合成监控用可控环境持续观察回归。DevTools 本地录制用于确认因果。用分位数和分组看指标，保持优化前后的页面、实验条件和流量口径可比。"
    },
    {
      "id": "150",
      "title": "性能监控如何关联 API 和浏览器渲染？",
      "featured": false,
      "topic": "performance",
      "kind": "口述题",
      "answer": "前端用 Navigation Timing、Resource Timing 和 PerformanceObserver 采集，服务端可通过 Server-Timing 暴露适合分享的耗时。用请求标识关联日志。跨源资源部分时间数据受 Timing-Allow-Origin 控制。 [Resource Timing](https://www.w3.org/TR/resource-timing/) · [Server Timing](https://www.w3.org/TR/server-timing/)"
    },
    {
      "id": "151",
      "title": "如何排查线上接口慢？",
      "featured": false,
      "topic": "performance",
      "kind": "口述题",
      "answer": "先用 Timing 区分排队、连接、首字节和下载，再用请求标识追查网关和上游耗时。核对失败率、状态码、重试放大和是否只有某网络或地区受影响。若接口已经返回但页面仍无响应，再追主线程及框架提交。"
    },
    {
      "id": "152",
      "title": "如何向面试官证明性能优化有效？",
      "featured": false,
      "topic": "performance",
      "kind": "口述题",
      "answer": "说明初始问题、受影响页面及用户、改动和具体验证。示例表达为「同地区同设备分组，灰度期间比较 P75 LCP 及失败率，并用性能记录确认关键图开始加载更早」。给出真实数据或诚实描述可见证据及归因限制。"
    },
    {
      "id": "153",
      "title": "同源策略与同站判断有什么区别？",
      "featured": true,
      "topic": "security",
      "kind": "口述题",
      "answer": "源由协议、主机和端口定义。同源策略约束不同源之间对数据或 DOM 的访问。现代 Cookie 的同站判断通常看协议与可注册域，端口变化可以不同源但仍同站。排查跨子域登录时分别检查同源、同站、Cookie 域和发送条件。 [HTML Origin](https://html.spec.whatwg.org/multipage/browsers.html#concept-origin) · [Fetch 标准](https://fetch.spec.whatwg.org/)"
    },
    {
      "id": "154",
      "title": "CORS 和预检怎么工作？",
      "featured": true,
      "topic": "security",
      "kind": "口述题",
      "answer": "浏览器用 CORS 决定是否向脚本暴露跨源响应。请求方法或头部超出安全列表时，通常先发 OPTIONS 预检，核对允许的源、方法和头后再发实际请求。例如跨源 JSON POST 常触发预检。带凭据时，客户端设置相应 credentials，服务端返回明确允许的源与 `Access-Control-Allow-Credentials: true`，允许源不能用通配符。Cookie 仍受 SameSite 等规则约束。 [Fetch CORS 协议](https://fetch.spec.whatwg.org/#http-cors-protocol)"
    },
    {
      "id": "155",
      "title": "XSS 为什么发生？如何防护？",
      "featured": true,
      "topic": "security",
      "kind": "口述题",
      "answer": "应用将不可信数据当作可执行页面内容处理时会有 XSS 风险。按输出上下文编码，文本优先用安全的文本 API，业务确实要渲染富文本时使用可靠的消毒器，并约束 URL 协议和自定义 HTML 入口。CSP 可作为额外保护。 [OWASP XSS 防护](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)"
    },
    {
      "id": "156",
      "title": "CSRF 的原理与防御是什么？",
      "featured": true,
      "topic": "security",
      "kind": "口述题",
      "answer": "攻击利用浏览器可能随请求自动携带会话凭据，使已登录用户的浏览器触发非预期操作。防护包括 CSRF token、校验 Origin、SameSite Cookie，并让状态变更使用适当方法。CORS 约束响应可读性，部分跨源请求仍可发送。 [OWASP CSRF 防护](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) · [Fetch 标准](https://fetch.spec.whatwg.org/)"
    },
    {
      "id": "157",
      "title": "Cookie 的安全属性分别做什么？",
      "featured": false,
      "topic": "security",
      "kind": "口述题",
      "answer": "Secure 限制 Cookie 在安全连接上发送。HttpOnly 限制脚本通过 Cookie API 读取。SameSite 控制跨站发送场景，`None` 通常要求 Secure。省略 Domain 可限制为当前主机。Path 限制发送路径，应用的授权应由后端实现。 [HTTP Cookie 规范工作稿](https://httpwg.org/http-extensions/draft-ietf-httpbis-rfc6265bis.html)"
    },
    {
      "id": "158",
      "title": "CSP、SRI 和 frame-ancestors 如何分工？",
      "featured": false,
      "topic": "security",
      "kind": "口述题",
      "answer": "CSP 用指令限制脚本等资源来源，脚本可以通过 nonce 或 hash 授权。SRI 用声明的摘要校验外部资源内容。CSP 的 frame-ancestors 限制哪些页面能嵌入当前页面，减少点击劫持风险。上线 CSP 可先收集 Report-Only 反馈再逐步启用。 [CSP Level 3](https://www.w3.org/TR/CSP3/) · [SRI](https://www.w3.org/TR/SRI/)"
    },
    {
      "id": "159",
      "title": "Session、JWT 和刷新令牌分别是什么？",
      "featured": true,
      "topic": "security",
      "kind": "口述题",
      "answer": "会话 ID 对应服务器侧会话，服务端可快速撤销。签名 JWT 将声明携带在令牌中，接收端要验证签名、有效期、颁发者、受众等，载荷通常可以被读取。短期访问凭据配合刷新令牌有助于续期，设计时要考虑轮换、撤销和多端会话。 [JWT RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html) · [OAuth 安全最佳实践](https://www.rfc-editor.org/rfc/rfc9700.html)"
    },
    {
      "id": "160",
      "title": "OAuth 2.0、OIDC 和 PKCE 是什么？",
      "featured": false,
      "topic": "security",
      "kind": "口述题",
      "answer": "OAuth 2.0 解决授权，OIDC 在其上增加身份认证和 ID Token。授权码流程中，PKCE 用临时 verifier 及其 challenge 将授权请求与后续兑换关联。客户端仍需按所用流程处理重定向 URI、请求关联和令牌校验。 [OAuth 安全最佳实践](https://www.rfc-editor.org/rfc/rfc9700.html) · [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html)"
    },
    {
      "id": "161",
      "title": "只靠按钮隐藏和动态路由可以做权限控制吗？",
      "featured": false,
      "topic": "security",
      "kind": "口述题",
      "answer": "前端用路由、菜单和按钮状态表达用户能完成的操作。服务端对每次请求独立验证身份、资源与租户权限。页面要正确处理权限过期、直接访问、接口返回 403 和已加载数据失效。 [OWASP 授权指南](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)"
    },
    {
      "id": "162",
      "title": "前端如何减少凭据与隐私数据泄露？",
      "featured": false,
      "topic": "security",
      "kind": "口述题",
      "answer": "敏感密钥保存在服务端，日志和埋点过滤地址、令牌、表单值等敏感内容。避免让机密参数进入 URL、错误堆栈或第三方脚本可读取的数据。限制第三方依赖权限与来源，并对会话凭据的寿命和存储方式作明确设计。 [OWASP 日志指南](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)"
    },
    {
      "id": "163",
      "title": "手写尾沿防抖",
      "featured": true,
      "topic": "coding",
      "kind": "手写题",
      "answer": "连续调用时重置等待期，停止调用后执行最后一次。保留参数和 `this`，组件卸载时可以取消。\n\n```js\nfunction debounce(fn, delay) {\n  let timer\n  function wrapped(...args) {\n    clearTimeout(timer)\n    timer = setTimeout(() => {\n      timer = undefined\n      fn.apply(this, args)\n    }, delay)\n  }\n  wrapped.cancel = () => {\n    clearTimeout(timer)\n    timer = undefined\n  }\n  return wrapped\n}\n```"
    },
    {
      "id": "164",
      "title": "手写首沿节流",
      "featured": true,
      "topic": "coding",
      "kind": "手写题",
      "answer": "第一次立即执行，时间窗口内忽略后续调用。需要确保最终位置被处理时，可以增加尾沿调用，或按帧调度视觉更新。\n\n```js\nfunction throttle(fn, delay) {\n  let previous = -Infinity\n  return function (...args) {\n    const now = performance.now()\n    if (now - previous < delay) return\n    previous = now\n    return fn.apply(this, args)\n  }\n}\n```"
    },
    {
      "id": "165",
      "title": "手写 Promise.all",
      "featured": true,
      "topic": "coding",
      "kind": "手写题",
      "answer": "接受可迭代输入，保留结果顺序，空输入立即兑现。遭遇拒绝后，已启动的任务仍可能继续。\n\n```js\nfunction promiseAll(iterable) {\n  return new Promise((resolve, reject) => {\n    const results = []\n    let remaining = 1\n    let index = 0\n    for (const value of iterable) {\n      const current = index++\n      remaining++\n      Promise.resolve(value).then(result => {\n        results[current] = result\n        if (--remaining === 0) resolve(results)\n      }, reject)\n    }\n    if (--remaining === 0) resolve(results)\n  })\n}\n```\n\n这是面试实现。完整原生语义还涉及构造器泛化和迭代器协议的边界行为。"
    },
    {
      "id": "166",
      "title": "实现限制最大并发数的任务池",
      "featured": true,
      "topic": "coding",
      "kind": "手写题",
      "answer": "输入是延迟启动的函数数组。固定数量的 worker 逐个领取任务，下例收集每项成功或失败，结果按输入顺序排列。\n\n```js\nasync function runPool(tasks, limit) {\n  if (!Number.isInteger(limit) || limit < 1) {\n    throw new RangeError('limit must be a positive integer')\n  }\n  const results = Array(tasks.length)\n  let next = 0\n  async function worker() {\n    while (next < tasks.length) {\n      const index = next++\n      try {\n        results[index] = { status: 'fulfilled', value: await tasks[index]() }\n      } catch (reason) {\n        results[index] = { status: 'rejected', reason }\n      }\n    }\n  }\n  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker))\n  return results\n}\n```"
    },
    {
      "id": "167",
      "title": "实现带取消的发布订阅",
      "featured": true,
      "topic": "coding",
      "kind": "手写题",
      "answer": "每次订阅保存独立的注册项，返回取消函数。发布时复制订阅集合，允许监听器修改后续分发使用的集合。本例的监听器异常向调用方传播。\n\n```js\nclass EventBus {\n  events = new Map()\n\n  on(event, listener) {\n    const subscriptions = this.events.get(event) ?? new Set()\n    const subscription = { listener }\n    subscriptions.add(subscription)\n    this.events.set(event, subscriptions)\n    return () => {\n      if (!subscriptions.delete(subscription)) return\n      if (!subscriptions.size) this.events.delete(event)\n    }\n  }\n\n  emit(event, ...args) {\n    for (const { listener } of [...(this.events.get(event) ?? [])]) {\n      listener(...args)\n    }\n  }\n}\n```"
    },
    {
      "id": "168",
      "title": "实现 LRU 缓存",
      "featured": true,
      "topic": "coding",
      "kind": "手写题",
      "answer": "Map 保持插入顺序。访问时删除并重新插入，把最近使用的项移到末尾。超过容量时删最早项。以哈希 Map 的常见实现分析，读写为均摊 O(1)，空间 O(capacity)。\n\n```js\nclass LRU {\n  entries = new Map()\n\n  constructor(capacity) {\n    if (!Number.isInteger(capacity) || capacity < 0) {\n      throw new RangeError('capacity must be a non-negative integer')\n    }\n    this.capacity = capacity\n  }\n\n  get(key) {\n    if (!this.entries.has(key)) return undefined\n    const value = this.entries.get(key)\n    this.set(key, value)\n    return value\n  }\n\n  set(key, value) {\n    this.entries.delete(key)\n    this.entries.set(key, value)\n    if (this.entries.size > this.capacity) {\n      const oldest = this.entries.keys().next().value\n      this.entries.delete(oldest)\n    }\n  }\n}\n```"
    },
    {
      "id": "169",
      "title": "手写支持循环引用的深拷贝",
      "featured": true,
      "topic": "coding",
      "kind": "手写题",
      "answer": "面试前先明确范围。下例限普通对象、空原型对象和数组，递归复制自身可枚举数据属性，支持 Symbol 键、稀疏数组及循环引用。\n\n```js\nfunction cloneData(value, seen = new WeakMap()) {\n  if (value === null || typeof value !== 'object') return value\n  if (seen.has(value)) return seen.get(value)\n  const copy = Array.isArray(value)\n    ? new Array(value.length)\n    : Object.create(Object.getPrototypeOf(value))\n  seen.set(value, copy)\n  for (const key of Reflect.ownKeys(value)) {\n    const descriptor = Object.getOwnPropertyDescriptor(value, key)\n    if (!descriptor.enumerable || !('value' in descriptor)) continue\n    Object.defineProperty(copy, key, {\n      value: cloneData(descriptor.value, seen),\n      enumerable: true,\n      configurable: true,\n      writable: true\n    })\n  }\n  return copy\n}\n```\n\nWeakMap 要在遍历子项前记录源和副本。拓展到 Date、Map、Set 或 ArrayBuffer 时，分别处理其内部数据与共享引用。"
    },
    {
      "id": "170",
      "title": "手写 new、call、apply 的核心行为",
      "featured": false,
      "topic": "coding",
      "kind": "手写题",
      "answer": "下面用普通构造函数展示四步构造模型。类构造器、`new.target` 和绑定构造器等需要 `Reflect.construct` 处理。调用部分可用 `Reflect.apply` 保留接收者语义，包含冻结对象等无法临时挂方法的场景。\n\n```js\nfunction isObject(value) {\n  return value !== null\n    && (typeof value === 'object' || typeof value === 'function')\n}\n\nfunction ordinaryNew(Ctor, ...args) {\n  const proto = isObject(Ctor.prototype) ? Ctor.prototype : Object.prototype\n  const instance = Object.create(proto)\n  const result = Reflect.apply(Ctor, instance, args)\n  return isObject(result) ? result : instance\n}\n\nfunction callFunction(fn, receiver, ...args) {\n  return Reflect.apply(fn, receiver, args)\n}\n\nfunction applyFunction(fn, receiver, args) {\n  return Reflect.apply(fn, receiver, args ?? [])\n}\n```"
    },
    {
      "id": "171",
      "title": "手写数组扁平化与去重",
      "featured": false,
      "topic": "coding",
      "kind": "手写题",
      "answer": "扁平化可用 DFS。下例处理无环的普通数组，跳过缺失索引，对所有层递归展开。极深输入下可改用显式栈。Set 保留首次插入顺序，对象按引用比较。按业务 ID 去重可以用 Map，并明确保留首次还是末次记录。\n\n```js\nfunction flattenUnique(items) {\n  const values = new Set()\n  function visit(array) {\n    for (let index = 0; index < array.length; index++) {\n      if (!(index in array)) continue\n      const value = array[index]\n      if (Array.isArray(value)) visit(value)\n      else values.add(value)\n    }\n  }\n  visit(items)\n  return [...values]\n}\n```"
    },
    {
      "id": "172",
      "title": "分组统计列表如何实现？",
      "featured": false,
      "topic": "coding",
      "kind": "手写题",
      "answer": "单次遍历，按分组键累加。Map 支持对象键以及真假值等不同类型的键。常见分析为时间 O(n) 与额外空间 O(k)，k 为分组数。\n\n```js\nfunction countBy(items, getKey) {\n  const counts = new Map()\n  for (const item of items) {\n    const key = getKey(item)\n    counts.set(key, (counts.get(key) ?? 0) + 1)\n  }\n  return counts\n}\n```"
    },
    {
      "id": "173",
      "title": "有序数组怎么找第一个大于等于 target 的位置？",
      "featured": true,
      "topic": "coding",
      "kind": "手写题",
      "answer": "维护左闭右开区间 `[left, right)`。中点值小于 target 时丢掉左半边及中点，否则保留中点为可能边界并收缩右边。最终等于 length 表示没有符合项。时间 O(log n)，空间 O(1)。\n\n```js\nfunction lowerBound(nums, target) {\n  let left = 0\n  let right = nums.length\n  while (left < right) {\n    const mid = left + Math.floor((right - left) / 2)\n    if (nums[mid] < target) left = mid + 1\n    else right = mid\n  }\n  return left\n}\n```"
    },
    {
      "id": "174",
      "title": "最长无重复子串怎么求？",
      "featured": true,
      "topic": "coding",
      "kind": "手写题",
      "answer": "维护窗口左边界与字符最近出现的位置。读到重复字符时，左边界向右移动到上次位置后一位，且保持单调。下例按 Unicode 码点计数，用户感知的组合字符可另用 Intl.Segmenter。时间 O(n)，空间 O(k)，k 为不同码点数。\n\n```js\nfunction longestUniqueLength(input) {\n  const last = new Map()\n  let left = 0\n  let right = 0\n  let best = 0\n  for (const char of input) {\n    left = Math.max(left, (last.get(char) ?? -1) + 1)\n    last.set(char, right)\n    best = Math.max(best, right - left + 1)\n    right++\n  }\n  return best\n}\n```"
    },
    {
      "id": "175",
      "title": "菜单树怎么打平？如何按最少层数找节点？",
      "featured": false,
      "topic": "coding",
      "kind": "口述题",
      "answer": "DFS 前序遍历适合保持父节点及其子项的展示顺序。BFS 使用队列，适合按层遍历和查最浅匹配。树上遍历时间 O(n)。DFS 递归栈约 O(h)，BFS 队列与最宽层有关。图结构可能有环时，用 visited 记录已访问节点。"
    },
    {
      "id": "176",
      "title": "如何合并重叠区间？",
      "featured": false,
      "topic": "coding",
      "kind": "手写题",
      "answer": "区间按起点排序后线性扫描，当前区间和末尾已合并区间相交就扩展终点。下例使用闭区间，相邻端点相等时合并。时间 O(n log n)，结果及排序副本空间 O(n)。\n\n```js\nfunction mergeIntervals(intervals) {\n  const sorted = [...intervals].sort((a, b) => a[0] - b[0])\n  const merged = []\n  for (const [start, end] of sorted) {\n    const last = merged.at(-1)\n    if (last && start <= last[1]) last[1] = Math.max(last[1], end)\n    else merged.push([start, end])\n  }\n  return merged\n}\n```"
    },
    {
      "id": "177",
      "title": "设计一个自动补全搜索框",
      "featured": true,
      "topic": "design",
      "kind": "场景题",
      "answer": "输入使用尾沿防抖，兼顾中文输入法组合事件。查询参数作为缓存键，取消旧请求并校验结果归属。界面覆盖初始、加载、空态、错误与选中。补齐键盘上下选择、Enter、Escape 及可访问名称。监控首屏出现候选的耗时、请求量及结果采纳率。"
    },
    {
      "id": "178",
      "title": "设计一个大文件上传",
      "featured": true,
      "topic": "design",
      "kind": "场景题",
      "answer": "用分片、有限并发、重试和服务端上传会话 ID 管理任务。已确认片列表支持恢复，服务端校验片或整文件并提供幂等合并。进度按已确认字节与传输进度口径定义，处理暂停、取消、失败清理和同名文件策略。"
    },
    {
      "id": "179",
      "title": "如何避免重复支付或重复提交？",
      "featured": false,
      "topic": "design",
      "kind": "场景题",
      "answer": "前端将同一次意图绑定到提交状态与稳定幂等键，防止连续点击，并把失败或超时的状态区分开。服务端在业务事务中把幂等键绑定到用户、请求和处理结果。结果未知时可查询订单状态或用同一键重试。刷新和多标签页同样依赖服务端校验。"
    },
    {
      "id": "180",
      "title": "登录多个 API 同时过期，如何自动刷新？",
      "featured": true,
      "topic": "design",
      "kind": "场景题",
      "answer": "对可刷新的 401 建立单次进行中的刷新操作，其他请求等待其完成，再依照策略重试一次。刷新失败统一清除会话并重定向，避免循环。对不可重放的写入先查幂等与请求体是否可复用。退出时取消等待任务，并考虑跨标签页的令牌轮换协调。"
    },
    {
      "id": "181",
      "title": "如何设计一个可回退的乐观更新？",
      "featured": false,
      "topic": "design",
      "kind": "场景题",
      "answer": "使用临时 ID 或版本标记立即更新本地视图，保留足够的回滚信息。服务端成功后以权威数据对齐，失败时恢复相应变更。并发修改需按操作或版本处理，旧失败不应覆盖较新的成功。高风险动作可以等待确认。"
    },
    {
      "id": "182",
      "title": "CSR、SSR、SSG 与流式渲染怎么选？",
      "featured": true,
      "topic": "design",
      "kind": "场景题",
      "answer": "CSR 适合登录态工具和高交互应用。SSR 按请求生成 HTML，适合需要首屏内容或抓取、且数据因请求而异的页面。SSG 可在构建时生成内容并走 CDN，适合更新节奏允许的公开页面。流式渲染可先输出已完成部分，再补后续边界。结合数据新鲜度、服务器成本、缓存与水合开销选择。"
    },
    {
      "id": "183",
      "title": "如何设计一个管理端权限系统？",
      "featured": false,
      "topic": "design",
      "kind": "场景题",
      "answer": "用资源与操作建模权限，角色做权限集合，涉及租户或记录归属时叠加资源范围。服务端检查每次操作，前端根据权限结果渲染导航和按钮。测试多租户访问、权限变化、直接打开链接以及退出后的数据清理。"
    },
    {
      "id": "184",
      "title": "如何设计稳定的埋点？",
      "featured": false,
      "topic": "design",
      "kind": "场景题",
      "answer": "定义事件、触发时机、页面上下文、唯一事件 ID 和数据口径。点击、曝光和业务成功应各自有明确触发条件。批量、限频和去重降低流量和重复计数。页面离开时可用 Beacon 或合适的 keepalive 请求尝试发送，服务端接受部分丢失并校验数据质量。 [Beacon 规范](https://www.w3.org/TR/beacon/)"
    },
    {
      "id": "185",
      "title": "如何设计实时通知和重连？",
      "featured": false,
      "topic": "design",
      "kind": "场景题",
      "answer": "先选传输方式，例如单向通知用 SSE。服务端使用递增序号或可恢复游标，客户端断线重连时带最后进度，按事件 ID 去重。窗口外缺失时重新请求快照。考虑退避、心跳、页面隐藏和无连接提示。"
    },
    {
      "id": "186",
      "title": "发布后出现动态 ChunkLoadError 如何恢复？",
      "featured": false,
      "topic": "design",
      "kind": "场景题",
      "answer": "确认失败 chunk 的 URL、构建版本和 HTTP 响应。常见情况是旧入口或旧标签页请求了已删除资产。发布时保留旧哈希文件并先部署新资产。客户端可在识别到版本不一致时合适地提示刷新，已尝试的记录可避免循环，并照顾未保存编辑内容。"
    },
    {
      "id": "187",
      "title": "如何设计一个可复用的数据表格组件？",
      "featured": true,
      "topic": "design",
      "kind": "场景题",
      "answer": "明确列定义、稳定行 ID、分页排序和筛选的服务端或客户端归属。提供受控状态、单元格渲染接口，以及加载、空态、错误态。支持键盘可达和语义表达。数据量大时根据实际瓶颈采用分页或虚拟化，并测试焦点和滚动恢复。"
    },
    {
      "id": "188",
      "title": "如何处理弱网下的表单草稿？",
      "featured": false,
      "topic": "design",
      "kind": "场景题",
      "answer": "明确草稿的保存频率、恢复方式、有效期和多端冲突。按用户和表单实例隔离本地数据，数据量和结构适合时用 IndexedDB。服务端同步用版本控制或冲突提示，用户登出后按业务需求清理私有草稿。提交成功后单独处理草稿作废。"
    },
    {
      "id": "189",
      "title": "怎么讲一个有说服力的项目难点？",
      "featured": true,
      "topic": "design",
      "kind": "场景题",
      "answer": "具体说出原始问题、约束、你负责的范围、考虑过的方案、选择依据、验证和后续结果。例如「表格筛选后偶尔显示旧结果，我在低速网络复现并确认响应倒序，增加取消和请求序号，再用可控延迟验证，并观察线上错误反馈」。追问时讲清个人贡献和方案边界。"
    },
    {
      "id": "190",
      "title": "如何回答线上事故复盘？",
      "featured": false,
      "topic": "design",
      "kind": "场景题",
      "answer": "按时间线说明如何发现、影响了谁、如何止损、根因与触发条件是什么。给出用于确认修复的证据及防复发机制，例如保留旧 chunk、补充发布冒烟检查、加强版本维度告警。说明责任分工与尚存风险，避免把复盘停留在个人操作失误。"
    },
    {
      "id": "P01",
      "relatedTo": "006",
      "kind": "场景题",
      "title": "升级到 HTTP/3 后首屏没有变快，怎么验证原因？",
      "answer": "先确认实际请求是否使用 h3，再按网络质量、首次访问和连接复用分组对比。用 Network 的 Protocol 和 Timing 看连接及首字节时间，用性能录制确认 LCP 关键路径。如果 TTFB、图片解码或 JS 执行主导首屏开销，传输协议带来的改善可能只占很小比例。用相同地区、资源与缓存条件比较。",
      "topic": "network",
      "featured": false
    },
    {
      "id": "P02",
      "relatedTo": "018",
      "kind": "场景题",
      "title": "API 返回 304，页面的数据为什么还是旧的？",
      "answer": "304 说明服务端或中间缓存判断客户端已有的表示仍可复用。先看请求的 If-None-Match 与实际存储的响应，再核对不同参数、用户与语言是否共用验证器或缓存键。确认源站是否重新生成了 ETag，并排除应用查询缓存或 Service Worker 返回旧版本。修复后覆盖首次请求、正常验证和数据更新后三条链路。",
      "topic": "cache",
      "featured": false
    },
    {
      "id": "P03",
      "relatedTo": "032",
      "kind": "输出题",
      "title": "把方法解构出来，这三次调用分别输出什么？",
      "answer": "```js\n'use strict'\nconst user = { name: 'Ada', read() { return this?.name } }\nconst { read } = user\nconsole.log(user.read(), read(), read.call({ name: 'Lin' }))\n```\n\n**答案** 依次是 Ada、undefined、Lin。方法调用的接收者是 user。解构后的独立调用在严格模式中没有接收者。call 显式提供了第三次调用的接收者。",
      "topic": "javascript",
      "featured": false
    },
    {
      "id": "P04",
      "relatedTo": "049",
      "kind": "输出题",
      "title": "catch 中正常返回，后续的 then 会执行吗？",
      "answer": "```js\nPromise.reject('失败')\n  .catch(reason => {\n    console.log(reason)\n    return '恢复'\n  })\n  .then(value => console.log(value))\nconsole.log('同步')\n```\n\n**答案** 输出「同步」「失败」「恢复」。catch 返回的普通值让后续 Promise 兑现。如果希望继续向下游传播失败，可以在 catch 中抛出异常或返回拒绝的 Promise。",
      "topic": "async",
      "featured": false
    },
    {
      "id": "P05",
      "relatedTo": "063",
      "kind": "场景题",
      "title": "用事件委托做列表删除，为什么点图标时找不到按钮？",
      "answer": "event.target 可能指向按钮内的图标或文字容器。用 closest 找最近的带操作标记的元素，并确认它位于监听容器内。操作按钮仍使用原生 button，保证键盘和点击触发同一条处理逻辑。若包含 Shadow DOM，再按组件的事件约定检查事件路径与 retargeting。",
      "topic": "browser",
      "featured": false
    },
    {
      "id": "P06",
      "relatedTo": "079",
      "kind": "场景题",
      "title": "Flex 布局里的长标题为什么把右侧按钮挤出了容器？",
      "answer": "标题所在 Flex 项通常受自动最小尺寸约束。给允许收缩的那一项设置 `min-width: 0`，再在实际显示文本的盒子设置省略样式。按设计让右侧必要操作保持可用。用中文、长英文标识符及窄视口验证。",
      "topic": "css",
      "featured": false
    },
    {
      "id": "P07",
      "relatedTo": "090",
      "kind": "场景题",
      "title": "如何让 TypeScript 在新增加载状态时提醒你更新组件？",
      "answer": "用 status 字面量建立判别联合，把 idle、loading、success 和 error 定义为独立分支。用 switch 渲染各分支，default 中把剩余值赋给 never 或传给 assertNever。新增分支但遗漏渲染时，TypeScript 会在穷尽检查报错。",
      "topic": "typescript",
      "featured": false
    },
    {
      "id": "P08",
      "relatedTo": "105",
      "kind": "场景题",
      "title": "React 计时器里 count 总是初始值，怎么修？",
      "answer": "只在挂载时建立的计时器回调捕获了初次 render 的 count。如果目标是每次递增，改用 `setCount(previous => previous + 1)`。定时器需要随其他配置变化时，把真实依赖加入 effect，并在 cleanup 中清除旧计时器。",
      "topic": "react",
      "featured": false
    },
    {
      "id": "P09",
      "relatedTo": "116",
      "kind": "场景题",
      "title": "Vue watch 请求列表时，上一次请求覆盖了结果，怎么处理？",
      "answer": "watch 显式依赖筛选条件，回调中启动新请求前清理上一轮。可以使用 watch 提供的清理回调注册 AbortController，并给请求加序号保护最终写入。只允许仍对应当前筛选条件的请求更新 loading、error 和 data。",
      "topic": "vue",
      "featured": false
    },
    {
      "id": "P10",
      "relatedTo": "129",
      "kind": "场景题",
      "title": "组件库打包后 JavaScript 正常，CSS 却全部丢失，怎么查？",
      "answer": "从消费项目的产物确认 CSS 是缺少导入、缺少发布文件，还是被 tree shaking 移除。如果 CSS 以副作用导入且包配置为 `sideEffects: false`，按实际输出路径把样式加入例外。用真实发布包在生产模式构建一个最小消费项目，验证组件样式与按需导入一起生效。",
      "topic": "tooling",
      "featured": false
    },
    {
      "id": "P11",
      "relatedTo": "141",
      "kind": "场景题",
      "title": "首页大图下载只花一百毫秒，为什么 LCP 仍然很慢？",
      "answer": "LCP 取元素渲染时间。先确认大图是最终 LCP 元素，再看请求是否启动得晚，以及下载完成后是否被 CSS、JS、解码或不可见状态拖延显示。分别记录资源发现、下载、呈现三个时间点，再选择优化关键路径。",
      "topic": "performance",
      "featured": false
    },
    {
      "id": "P12",
      "relatedTo": "154",
      "kind": "场景题",
      "title": "命令行请求能成功，浏览器却报 CORS，下一步查哪里？",
      "answer": "命令行客户端通常不执行浏览器的 CORS 规则。在浏览器 Network 找预检和实际请求，检查 Origin、请求方法与头部、允许源与允许凭据配置。留意网关错误响应是否也附上所需的 CORS 头。最终用真实页面 origin 验证。",
      "topic": "security",
      "featured": false
    },
    {
      "id": "P13",
      "relatedTo": "164",
      "kind": "手写题",
      "title": "给节流函数增加尾沿执行，怎么保留最后一次调用的参数？",
      "answer": "用一个计时器表示当前窗口，期间每次调用只替换待处理的接收者和参数。到期先释放计时器，再取走最后一组参数执行。下例是仅尾沿版本，适合需要处理最后一次输入的固定窗口采样。\n\n```js\nfunction trailingThrottle(fn, delay) {\n  let timer\n  let pending\n  return function (...args) {\n    pending = [this, args]\n    if (timer !== undefined) return\n    timer = setTimeout(() => {\n      const [receiver, latest] = pending\n      timer = undefined\n      pending = undefined\n      fn.apply(receiver, latest)\n    }, delay)\n  }\n}\n```",
      "topic": "coding",
      "featured": false
    },
    {
      "id": "P14",
      "relatedTo": "181",
      "kind": "场景题",
      "title": "用户连续两次点赞切换，第一条请求失败，该怎么回滚？",
      "answer": "给每次操作分配版本或稳定的操作 ID，界面显示最近意图。旧请求失败时，只移除对应的乐观变更，并依据已确认状态与后续待确认操作重新计算。也可串行化同一对象的写入，并发送目标状态。最终用服务端版本或主动重取核对。",
      "topic": "design",
      "featured": false
    }
  ]
}
