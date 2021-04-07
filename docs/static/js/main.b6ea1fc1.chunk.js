(this.webpackJsonphotstuff=this.webpackJsonphotstuff||[]).push([[0],{175:function(e,t,n){},316:function(e,t,n){"use strict";n.r(t);var a,r,c,o,i,s,u,l=n(0),j=n.n(l),b=n(76),d=n.n(b),f=(n(175),n(17)),p=(n(109),n(38)),m=n(104),h=n(83),O=n(39),g=n(318),x=n(322),y=n(163),w=n(164),v=n(67),D=n(64),S=n(166),C=n(14),k=["#16a085","#2ecc71","#3498db","#9b59b6","#34495e","#f1c40f","#e67e22","#e74c3c"],K='[\n  {\n    "name": "first",\n    "temperatureDegC": 120,\n    "capacitanceJPerDegK": 200,\n    "powerGenW": 0,\n    "isBoundary": false\n  },\n  {\n    "name": "second",\n    "temperatureDegC": 40,\n    "capacitanceJPerDegK": 10,\n    "powerGenW": 3,\n    "isBoundary": true\n  },\n  {\n    "name": "third",\n    "temperatureDegC": -10,\n    "capacitanceJPerDegK": 800,\n    "powerGenW": 0,\n    "isBoundary": false\n  },\n]',W='[\n  {\n    source: "first",\n    target: "second",\n    resistanceDegKPerW: 0.1,\n    kind: "bi",\n  },\n  {\n    source: "second",\n    target: "third",\n    resistanceDegKPerW: 10,\n    kind: "bi",\n  },\n]',P=O.a.form(a||(a=Object(p.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  align-items: center;\n"]))),J=O.a.div(r||(r=Object(p.a)(["\n  display: flex;\n  width: 100%;\n  justify-content: center;\n  margin: 0.5em;\n"]))),V=O.a.div(c||(c=Object(p.a)(["\n  display: flex;\n  width: 100%;\n  justify-content: center;\n  margin: 0.5em;\n"]))),B=O.a.label(o||(o=Object(p.a)(["\n  display: flex;\n  width: 400px;\n  justify-content: space-between;\n"]))),G=O.a.label(i||(i=Object(p.a)(["\n  display: flex;\n  width: 600px;\n  justify-content: space-between;\n"]))),E=O.a.textarea(s||(s=Object(p.a)(["\n  width: 80%;\n  min-width: 80%;\n  max-width: 80%;\n  min-height: 200px;\n"]))),T=O.a.input(u||(u=Object(p.a)(["\n  width: 100px;\n  height: 30px;\n"])));function N(e){return Object(C.jsx)(J,{children:Object(C.jsxs)(B,{children:[e.label,Object(C.jsx)("input",{type:"text",defaultValue:e.defaultVal,onChange:function(t){return e.onChange(t)}})]})})}function F(e){return Object(C.jsx)(V,{children:Object(C.jsxs)(G,{children:[Object(C.jsx)("div",{style:{marginRight:"10px"},children:e.label}),Object(C.jsx)(E,{defaultValue:e.defaultVal,onChange:function(t){return e.onChange(t)}})]})})}function M(){var e=Object(l.useState)(void 0),t=Object(f.a)(e,2),n=t[0],a=t[1],r=Object(l.useState)(50),c=Object(f.a)(r,2),o=c[0],i=c[1],s=Object(l.useState)(.1),u=Object(f.a)(s,2),j=u[0],b=u[1],d=Object(l.useState)(Y(K)),p=Object(f.a)(d,2),O=p[0],J=p[1],V=Object(l.useState)(K),B=Object(f.a)(V,2),G=B[0],E=B[1],M=Object(l.useState)(Z(Y(K),W)),R=Object(f.a)(M,2),I=R[0],q=R[1],z=Object(l.useState)(W),A=Object(f.a)(z,2),H=A[0],L=A[1],Q=Object(l.useState)(null),U=Object(f.a)(Q,2);U[0],U[1];function X(){var e=performance.now(),t=Object(h.run)({nodes:O,connections:I,timeStepS:j,totalTimeS:o}),n=performance.now();return console.log("Model took ".concat(n-e," ms")),t}function Y(e){try{return m.parse(e).map((function(e){return Object(h.makeNode)({name:e.name,temperatureDegC:e.temperatureDegC,capacitanceJPerDegK:e.capacitanceJPerDegK,powerGenW:e.powerGenW,isBoundary:e.isBoundary})}))}catch(t){return console.error(t),[]}}function Z(e,t){try{return m.parse(t).map((function(t){var n=e.filter((function(e){return e.name===t.source}))[0],a=e.filter((function(e){return e.name===t.target}))[0];return Object(h.makeConnection)({source:n,target:a,resistanceDegKPerW:t.resistanceDegKPerW,kind:t.bi})}))}catch(n){return console.error(n),[]}}Object(l.useEffect)((function(){var e=X();a(e)}),[]),Object(l.useEffect)((function(){var e=Y(G);J(e);var t=Z(e,H);q(t)}),[G,H]);var $=700,_=400,ee={left:40,right:40,top:40,bottom:40};return Object(C.jsxs)("div",{children:[Object(C.jsxs)(P,{onSubmit:function(e){try{a(X())}catch(t){console.error(t)}e.preventDefault()},children:[n&&n.temps.length>0?Object(C.jsxs)(g.a,{width:$,height:_,data:function(e){var t=e.timeSeriesS.map((function(e){return{name:e}}));return e.temps.map((function(e){e.tempDegC.forEach((function(n,a){t[a][e.node.name]=n}))})),t}(n),margin:{top:ee.top,right:ee.right,left:ee.left,bottom:ee.bottom},children:[Object(C.jsx)(x.a,{strokeDasharray:"3 3"}),Object(C.jsx)(y.a,{dataKey:"name"}),Object(C.jsx)(w.a,{}),Object(C.jsx)(v.a,{}),Object(C.jsx)(D.a,{}),n.temps.map((function(e,t){return Object(C.jsx)(S.a,{type:"monotone",dataKey:e.node.name,stroke:k[t],activeDot:{r:8}},e.node.id)}))]}):Object(C.jsx)("h1",{children:"Welcome to hotstuff.network"}),Object(C.jsx)(T,{type:"submit",value:"Go"}),Object(C.jsx)(N,{label:"Time Step [seconds]",defaultVal:.1,onChange:function(e){return b(parseFloat(e.target.value))}}),Object(C.jsx)(N,{label:"Total Run Time [seconds]",defaultVal:50,onChange:function(e){return i(parseFloat(e.target.value))}}),Object(C.jsx)(F,{label:"Nodes",defaultVal:K,onChange:function(e){return E(e.target.value)}}),Object(C.jsx)(F,{label:"Connections",defaultVal:W,onChange:function(e){return L(e.target.value)}})]}),Object(C.jsx)("pre",{children:JSON.stringify(n,null,2)})]})}d.a.render(Object(C.jsx)(j.a.StrictMode,{children:Object(C.jsx)(M,{})}),document.getElementById("root"))}},[[316,1,2]]]);
//# sourceMappingURL=main.b6ea1fc1.chunk.js.map