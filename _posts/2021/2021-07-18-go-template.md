---
layout: post
title:  Go Template使用
date:   2021-07-18 21:00:00 +0800
---

## 基本使用

{% raw %}
```go
package main

import (
	"os"
	"text/template"
)

type Movie struct {
	Name  string
	Year  int
	Stars []string
}

var movie = &Movie{
	Name: "Avatar",
	Year: 2009,
	Stars: []string{
		"Sam Worthington",
		"Zoe Saldana",
		"Sigourney Weaver",
	},
}

func main() {
	text := `{{ .Name }} was released in {{ .Year }}.`
	t, _ := template.New("default").Parse(text)
	t.Execute(os.Stdout, movie) // Avatar was released in 2009.
}
```

1. 初始化一个模板 `template.New`
2. 解析模板内容 `Parse`
3. 传入数据，执行模板 `Execute`

Go 模板中的几个基本概念为：Argument、Pipeline、Action、Variable、Function.

## Argument、Pipeline

Argument 为一个普通的值，可以是一个字符串、数字等，还可以是变量、方法调用或者函数调用之后的值。其中 `{{ . }}` 表示的是传入的值。

Pipeline 就是一系列的命令，每个命令可以是一个 Argument，也可以是方法调用或者函数调用。

看下面的例子：

```go
package main

import (
	"encoding/json"
	"fmt"
	"os"
	"text/template"
)

type Movie struct {
	Name  string
	Year  int
	Stars []string
}

func (m *Movie) Desc() string {
	return fmt.Sprintf("%s-%d", m.Name, m.Year)
}

func (m *Movie) Filename(format string) string {
	return fmt.Sprintf("%s.%d.%s", m.Name, m.Year, format)
}

func (m *Movie) String() string {
	b, _ := json.Marshal(m)
	return string(b)
}

var movie = &Movie{
	Name: "Avatar",
	Year: 2009,
	Stars: []string{
		"Sam Worthington",
		"Zoe Saldana",
		"Sigourney Weaver",
	},
}

func main() {
	text := "{{ . }}\n"
	t, _ := template.New("default").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// {"Name":"Avatar","Year":2009,"Stars":["Sam Worthington","Zoe Saldana","Sigourney Weaver"]}

	text = "{{ .Name }} was released in {{ .Year }}.\n"
	t, _ = template.New("default").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// Avatar was released in 2009.

	text = "Desc: {{ .Desc }}, Filename: {{ .Filename \"mov\"}}\n"
	t, _ = template.New("default").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// Desc: Avatar-2009, Filename: Avatar.2009.mov

	text = "Name length: {{ len .Name }}\n"
	t, _ = template.New("default").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// Name length: 6
}
```

## Action

`{{` 和 `}}` 为模板的分隔符，它们之间的内容叫做 Action.

### 注释

注释格式为 `/* */`，例如：

```
{{/* comments here */}}
```

### 空格

默认情况下，Action 之间的内容被原本保留。但是可以通过在分隔符旁边加上减号，可以去除 Action 旁边的空白字符（空格、换行等）：

- `{{-` 去除左侧空白字符
- `-}}` 去除右侧空白字符

例如：

```go
package main

import (
	"os"
	"text/template"
)

type Movie struct {
	Name  string
	Year  int
	Stars []string
}

var movie = &Movie{
	Name: "Avatar",
	Year: 2009,
	Stars: []string{
		"Sam Worthington",
		"Zoe Saldana",
		"Sigourney Weaver",
	},
}

func main() {
	text := `Name: {{ .Name }}
Year: {{ .Year }}
`
	t, _ := template.New("default").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// Name: Avatar
	// Year: 2009

	text = `Name: {{- .Name }}
Year: {{- .Year }}
`
	t, _ = template.New("default").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// Name:Avatar
	// Year:2009

	text = `Name: {{ .Name -}}
Year: {{ .Year -}}
`
	t, _ = template.New("default").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// Name: AvatarYear: 2009
}
```

### 条件

条件语句有如下形式：

- `{{if pipeline}} T1 {{end}}`
- `{{if pipeline}} T1 {{else}} T0 {{end}}`
- `{{if pipeline}} T1 {{else if pipeline}} T0 {{end}}`，等同于 `{{if pipeline}} T1 {{else}}{{if pipeline}} T0 {{end}}{{end}}`

其中 pipeline 会进行 truthy 判断，对于 `false`、`0`、`nil`、长度为0的 array、slice、map 等会认为是 false，其它情况为 true.

例如：

```go
package main

import (
	"os"
	"text/template"
)

type Movie struct {
	Name  string
	Year  int
	Stars []string
}

var movie = &Movie{
	Name: "Avatar",
	Year: 2009,
	Stars: []string{
		"Sam Worthington",
		"Zoe Saldana",
		"Sigourney Weaver",
	},
}

func main() {
	text := `{{ .Name }} was released {{ if lt .Year 2010 -}} before {{- else -}} after {{- end }} 2010.
`
	t, _ := template.New("default").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// Avatar was released after 2010.
}
```

### 循环

循环语句形式如下：

- `{{range pipeline}} T1 {{end}}`
- `{{range pipeline}} T1 {{else}} T0 {{end}}`

如果 pipeline 非空，则 T1 执行，否则 T0 执行。pipeline 需要为 array、slice、map 或 channel.

如果 pipeline 是 map，且 key 为普通值的话，则会按照 key 排序后执行。

例如：

```go
package main

import (
	"os"
	"strings"
	"text/template"
)

type Movie struct {
	Name  string
	Year  int
	Stars []string
}

var movie = &Movie{
	Name: "Avatar",
	Year: 2009,
	Stars: []string{
		"Sam Worthington",
		"Zoe Saldana",
		"Sigourney Weaver",
	},
}

func main() {
	text := `Name: {{ .Name }}
Year: {{ .Year }}
Stars:
  {{- range .Stars }}
  {{ . }}
  {{- end }}
`
	t, _ := template.New("default").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// Name: Avatar
	// Year: 2009
	// Stars:
	//   Sam Worthington
	//   Zoe Saldana
	//   Sigourney Weaver

	m := map[string]interface{}{
		"Name":  movie.Name,
		"Year":  movie.Year,
		"Stars": strings.Join(movie.Stars, ", "),
	}
	text = `
{{- range $key, $val := . }}
{{ $key }}: {{ $val }}
{{- end }}
`
	t, _ = template.New("default").Parse(text)
	t.Execute(os.Stdout, m)
	// Output:
	// Name: Avatar
	// Stars: Sam Worthington, Zoe Saldana, Sigourney Weaver
	// Year: 2009
}
```

### with

with 语句可以改变执行的上下文，例如：

```go
package main

import (
	"os"
	"text/template"
)

type Movie struct {
	Name  string
	Year  int
	Stars []string
}

var movie = &Movie{
	Name: "Avatar",
	Year: 2009,
	Stars: []string{
		"Sam Worthington",
		"Zoe Saldana",
		"Sigourney Weaver",
	},
}

func main() {
	text := `Name: {{ .Name }}
Year: {{ .Year }}
Stars:
{{- with .Stars }}
  {{- range . }}
  {{ . }}
  {{- end }}
{{- end }}
`
	t, _ := template.New("default").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// Name: Avatar
	// Year: 2009
	// Stars:
	//   Sam Worthington
	//   Zoe Saldana
	//   Sigourney Weaver
}
```

### 自定义分隔符

默认情况下，Action 的分隔符为 `{{` 和 `}}`，还可以自定义分隔符，例如：

```go
package main

import (
	"os"
	"text/template"
)

type Movie struct {
	Name  string
	Year  int
	Stars []string
}

var movie = &Movie{
	Name: "Avatar",
	Year: 2009,
	Stars: []string{
		"Sam Worthington",
		"Zoe Saldana",
		"Sigourney Weaver",
	},
}

func main() {
	text := "${.Name} was released in ${.Year}."
	t, _ := template.New("default").Delims("${", "}").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// Avatar was released in 2009.
}
```

## 变量

可以直接声明变量，也可以通过 `range` 来声明变量。例如：

```go
package main

import (
	"os"
	"text/template"
)

type Movie struct {
	Name  string
	Year  int
	Stars []string
}

var movie = &Movie{
	Name: "Avatar",
	Year: 2009,
	Stars: []string{
		"Sam Worthington",
		"Zoe Saldana",
		"Sigourney Weaver",
	},
}

func main() {
	text := `{{ $name := "avatar" -}}
{{ $name }} was released in {{ .Year }}.

{{ $name = "AVATAR" -}}
{{ $name }} was released in {{ .Year }}.
Stars:
  {{- range $index, $star := .Stars }}
  {{ $index }}. {{ $star }}
  {{- end }}
`
	t, _ := template.New("default").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// avatar was released in 2009.
	//
	// AVATAR was released in 2009.
	// Stars:
	//   0. Sam Worthington
	//   1. Zoe Saldana
	//   2. Sigourney Weaver
}
```

## 函数

### 函数调用

通过 `{{ functionName [Argument...] }}` 可以使用函数调用。完整内置函数可以参考 [text/template](https://pkg.go.dev/text/template). 例如：

```go
package main

import (
	"os"
	"text/template"
)

type Movie struct {
	Name  string
	Year  int
	Stars []string
}

var movie = &Movie{
	Name: "Avatar",
	Year: 2009,
	Stars: []string{
		"Sam Worthington",
		"Zoe Saldana",
		"Sigourney Weaver",
	},
}

func main() {
	text := `{{ .Name }} was released {{ if lt .Year 2010 -}} before {{- else -}} after {{- end }} 2010.
Stars:
  {{ index .Stars 0 }}
  {{ index .Stars 1 }}
  {{ index .Stars 2 }}
`
	t, _ := template.New("default").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// Avatar was released before 2010.
	// Stars:
	//   Sam Worthington
	//   Zoe Saldana
	//   Sigourney Weaver
}
```

### 自定义函数

可以通过自动定义函数来增强模板的功能。例如：

```go
package main

import (
	"encoding/base64"
	"fmt"
	"os"
	"reflect"
	"strings"
	"text/template"
)

type Movie struct {
	Name  string
	Year  int
	Stars []string
}

var movie = &Movie{
	Name: "Avatar",
	Year: 2009,
	Stars: []string{
		"Sam Worthington",
		"Zoe Saldana",
		"Sigourney Weaver",
	},
}

func main() {
	text := `Base64 Name: {{ base64 .Name }}
Stars: {{ join .Stars }}
`

	funcs := map[string]interface{}{
		"base64": func(item reflect.Value) string {
			return base64.StdEncoding.EncodeToString([]byte(item.String()))
		},

		"join": func(item reflect.Value) (string, error) {
			switch item.Kind() {
			case reflect.Array, reflect.Slice:
				var vals []string
				for i := 0; i < item.Len(); i++ {
					vals = append(vals, item.Index(i).String())
				}
				return strings.Join(vals, ", "), nil
			default:
				return "", fmt.Errorf("can't join item of type %s", item.Type())
			}
		},
	}
	t, _ := template.New("default").Funcs(funcs).Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// Base64 Name: QXZhdGFy
	// Stars: Sam Worthington, Zoe Saldana, Sigourney Weaver
}
```

## 模板嵌套

### define、template

通过 `define` 可以定义一个模板，然后通过 `template` 可以使用定义的模板。例如：

```go
package main

import (
	"os"
	"text/template"
)

type Movie struct {
	Name  string
	Year  int
	Stars []string
}

var movie = &Movie{
	Name: "Avatar",
	Year: 2009,
	Stars: []string{
		"Sam Worthington",
		"Zoe Saldana",
		"Sigourney Weaver",
	},
}

func main() {
	text := `
{{- define "name" }}Name: {{ . }}{{ end -}}
{{- define "year" }}Year: {{ . }}{{ end -}}
{{ template "name" .Name }}
{{ template "year" .Year }}
`
	t, _ := template.New("default").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// Name: Avatar
	// Year: 2009
}
```

### block

`block` 相当于 `define` 和 `template` 结合起来，例如：

```go
package main

import (
	"os"
	"text/template"
)

type Movie struct {
	Name  string
	Year  int
	Stars []string
}

var movie = &Movie{
	Name: "Avatar",
	Year: 2009,
	Stars: []string{
		"Sam Worthington",
		"Zoe Saldana",
		"Sigourney Weaver",
	},
}

func main() {
	text := `
{{- block "name" .Name -}}
Name: {{ . }}
{{- end }}
{{- block "year" .Year }}
Year: {{ . }}
{{- end }}
`
	t, _ := template.New("default").Parse(text)
	t.Execute(os.Stdout, movie)
	// Output:
	// Name: Avatar
	// Year: 2009
}
```
{% endraw %}