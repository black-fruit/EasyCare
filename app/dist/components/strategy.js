const SystemInfo=require("./SystemInfo"),{StartMainWindowEventProxy:StartMainWindowEventProxy}=require("./MessageCenter"),WindowsCenter=require("../windows/WindowsCenter");class Strategy{constructor(){this.currThemeInfo=void 0,this.hasEnoughMem=!1}set(n,o){this[n]=o}openMainWindow(n,o){let e=[];e=this.hasEnoughMem?["about-me-window","main-window","honor-window","honor-mini-window","mini-medal-picker-window","timer-window","noise-window","relay-window","raffle-window","change-theme-window"]:["main-window","honor-mini-window","honor-window"],StartMainWindowEventProxy.removeAllListeners(),StartMainWindowEventProxy.all(...e.map((n=>`${n}-ready-to-show`)),(()=>{console.log("Login End: ",Date.now().toString()),clearTimeout(null),WindowsCenter.closeWindow("prechecking-window"),WindowsCenter.closeWindow("login-window"),WindowsCenter.showWindow("main-window"),n&&n()}));for(const n of e)WindowsCenter.openWindow(n);console.log("Login Start: ",Date.now().toString()),this.LoginTimeoutChecking=setTimeout((function(){!1===WindowsCenter.getWindow("main-window").isVisible()&&!1===WindowsCenter.getWindow("honor-window").isVisible()&&!1===WindowsCenter.getWindow("honor-mini-window").isVisible()&&(StartMainWindowEventProxy.removeAllListeners(),o&&o(),WindowsCenter.sendToWindow("login-window","login-timeout"))}),12e4)}openSomeWindow(n,o=(()=>{})){if(this.hasEnoughMem)o();else{const e=o;o=()=>{WindowsCenter.sendToWindow(n,"change-theme",this.currThemeInfo),e()},console.log("openSomeWindow",n,this.currThemeInfo&&this.currThemeInfo.skin),WindowsCenter.openWindow(n,o)}}hideSomeWindow(n,o=(()=>{})){this.hasEnoughMem?(WindowsCenter.hideWindow(n),o()):(WindowsCenter.closeWindow(n),o())}}Strategy.prototype.ALWAYS_ON_TOP_WINDOWS=["about-me-window","timer-window","noise-window","relay-window","change-theme-window","tencent-login-window"],module.exports=new Strategy;