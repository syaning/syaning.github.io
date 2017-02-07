---
layout: post
title:  matplotlib绘图——柱状图
---

### 1. 基本的柱状图

```py
import matplotlib.pyplot as plt

data = [5, 20, 15, 25, 10]

plt.bar(range(len(data)), data)
plt.show()
```

![]({{site.baseurl}}/images/matplotlib/bar_1.png)

`plt.bar`函数签名为：

```py
bar(left, height, width=0.8, bottom=None, **kwargs)
```

事实上，`left`，`height`，`width`，`bottom`这四个参数确定了柱体的位置和大小。默认情况下，`left`为柱体的居中位置（可以通过`align`参数来改变`left`值的含义），即：

- `(left - width / 2, bottom)`为左下角位置
- `(left + width / 2, bottom + height)`为右上角位置

例如：

```py
import matplotlib.pyplot as plt

data = [5, 20, 15, 25, 10]

plt.bar([0.3, 1.7, 4, 6, 7], data, width=0.6, bottom=[10, 0, 5, 0, 5])
plt.show()
```

![]({{site.baseurl}}/images/matplotlib/bar_2.png)

### 2. 设置柱体样式

（1）颜色

通过`facecolor(或fc)`关键字参数可以设置柱体颜色，例如：

```py
import matplotlib.pyplot as plt

data = [5, 20, 15, 25, 10]

plt.bar(range(len(data)), data, fc='g')
plt.show()
```

![]({{site.baseurl}}/images/matplotlib/bar_3.png)

通过`color`关键字参数 可以一次性设置多个颜色，例如：

```py
import matplotlib.pyplot as plt

data = [5, 20, 15, 25, 10]

plt.bar(range(len(data)), data, color='rgb') # or `color=['r', 'g', 'b']`
plt.show()
```

![]({{site.baseurl}}/images/matplotlib/bar_4.png)

（2）描边

相关的关键字参数为：

- edgecolor 或 ec
- linestyle 或 ls
- linewidth 或 lw

例如：

```py
import matplotlib.pyplot as plt

data = [5, 20, 15, 25, 10]

plt.bar(range(len(data)), data, ec='r', ls='--', lw=2)
plt.show()
```

![]({{site.baseurl}}/images/matplotlib/bar_5.png)

（3）填充

`hatch`关键字可用来设置填充样式，可取值为：`/`, `\`, `|`, `-`, `+`, `x`, `o`, `O`, `.`, `*`。例如：

```py
import matplotlib.pyplot as plt

data = [5, 20, 15, 25, 10]

plt.bar(range(len(data)), data, ec='k', lw=1, hatch='o')
plt.show()
```

![]({{site.baseurl}}/images/matplotlib/bar_6.png)