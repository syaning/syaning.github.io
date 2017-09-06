---
layout: post
title:  Linear Regression
---

### 1. 单一变量线性回归

我们假设：

$$ h_\theta(x)=\theta_0+\theta_1x $$

则 cost function 为：

$$ J(\theta_0,\theta_1)=\frac{1}{2m}\sum_{i=1}^{m}(h_\theta(x^{(i)})-y^{(i)})^2 $$

我们的目标是：

$$ min_\left(\theta_0,\theta_1\right)J(\theta_0,\theta_1) $$

同时更新 $$\theta_0$$ 和 $$\theta_1$$：

$$ \theta_j:=\theta_j-\alpha\frac{\partial}{\partial\theta_j}J(\theta_0,\theta_1) $$

即：

$$ \begin{array}{lll} \theta_0:=\theta_0-\alpha\frac{1}{m}\sum_{i=1}^{m}(h_\theta(x^\left(i\right))-y^\left(i\right)) \\ \theta_1:=\theta_1-\alpha\frac{1}{m}\sum_{i=1}^{m}(h_\theta(x^\left(i\right))-y^\left(i\right))x^\left(i\right) \end{array} $$

其中 $$\alpha$$ 为学习速率：

- $$\alpha$$ 过小，梯度下降缓慢
- $$\alpha$$ 过大，则可能跳过最小值，导致收敛失败，甚至发散

### 2. 多变量线性回归

我们假设：

$$ h_\theta(x)=\theta^Tx=\theta_0x_0+\theta_1x_1+\theta_2x_2+...+\theta_nx_n $$

则 cost function 为：

$$ J(\theta)=\frac{1}{2m}\sum_{i=1}^{m}(h_\theta(x^\left(i\right))-y^\left(i\right))^2 $$

我们的目标是：

$$ min_\left(\theta\right)J(\theta) $$

更新 $$ \theta $$：

$$ \theta_j:=\theta_j-\frac{\partial}{\partial\theta_j}J(\theta) $$

即对于 $$ j=0,1,2,...,n $$：

$$ \theta_j:=\theta_j-\alpha\frac{1}{m}\sum_{i=1}^{m}(h_\theta(x^\left(i\right))-y^\left(i\right))x_j^\left(i\right) $$

假设有 m 个样本，每个样本有 n 个特征，即：

$$
X=\left( \begin{array}{}
1 & x_1^{(1)} & ... & x_n^{(1)} \\
1 & x_1^{(2)}  & ... & x_n^{(2)} \\
... & ... & ... & ... \\
1 & x_1^{(m)}  & ... & x_n^{(m)}
\end{array}\right),
\Theta=\left(\begin{array}{}
\theta_0\\\theta_1\\...\\\theta_n\end{array}\right),
Y=\left(\begin{array}{}
y^{(1)}\\y^{(2)}\\...\\y^{(m)}\end{array}\right)
$$

则每次梯度下降运行后：

$$ \Theta:=\Theta-X^T(X\Theta-Y) $$

### 3. 特征标准化

$$ x'=\frac{x-\overline{x}}{\sigma} $$

其中 $$ \sigma $$ 为标准差：

$$ \sigma=\sqrt{\frac{1}{n-1}\sum_{i=1}^{n}{(x^{(i)}-\overline{x})}^2} $$