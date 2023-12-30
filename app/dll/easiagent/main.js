/**
 * @description 检测本地 easiagent是否已经开启
 *              如果已经开启，则不作任何操作
 *              如果还没开启，通过读注册表的方式，启动easiagent
 */

const cp = require('child_process');
const exec = cp.exec;

const reg = require('winreg');

const TASK_NAME = 'EasiAgent.exe';
//32位机器位置
const EASI_AGENT_REG_KEY    = '\\SOFTWARE\\Seewo\\EasiAgent';
//64位机器位置
const EASI_AGENT_REG_KEY2   = '\\SOFTWARE\\WOW6432Node\\Seewo\\EasiAgent';

const EXEPATH_KEY = 'ExePath';

class EasiAgentProcess {

    
    /**
     * @description 启动后，每隔1.5秒检测是否已经启动EasiAgent
     * 如果未启动，则尝试启动，如果已经启动，则不再进行轮询检测
     */
    start(){

        this.checkProcess();

        this.checkInterval = setInterval(() => {
            this.checkProcess();
        }, 1500);
    }

    checkProcess(){
        const vm = this;

        try {
            exec(`tasklist | findStr EasiAgent.exe`, function (err, stdout, stderr) {
                if (stdout.length > 0) {
                    console.log('EasiAgent is Started;');
                    clearInterval(vm.checkInterval);
                } else {
                    console.log('EasiAgent is not Started');
                    vm.getExePath();
                }
            });
        } catch (error) {
            console.error(error);
        }       
    }

    getExePath(){
        const vm = this;

        let exePath = '';

        const regKey = new reg({
            hive: reg.hklm,
            key: EASI_AGENT_REG_KEY
        });

        regKey.values(function(err, items){
            if(err){
                // do nothing
            }else{
                vm.dealRegItems(items);
            }
        });

        const regKey2 = new reg({
            hive: reg.hklm,
            key: EASI_AGENT_REG_KEY2
        });

        regKey2.values(function(err, items){
            if(err){
                // do nothing
            }else{
                vm.dealRegItems(items);
            }
        });        
    }

    dealRegItems(items){
        
        const vm = this;

        for(let index = 0; index < items.length; ++index){
            const item = items[index];            

            if(item.name === EXEPATH_KEY){
                const exePath = item.value;
                vm.startExe(exePath);
            }
        }
    }

    startExe(exePath){
        try{
            exec('"' + exePath + '"');
        }catch(err){
            console.error(err);
        }
    }
}

module.exports = new EasiAgentProcess();

