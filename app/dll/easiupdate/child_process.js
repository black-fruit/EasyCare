var path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;
/* 子线程与主线程不共享内存，使用到的变量需要渲染线程自己准备 */
global.APP_PATH = path.join(__dirname, '../../');
global.isDev = argv.mode === 'dev';
global.config = require('../../config')(argv);

var easiupdateEntry = require('./main');
process.checkUpdateProcess = null;

setTimeout(function(){
	
	//开始easiupdate静默升级处理
	
	//初始化entry
	easiupdateEntry.initialize();

	process.checkUpdateProcess = setInterval(checkUpdate, 30000);
	
}, 0);

/** 发送检查更新指令，如果符合，则直接向easiupdate更新  */

var EASIUPDATE_READY = 0;

function checkUpdate(){

	var result = easiupdateEntry.checkUpdate();
	if(result && result.code === EASIUPDATE_READY){
		//如果发现有可使用的更新，则停止轮询
		clearInterval(process.checkUpdateProcess);
		process.checkUpdateProcess = null;
	}

}

