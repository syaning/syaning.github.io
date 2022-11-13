import{_ as A,o as t,c as F,d as s,e as l,b as a,w as n,a as r,r as p}from"./app.9c5b3fde.js";const C="/assets/7-1.f97cb22d.png",i="/assets/7-2.f1a0a726.png",d="/assets/7-3.f4f5ceeb.png",T="/assets/7-4.bcc61b71.png",m="/assets/7-5.ca39314f.jpeg",G=JSON.parse('{"title":"DeepLearning\u7B14\u8BB0(7)\u2014\u2014\u7ECF\u5178\u7F51\u7EDC","description":"","frontmatter":{"layout":"post","title":"DeepLearning\u7B14\u8BB0(7)\u2014\u2014\u7ECF\u5178\u7F51\u7EDC","date":"2018-03-15 23:30:00 +0800"},"headers":[{"level":2,"title":"1. LeNet-5","slug":"_1-lenet-5","link":"#_1-lenet-5","children":[]},{"level":2,"title":"2. AlexNet","slug":"_2-alexnet","link":"#_2-alexnet","children":[]},{"level":2,"title":"3. VGG","slug":"_3-vgg","link":"#_3-vgg","children":[]}],"relativePath":"my/post/2018-03-15-dl-classical-netoworks.md"}'),Q={name:"my/post/2018-03-15-dl-classical-netoworks.md"},_=r("",8),g={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.05ex"},xmlns:"http://www.w3.org/2000/svg",width:"13.45ex",height:"1.579ex",role:"img",focusable:"false",viewBox:"0 -676 5944.9 698","aria-hidden":"true"},h=s("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[s("g",{"data-mml-node":"math"},[s("g",{"data-mml-node":"mn"},[s("path",{"data-c":"32",d:"M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z",style:{"stroke-width":"3"}}),s("path",{"data-c":"32",d:"M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z",transform:"translate(500,0)",style:{"stroke-width":"3"}}),s("path",{"data-c":"37",d:"M55 458Q56 460 72 567L88 674Q88 676 108 676H128V672Q128 662 143 655T195 646T364 644H485V605L417 512Q408 500 387 472T360 435T339 403T319 367T305 330T292 284T284 230T278 162T275 80Q275 66 275 52T274 28V19Q270 2 255 -10T221 -22Q210 -22 200 -19T179 0T168 40Q168 198 265 368Q285 400 349 489L395 552H302Q128 552 119 546Q113 543 108 522T98 479L95 458V455H55V458Z",transform:"translate(1000,0)",style:{"stroke-width":"3"}})]),s("g",{"data-mml-node":"mo",transform:"translate(1722.2,0)"},[s("path",{"data-c":"D7",d:"M630 29Q630 9 609 9Q604 9 587 25T493 118L389 222L284 117Q178 13 175 11Q171 9 168 9Q160 9 154 15T147 29Q147 36 161 51T255 146L359 250L255 354Q174 435 161 449T147 471Q147 480 153 485T168 490Q173 490 175 489Q178 487 284 383L389 278L493 382Q570 459 587 475T609 491Q630 491 630 471Q630 464 620 453T522 355L418 250L522 145Q606 61 618 48T630 29Z",style:{"stroke-width":"3"}})]),s("g",{"data-mml-node":"mn",transform:"translate(2722.4,0)"},[s("path",{"data-c":"32",d:"M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z",style:{"stroke-width":"3"}}),s("path",{"data-c":"32",d:"M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z",transform:"translate(500,0)",style:{"stroke-width":"3"}}),s("path",{"data-c":"37",d:"M55 458Q56 460 72 567L88 674Q88 676 108 676H128V672Q128 662 143 655T195 646T364 644H485V605L417 512Q408 500 387 472T360 435T339 403T319 367T305 330T292 284T284 230T278 162T275 80Q275 66 275 52T274 28V19Q270 2 255 -10T221 -22Q210 -22 200 -19T179 0T168 40Q168 198 265 368Q285 400 349 489L395 552H302Q128 552 119 546Q113 543 108 522T98 479L95 458V455H55V458Z",transform:"translate(1000,0)",style:{"stroke-width":"3"}})]),s("g",{"data-mml-node":"mo",transform:"translate(4444.7,0)"},[s("path",{"data-c":"D7",d:"M630 29Q630 9 609 9Q604 9 587 25T493 118L389 222L284 117Q178 13 175 11Q171 9 168 9Q160 9 154 15T147 29Q147 36 161 51T255 146L359 250L255 354Q174 435 161 449T147 471Q147 480 153 485T168 490Q173 490 175 489Q178 487 284 383L389 278L493 382Q570 459 587 475T609 491Q630 491 630 471Q630 464 620 453T522 355L418 250L522 145Q606 61 618 48T630 29Z",style:{"stroke-width":"3"}})]),s("g",{"data-mml-node":"mn",transform:"translate(5444.9,0)"},[s("path",{"data-c":"33",d:"M127 463Q100 463 85 480T69 524Q69 579 117 622T233 665Q268 665 277 664Q351 652 390 611T430 522Q430 470 396 421T302 350L299 348Q299 347 308 345T337 336T375 315Q457 262 457 175Q457 96 395 37T238 -22Q158 -22 100 21T42 130Q42 158 60 175T105 193Q133 193 151 175T169 130Q169 119 166 110T159 94T148 82T136 74T126 70T118 67L114 66Q165 21 238 21Q293 21 321 74Q338 107 338 175V195Q338 290 274 322Q259 328 213 329L171 330L168 332Q166 335 166 348Q166 366 174 366Q202 366 232 371Q266 376 294 413T322 525V533Q322 590 287 612Q265 626 240 626Q208 626 181 615T143 592T132 580H135Q138 579 143 578T153 573T165 566T175 555T183 540T186 520Q186 498 172 481T127 463Z",style:{"stroke-width":"3"}})])])],-1),u=[h],v=r("",13);function f(x,V,L,k,w,E){const o=p("mn"),e=p("mo"),c=p("math"),D=p("mjx-assistive-mml"),y=p("mjx-container");return t(),F("div",null,[_,s("blockquote",null,[s("p",null,[l("\u8F93\u5165\u5E94\u8BE5\u662F "),a(y,{class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},{default:n(()=>[(t(),F("svg",g,u)),a(D,{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},{default:n(()=>[a(c,{xmlns:"http://www.w3.org/1998/Math/MathML"},{default:n(()=>[a(o,null,{default:n(()=>[l("227")]),_:1}),a(e,null,{default:n(()=>[l("\xD7")]),_:1}),a(o,null,{default:n(()=>[l("227")]),_:1}),a(e,null,{default:n(()=>[l("\xD7")]),_:1}),a(o,null,{default:n(()=>[l("3")]),_:1})]),_:1})]),_:1})]),_:1}),l("\uFF0C\u8BBA\u6587\u4E2D\u7684\u56FE\u7247\u6807\u6CE8\u6709\u8BEF\u3002")])]),v])}const M=A(Q,[["render",f]]);export{G as __pageData,M as default};
