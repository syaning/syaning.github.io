---
layout: post
title:  Neural Network
---

### 1. Neural Network

![]({{site.baseurl}}/images/stanford-ml/neural-network-1.svg)

- $$ a_i^{(j)}$$：第 $$j$$ 层的第 $$i$$ 个激励单元
- $$ \Theta^{(j)} $$：第 $$j$$ 层到第 $$j+1$$ 层映射的权重矩阵

$$
\begin{array}{}
a_1^{(2)}=g(\Theta_{10}^{(1)}x_0+\Theta_{11}^{(1)}x_1+\Theta_{12}^{(1)}x_2+\Theta_{13}^{(1)}x_3) \\
a_2^{(2)}=g(\Theta_{20}^{(1)}x_0+\Theta_{21}^{(1)}x_1+\Theta_{22}^{(1)}x_2+\Theta_{23}^{(1)}x_3) \\
a_3^{(2)}=g(\Theta_{30}^{(1)}x_0+\Theta_{31}^{(1)}x_1+\Theta_{32}^{(1)}x_2+\Theta_{33}^{(1)}x_3) \\
h_\Theta(x)=a_1^{(3)}=g(\Theta_{10}^{(2)}a_0^{(2)}+\Theta_{11}^{(2)}a_1^{(2)}+\Theta_{12}^{(2)}a_2^{(2)}+\Theta_{13}^{(2)}a_3^{(2)}) \\
\end{array}
$$

假设第 $$j$$ 层单元数为 $$s_j$$（不包括偏置单元），第 $$j+1$$ 层单元数为 $$s_{j+1}$$，则 $$ \Theta_j \in s_{j+1}\times(s_j+1) $$。

### 2. Cost Function

- $$L$$：总层数
- $$s_l$$：第 $$l$$ 层的单元数（不包括偏置单元）
- $$m$$：样本个数
- $$K$$：输出单元数

$$ J(\Theta)=-\frac{1}{m}\sum_{i=1}^{m}\sum_{k=1}^{K}[y_k^{(i)}log(h_\Theta(x^{(i)}))_k+(1-y_k^{(i)})log(1-(h_\Theta(x^{(i)}))_k)]+\frac{\lambda}{2m}\sum_{l=1}^{L-1}\sum_{i=1}^{s_l}\sum_{j=1}^{s_{l+1}}(\Theta_{ji}^{(l)})^2 $$
