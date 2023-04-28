import{_ as e,o as t,c as a,V as o}from"./chunks/framework.16eef3c0.js";const s="/assets/17-1.7541ac10.png",n="/assets/17-2.9def00aa.png",r="/assets/17-3.16a98c2d.png",c="/assets/17-4.cdadea02.png",i="/assets/17-5.052c3776.png",T=JSON.parse('{"title":"DeepLearning笔记(17)——语音识别、关键字检测","description":"","frontmatter":{"layout":"post","title":"DeepLearning笔记(17)——语音识别、关键字检测","date":"2018-05-28 17:30:00 +0800"},"headers":[],"relativePath":"my/post/2018-05-28-dl-speech-rec.md"}'),_={name:"my/post/2018-05-28-dl-speech-rec.md"},p=o('<h2 id="_1-语音识别" tabindex="-1">1. 语音识别 <a class="header-anchor" href="#_1-语音识别" aria-label="Permalink to &quot;1. 语音识别&quot;">​</a></h2><p>语音识别主要要做的就是把语音输入转换为文字，如下图所示：</p><p><img src="'+s+'" alt=""></p><h3 id="_1-attention-model" tabindex="-1">（1）Attention Model <a class="header-anchor" href="#_1-attention-model" aria-label="Permalink to &quot;（1）Attention Model&quot;">​</a></h3><p>可以通过注意力模型来实现语音识别，如下图所示：</p><p><img src="'+n+'" alt=""></p><h3 id="_2-ctc" tabindex="-1">（2）CTC <a class="header-anchor" href="#_2-ctc" aria-label="Permalink to &quot;（2）CTC&quot;">​</a></h3><p>还有一种方法是使用CTC损失函数（Connectionist Temporal Classification）来做语音识别，相关论文可以参考 <a href="https://www.cs.toronto.edu/~graves/icml_2006.pdf" target="_blank" rel="noreferrer">Connectionist Temporal Classification: Labelling Unsegmented Sequence Data with Recurrent Neural Networks</a>。主要方法是使用一个输入和输出数量相等的RNN网络结构，例如：</p><p><img src="'+r+'" alt=""></p><p>输出可能为 <code>ttt_h_eee___ ___qqq__……</code>，其中下划线表示空字符，空格则为单词之间的分隔。因此这个输出通过空格来分割，然后将连续相同的字符合并为同一个字符，再去掉空字符，就可以得到输出的句子。</p><h2 id="_2-触发字检测" tabindex="-1">2. 触发字检测 <a class="header-anchor" href="#_2-触发字检测" aria-label="Permalink to &quot;2. 触发字检测&quot;">​</a></h2><p>许多电子设备可以通过语音唤醒，例如：</p><p><img src="'+c+'" alt=""></p><p>实现方法如下图所示：</p><p><img src="'+i+'" alt=""></p><p>使用一个RNN，对于触发字，标记为1，对于音频的其它部分，标记为0。然后进行训练。</p>',16),l=[p];function d(h,m,u,f,g,q){return t(),a("div",null,l)}const b=e(_,[["render",d]]);export{T as __pageData,b as default};
