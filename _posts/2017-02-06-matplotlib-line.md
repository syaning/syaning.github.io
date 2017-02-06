---
layout: post
title:  matplotlib绘图——line
date:   2018-02-06 17:20:00 +0800
---

### 1. line chart

```py
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 2 * np.pi, 100)
y1, y2 = np.sin(x), np.cos(x)

plt.plot(x, y1)
plt.plot(x, y2)
plt.show()
```

![]({{site.baseurl}}/images/matplotlib/line_1.png)

### 2. 线的样式

（1）颜色

`plot`方法的关键字参数`color/c`用来设置线的颜色。可取值为：

- 颜色名称或简写
    + b: blue
    + g: green
    + r: red
    + c: cyan
    + m: magenta
    + y: yellow
    + k: black
    + w: white
- #rrggbb
- (r, g, b) 或 (r, g, b, a)，其中 r g b a 取均为[0, 1]之间
- [0, 1]之间的浮点数的字符串形式，表示灰度值。0表示黑色，1表示透明

（2）样式

`plot`方法的关键字参数`linestyle/ls`用来设置线的样式。可取值为：

- `-`, `solid`
- `--`, `dashed`
- `-.`, `dashdot`
- `:`, `dotted`
- `''`, `' '`, `None`

（3）粗细

设置`plot`方法的关键字参数`linewidth/lw`可以改变线的粗细，其值为浮点数。

```py
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 2 * np.pi, 100)
y1, y2 = np.sin(x), np.cos(x)

plt.plot(x, y1, c='r', ls='--', lw=3)
plt.plot(x, y2, c='#526922', ls='-.')
plt.show()
```

![]({{site.baseurl}}/images/matplotlib/line_2.png)