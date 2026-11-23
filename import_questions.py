"""Compile the interview Markdown and supplemental questions into offline site data."""

import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TOPICS = [
    ("network", "网络与协议", "NET", "blue", "DNS、TCP、TLS、HTTP 与实时通信"),
    ("cache", "HTTP 缓存与浏览器存储", "304", "violet", "缓存验证、CDN、Cookie 与离线"),
    ("javascript", "JavaScript 基础", "JS", "amber", "类型、作用域、原型与模块"),
    ("async", "异步与事件循环", "ASY", "violet", "Promise、并发、取消与调度"),
    ("browser", "浏览器与 Web API", "DOM", "blue", "渲染、事件、路由与 Worker"),
    ("css", "HTML CSS 与可访问性", "CSS", "rose", "布局、层叠、响应式与语义"),
    ("typescript", "TypeScript", "TS", "blue", "收窄、泛型、工具类型与接口"),
    ("react", "React", "RE", "teal", "组件状态、Hooks、渲染与水合"),
    ("vue", "Vue", "VU", "green", "响应式、组件通信与渲染"),
    ("tooling", "工程化与测试", "CI", "violet", "构建、发布、测试与组件库"),
    ("performance", "性能与线上排查", "PERF", "teal", "Web Vitals、白屏与性能优化"),
    ("security", "Web 安全与认证", "SEC", "rose", "跨域、会话与 Web 安全防护"),
    ("coding", "手写与算法", "{ }", "amber", "常见工具函数、搜索与数据结构"),
    ("design", "系统设计与项目面试", "SYS", "green", "业务场景、架构取舍与项目复盘"),
]

CODING_EXERCISES = {"163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "176"}
OUTPUT_EXERCISES = {"047", "052"}


def load_original(path):
    markdown = path.read_text(encoding="utf-8").splitlines()
    topic_ids = {title: key for key, title, *_ in TOPICS}
    questions = []
    topic = None
    question = None
    body = []
    fence_open = False

    def finish_question():
        if question:
            answer = "\n".join(body).strip()
            if not answer:
                raise ValueError(f"Missing answer for {question['id']}")
            questions.append({**question, "answer": answer})

    for line in markdown:
        if line.startswith("```"):
            fence_open = not fence_open
        section = None if fence_open else re.fullmatch(r"## (.+)", line)
        heading = None if fence_open else re.fullmatch(r"### (\d{3}) (★ )?(.+)", line)
        if section or heading:
            finish_question()
            question = None
            body.clear()
        if section:
            topic = topic_ids.get(section[1])
        elif heading:
            if not topic:
                raise ValueError(f"Question outside a known topic: {line}")
            number = heading[1]
            kind = (
                "输出题" if number in OUTPUT_EXERCISES else
                "手写题" if number in CODING_EXERCISES else
                "场景题" if topic == "design" else "口述题"
            )
            question = {"id": number, "title": heading[3], "featured": bool(heading[2]), "topic": topic, "kind": kind}
        elif question:
            body.append(line)
    finish_question()
    ids = [q["id"] for q in questions]
    if ids != [f"{n:03d}" for n in range(1, len(ids) + 1)]:
        raise ValueError("Expected a complete sequence of original question IDs")
    return questions


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("source", nargs="?", type=Path, default=ROOT / "前端开发工程师面试题库.md")
    options = parser.parse_args()
    original = load_original(options.source)
    by_id = {entry["id"]: entry for entry in original}
    variants = json.loads((ROOT / "followups.json").read_text(encoding="utf-8"))
    keys = set(by_id)
    for question in variants:
        related = by_id[question["relatedTo"]]
        if question["id"] in keys or not question["title"].strip() or not question["answer"].strip():
            raise ValueError(f"Invalid follow-up: {question['id']}")
        keys.add(question["id"])
        question.update(topic=related["topic"], featured=False)
    data = {
        "topics": [dict(zip(("id", "title", "mark", "tone", "summary"), topic)) for topic in TOPICS],
        "questions": original + variants,
    }
    output = ROOT / "dist" / "questions.js"
    output.write_text("window.interviewData = " + json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Imported {len(original)} original questions and {len(variants)} follow-ups into {len(TOPICS)} topics.")


if __name__ == "__main__":
    main()
