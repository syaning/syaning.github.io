---
layout: post
title:  Neural Network
---

### 1. Neural Network

![]({{site.baseurl}}/images/stanford-ml/neural-network-1.png)

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
