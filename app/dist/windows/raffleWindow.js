var SystemInfo=require("../components/SystemInfo"),WindowPrototype=require("./WindowPrototype"),path=require("path"),raffleWindow=function(){this.instance=null,this.name="raffle-window";var e=SystemInfo.transparentAvailable;this.state={title:this.name,width:810,height:504,frame:!1,resizable:!1,transparent:e,flashFrame:!1,show:!1,focusable:!0,skipTaskbar:!0},this.url=path.join(`file://${APP_PATH}/dist/pages/views/raffle.html`)};raffleWindow.prototype=new WindowPrototype,module.exports=new raffleWindow;