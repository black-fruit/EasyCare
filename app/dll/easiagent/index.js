var cp      = require('child_process');
var path    = require('path');

var proc = cp.fork(path.join(APP_PATH, '/dll/easiagent/child_process'));

//注册子进程实例到全局变量
global.childProcesses.push(proc);