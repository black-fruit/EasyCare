/*
 * easiupdate的controller
 * 注意点：easiupdate的checkUpdate和doUpdate两个方法都会阻塞进程的运行，
 * 			视符网络情况以及easiupdate服务的情况，阻塞时长不定，所以该模块的
 * 			checkUpdate和doUpdate两个方法不能放到主进程中运行
 * 使用到的全局变量：1、config；2、APP_PATH
 */

var path = require('path');



var CURRENT_VERSION = config.version;
var APP_KEY = config.updateKey;
var APP_NAME = config.appName;

var INSTALL_PATH = '';

try {
  // 当前软件安装路径，就是exe的上一层目录
  INSTALL_PATH = path.join(APP_PATH, '..', '..', '..', `${APP_NAME}_${CURRENT_VERSION}`);
} catch (err) {
  console.log(err);
}

function easiupdateEntry() {
  this.name = 'easiupdate controller';
}

if (global.isDev) {
  var libpath = path.join(APP_PATH, '..', '..', '/build/Source/EasiUpdateClientAddon.node');
} else {
  var libpath = path.join(APP_PATH, '..', '..', '/EasiUpdateClientAddon.node');
}

var easiupdateLib = require(libpath);
var entry = new easiupdateEntry();

easiupdateEntry.prototype.initialize = function () {
  try {
    easiupdateLib.Init(APP_KEY, CURRENT_VERSION, APP_NAME, INSTALL_PATH);
  } catch (err) {
    console.log('easiupdate init error:', err);
  }
};

easiupdateEntry.prototype.checkUpdate = function () {
  try {
    return easiupdateLib.SetupQuery();
  } catch (err) {
    console.log('easiupdate check update error:', err);
  }
};

/** test  */
// entry.initialize();
// entry.checkUpdate();
// entry.doUpdate();

module.exports = entry;
