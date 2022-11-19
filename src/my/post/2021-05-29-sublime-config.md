---
layout: post
title:  Sublime Text开发环境配置
date:   2021-05-29 14:30:00 +0800
---

## 安装

- 安装 [Sublime Text](https://www.sublimetext.com/)
- 安装 [Package Control](https://packagecontrol.io/)

## 配置

```js
{
	"always_show_minimap_viewport": true,
	"enable_tab_scrolling": false,
	"font_face": "Courier New",
	"font_size": 18,
	"show_encoding": true,
	"index_exclude_patterns": ["*.log", "node_modules/**", "vendor/**"],
	"binary_file_patterns": [
		"*.jpg", "*.jpeg", "*.png", "*.gif", "*.ttf", "*.tga", "*.dds", "*.ico", "*.eot", "*.pdf", "*.swf", "*.jar", "*.zip",
		"node_modules/**", "vendor/**"
	]
}
```

## 常用插件

- ConvertToUTF8
- Dockerfile Syntax Highlighting
- EditorConfig
- Emmet
- Generic Config
- Gitignore
- [GoSublime](https://github.com/DisposaBoy/GoSublime)，配置参考如下：
```js
{
	"fmt_enabled": true
}
```
- JsFormat，配置参考如下：
```js
{
	"brace_style": "collapse-preserve-inline"
}
```
- LESS
- Pretty JSON，配置参考如下：
```js
{
    "brace_newline": false,
    "bracket_newline": false
}
```
配置快捷键绑定：
```js
[
	{ "keys": ["super+ctrl+j"], "command": "pretty_json" }
]
```
- SCSS
