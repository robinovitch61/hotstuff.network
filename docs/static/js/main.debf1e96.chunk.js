(this.webpackJsonphotstuff=this.webpackJsonphotstuff||[]).push([[0],{180:function(e,t,n){},338:function(e,t,n){"use strict";n.r(t);var a,r,c,i,o,s,l,u,d,j=n(0),b=n.n(j),m=n(58),h=n.n(m),p=(n(180),n(17)),f=n(30),g=n(107),x=n(66),O=n(31),y=n(340),v=n(341),w=n(345),S=n(168),D=n(169),C=n(69),k=n(65),K=n(171),W=n(8),P=["#2ecc71","#3498db","#9b59b6","#34495e","#f1c40f","#e67e22","#e74c3c","#16a085"],T='[\n  {\n    "name": "first",\n    "temperatureDegC": 120,\n    "capacitanceJPerDegK": 200,\n    "powerGenW": 0,\n    "isBoundary": false\n  },\n  {\n    "name": "second",\n    "temperatureDegC": 40,\n    "capacitanceJPerDegK": 10,\n    "powerGenW": 3,\n    "isBoundary": true\n  },\n  {\n    "name": "third",\n    "temperatureDegC": -10,\n    "capacitanceJPerDegK": 8,\n    "powerGenW": 10,\n    "isBoundary": false\n  },\n]',V='[\n  {\n    source: "first",\n    target: "second",\n    resistanceDegKPerW: 0.1,\n    kind: "bi",\n  },\n  {\n    source: "first",\n    target: "third",\n    resistanceDegKPerW: 0.5,\n    kind: "uni",\n  },\n  {\n    source: "second",\n    target: "third",\n    resistanceDegKPerW: 3,\n    kind: "bi",\n  },\n]',J=O.a.h1(a||(a=Object(f.a)(['\n  width: 100%;\n  text-align: center;\n  padding: 1em 0 0.5em 0;\n  margin: 0;\n\n  &&:before,\n  &&:after {\n    content: "\ud83d\udd25";\n  }\n']))),R=O.a.form(r||(r=Object(f.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  align-items: center;\n"]))),B=O.a.div(c||(c=Object(f.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 100%;\n  margin-top: 2em;\n\n  .chart {\n    width: 60% !important;\n    max-width: 900px;\n\n    @media only screen and (max-width: 600px) {\n      width: 90% !important;\n      touch-action: pan-y;\n    }\n  }\n"]))),G=O.a.div(i||(i=Object(f.a)(["\n  display: flex;\n  width: 100%;\n  justify-content: center;\n  margin: 0.5em;\n"]))),E=O.a.div(o||(o=Object(f.a)(["\n  display: flex;\n  width: 100%;\n  justify-content: center;\n  margin: 0.5em;\n"]))),M=O.a.label(s||(s=Object(f.a)(["\n  display: flex;\n  max-width: 400px;\n  width: 95%;\n  justify-content: space-between;\n"]))),z=O.a.label(l||(l=Object(f.a)(["\n  display: flex;\n  flex-direction: column;\n  max-width: 600px;\n  width: 95%;\n  align-items: center;\n"]))),F=O.a.textarea(u||(u=Object(f.a)(["\n  width: 80%;\n  min-width: 80%;\n  max-width: 80%;\n  min-height: 200px;\n"]))),N=O.a.input(d||(d=Object(f.a)(["\n  display: flex;\n  align-items: center;\n  -webkit-appearance: none;\n  border: none;\n  border-radius: 10px;\n  padding: 0.8em 3em;\n  margin: 1em;\n  font-size: 1.2em;\n  background: #dbdbdb;\n\n  &&:hover {\n    cursor: pointer;\n  }\n"])));function A(e){return Object(W.jsx)(G,{children:Object(W.jsxs)(M,{children:[e.label,Object(W.jsx)("input",{type:"text",defaultValue:e.defaultVal,onChange:function(t){return e.onChange(t)}})]})})}function H(e){return Object(W.jsx)(E,{children:Object(W.jsxs)(z,{children:[Object(W.jsx)("div",{style:{marginRight:"10px"},children:e.label}),Object(W.jsx)(F,{onInput:function(e){return(t=e.target).style.height="auto",void(t.style.height=t.scrollHeight+"px");var t},defaultValue:e.defaultVal,onChange:function(t){return e.onChange(t)}})]})})}function I(){var e=Object(j.useState)(void 0),t=Object(p.a)(e,2),n=t[0],a=t[1],r=Object(j.useState)(50),c=Object(p.a)(r,2),i=c[0],o=c[1],s=Object(j.useState)(.1),l=Object(p.a)(s,2),u=l[0],d=l[1],b=Object(j.useState)($(T)),m=Object(p.a)(b,2),h=m[0],f=m[1],O=Object(j.useState)(T),G=Object(p.a)(O,2),E=G[0],M=G[1],z=Object(j.useState)(_($(T),V)),F=Object(p.a)(z,2),I=F[0],L=F[1],q=Object(j.useState)(V),Q=Object(p.a)(q,2),U=Q[0],X=Q[1],Y=Object(j.useState)(null),Z=Object(p.a)(Y,2);Z[0],Z[1];function $(e){try{return g.parse(e).map((function(e){return Object(x.makeNode)({name:e.name,temperatureDegC:e.temperatureDegC,capacitanceJPerDegK:e.capacitanceJPerDegK,powerGenW:e.powerGenW,isBoundary:e.isBoundary})}))}catch(t){return console.error(t),[]}}function _(e,t){try{return g.parse(t).map((function(t){var n=e.filter((function(e){return e.name===t.source}))[0],a=e.filter((function(e){return e.name===t.target}))[0];return Object(x.makeConnection)({source:n,target:a,resistanceDegKPerW:t.resistanceDegKPerW,kind:t.bi})}))}catch(n){return console.error(n),[]}}Object(j.useEffect)((function(){var e=$(E);f(e);var t=_(e,U);L(t)}),[E,U]);var ee=350,te={left:5,right:5,top:40,bottom:40};var ne=n&&n.nodeResults.length>0?n:x.emptyOutput,ae=function(e){var t=Math.floor(Math.log10(e.totalTimeS)),n=Math.pow(10,t-1),a=e.timeSeriesS.length<400,r=[],c=[];return e.timeSeriesS.forEach((function(t,i){if(a||(l=t,0===Math.abs(l%n))){var o={name:t},s={name:t};e.nodeResults.forEach((function(e){o[e.node.name]=e.tempDegC[i]})),e.connectionResults.forEach((function(e){s["".concat(e.connection.source.name," to ").concat(e.connection.target.name)]=e.heatTransferW[i]})),r.push(o),c.push(s)}var l})),[r,c]}(ne),re=Object(p.a)(ae,2),ce=re[0],ie=re[1];return Object(W.jsx)("div",{children:Object(W.jsxs)(R,{onSubmit:function(e){try{a(Object(x.run)({nodes:h,connections:I,timeStepS:u,totalTimeS:i}))}catch(t){console.error(t)}e.preventDefault()},children:[ne.timeSeriesS.length>0?Object(W.jsxs)(W.Fragment,{children:[Object(W.jsx)(J,{children:"Completed in ".concat(ne.computeTimeS.toFixed(2)," seconds")}),Object(W.jsxs)(B,{children:[Object(W.jsx)(y.a,{height:ee,className:"chart",children:Object(W.jsxs)(v.a,{data:ce,margin:{top:0,right:te.right,left:te.left,bottom:te.bottom},children:[Object(W.jsx)(w.a,{strokeDasharray:"3 3"}),Object(W.jsx)(S.a,{dataKey:"name",label:{value:"Time [seconds]",position:"middle",dy:20}}),Object(W.jsx)(D.a,{label:{value:"Temperature [degC]",position:"middle",angle:-90,dx:-20}}),Object(W.jsx)(C.a,{}),Object(W.jsx)(k.a,{layout:"horizontal",verticalAlign:"top",align:"center",wrapperStyle:{paddingLeft:"10px"}}),ne.nodeResults.map((function(e,t){return Object(W.jsx)(K.a,{type:"monotone",dataKey:e.node.name,stroke:P[t],activeDot:{r:8}},e.node.id)}))]})}),Object(W.jsx)(y.a,{height:ee,className:"chart",children:Object(W.jsxs)(v.a,{height:ee,data:ie,margin:{top:0,right:te.right,left:te.left,bottom:te.bottom},children:[Object(W.jsx)(w.a,{strokeDasharray:"3 3"}),Object(W.jsx)(S.a,{dataKey:"name",label:{value:"Time [seconds]",position:"middle",dy:20}}),Object(W.jsx)(D.a,{label:{value:"Heat Transfer [Watts]",position:"middle",angle:-90,dx:-20}}),Object(W.jsx)(C.a,{}),Object(W.jsx)(k.a,{layout:"horizontal",verticalAlign:"top",align:"center",wrapperStyle:{paddingLeft:"10px"},fontSize:5}),ne.connectionResults.map((function(e,t){return Object(W.jsx)(K.a,{type:"monotone",dataKey:"".concat(e.connection.source.name," to ").concat(e.connection.target.name),stroke:P[t],activeDot:{r:8}},e.connection.id)}))]})})]})]}):Object(W.jsx)(J,{children:"Welcome to hotstuff.network"}),Object(W.jsx)(N,{type:"submit",value:"Go"}),Object(W.jsx)(A,{label:"Timestep[sec]",defaultVal:.1,onChange:function(e){return d(parseFloat(e.target.value))}}),Object(W.jsx)(A,{label:"Run Time [sec]",defaultVal:50,onChange:function(e){return o(parseFloat(e.target.value))}}),Object(W.jsx)(H,{label:"Nodes",defaultVal:T,onChange:function(e){return M(e.target.value)}}),Object(W.jsx)(H,{label:"Connections",defaultVal:V,onChange:function(e){return X(e.target.value)}})]})})}h.a.render(Object(W.jsx)(b.a.StrictMode,{children:Object(W.jsx)(I,{})}),document.getElementById("root"))}},[[338,1,2]]]);
//# sourceMappingURL=main.debf1e96.chunk.js.map