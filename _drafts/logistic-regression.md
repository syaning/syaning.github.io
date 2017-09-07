---
layout:     post
title:      Logistic Regression
---

### 1. Sigmoid

线性回归针对的是连续值，逻辑回归则是针对离散的二元分类。如图所示：

![]({{site.baseurl}}/images/stanford-ml/logistic-regression-1.png)

需要注意的是，虽然绘图是在二维平面内，但是数据其实是有三个维度：x1，x2 和 y。假设：

$$ f_\theta(x)=\theta^Tx=\theta_0+\theta_1x_1+\theta_2x_2 $$

则：

$$
\begin{array}{}
y = \begin{cases}
1 & {\text{if}}\ f_\theta(x)≥0 \\
0 & {\text{if}}\ f_\theta(x)<0 \\ 
\end{cases}
\end{array}
$$

令：

$$ h_\theta(x)=g(f_\theta(x))=g(\theta^Tx)=\frac{1}{1+e^{-\theta^Tx}} $$

如图：

![]({{site.baseurl}}/images/stanford-ml/logistic-regression-2.png)

则：

$$
\begin{array}{}
y = \begin{cases}
1 & {\text{if}}\ h_\theta(x)≥0.5 \\
0 & {\text{if}}\ h_\theta(x)<0.5 \\ 
\end{cases}
\end{array}
$$

---

### 2. Cost Function

令：

$$
\begin{array}{}
Cost(h_\theta(x),y) = \begin{cases}
-log(h_\theta(x)) & {\text{if}}\ y=1 \\
-log(1-h_\theta(x)) & {\text{if}}\ y=0 \\ 
\end{cases}
\end{array}
$$

图像如下：

![]({{site.baseurl}}/images/stanford-ml/logistic-regression-3.png)

- $$ y=1 $$ 时
    + 若 $$ h_\theta(x)=1 $$，则 $$ Cost=0 $$
    + 若 $$ h_\theta(x)=0 $$，则 $$ Cost\rightarrow\infty $$
- $$ y=0 $$ 时
    + 若 $$ h_\theta(x)=1 $$，则 $$ Cost\rightarrow\infty $$
    + 若 $$ h_\theta(x)=0 $$，则 $$ Cost=0 $$

将以上两种情况统一起来，可以得到：

$$ Cost(h_\theta(x),y)=-ylog(h_\theta(x))-(1-y)log(1-h_\theta(x)) $$

令：

$$ J(\theta)=\frac{1}{m}\sum_{i=1}^{m}Cost(h_\theta(x^{(i)}),y^{(i)})=-\frac{1}{m}\sum_{i=1}^{m}[y^{(i)}logh_\theta(x^{(i)})+(1-y^{(i)})log(1-h_\theta(x^{(i)}))] $$
