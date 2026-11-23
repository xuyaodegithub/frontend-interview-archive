'use strict'

const { topics, questions } = window.interviewData
const byId = new Map(questions.map(question => [question.id, question]))
const topicById = new Map(topics.map(topic => [topic.id, topic]))
const byTopic = new Map(topics.map(topic => [topic.id, questions.filter(question => question.topic === topic.id)]))
const questionRanks = new Map(questions.map((question, index) => [question.id, index]))
const searchable = new Map(questions.map(question => [
  question.id,
  [question.id, question.title, question.explanation, question.example, question.answer,
    topicById.get(question.topic).title, question.kind]
    .join(' ').normalize('NFKC').toLowerCase()
]))
const kinds = ['口述题', '输出题', '手写题', '场景题']
const PAGE_SIZE = 12
const SEARCH_DELAY = 180
const storageKey = 'frontend-interview-archive:v1'
const main = document.querySelector('main')
const sidebar = document.querySelector('#sidebar')
const search = document.querySelector('#keyword')
const searchForm = document.querySelector('#header-search')
const status = document.querySelector('#live-message')
const headerSaved = document.querySelector('.header-saved')
let searchTimer
let answerOpen = false

function readProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey))
    return {
      saved: new Set(Array.isArray(value?.saved) ? value.saved.filter(id => byId.has(id)) : []),
      done: new Set(Array.isArray(value?.done) ? value.done.filter(id => byId.has(id)) : [])
    }
  } catch {
    return { saved: new Set(), done: new Set() }
  }
}

let progress = readProgress()

function saveProgress() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ saved: [...progress.saved], done: [...progress.done] }))
  } catch {
    status.textContent = '浏览器存储不可用，本次进度仅在当前页面保留。'
  }
}

const htmlEntities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => htmlEntities[char])
}

function routeHash(page, params = new URLSearchParams()) {
  const query = new URLSearchParams(params)
  const suffix = query.toString()
  return '#' + page + (suffix ? '?' + suffix : '')
}

function href(page, params) {
  return escapeHTML(routeHash(page, params))
}

function readRoute() {
  const [path, query] = location.hash.slice(1).split('?', 2)
  const params = new URLSearchParams(query)
  const question = path.startsWith('q/') ? byId.get(path.slice(2)) : null
  const page = question ? 'detail' : ['bank', 'priority', 'saved'].includes(path) ? path : 'home'
  const from = ['bank', 'priority', 'saved'].includes(params.get('from')) ? params.get('from') : 'bank'
  const topic = topicById.get(params.get('topic'))
  return { page, params, question, from, topic, practice: params.get('mode') === 'practice' }
}

function listParams(route) {
  const params = new URLSearchParams(route.params)
  params.delete('from')
  params.delete('mode')
  return params
}

function detailHref(question, route) {
  const params = listParams(route)
  const from = route.page === 'detail' ? route.from : route.page
  if (from !== 'bank') params.set('from', from)
  if (route.practice) params.set('mode', 'practice')
  return href('q/' + question.id, params)
}

function inlineMarkdown(text, links = true) {
  const pattern = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g
  let output = ''
  let offset = 0
  for (const match of text.matchAll(pattern)) {
    output += escapeHTML(text.slice(offset, match.index))
    if (match[1] !== undefined) output += '<code>' + escapeHTML(match[1]) + '</code>'
    else if (match[2] !== undefined) output += '<strong>' + inlineMarkdown(match[2], false) + '</strong>'
    else if (links) output += '<a target="_blank" rel="noopener noreferrer" href="' + escapeHTML(match[4]) + '">' + inlineMarkdown(match[3], false) + '</a>'
    else output += escapeHTML(match[0])
    offset = match.index + match[0].length
  }
  return output + escapeHTML(text.slice(offset))
}

function tableRow(line, cell) {
  return '<tr>' + line.trim().slice(1, -1).split('|').map(value =>
    '<' + cell + '>' + inlineMarkdown(value.trim()) + '</' + cell + '>'
  ).join('') + '</tr>'
}

function markdownToHTML(markdown) {
  let output = ''
  const blocks = markdown.replace(/\r\n?/g, '\n').split(/^(```[^\n]*\n[\s\S]*?^\s*```)[ \t]*$/m)
  for (const [index, block] of blocks.entries()) {
    if (index % 2 === 1) {
      const code = block.split('\n').slice(1, -1).join('\n')
      output += '<pre tabindex="0"><code>' + escapeHTML(code) + '</code></pre>'
      continue
    }

    for (const paragraph of block.trim().split(/\n\s*\n/).filter(Boolean)) {
      const lines = paragraph.split('\n')
      if (lines.length >= 2 && lines.every(line => line.trim().startsWith('|') && line.trim().endsWith('|'))
        && /^\|[\s:|-]+\|$/.test(lines[1].trim())) {
        output += '<div class="table-scroll" role="region" aria-label="对照表" tabindex="0"><table><thead>'
          + tableRow(lines[0], 'th') + '</thead><tbody>'
          + lines.slice(2).map(line => tableRow(line, 'td')).join('') + '</tbody></table></div>'
      } else if (lines.every(line => /^- /.test(line))) {
        output += '<ul>' + lines.map(line => '<li>' + inlineMarkdown(line.slice(2)) + '</li>').join('') + '</ul>'
      } else {
        output += '<p>' + inlineMarkdown(paragraph) + '</p>'
      }
    }
  }
  return output
}

function bookmarkIcon() {
  return '<span class="icon icon-bookmark" aria-hidden="true"></span>'
}

function renderSidebar(route) {
  const active = route.page === 'detail' ? route.from : route.page
  const topic = route.page === 'detail' ? route.topic?.id ?? route.question.topic : route.topic?.id
  const navLink = (page, text, icon, count) => {
    const current = active === page && (page !== 'bank' || !topic)
    return '<a class="nav-link" href="' + href(page) + '"' + (current ? ' aria-current="page"' : '') + '>'
      + icon + '<span class="nav-text">' + text + '</span>'
      + (count === undefined ? '' : '<span class="nav-num">' + count + '</span>') + '</a>'
  }
  const glyph = char => '<span class="nav-glyph" aria-hidden="true">' + char + '</span>'
  const links = [
    navLink('home', '学习总览', glyph('▦')),
    navLink('bank', '全部题目', glyph('≡')),
    navLink('priority', '重点题目', glyph('☆')),
    navLink('saved', '我的收藏', bookmarkIcon(), progress.saved.size)
  ]
  sidebar.innerHTML = '<div class="nav-group"><p class="nav-heading">学习</p>' + links.join('') + '</div>'
    + '<div class="nav-group"><p class="nav-heading">专题归档</p>'
    + topics.map(item => '<a class="nav-link" href="' + href('bank', { topic: item.id }) + '"'
      + (active === 'bank' && topic === item.id ? ' aria-current="page"' : '') + '>'
      + '<span class="nav-text">' + escapeHTML(item.title) + '</span>'
      + '<span class="nav-num">' + byTopic.get(item.id).length + '</span></a>').join('')
    + '</div>'
  if (active === 'saved') headerSaved.setAttribute('aria-current', 'page')
  else headerSaved.removeAttribute('aria-current')
}

function topicCard(topic) {
  const entries = byTopic.get(topic.id)
  const completed = entries.filter(question => progress.done.has(question.id)).length
  return `<a class="topic-card" href="${href('bank', { topic: topic.id })}">
    <div class="topic-meta">
      <span class="topic-mark ${topic.tone}" aria-hidden="true">${escapeHTML(topic.mark)}</span>
      <span class="topic-count">${entries.length} 题</span>
    </div>
    <h3>${escapeHTML(topic.title)}</h3>
    <p>${escapeHTML(topic.summary)}</p>
    <progress max="${entries.length}" value="${completed}" aria-label="已掌握 ${completed} 题"></progress>
  </a>`
}

function renderHome() {
  const completed = progress.done.size
  const percent = Math.round(completed / questions.length * 100)
  main.innerHTML = `
    <section class="hero" aria-labelledby="home-title">
      <div class="hero-copy">
        <h1 id="home-title">前端面试题库</h1>
        <p>${topics.length} 个专题、${questions.length} 道题。按知识点复习，或随机抽题先作答再核对。</p>
        <div class="hero-actions">
          <a class="button hero-primary" href="#bank">浏览全部题目</a>
          <button class="button hero-secondary" type="button" data-action="practice">随机练习</button>
        </div>
      </div>
      <div class="hero-progress">
        <h2>复习进度</h2>
        <div class="progress-count"><strong>${completed}</strong> / ${questions.length} 题已掌握</div>
        <progress max="${questions.length}" value="${completed}" aria-label="复习进度"></progress>
        <p class="progress-note">已完成 ${percent}% · 保存在当前浏览器</p>
      </div>
    </section>
    <section class="section" aria-labelledby="topics-title">
      <div class="section-header"><h2 id="topics-title">按专题复习</h2><p>${topics.length} 个专题</p></div>
      <div class="topic-grid">${topics.map(topicCard).join('')}</div>
    </section>
    <section class="section" aria-labelledby="exercise-title">
      <div class="section-header"><h2 id="exercise-title">按题型练习</h2></div>
      <div class="topic-grid">${kinds.map(kind => `<a class="topic-card" href="${href('bank', { kind })}">
        <div class="topic-meta"><span class="topic-mark violet" aria-hidden="true">${{ 口述题: 'Q&A', 输出题: 'LOG', 手写题: 'CODE', 场景题: 'CASE' }[kind]}</span>
        <span>${questions.filter(question => question.kind === kind).length} 题</span></div><h3>${kind}</h3>
        <p>${{ 口述题: '解释概念、机制与适用边界', 输出题: '先推导代码输出，再核对解释', 手写题: '实现函数，并考虑典型边界', 场景题: '从约束出发，说明方案与验证' }[kind]}</p></a>`).join('')}</div>
    </section>`
}

function filterQuestions(route) {
  const view = route.page === 'detail' ? route.from : route.page
  const kind = route.params.get('kind')
  const state = route.params.get('status')
  const source = route.params.get('source')
  const query = (route.params.get('q') ?? '').normalize('NFKC').toLowerCase().trim().split(/\s+/).filter(Boolean)
  return questions.filter(question => {
    if (view === 'priority' && !question.featured) return false
    if (view === 'saved' && !progress.saved.has(question.id)) return false
    if (route.topic && question.topic !== route.topic.id) return false
    if (kinds.includes(kind) && question.kind !== kind) return false
    if (state === 'done' && !progress.done.has(question.id)) return false
    if (state === 'todo' && progress.done.has(question.id)) return false
    if (source === 'original' && question.relatedTo) return false
    if (source === 'followup' && !question.relatedTo) return false
    return query.every(term => searchable.get(question.id).includes(term))
  })
}

function questionMeta(question) {
  return '<span class="badge">' + escapeHTML(question.kind) + '</span>'
    + (question.featured ? '<span class="badge priority">重点</span>' : '')
    + (question.relatedTo ? '<span class="badge">延伸题</span>' : '')
    + (progress.done.has(question.id) ? '<span class="badge done">已掌握</span>' : '')
}

function bookmarkButton(question) {
  const saved = progress.saved.has(question.id)
  const label = (saved ? '取消收藏第 ' : '收藏第 ') + question.id + ' 题'
  return `<button type="button" class="icon-button" data-action="save" data-id="${question.id}" aria-pressed="${saved}" aria-label="${label}" title="${label}">${bookmarkIcon()}</button>`
}

function questionRow(question, route) {
  return `<li class="question-row">
    <a class="question-link" href="${detailHref(question, route)}">
      <span class="question-id">${question.id}</span>
      <span class="question-text">
        <span class="question-title">${escapeHTML(question.title)}</span>
        <span class="question-meta">${escapeHTML(topicById.get(question.topic).title)} ${questionMeta(question)}</span>
      </span>
    </a>
    ${bookmarkButton(question)}
  </li>`
}

function filterSelect(name, label, options, route) {
  return `<label class="filter"><span>${label}</span><select name="${name}">
    ${options.map(([value, text]) => `<option value="${escapeHTML(value)}"${value === (route.params.get(name) ?? '') ? ' selected' : ''}>${escapeHTML(text)}</option>`).join('')}
  </select></label>`
}

function renderList(route) {
  const { page, topic, params } = route
  const title = page === 'saved' ? '我的收藏'
    : page === 'priority' ? '重点题目' : topic?.title ?? '全部题目'
  const prefix = page === 'saved' ? '集中复习你收藏的题目。'
    : page === 'priority' ? '原题库中标为重点的题目。'
    : topic?.summary ?? '按专题、题型和掌握状态筛选。'
  const results = filterQuestions(route)
  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const requested = Number(params.get('page'))
  const current = Number.isInteger(requested) ? Math.min(Math.max(requested, 1), pages) : 1
  const first = (current - 1) * PAGE_SIZE
  const items = results.slice(first, first + PAGE_SIZE)
  const query = params.get('q')?.trim()
  const filtered = ['q', 'kind', 'status', 'source'].some(key => params.get(key))
  const clearHref = href(page, topic ? { topic: topic.id } : {})
  const emptyTitle = page === 'saved' && progress.saved.size === 0 ? '还没有收藏' : '没有符合条件的题目'
  const emptyCopy = page === 'saved' && progress.saved.size === 0 ? '点击题目旁的书签即可收藏。' : '试试更换关键词或清除部分筛选。'
  main.innerHTML = `
    <div class="crumb"><a href="#home">学习总览</a><span aria-hidden="true">/</span><span>${escapeHTML(title)}</span></div>
    <div class="page-heading"><h1>${escapeHTML(title)}</h1><p>${escapeHTML(prefix)}</p></div>
    <div class="filters">
      ${filterSelect('topic', '专题', [['', '全部专题'], ...topics.map(item => [item.id, item.title])], route)}
      ${filterSelect('kind', '题型', [['', '全部题型'], ...kinds.map(kind => [kind, kind])], route)}
      ${filterSelect('status', '进度', [['', '全部进度'], ['todo', '待复习'], ['done', '已掌握']], route)}
      ${filterSelect('source', '来源', [['', '全部来源'], ['original', '文档原题'], ['followup', '延伸题']], route)}
      ${results.length ? '<button class="button filter-action" type="button" data-action="practice">随机练习</button>' : ''}
    </div>
    <div class="results-header">
      <p>${query ? '“' + escapeHTML(query) + '” · ' : ''}共 ${results.length} 题</p>
      ${filtered ? `<a href="${clearHref}">清除筛选</a>` : ''}
    </div>
    ${items.length ? `<ul class="question-list">${items.map(item => questionRow(item, route)).join('')}</ul>`
      : `<div class="empty"><h2>${emptyTitle}</h2><p>${emptyCopy}</p><a class="button" href="${page === 'saved' && progress.saved.size === 0 ? '#bank' : clearHref}">${page === 'saved' && progress.saved.size === 0 ? '浏览题库' : '清除筛选'}</a></div>`}
    ${pages > 1 ? `<nav class="pager" aria-label="分页">
      <button type="button" class="button" data-action="page" data-id="${current - 1}" ${current === 1 ? 'disabled' : ''}>上一页</button>
      <span>第 ${current} / ${pages} 页</span>
      <button type="button" class="button" data-action="page" data-id="${current + 1}" ${current === pages ? 'disabled' : ''}>下一页</button>
    </nav>` : ''}`
}

function renderDetail(route, detailsOpen) {
  const { question, topic, from, practice } = route
  const topicTitle = topicById.get(question.topic).title
  const listTitle = from === 'saved' ? '我的收藏' : from === 'priority' ? '重点题目' : topic?.title ?? '全部题目'
  const done = progress.done.has(question.id)
  const related = question.relatedTo ? [byId.get(question.relatedTo)]
    : byTopic.get(question.topic).filter(item => item.relatedTo === question.id)
  const eligible = filterQuestions(route)
  const rank = questionRanks.get(question.id)
  const previous = eligible.findLast(item => questionRanks.get(item.id) < rank)
  const next = eligible.find(item => questionRanks.get(item.id) > rank)
  // Output exercises need the code before revealing the answer.
  const output = question.kind === '输出题' && question.answer.match(/^(```[^\n]*\n[\s\S]*?\n```)\n*/)
  const prompt = output ? output[1] : ''
  const answer = output ? question.answer.slice(output[0].length) : question.answer
  const answerBody = question.explanation && question.example
    ? `<p class="answer-explanation">${escapeHTML(question.explanation)}</p>
      <div class="answer-example">
        <h3>举个例子</h3>
        <p>${escapeHTML(question.example)}</p>
      </div>
      <details id="answer-details" class="answer-details" ${detailsOpen ? 'open' : ''}>
        <summary>${question.kind === '手写题' ? '查看参考代码与细节' : '查看详细解答'}</summary>
        <div class="answer-body">${markdownToHTML(answer)}</div>
      </details>`
    : markdownToHTML(answer)
  main.innerHTML = `<article class="detail">
    <div class="crumb"><a href="#home">学习总览</a><span aria-hidden="true">/</span>
      <a href="${href(from, listParams(route))}">${escapeHTML(listTitle)}</a>
      <span aria-hidden="true">/</span><span>${practice ? '随机练习' : '第 ' + question.id + ' 题'}</span></div>
    <div class="question-meta detail-meta"><span class="question-id">${question.id}</span>
      <a href="${href('bank', { topic: question.topic })}">${escapeHTML(topicTitle)}</a> ${questionMeta(question)}</div>
    <div class="detail-title"><h1>${escapeHTML(question.title)}</h1>${bookmarkButton(question)}</div>
    ${prompt ? `<div class="answer-card answer-body">${markdownToHTML(prompt)}</div>` : ''}
    <section class="answer-card" aria-labelledby="answer-title">
      <h2 id="answer-title">参考答案</h2>
      <div id="answer-content" class="answer-body" ${answerOpen ? '' : 'hidden'}>${answerBody}</div>
      <button class="button" type="button" data-action="reveal" aria-expanded="${answerOpen}" aria-controls="answer-content" ${answerOpen ? 'hidden' : ''}>查看参考答案</button>
    </section>
    <div class="detail-actions">
      <button class="button ${done ? '' : 'primary'}" type="button" data-action="done" data-id="${question.id}" aria-pressed="${done}">${done ? '已掌握 · 撤销' : '标为已掌握'}</button>
      <span class="action-spacer"></span>
      ${practice ? '<button class="button" type="button" data-action="practice">再练一题</button>' : `
        ${previous ? `<a class="button" href="${detailHref(previous, route)}">上一题</a>` : '<button class="button" disabled>上一题</button>'}
        ${next ? `<a class="button" href="${detailHref(next, route)}">下一题</a>` : '<button class="button" disabled>下一题</button>'}`}
    </div>
    ${related.length ? `<section class="related" aria-label="关联题目"><h2>${question.relatedTo ? '对应原题' : '延伸练习'}</h2>
      ${related.map(item => `<a href="${href('q/' + item.id, { topic: item.topic })}"><span class="question-id">${item.id}</span> ${escapeHTML(item.title)}</a>`).join('')}</section>` : ''}
  </article>`
}

function render({ preserveScroll = false, preserveSearch = false } = {}) {
  const route = readRoute()
  const scroll = sidebar.scrollTop
  renderSidebar(route)
  sidebar.scrollTop = scroll
  if (!preserveSearch) search.value = route.params.get('q') ?? ''
  if (route.page === 'home') renderHome()
  else if (route.page === 'detail') {
    const detailsOpen = preserveScroll && Boolean(main.querySelector('#answer-details[open]'))
    renderDetail(route, detailsOpen)
  }
  else renderList(route)
  const heading = main.querySelector('h1')
  document.title = route.page === 'home' ? '前端面试题库' : heading.textContent + ' · 前端面试题库'
  if (!preserveScroll) {
    window.scrollTo(0, 0)
    if (document.activeElement !== search) main.focus({ preventScroll: true })
  }
}

function startPractice(route) {
  const pool = filterQuestions(route).filter(question => question !== route.question)
  const unfinished = pool.filter(question => !progress.done.has(question.id))
  const choices = unfinished.length ? unfinished : pool
  if (!choices.length) {
    if (!route.question) return
    status.textContent = '当前筛选只有这一道题。'
    const feedback = document.querySelector('[data-action="practice"]')
    feedback.textContent = '当前只有这一题'
    feedback.disabled = true
    return
  }
  const question = choices[Math.floor(Math.random() * choices.length)]
  const params = listParams(route)
  const from = route.page === 'detail' ? route.from : route.page
  if (from === 'saved' || from === 'priority') params.set('from', from)
  params.set('mode', 'practice')
  location.hash = routeHash('q/' + question.id, params)
}

function searchQuestions() {
  clearTimeout(searchTimer)
  const route = readRoute()
  const query = search.value.trim()
  const page = route.page === 'home' || route.page === 'detail' ? 'bank' : route.page
  const params = route.page === page ? listParams(route) : new URLSearchParams()
  if (query) params.set('q', query)
  else params.delete('q')
  params.delete('page')
  const target = routeHash(page, params)
  if (target === location.hash) return
  if (route.page !== page || !route.params.has('q')) history.pushState(null, '', target)
  else history.replaceState(null, '', target)
  render({ preserveSearch: true })
}

searchForm.addEventListener('submit', event => {
  event.preventDefault()
  searchQuestions()
  main.focus({ preventScroll: true })
})
search.addEventListener('input', event => {
  if (event.isComposing) return
  clearTimeout(searchTimer)
  searchTimer = setTimeout(searchQuestions, SEARCH_DELAY)
})
search.addEventListener('compositionstart', () => clearTimeout(searchTimer))
search.addEventListener('compositionend', () => {
  clearTimeout(searchTimer)
  if (search.value.trim()) searchTimer = setTimeout(searchQuestions, SEARCH_DELAY)
})
search.addEventListener('keydown', event => {
  if (event.key === 'Escape' && search.value) {
    event.preventDefault()
    search.value = ''
    searchQuestions()
  }
})
document.addEventListener('keydown', event => {
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey
    && !event.target.closest('input, textarea, select, [contenteditable="true"]')) {
    event.preventDefault()
    search.focus()
  }
})

main.addEventListener('change', event => {
  const select = event.target.closest('.filter select')
  if (!select) return
  const route = readRoute()
  const params = listParams(route)
  if (select.value) params.set(select.name, select.value)
  else params.delete(select.name)
  params.delete('page')
  const key = select.name
  history.pushState(null, '', routeHash(route.page, params))
  render({ preserveScroll: true })
  main.querySelector('select[name="' + key + '"]')?.focus()
})

main.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]')
  if (!button) return
  const route = readRoute()
  const { action, id } = button.dataset
  if (action === 'reveal') {
    answerOpen = true
    const content = document.querySelector('#answer-content')
    content.hidden = false
    button.setAttribute('aria-expanded', 'true')
    button.hidden = true
    content.setAttribute('tabindex', '-1')
    content.focus()
  } else if (action === 'practice') {
    startPractice(route)
  } else if (action === 'page') {
    const params = listParams(route)
    if (id === '1') params.delete('page')
    else params.set('page', id)
    location.hash = routeHash(route.page, params)
  } else if ((action === 'save' || action === 'done') && byId.has(id)) {
    const set = action === 'save' ? progress.saved : progress.done
    const enabled = !set.delete(id)
    if (enabled) set.add(id)
    status.textContent = action === 'save'
      ? (enabled ? '已收藏' : '已取消收藏') : (enabled ? '已标为掌握' : '已撤销掌握标记')
    saveProgress()
    render({ preserveScroll: true })
    const replacement = main.querySelector('[data-action="' + action + '"][data-id="' + id + '"]')
    const focusTarget = replacement ?? main
    focusTarget.focus({ preventScroll: true })
  }
})

document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault()
  main.focus()
})
window.addEventListener('hashchange', () => {
  clearTimeout(searchTimer)
  answerOpen = !readRoute().practice
  render()
})
window.addEventListener('storage', event => {
  if (event.key === storageKey || event.key === null) {
    progress = readProgress()
    render({ preserveScroll: true, preserveSearch: true })
  }
})

answerOpen = !readRoute().practice
render()
