var SystemInfo=require("../components/SystemInfo"),WindowPrototype=require("./WindowPrototype"),path=require("path"),tencentLoginWindow=function(){this.instance=null,this.name="tencent-login-window";var e=SystemInfo.transparentAvailable;this.state={title:this.name,width:410,height:550,frame:!1,resizable:!1,transparent:e,flashFrame:!1,show:!1,focusable:!0,skipTaskbar:!0,referer:"https://sso.qq.com/"},this.url=global.config.tencentSSOUrl,this.url=path.join(`file://${APP_PATH}/dist/pages/views/tencent-login.html`)};tencentLoginWindow.prototype=new WindowPrototype,module.exports=new tencentLoginWindow;