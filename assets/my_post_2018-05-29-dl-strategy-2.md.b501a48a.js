import{_ as s,o as a,c as n,a as e}from"./app.9c5b3fde.js";const l="/assets/19-1.4e2d1af3.png",p="/assets/19-2.eaf031da.png",D=JSON.parse('{"title":"DeepLearning\u7B14\u8BB0(19)\u2014\u2014\u673A\u5668\u5B66\u4E60\u7B56\u75652","description":"","frontmatter":{"layout":"post","title":"DeepLearning\u7B14\u8BB0(19)\u2014\u2014\u673A\u5668\u5B66\u4E60\u7B56\u75652","date":"2018-05-29 18:50:00 +0800"},"headers":[{"level":2,"title":"1. \u8BEF\u5DEE\u5206\u6790","slug":"_1-\u8BEF\u5DEE\u5206\u6790","link":"#_1-\u8BEF\u5DEE\u5206\u6790","children":[]},{"level":2,"title":"2. \u6837\u672C\u6807\u6CE8\u9519\u8BEF","slug":"_2-\u6837\u672C\u6807\u6CE8\u9519\u8BEF","link":"#_2-\u6837\u672C\u6807\u6CE8\u9519\u8BEF","children":[]},{"level":2,"title":"3. \u6570\u636E\u4E0D\u5339\u914D\u95EE\u9898","slug":"_3-\u6570\u636E\u4E0D\u5339\u914D\u95EE\u9898","link":"#_3-\u6570\u636E\u4E0D\u5339\u914D\u95EE\u9898","children":[]},{"level":2,"title":"4. \u8FC1\u79FB\u5B66\u4E60","slug":"_4-\u8FC1\u79FB\u5B66\u4E60","link":"#_4-\u8FC1\u79FB\u5B66\u4E60","children":[]},{"level":2,"title":"5. \u591A\u4EFB\u52A1\u5B66\u4E60","slug":"_5-\u591A\u4EFB\u52A1\u5B66\u4E60","link":"#_5-\u591A\u4EFB\u52A1\u5B66\u4E60","children":[]},{"level":2,"title":"6. \u7AEF\u5230\u7AEF\u7684\u6DF1\u5EA6\u5B66\u4E60","slug":"_6-\u7AEF\u5230\u7AEF\u7684\u6DF1\u5EA6\u5B66\u4E60","link":"#_6-\u7AEF\u5230\u7AEF\u7684\u6DF1\u5EA6\u5B66\u4E60","children":[]}],"relativePath":"my/post/2018-05-29-dl-strategy-2.md"}'),t={name:"my/post/2018-05-29-dl-strategy-2.md"},r=e(`<h2 id="_1-\u8BEF\u5DEE\u5206\u6790" tabindex="-1">1. \u8BEF\u5DEE\u5206\u6790 <a class="header-anchor" href="#_1-\u8BEF\u5DEE\u5206\u6790" aria-hidden="true">#</a></h2><p>\u5047\u8BBE\u8BAD\u7EC3\u4E00\u4E2A\u732B\u56FE\u7247\u5206\u7C7B\u7684\u6A21\u578B\uFF0C\u76EE\u524D\u6709\u4E8690%\u7684\u51C6\u786E\u7387\u3002\u9519\u8BEF\u7684\u6837\u672C\u4E2D\uFF0C\u6709\u7684\u662F\u5C06\u72D7\u8BA4\u4E3A\u662F\u732B\uFF0C\u6709\u7684\u662F\u7531\u4E8E\u56FE\u7247\u592A\u6A21\u7CCA\uFF0C\u8FD8\u6709\u7684\u662F\u5176\u5B83\u539F\u56E0\u3002\u90A3\u4E48\u7A76\u7ADF\u5411\u54EA\u4E2A\u65B9\u5411\u53BB\u6539\u8FDB\u662F\u6536\u76CA\u6BD4\u8F83\u9AD8\u7684\u5462\uFF1F\u53EF\u4EE5\u9009\u53D6\u4E00\u90E8\u5206\u9519\u8BEF\u6570\u636E\u8FDB\u884C\u7EDF\u8BA1\u5206\u6790\uFF0C\u7136\u540E\u6BD4\u8F83\u5404\u4E2A\u51FA\u9519\u539F\u56E0\u7684\u6BD4\u4F8B\u3002\u5BF9\u4E8E\u90A3\u4E9B\u5360\u6BD4\u8F83\u9AD8\u7684\u9519\u8BEF\u539F\u56E0\uFF0C\u662F\u6BD4\u8F83\u597D\u7684\u52AA\u529B\u65B9\u5411\u3002\u4F8B\u5982\u9519\u6570\u636E\u4E2D\u670950%\u90FD\u662F\u56E0\u4E3A\u56FE\u7247\u6A21\u7CCA\uFF0C\u90A3\u4E48\u53BB\u52AA\u529B\u6539\u8FDB\u6A21\u578B\u5BF9\u6A21\u7CCA\u56FE\u7247\u7684\u5904\u7406\u80FD\u529B\uFF0C\u662F\u6BD4\u8F83\u503C\u5F97\u53BB\u505A\u7684\u3002</p><h2 id="_2-\u6837\u672C\u6807\u6CE8\u9519\u8BEF" tabindex="-1">2. \u6837\u672C\u6807\u6CE8\u9519\u8BEF <a class="header-anchor" href="#_2-\u6837\u672C\u6807\u6CE8\u9519\u8BEF" aria-hidden="true">#</a></h2><p>\u6709\u4E9B\u65F6\u5019\uFF0C\u8BAD\u7EC3\u96C6\u91CC\u7684\u90E8\u5206\u6837\u672C\u5B58\u5728\u7740\u6807\u6CE8\u9519\u8BEF\u3002\u4F8B\u5982\u4E00\u5F20\u5C0F\u72D7\u7684\u56FE\u7247\uFF0C\u5374\u88AB\u6807\u8BB0\u4E3A\u662F\u732B\u3002\u5982\u679C\u6837\u672C\u91CF\u6BD4\u8F83\u5927\uFF0C\u800C\u6807\u8BB0\u9519\u8BEF\u662F\u968F\u673A\u7684\u4E14\u5360\u6BD4\u8F83\u5C11\uFF0C\u90A3\u4E48\u53EF\u4EE5\u4E0D\u7528\u53BB\u8003\u8651\u4FEE\u590D\uFF0C\u6A21\u578B\u4F9D\u7136\u53EF\u4EE5\u5F88\u597D\u5730\u9002\u5E94\u3002\u6DF1\u5EA6\u5B66\u4E60\u7B97\u6CD5\u867D\u7136\u5BF9\u968F\u673A\u8BEF\u5DEE\u4E0D\u654F\u611F\uFF0C\u4F46\u662F\u5BF9\u4E8E\u7CFB\u7EDF\u6027\u7684\u8BEF\u5DEE\uFF0C\u5219\u4F1A\u5B66\u4E60\u5230\u9519\u8BEF\u7684\u4FE1\u606F\u3002\u4F8B\u5982\u5982\u679C\u767D\u8272\u7684\u72D7\u72D7\u56FE\u7247\u90FD\u88AB\u6807\u6CE8\u6210\u4E86\u732B\uFF0C\u5219\u6700\u540E\u6A21\u578B\u4F1A\u8BA4\u4E3A\u767D\u8272\u7684\u72D7\u72D7\u662F\u732B\u3002</p><p>\u90A3\u4E48\u5982\u679C\u5F00\u53D1\u96C6\u548C\u6D4B\u8BD5\u96C6\u5B58\u5728\u6807\u6CE8\u9519\u8BEF\u5462\uFF1F\u53EF\u4EE5\u5728\u8BEF\u5DEE\u5206\u6790\u7684\u65F6\u5019\u540C\u65F6\u7EDF\u8BA1\u6837\u672C\u662F\u5426\u6709\u6807\u6CE8\u9519\u8BEF\u3002\u5982\u679C\u7531\u4E8E\u6807\u6CE8\u9519\u8BEF\u5BFC\u81F4\u7684\u5F00\u53D1\u96C6\u6216\u6D4B\u8BD5\u96C6\u8BEF\u5DEE\u8F83\u9AD8\uFF0C\u90A3\u4E48\u5C31\u9700\u8981\u53BB\u4FEE\u590D\u8FD9\u4E9B\u9519\u8BEF\u7684\u6807\u6CE8\u3002\u53CD\u4E4B\uFF0C\u53EF\u4EE5\u6682\u4E0D\u8003\u8651\uFF0C\u6216\u8005\u4E0D\u4F5C\u4E3A\u91CD\u70B9\u8003\u8651\u3002</p><h2 id="_3-\u6570\u636E\u4E0D\u5339\u914D\u95EE\u9898" tabindex="-1">3. \u6570\u636E\u4E0D\u5339\u914D\u95EE\u9898 <a class="header-anchor" href="#_3-\u6570\u636E\u4E0D\u5339\u914D\u95EE\u9898" aria-hidden="true">#</a></h2><p>\u6709\u4E9B\u60C5\u51B5\u4E0B\uFF0C\u4F1A\u5B58\u5728\u6570\u636E\u4E0D\u4E00\u81F4\u7684\u95EE\u9898\u3002\u4F8B\u5982\u8BAD\u7EC3\u4E00\u4E2A\u732B\u56FE\u7247\u7684\u5206\u7C7B\u6A21\u578B\uFF0C\u6837\u672C\u670920W\u662F\u7F51\u4E0A\u6293\u53D6\u7684\u9AD8\u6E05\u56FE\u7247\uFF0C\u8FD8\u67091W\u7528\u6237\u62CD\u7684\u6A21\u7CCA\u7684\u56FE\u7247\u3002\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u8981\u4FDD\u8BC1\u5F00\u53D1\u96C6\u548C\u6D4B\u8BD5\u96C6\u7684\u6570\u636E\u5206\u5E03\u4E00\u76F4\uFF0C\u8BAD\u7EC3\u96C6\u7684\u6570\u636E\u548C\u5F00\u53D1\u96C6\u7684\u6570\u636E\u5206\u5E03\u53EF\u4EE5\u4E0D\u4E00\u81F4\u3002\u7136\u540E\u8981\u4ECE\u8BAD\u7EC3\u96C6\u4E2D\u5212\u5206\u51FA\u4E00\u90E8\u5206\u4F5C\u4E3A\u8BAD\u7EC3\u5F00\u53D1\u96C6\u3002\u5982\u56FE\u6240\u793A\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">                       dev test</span></span>
<span class="line"><span style="color:#A6ACCD;">                        \u2193   \u2193</span></span>
<span class="line"><span style="color:#A6ACCD;">+----------------+----+---+---+</span></span>
<span class="line"><span style="color:#A6ACCD;">|                |    |   |   |</span></span>
<span class="line"><span style="color:#A6ACCD;">+----------------+----+---+---+</span></span>
<span class="line"><span style="color:#A6ACCD;">       \u2191           \u2191</span></span>
<span class="line"><span style="color:#A6ACCD;">     train     train-dev</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u7136\u540E\u5206\u6790\u5404\u4E2A\u9636\u6BB5\u7684\u8BEF\u5DEE\uFF0C\u6765\u5206\u6790\u6A21\u578B\u7684\u6539\u8FDB\u4E4B\u5904\uFF0C\u5982\u4E0B\u56FE\u6240\u793A\uFF1A</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">Human-Level Error ---</span></span>
<span class="line"><span style="color:#A6ACCD;">                   \u2191</span></span>
<span class="line"><span style="color:#A6ACCD;">                   | avoidable bias</span></span>
<span class="line"><span style="color:#A6ACCD;">                   \u2193</span></span>
<span class="line"><span style="color:#A6ACCD;">      Train Error ---</span></span>
<span class="line"><span style="color:#A6ACCD;">                   \u2191</span></span>
<span class="line"><span style="color:#A6ACCD;">                   | variance</span></span>
<span class="line"><span style="color:#A6ACCD;">                   \u2193</span></span>
<span class="line"><span style="color:#A6ACCD;">  Train-Dev Error ---</span></span>
<span class="line"><span style="color:#A6ACCD;">                   \u2191</span></span>
<span class="line"><span style="color:#A6ACCD;">                   | data mismatch</span></span>
<span class="line"><span style="color:#A6ACCD;">                   \u2193</span></span>
<span class="line"><span style="color:#A6ACCD;">        Dev Error ---</span></span>
<span class="line"><span style="color:#A6ACCD;">                   \u2191</span></span>
<span class="line"><span style="color:#A6ACCD;">                   | degree of overfitting to dev set</span></span>
<span class="line"><span style="color:#A6ACCD;">                   \u2193</span></span>
<span class="line"><span style="color:#A6ACCD;">       Test Error ---</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="_4-\u8FC1\u79FB\u5B66\u4E60" tabindex="-1">4. \u8FC1\u79FB\u5B66\u4E60 <a class="header-anchor" href="#_4-\u8FC1\u79FB\u5B66\u4E60" aria-hidden="true">#</a></h2><p>\u5373\u5C06\u5DF2\u7ECF\u8BAD\u7EC3\u597D\u7684\u6A21\u578B\u7684\u53C2\u6570\u5E94\u7528\u5230\u65B0\u6A21\u578B\u7684\u8BAD\u7EC3\u4E0A\u3002\u56E0\u4E3A\u5F88\u591A\u4F4E\u5C42\u6B21\u7684\u7279\u5F81\u662F\u76F8\u5BF9\u901A\u7528\u7684\uFF0C\u4F8B\u5982\u8FB9\u7F18\u68C0\u6D4B\u7B49\u3002\u901A\u5E38\u7684\u505A\u6CD5\u662F\u5C06\u8BAD\u7EC3\u597D\u7684\u6A21\u578B\u7684\u8F93\u51FA\u5C42\u53BB\u6389\uFF0C\u7136\u540E\u540E\u9762\u52A0\u4E0A\u4E00\u5C42\u6216\u591A\u5C42\u7F51\u7EDC\u7ED3\u6784\u63A5\u7740\u8BAD\u7EC3\u3002\u5982\u56FE\u6240\u793A\uFF1A</p><p><img src="`+l+'" alt=""></p><h2 id="_5-\u591A\u4EFB\u52A1\u5B66\u4E60" tabindex="-1">5. \u591A\u4EFB\u52A1\u5B66\u4E60 <a class="header-anchor" href="#_5-\u591A\u4EFB\u52A1\u5B66\u4E60" aria-hidden="true">#</a></h2><p>\u4F8B\u5982\u8981\u8BAD\u7EC3\u4E00\u4E2A\u81EA\u52A8\u9A7E\u9A76\u7CFB\u7EDF\uFF0C\u9700\u8981\u8BC6\u522B\u8F66\u8F86\u3001\u884C\u4EBA\u3001\u4FE1\u53F7\u706F\u3001\u8DEF\u6807\u7B49\u5404\u79CD\u6807\u8BC6\u3002\u53EF\u4EE5\u5BF9\u6BCF\u4E00\u79CD\u9700\u8981\u8BC6\u522B\u7684\u7269\u4F53\u90FD\u5206\u522B\u8BAD\u7EC3\u4E00\u4E2A\u6A21\u578B\u6765\u8FDB\u884C\u8BC6\u522B\u3002\u4F46\u66F4\u597D\u7684\u505A\u6CD5\u662F\u901A\u8FC7\u4E00\u4E2A\u6A21\u578B\u6765\u8BC6\u522B\u8FD9\u591A\u79CD\u7269\u4F53\u3002\u591A\u4EFB\u52A1\u5B66\u4E60\u5E38\u7528\u8BED\u8BA1\u7B97\u673A\u89C6\u89C9\u9886\u57DF\u3002</p><h2 id="_6-\u7AEF\u5230\u7AEF\u7684\u6DF1\u5EA6\u5B66\u4E60" tabindex="-1">6. \u7AEF\u5230\u7AEF\u7684\u6DF1\u5EA6\u5B66\u4E60 <a class="header-anchor" href="#_6-\u7AEF\u5230\u7AEF\u7684\u6DF1\u5EA6\u5B66\u4E60" aria-hidden="true">#</a></h2><p><img src="'+p+'" alt=""></p>',17),o=[r];function c(i,d,C,_,A,h){return a(),n("div",null,o)}const u=s(t,[["render",c]]);export{D as __pageData,u as default};
