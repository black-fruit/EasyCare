const cp = require('child_process');
const path = require('path');
const argv = [];

if(global.argv.env){
  argv.push(`--env=${global.argv.env}`);
}

if(global.isDev){
  argv.push(`--mode=dev`);
}

const proc = cp.fork(path.join(APP_PATH, '/dll/easiupdate/child_process'), argv);


//注册子进程实例到全局变量
global.childProcesses.push(proc);
