webpackJsonp([1],{"/626":function(t,e){},"3TcT":function(t,e){},"6VdR":function(t,e){},DgVZ:function(t,e){},FbEL:function(t,e){},"HNa/":function(t,e){},JkCr:function(t,e){},LGiM:function(t,e){},"N+IJ":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),s=n("2QDH"),r=n.n(s),o=n("Zrlr"),a=n.n(o),c=n("wxAW"),h=n.n(c),u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"start-screen",on:{click:function(e){t.tapToStartAction()}}},[n("svg",{staticClass:"tap-to-start-icon",attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"}},[n("defs",[n("path",{attrs:{id:"a",d:"M0 0h24v24H0V0z"}})]),t._v(" "),n("clipPath",{attrs:{id:"b"}},[n("use",{attrs:{"xlink:href":"#a",overflow:"visible"}})]),t._v(" "),n("path",{attrs:{d:"M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z","clip-path":"url(#b)"}})]),t._v(" "),n("div",{staticClass:"tap-to-start"},[t._v("tap to start")])])},staticRenderFns:[]};var l=n("VU/8")({data:function(){},methods:{tapToStartAction:function(){this.$emit("started",!0)}}},u,!1,function(t){n("6VdR")},"data-v-9125b0d8",null).exports,d={data:function(){return{direction:0,frontBack:0,leftRight:0,xPercentage:0,yPercentage:0,startDirection:0,startFrontBack:0,startLeftRight:0,maxDegree:15,svg:null,outerCircle:null,innerCircle:null}},mounted:function(){window.addEventListener("deviceorientation",this.deviceorientationHandler,!1)},methods:{started:function(t){this.tapToStartAction()},tapToStartAction:function(){var t=this;this.initialize(),this.$refs.start.$el.addEventListener("transitionend",function(){t.$refs.parent.addEventListener("transitionend",function(){t.svg=new v(t.$refs.parent),t.outerCircle=new f(t.svg.widthCenter(),t.svg.heightCenter(),.7*t.svg.determineScreenOrientation(),"outer-circle-rotation",t.svg,null,t.$refs.oc,t),t.innerCircle=new f(t.svg.widthCenter(),t.svg.heightCenter(),.3*t.svg.determineScreenOrientation(),"inner-circle-rotation",t.svg,t.outerCircle,t.$refs.ic,t)}),t.$refs.start.$el.style.display="none",t.$refs.parent.style.width="100%",t.$refs.parent.style.height="100%"}),this.$refs.start.$el.style.visibility="hidden"},deviceorientationHandler:function(t){if(this.direction=t.alpha,this.frontBack=t.beta,this.leftRight=t.gamma,this.startFrontBack&&this.startLeftRight){var e=(this.leftRight-this.startLeftRight)/this.maxDegree,n=(this.frontBack-this.startFrontBack)/this.maxDegree;this.xPercentage=e,this.yPercentage=n,this.innerCircle.updateCoordsPercentage(e,n)}},initialize:function(t){this.startDirection=this.direction,this.startFrontBack=this.frontBack,this.startLeftRight=this.leftRight},sendVelocity:function(t,e){this.$emit("move-robot",{left:t,right:e})}},name:"Rotation",components:{TapToStart:l}},v=function(){function t(e){a()(this,t),this.instance=e}return h()(t,[{key:"appendNewEventListener",value:function(t,e,n){this.instance.addEventListener(t,e.bind(n),!1)}},{key:"svgWidth",value:function(){return this.instance.clientWidth}},{key:"svgHeight",value:function(){return this.instance.clientHeight}},{key:"addElement",value:function(t){this.instance.appendChild(t)}},{key:"heightCenter",value:function(){return this.svgHeight()/2}},{key:"widthCenter",value:function(){return this.svgWidth()/2}},{key:"determineScreenOrientation",value:function(){return this.svgWidth()>this.svgHeight()?this.heightCenter():this.widthCenter()}}]),t}(),f=function(){function t(e,n,i,s,r,o,c,h){a()(this,t),this.cx=e,this.cy=n,this.originalCx=e,this.originalCy=n,this.r=i,this.id=s,this.svg=r,this.parent=o,this.offset=window.innerHeight-this.svg.svgHeight(),this.instance=this.createCircle(c),this.component=h}return h()(t,[{key:"createCircle",value:function(t){var e=t;return e.setAttributeNS(null,"cx",this.cx),e.setAttributeNS(null,"cy",this.cy),e.setAttributeNS(null,"r",this.r),e.id=this.id,e}},{key:"getDistance",value:function(t,e){var n=this.svg.widthCenter()-t,i=this.svg.heightCenter()-e,s=Math.pow(n,2)+Math.pow(i,2);return Math.sqrt(s)}},{key:"getCos",value:function(t,e,n,i){return Math.cos(Math.atan2(e-i,t-n))}},{key:"getSin",value:function(t,e,n,i){return Math.sin(Math.atan2(e-i,t-n))}},{key:"makeStepForward",value:function(t,e){return function(){this.updateCoords(t,e)}.bind(this)}},{key:"updateCoordsPercentage",value:function(t,e){var n=this.parent.cx+this.parent.r*t,i=this.parent.cy+this.parent.r*e,s=this.getDistance(n,i),o=this.getCos(n,i,this.svg.widthCenter(),this.svg.heightCenter()),a=this.getSin(n,i,this.svg.widthCenter(),this.svg.heightCenter());if(s<=this.parent.r)window.requestAnimationFrame(this.makeStepForward(n,i));else{var c=this.parent.r;window.requestAnimationFrame(this.makeStepForward(o*c+this.svg.widthCenter(),a*c+this.svg.heightCenter()))}var h=s/this.parent.r;o>0?this.component.sendVelocity(-1*r()(a)*h,-1*a*h):this.component.sendVelocity(-1*a*h,-1*r()(a)*h)}},{key:"setAttr",value:function(t,e){this.instance.setAttributeNS(null,t,e)}},{key:"updateCx",value:function(t){this.cx=t,this.setAttr("cx",this.cx)}},{key:"updateCy",value:function(t){this.cy=t,this.setAttr("cy",this.cy)}},{key:"setR",value:function(t){this.r=t}},{key:"updateCoords",value:function(t,e){this.updateCx(t),this.updateCy(e)}}]),t}(),p={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"rotation-container"},[e("tap-to-start",{ref:"start",on:{started:this.started}}),this._v(" "),e("svg",{ref:"parent",attrs:{id:"controller-rotation"}},[e("circle",{ref:"oc",attrs:{id:"outer-circle-rotation"}}),this._v(" "),e("circle",{ref:"ic",attrs:{id:"inner-circle-rotation"}})])],1)},staticRenderFns:[]};var g=n("VU/8")(d,p,!1,function(t){n("DgVZ")},"data-v-0aaf8d5d",null).exports,m={data:function(){return{model:null,svg:null,innerCircle:null,outerCircle:null}},mounted:function(){},methods:{changeColor:function(t){this.pickedColor=t,this.setBackgroundColor(),this.socket.sendCommand("colors",this.pickedColor)},started:function(t){this.initialize()},initialize:function(){var t=this;this.$refs.start.$el.addEventListener("transitionend",function(){t.$refs.parent.addEventListener("transitionend",function(){t.svg=new C(t.$refs.parent),t.outerCircle=new k(t.svg.widthCenter(),t.svg.heightCenter(),.7*t.svg.determineScreenOrientation(),"outer-circle",t.svg,null,t.$refs.oc,t),t.innerCircle=new k(t.svg.widthCenter(),t.svg.heightCenter(),.3*t.svg.determineScreenOrientation(),"inner-circle",t.svg,t.outerCircle,t.$refs.ic,t),t.svg.appendNewEventListener("mousemove",t.innerCircle.circleMouseMove,t.innerCircle),t.svg.appendNewEventListener("mouseup",t.innerCircle.mouseMoveEnd,t.innerCircle)}),t.$refs.start.$el.style.display="none",t.$refs.parent.style.width="100%",t.$refs.parent.style.height="100%"}),this.$refs.start.$el.style.visibility="hidden"},sendVelocity:function(t,e){this.$emit("move-robot",{left:t,right:e})}},name:"Joystick",components:{TapToStart:l}},C=function(){function t(e){a()(this,t),this.instance=e}return h()(t,[{key:"appendNewEventListener",value:function(t,e,n){this.instance.addEventListener(t,e.bind(n),!1)}},{key:"svgWidth",value:function(){return this.instance.clientWidth}},{key:"svgHeight",value:function(){return this.instance.clientHeight}},{key:"addElement",value:function(t){this.instance.appendChild(t)}},{key:"heightCenter",value:function(){return this.svgHeight()/2}},{key:"widthCenter",value:function(){return this.svgWidth()/2}},{key:"determineScreenOrientation",value:function(){return this.svgWidth()>this.svgHeight()?this.heightCenter():this.widthCenter()}}]),t}(),k=function(){function t(e,n,i,s,r,o,c,h){a()(this,t),this.cx=e,this.cy=n,this.r=i,this.id=s,this.svg=r,this.parent=o,this.offset=window.innerHeight-this.svg.svgHeight(),this.instance=this.createCircle(c),this.component=h}return h()(t,[{key:"createCircle",value:function(t){var e=t;return e.setAttributeNS(null,"cx",this.cx),e.setAttributeNS(null,"cy",this.cy),e.setAttributeNS(null,"r",this.r),this.parent&&(this.appendNewEventListener("touchmove",this.circleTouch,e),this.appendNewEventListener("touchend",this.circleTouchEnd,e),this.appendNewEventListener("mousedown",this.circleMouseMoveStart,e),this.appendNewEventListener("mouseup",this.mouseMoveEnd,e),this.appendNewEventListener("mousemove",this.circleMouseMove,e)),e.id=this.id,e}},{key:"appendNewEventListener",value:function(t,e,n){n.addEventListener(t,e.bind(this),!1)}},{key:"circleMouseClickOrTouched",value:function(t,e){var n=this.getDistance(t,e),i=this.getCos(t,e,this.svg.widthCenter(),this.svg.heightCenter()),s=this.getSin(t,e,this.svg.widthCenter(),this.svg.heightCenter());if(n<=this.parent.r)window.requestAnimationFrame(this.makeStepForward(t,e));else{n=this.parent.r;var o=this.parent.r;t=i*o+this.svg.widthCenter(),e=s*o+this.svg.heightCenter(),window.requestAnimationFrame(this.makeStepForward(i*o+this.svg.widthCenter(),s*o+this.svg.heightCenter()))}var a=n/this.parent.r;i>0?this.component.sendVelocity(-1*r()(s)*a,-1*s*a):this.component.sendVelocity(-1*s*a,-1*r()(s)*a)}},{key:"circleTouch",value:function(t){this.circleMouseClickOrTouched(t.touches[0].clientX,t.touches[0].clientY-this.offset)}},{key:"circleMouseMove",value:function(t){this.enableCircleMove&&this.circleMouseClickOrTouched(t.x,t.y)}},{key:"circleTouchEnd",value:function(t){for(var e=this.getDistance(this.cx,this.cy);e>0;)window.requestAnimationFrame(this.makeStepBack(e)),e-=.1;e=0,window.requestAnimationFrame(this.makeStepBack(e)),this.component.sendVelocity(0,0)}},{key:"mouseMoveEnd",value:function(t){this.enableCircleMove&&(this.circleTouchEnd(t),this.enableCircleMove=!1)}},{key:"circleMouseMoveStart",value:function(t){this.enableCircleMove=!0}},{key:"getDistance",value:function(t,e){var n=this.svg.widthCenter()-t,i=this.svg.heightCenter()-e,s=Math.pow(n,2)+Math.pow(i,2);return Math.sqrt(s)}},{key:"getCos",value:function(t,e,n,i){return Math.cos(Math.atan2(e-i,t-n))}},{key:"getSin",value:function(t,e,n,i){return Math.sin(Math.atan2(e-i,t-n))}},{key:"makeStepForward",value:function(t,e){return function(){this.updateCoords(t,e)}.bind(this)}},{key:"makeStepBack",value:function(t){return function(){this.updateCoords(t*this.getCos(this.cx,this.cy,this.svg.widthCenter(),this.svg.heightCenter())+this.svg.widthCenter(),t*this.getSin(this.cx,this.cy,this.svg.widthCenter(),this.svg.heightCenter())+this.svg.heightCenter())}.bind(this)}},{key:"setAttr",value:function(t,e){this.instance.setAttributeNS(null,t,e)}},{key:"updateCx",value:function(t){this.cx=t,this.setAttr("cx",this.cx)}},{key:"updateCy",value:function(t){this.cy=t,this.setAttr("cy",this.cy)}},{key:"setR",value:function(t){this.r=t}},{key:"updateCoords",value:function(t,e){this.updateCx(t),this.updateCy(e)}}]),t}(),y={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"rotation-container"},[e("tap-to-start",{ref:"start",on:{started:this.started}}),this._v(" "),e("svg",{ref:"parent",attrs:{id:"controller"}},[e("circle",{ref:"oc",attrs:{id:"outer-circle"}}),this._v(" "),e("circle",{ref:"ic",attrs:{id:"inner-circle"}})])],1)},staticRenderFns:[]};var w=n("VU/8")(m,y,!1,function(t){n("JkCr")},"data-v-4dcba0d2",null).exports,b={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"picker",class:{picked:t.index===t.picked},style:{backgroundColor:t.color},on:{click:function(e){t.pickColor()}}})},staticRenderFns:[]};var S=n("VU/8")({props:["color","index","picked"],data:function(){return{}},mounted:function(){},methods:{pickColor:function(){this.$emit("change-color",this.index)}},name:"Color"},b,!1,function(t){n("o+XP")},"data-v-c51a5afa",null).exports,x=function(){function t(e){a()(this,t),this.guid=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()};this.id=this.guid();var n=this;this.commands={move:function(t){return n.id+":[= "+parseInt(100*t.left)+", "+parseInt(100*t.right)+"]"},start:function(t){return"winner:"+t}}}return h()(t,[{key:"configSocket",value:function(t){this.socket=new WebSocket("ws://"+t+":38301");var e=this;this.socket.onopen=function(){console.log("connected"),e.sendCommand("start",e.id)},this.socket.onmessage=function(t){console.log(t.data)}}},{key:"sendCommand",value:function(t,e){this.socket.send(""+this.commands[t](e))}}]),t}(),M={data:function(){return{colors:["#A62639","#59C3C3","#9FD356","#F1DAC4","#0A100D"],pickedColor:0,bgc:{backgroundColor:"#A62639AA"},socket:new x}},mounted:function(){this.setBackgroundColor()},methods:{setBackgroundColor:function(){this.bgc.backgroundColor=this.colors[this.pickedColor]+"44"},changeColor:function(t){this.pickedColor=t,this.setBackgroundColor(),this.socket.sendCommand("colors",this.pickedColor)}},name:"Colors",components:{ColorPicker:S}},A={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"background",style:t.bgc},t._l(t.colors,function(e,i){return n("color-picker",{attrs:{color:e,index:i,picked:t.pickedColor},on:{"change-color":t.changeColor}})}))},staticRenderFns:[]};var _=n("VU/8")(M,A,!1,function(t){n("dDH7")},"data-v-48b5414a",null).exports,F={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"center"},[n("v-btn",{attrs:{color:"error"},on:{click:function(e){t.sendVelocity(0,0)}}},[t._v("STOP")])],1)},staticRenderFns:[]};var E=n("VU/8")({data:function(){return{}},mounted:function(){},methods:{sendVelocity:function(t,e){this.$emit("move-robot",{left:t,right:e})}},name:"Actions"},F,!1,function(t){n("uwyS")},"data-v-73802c2b",null).exports,R=n("mvHQ"),V=n.n(R),$=n("//Fk"),H=n.n($),T=function t(){a()(this,t),this.sendFirstRequest=function(){return this.makeRequest("GET","http://localhost:3005/spheroController/config")},this.makeRequest=function(t,e){return new H.a(function(n,i){var s=new XMLHttpRequest;s.open(t,e,!0),s.onload=function(){s.readyState==XMLHttpRequest.DONE?n(s.response):i({status:this.status,statusText:s.statusText})},s.onerror=function(){i({status:this.status,statusText:s.statusText})},s.send()})},this.sendLastRequest=function(){var t=new XMLHttpRequest;t.open("POST","/game/end",!0),t.setRequestHeader("Content-Type","application/json;charset=UTF-8"),t.send(V()({result:0,group:this.group,nick:this.nick,age:this.age})),t.onreadystatechange=function(){t.readyState==XMLHttpRequest.DONE&&window.location.replace(t.responseText)}}},L={data:function(){return{model:null,serverApp:new T,spheroService:new x,setWinner:!1}},mounted:function(){var t=this;this.serverApp.sendFirstRequest().then(function(e){var n=JSON.parse(e);console.log(n),t.spheroService.configSocket(n.ip)})},methods:{moveRobot:function(t){this.spheroService.sendCommand("move",t)},changeComponent:function(){console.log("change")}},name:"App",components:{Rotation:g,Joystick:w,Colors:_,Actions:E}},N={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-toolbar",{attrs:{dark:!0,tabs:""}},[n("v-toolbar-title",[t._v("Sphero Controller")]),t._v(" "),n("v-tabs",{attrs:{slot:"extension",grow:""},slot:"extension",model:{value:t.model,callback:function(e){t.model=e},expression:"model"}},[n("v-tab",{attrs:{href:"#joystick"}},[t._v("Joystick")]),t._v(" "),n("v-tab",{attrs:{href:"#rotation"}},[t._v("Rotation")]),t._v(" "),n("v-tab",{attrs:{href:"#actions"}},[t._v("Actions")])],1)],1),t._v(" "),n("v-tabs-items",{class:"tabs",model:{value:t.model,callback:function(e){t.model=e},expression:"model"}},[n("v-tab-item",{class:"tab",attrs:{id:"joystick"}},[n("joystick",{on:{"move-robot":t.moveRobot}})],1),t._v(" "),n("v-tab-item",{class:"tab",attrs:{id:"rotation"}},[n("rotation",{on:{"move-robot":t.moveRobot}})],1),t._v(" "),n("v-tab-item",{class:"tab",attrs:{id:"actions"}},[n("actions",{on:{"move-robot":t.moveRobot}})],1)],1),t._v(" "),n("v-footer",{attrs:{fixed:!0,dark:!0,app:""}},[n("span",[t._v("© 2018")]),t._v(" "),n("v-spacer"),t._v(" "),n("span",[t._v("Łukasz Strzałka")])],1),t._v(" "),n("socket-service")],1)},staticRenderFns:[]};var D=n("VU/8")(L,N,!1,function(t){n("WH6s")},"data-v-4b07ca5c",null).exports,B=n("M+UZ"),q=n.n(B),O=n("IcMm"),P=n.n(O),W=n("rPQa"),z=n.n(W),U=n("TWha"),J=n.n(U),X=n("fYhH"),Z=n.n(X),Q=n("7Q1V"),j=n.n(Q),I=n("7M7f"),G=n.n(I),Y=n("JUsQ"),K=n.n(Y),tt=n("+9ps"),et=n.n(tt),nt=n("6/SM"),it=n.n(nt),st=n("f/u0"),rt=n.n(st),ot=n("6VHA"),at=n.n(ot);n("s6ZO");i.a.use(q.a,{components:{VApp:P.a,VNavigationDrawer:z.a,VFooter:J.a,VList:Z.a,VBtn:j.a,VIcon:G.a,VGrid:K.a,VToolbar:et.a,VTabs:it.a,VCard:rt.a,transitions:at.a},theme:{primary:"#52154E",secondary:"#323031",accent:"#FBFFF1",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}),i.a.config.productionTip=!1,i.a.config.devtools=!0,i.a.config.silent=!0,new i.a({el:"#app",components:{App:D},template:"<App/>"})},NOHZ:function(t,e){},P0ba:function(t,e){},WH6s:function(t,e){},"X05+":function(t,e){},XC5Q:function(t,e){},acBN:function(t,e){},dDH7:function(t,e){},kP4z:function(t,e){},kVeV:function(t,e){},"o+XP":function(t,e){},pu2v:function(t,e){},s6ZO:function(t,e){},uwyS:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.96a3b80e608d272877ab.js.map