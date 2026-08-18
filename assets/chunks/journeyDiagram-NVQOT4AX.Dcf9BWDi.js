import{g as gt}from"./chunk-5VM5RSS4.DN7qr1lc.js";import{d as mt,h as xt,g as lt,b as kt}from"./chunk-2GRJ4B5K.CxAECPPp.js";import{_ as s,d as R,o as _t,p as bt,s as vt,g as wt,c as Tt,b as St,q as $t,j as G,k as Mt}from"../app.BGb9NtmC.js";import{d as nt}from"./arc.B93ADcwe.js";import"./framework.Czrn5xjl.js";import"./theme.DXOOlKi_.js";var U=function(){var t=s(function(h,i,r,l){for(r=r||{},l=h.length;l--;r[h[l]]=i);return r},"o"),e=[6,8,10,11,12,14,16,17,18],a=[1,9],f=[1,10],n=[1,11],u=[1,12],p=[1,13],o=[1,14],g={trace:s(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:s(function(i,r,l,d,y,c,b){var k=c.length-1;switch(y){case 1:return c[k-1];case 2:this.$=[];break;case 3:c[k-1].push(c[k]),this.$=c[k-1];break;case 4:case 5:this.$=c[k];break;case 6:case 7:this.$=[];break;case 8:d.setDiagramTitle(c[k].substr(6)),this.$=c[k].substr(6);break;case 9:this.$=c[k].trim(),d.setAccTitle(this.$);break;case 10:case 11:this.$=c[k].trim(),d.setAccDescription(this.$);break;case 12:d.addSection(c[k].substr(8)),this.$=c[k].substr(8);break;case 13:d.addTask(c[k-1],c[k]),this.$="task";break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:a,12:f,14:n,16:u,17:p,18:o},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:a,12:f,14:n,16:u,17:p,18:o},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:s(function(i,r){if(r.recoverable)this.trace(i);else{var l=new Error(i);throw l.hash=r,l}},"parseError"),parse:s(function(i){var r=this,l=[0],d=[],y=[null],c=[],b=this.table,k="",C=0,Q=0,dt=2,D=1,yt=c.slice.call(arguments,1),_=Object.create(this.lexer),I={yy:{}};for(var O in this.yy)Object.prototype.hasOwnProperty.call(this.yy,O)&&(I.yy[O]=this.yy[O]);_.setInput(i,I.yy),I.yy.lexer=_,I.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var Y=_.yylloc;c.push(Y);var ft=_.options&&_.options.ranges;typeof I.yy.parseError=="function"?this.parseError=I.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function pt(w){l.length=l.length-2*w,y.length=y.length-w,c.length=c.length-w}s(pt,"popStack");function tt(){var w;return w=d.pop()||_.lex()||D,typeof w!="number"&&(w instanceof Array&&(d=w,w=d.pop()),w=r.symbols_[w]||w),w}s(tt,"lex");for(var v,A,T,q,F={},N,M,et,z;;){if(A=l[l.length-1],this.defaultActions[A]?T=this.defaultActions[A]:((v===null||typeof v>"u")&&(v=tt()),T=b[A]&&b[A][v]),typeof T>"u"||!T.length||!T[0]){var X="";z=[];for(N in b[A])this.terminals_[N]&&N>dt&&z.push("'"+this.terminals_[N]+"'");_.showPosition?X="Parse error on line "+(C+1)+`:
`+_.showPosition()+`
Expecting `+z.join(", ")+", got '"+(this.terminals_[v]||v)+"'":X="Parse error on line "+(C+1)+": Unexpected "+(v==D?"end of input":"'"+(this.terminals_[v]||v)+"'"),this.parseError(X,{text:_.match,token:this.terminals_[v]||v,line:_.yylineno,loc:Y,expected:z})}if(T[0]instanceof Array&&T.length>1)throw new Error("Parse Error: multiple actions possible at state: "+A+", token: "+v);switch(T[0]){case 1:l.push(v),y.push(_.yytext),c.push(_.yylloc),l.push(T[1]),v=null,Q=_.yyleng,k=_.yytext,C=_.yylineno,Y=_.yylloc;break;case 2:if(M=this.productions_[T[1]][1],F.$=y[y.length-M],F._$={first_line:c[c.length-(M||1)].first_line,last_line:c[c.length-1].last_line,first_column:c[c.length-(M||1)].first_column,last_column:c[c.length-1].last_column},ft&&(F._$.range=[c[c.length-(M||1)].range[0],c[c.length-1].range[1]]),q=this.performAction.apply(F,[k,Q,C,I.yy,T[1],y,c].concat(yt)),typeof q<"u")return q;M&&(l=l.slice(0,-1*M*2),y=y.slice(0,-1*M),c=c.slice(0,-1*M)),l.push(this.productions_[T[1]][0]),y.push(F.$),c.push(F._$),et=b[l[l.length-2]][l[l.length-1]],l.push(et);break;case 3:return!0}}return!0},"parse")},m=function(){var h={EOF:1,parseError:s(function(r,l){if(this.yy.parser)this.yy.parser.parseError(r,l);else throw new Error(r)},"parseError"),setInput:s(function(i,r){return this.yy=r||this.yy||{},this._input=i,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:s(function(){var i=this._input[0];this.yytext+=i,this.yyleng++,this.offset++,this.match+=i,this.matched+=i;var r=i.match(/(?:\r\n?|\n).*/g);return r?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),i},"input"),unput:s(function(i){var r=i.length,l=i.split(/(?:\r\n?|\n)/g);this._input=i+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-r),this.offset-=r;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),l.length-1&&(this.yylineno-=l.length-1);var y=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:l?(l.length===d.length?this.yylloc.first_column:0)+d[d.length-l.length].length-l[0].length:this.yylloc.first_column-r},this.options.ranges&&(this.yylloc.range=[y[0],y[0]+this.yyleng-r]),this.yyleng=this.yytext.length,this},"unput"),more:s(function(){return this._more=!0,this},"more"),reject:s(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:s(function(i){this.unput(this.match.slice(i))},"less"),pastInput:s(function(){var i=this.matched.substr(0,this.matched.length-this.match.length);return(i.length>20?"...":"")+i.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:s(function(){var i=this.match;return i.length<20&&(i+=this._input.substr(0,20-i.length)),(i.substr(0,20)+(i.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:s(function(){var i=this.pastInput(),r=new Array(i.length+1).join("-");return i+this.upcomingInput()+`
`+r+"^"},"showPosition"),test_match:s(function(i,r){var l,d,y;if(this.options.backtrack_lexer&&(y={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(y.yylloc.range=this.yylloc.range.slice(0))),d=i[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+i[0].length},this.yytext+=i[0],this.match+=i[0],this.matches=i,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(i[0].length),this.matched+=i[0],l=this.performAction.call(this,this.yy,this,r,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),l)return l;if(this._backtrack){for(var c in y)this[c]=y[c];return!1}return!1},"test_match"),next:s(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var i,r,l,d;this._more||(this.yytext="",this.match="");for(var y=this._currentRules(),c=0;c<y.length;c++)if(l=this._input.match(this.rules[y[c]]),l&&(!r||l[0].length>r[0].length)){if(r=l,d=c,this.options.backtrack_lexer){if(i=this.test_match(l,y[c]),i!==!1)return i;if(this._backtrack){r=!1;continue}else return!1}else if(!this.options.flex)break}return r?(i=this.test_match(r,y[d]),i!==!1?i:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:s(function(){var r=this.next();return r||this.lex()},"lex"),begin:s(function(r){this.conditionStack.push(r)},"begin"),popState:s(function(){var r=this.conditionStack.length-1;return r>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:s(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:s(function(r){return r=this.conditionStack.length-1-Math.abs(r||0),r>=0?this.conditionStack[r]:"INITIAL"},"topState"),pushState:s(function(r){this.begin(r)},"pushState"),stateStackSize:s(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:s(function(r,l,d,y){switch(d){case 0:break;case 1:break;case 2:return 10;case 3:break;case 4:break;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};return h}();g.lexer=m;function x(){this.yy={}}return s(x,"Parser"),x.prototype=g,g.Parser=x,new x}();U.parser=U;var Et=U,V="",J=[],L=[],B=[],Ct=s(function(){J.length=0,L.length=0,V="",B.length=0,$t()},"clear"),Pt=s(function(t){V=t,J.push(t)},"addSection"),It=s(function(){return J},"getSections"),At=s(function(){let t=it();const e=100;let a=0;for(;!t&&a<e;)t=it(),a++;return L.push(...B),L},"getTasks"),Ft=s(function(){const t=[];return L.forEach(a=>{a.people&&t.push(...a.people)}),[...new Set(t)].sort()},"updateActors"),Vt=s(function(t,e){const a=e.substr(1).split(":");let f=0,n=[];a.length===1?(f=Number(a[0]),n=[]):(f=Number(a[0]),n=a[1].split(","));const u=n.map(o=>o.trim()),p={section:V,type:V,people:u,task:t,score:f};B.push(p)},"addTask"),Rt=s(function(t){const e={section:V,type:V,description:t,task:t,classes:[]};L.push(e)},"addTaskOrg"),it=s(function(){const t=s(function(a){return B[a].processed},"compileTask");let e=!0;for(const[a,f]of B.entries())t(a),e=e&&f.processed;return e},"compileTasks"),Lt=s(function(){return Ft()},"getActors"),rt={getConfig:s(()=>R().journey,"getConfig"),clear:Ct,setDiagramTitle:_t,getDiagramTitle:bt,setAccTitle:vt,getAccTitle:wt,setAccDescription:Tt,getAccDescription:St,addSection:Pt,getSections:It,getTasks:At,addTask:Vt,addTaskOrg:Rt,getActors:Lt},Bt=s(t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
    font-family: ${t.fontFamily};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
  ${gt()}
`,"getStyles"),jt=Bt,K=s(function(t,e){return mt(t,e)},"drawRect"),Nt=s(function(t,e){const f=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),n=t.append("g");n.append("circle").attr("cx",e.cx-15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),n.append("circle").attr("cx",e.cx+15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function u(g){const m=nt().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);g.append("path").attr("class","mouth").attr("d",m).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}s(u,"smile");function p(g){const m=nt().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);g.append("path").attr("class","mouth").attr("d",m).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}s(p,"sad");function o(g){g.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return s(o,"ambivalent"),e.score>3?u(n):e.score<3?p(n):o(n),f},"drawFace"),ot=s(function(t,e){const a=t.append("circle");return a.attr("cx",e.cx),a.attr("cy",e.cy),a.attr("class","actor-"+e.pos),a.attr("fill",e.fill),a.attr("stroke",e.stroke),a.attr("r",e.r),a.class!==void 0&&a.attr("class",a.class),e.title!==void 0&&a.append("title").text(e.title),a},"drawCircle"),ct=s(function(t,e){return xt(t,e)},"drawText"),zt=s(function(t,e){function a(n,u,p,o,g){return n+","+u+" "+(n+p)+","+u+" "+(n+p)+","+(u+o-g)+" "+(n+p-g*1.2)+","+(u+o)+" "+n+","+(u+o)}s(a,"genPoints");const f=t.append("polygon");f.attr("points",a(e.x,e.y,50,20,7)),f.attr("class","labelBox"),e.y=e.y+e.labelMargin,e.x=e.x+.5*e.labelMargin,ct(t,e)},"drawLabel"),Wt=s(function(t,e,a){const f=t.append("g"),n=lt();n.x=e.x,n.y=e.y,n.fill=e.fill,n.width=a.width*e.taskCount+a.diagramMarginX*(e.taskCount-1),n.height=a.height,n.class="journey-section section-type-"+e.num,n.rx=3,n.ry=3,K(f,n),ht(a)(e.text,f,n.x,n.y,n.width,n.height,{class:"journey-section section-type-"+e.num},a,e.colour)},"drawSection"),Z=-1,Ot=s(function(t,e,a,f){const n=e.x+a.width/2,u=t.append("g");Z++;const p=300+5*30;u.append("line").attr("id",f+"-task"+Z).attr("x1",n).attr("y1",e.y).attr("x2",n).attr("y2",p).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),Nt(u,{cx:n,cy:300+(5-e.score)*30,score:e.score});const o=lt();o.x=e.x,o.y=e.y,o.fill=e.fill,o.width=a.width,o.height=a.height,o.class="task task-type-"+e.num,o.rx=3,o.ry=3,K(u,o);let g=e.x+14;e.people.forEach(m=>{const x=e.actors[m].color,h={cx:g,cy:e.y,r:7,fill:x,stroke:"#000",title:m,pos:e.actors[m].position};ot(u,h),g+=10}),ht(a)(e.task,u,o.x,o.y,o.width,o.height,{class:"task"},a,e.colour)},"drawTask"),Yt=s(function(t,e){kt(t,e)},"drawBackgroundRect"),ht=function(){function t(n,u,p,o,g,m,x,h){const i=u.append("text").attr("x",p+g/2).attr("y",o+m/2+5).style("font-color",h).style("text-anchor","middle").text(n);f(i,x)}s(t,"byText");function e(n,u,p,o,g,m,x,h,i){const{taskFontSize:r,taskFontFamily:l}=h,d=n.split(/<br\s*\/?>/gi);for(let y=0;y<d.length;y++){const c=y*r-r*(d.length-1)/2,b=u.append("text").attr("x",p+g/2).attr("y",o).attr("fill",i).style("text-anchor","middle").style("font-size",r).style("font-family",l);b.append("tspan").attr("x",p+g/2).attr("dy",c).text(d[y]),b.attr("y",o+m/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),f(b,x)}}s(e,"byTspan");function a(n,u,p,o,g,m,x,h){const i=u.append("switch"),l=i.append("foreignObject").attr("x",p).attr("y",o).attr("width",g).attr("height",m).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");l.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(n),e(n,i,p,o,g,m,x,h),f(l,x)}s(a,"byFo");function f(n,u){for(const p in u)p in u&&n.attr(p,u[p])}return s(f,"_setTextAttrs"),function(n){return n.textPlacement==="fo"?a:n.textPlacement==="old"?t:e}}(),qt=s(function(t,e){Z=-1,t.append("defs").append("marker").attr("id",e+"-arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),j={drawRect:K,drawCircle:ot,drawSection:Wt,drawText:ct,drawLabel:zt,drawTask:Ot,drawBackgroundRect:Yt,initGraphics:qt},Xt=s(function(t){Object.keys(t).forEach(function(a){$[a]=t[a]})},"setConf"),E={},W=0;function ut(t){const e=R().journey,a=e.maxLabelWidth;W=0;let f=60;Object.keys(E).forEach(n=>{const u=E[n].color,p={cx:20,cy:f,r:7,fill:u,stroke:"#000",pos:E[n].position};j.drawCircle(t,p);let o=t.append("text").attr("visibility","hidden").text(n);const g=o.node().getBoundingClientRect().width;o.remove();let m=[];if(g<=a)m=[n];else{const x=n.split(" ");let h="";o=t.append("text").attr("visibility","hidden"),x.forEach(i=>{const r=h?`${h} ${i}`:i;if(o.text(r),o.node().getBoundingClientRect().width>a){if(h&&m.push(h),h=i,o.text(i),o.node().getBoundingClientRect().width>a){let d="";for(const y of i)d+=y,o.text(d+"-"),o.node().getBoundingClientRect().width>a&&(m.push(d.slice(0,-1)+"-"),d=y);h=d}}else h=r}),h&&m.push(h),o.remove()}m.forEach((x,h)=>{const i={x:40,y:f+7+h*20,fill:"#666",text:x,textMargin:e.boxTextMargin??5},l=j.drawText(t,i).node().getBoundingClientRect().width;l>W&&l>e.leftMargin-l&&(W=l)}),f+=Math.max(20,m.length*20)})}s(ut,"drawActorLegend");var $=R().journey,P=0,Gt=s(function(t,e,a,f){const n=R(),u=n.journey.titleColor,p=n.journey.titleFontSize,o=n.journey.titleFontFamily,g=n.securityLevel;let m;g==="sandbox"&&(m=G("#i"+e));const x=g==="sandbox"?G(m.nodes()[0].contentDocument.body):G("body");S.init();const h=x.select("#"+e);j.initGraphics(h,e);const i=f.db.getTasks(),r=f.db.getDiagramTitle(),l=f.db.getActors();for(const C in E)delete E[C];let d=0;l.forEach(C=>{E[C]={color:$.actorColours[d%$.actorColours.length],position:d},d++}),ut(h),P=$.leftMargin+W,S.insert(0,0,P,Object.keys(E).length*50),Ht(h,i,0,e);const y=S.getBounds();r&&h.append("text").text(r).attr("x",P).attr("font-size",p).attr("font-weight","bold").attr("y",25).attr("fill",u).attr("font-family",o);const c=y.stopy-y.starty+2*$.diagramMarginY,b=P+y.stopx+2*$.diagramMarginX;Mt(h,c,b,$.useMaxWidth),h.append("line").attr("x1",P).attr("y1",$.height*4).attr("x2",b-P-4).attr("y2",$.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#"+e+"-arrowhead)");const k=r?70:0;h.attr("viewBox",`${y.startx} -25 ${b} ${c+k}`),h.attr("preserveAspectRatio","xMinYMin meet"),h.attr("height",c+k+25)},"draw"),S={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:s(function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},"init"),updateVal:s(function(t,e,a,f){t[e]===void 0?t[e]=a:t[e]=f(a,t[e])},"updateVal"),updateBounds:s(function(t,e,a,f){const n=R().journey,u=this;let p=0;function o(g){return s(function(x){p++;const h=u.sequenceItems.length-p+1;u.updateVal(x,"starty",e-h*n.boxMargin,Math.min),u.updateVal(x,"stopy",f+h*n.boxMargin,Math.max),u.updateVal(S.data,"startx",t-h*n.boxMargin,Math.min),u.updateVal(S.data,"stopx",a+h*n.boxMargin,Math.max),g!=="activation"&&(u.updateVal(x,"startx",t-h*n.boxMargin,Math.min),u.updateVal(x,"stopx",a+h*n.boxMargin,Math.max),u.updateVal(S.data,"starty",e-h*n.boxMargin,Math.min),u.updateVal(S.data,"stopy",f+h*n.boxMargin,Math.max))},"updateItemBounds")}s(o,"updateFn"),this.sequenceItems.forEach(o())},"updateBounds"),insert:s(function(t,e,a,f){const n=Math.min(t,a),u=Math.max(t,a),p=Math.min(e,f),o=Math.max(e,f);this.updateVal(S.data,"startx",n,Math.min),this.updateVal(S.data,"starty",p,Math.min),this.updateVal(S.data,"stopx",u,Math.max),this.updateVal(S.data,"stopy",o,Math.max),this.updateBounds(n,p,u,o)},"insert"),bumpVerticalPos:s(function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},"bumpVerticalPos"),getVerticalPos:s(function(){return this.verticalPos},"getVerticalPos"),getBounds:s(function(){return this.data},"getBounds")},H=$.sectionFills,st=$.sectionColours,Ht=s(function(t,e,a,f){const n=R().journey;let u="";const p=n.height*2+n.diagramMarginY,o=a+p;let g=0,m="#CCC",x="black",h=0;for(const[i,r]of e.entries()){if(u!==r.section){m=H[g%H.length],h=g%H.length,x=st[g%st.length];let d=0;const y=r.section;for(let b=i;b<e.length&&e[b].section==y;b++)d=d+1;const c={x:i*n.taskMargin+i*n.width+P,y:50,text:r.section,fill:m,num:h,colour:x,taskCount:d};j.drawSection(t,c,n),u=r.section,g++}const l=r.people.reduce((d,y)=>(E[y]&&(d[y]=E[y]),d),{});r.x=i*n.taskMargin+i*n.width+P,r.y=o,r.width=n.diagramMarginX,r.height=n.diagramMarginY,r.colour=x,r.fill=m,r.num=h,r.actors=l,j.drawTask(t,r,n,f),S.insert(r.x,r.y,r.x+r.width+n.taskMargin,300+5*30)}},"drawTasks"),at={setConf:Xt,draw:Gt},te={parser:Et,db:rt,renderer:at,styles:jt,init:s(t=>{at.setConf(t.journey),rt.clear()},"init")};export{te as diagram};
