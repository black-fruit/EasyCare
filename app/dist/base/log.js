var logPath,log=require("../tools/log"),app=require("electron").app,path=require("path");log.appName="Easicare-PC",log.transports.console=!1,log.transports.file.format="{h}:{i}:{s}:{ms} {text}",log.transports.file.maxSize=5242880,log.transports.file.streamConfig={flags:"a"};try{var logPathPrefix=app.getPath("appData"),dirName="Easicare-PC",logFileName="EasiCareLog-"+global.config.version+"-"+global.config.updateTime+".txt";logPath=path.join(logPathPrefix,dirName,logFileName)}catch(a){console.error("Logger Initial Failed: ",a)}log.transports.file.file=logPath,module.exports=log;