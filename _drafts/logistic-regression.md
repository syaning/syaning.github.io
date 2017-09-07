---
layout:     post
title:      Logistic Regression
---

线性回归针对的是连续值，逻辑回归则是针对离散的二元分类。如图所示：

![]({{site.baseurl}}/images/stanford-ml/logistic-regression-1.png)

需要注意的是，虽然绘图是在二位平面内，但是数据其实是有三个维度：x1，x2 和 y。假设：

$$ f_\theta(x)=\theta^Tx=\theta_0+\theta_1x_1+\theta_2x_2 $$

则：

$$
\begin{array}{}
y = \begin{cases}
1  & f_\theta(x)≥0 \\
0 & f_\theta(x)<0 \\ 
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
1  & h_\theta(x)≥0.5 \\
0 & h_\theta(x)<0.5 \\ 
\end{cases}
\end{array}
$$
