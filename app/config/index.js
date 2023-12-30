
module.exports = function(argv) {

  try{
    const baseConfig = require('./config-base');
    const envConfig = require(argv.env ? `./config-${argv.env}` : './config');
    const config = Object.assign(envConfig, baseConfig);
    config.useSentry = global.useSentry
    const store = global.store;

    // 主进程调用
    if(store){
      const xChannel = store.get('xChannel');
      // 渠道缓存
      if(argv.clean){
        store.delete('xChannel');
      }else if(xChannel){
        config.xChannel = xChannel;
      }else{
        store.set('xChannel', config.xChannel);
      }
    }
    
    // 唤起来源 
    config.from = argv.from || 'self';
    
    // 唤起源登录帐号uid
    config.uid = argv.uid || '';

    return config;
  }catch(e){
    const baseConfig = require('./config-base');
    const envConfig = require('./config');

    return Object.assign(envConfig, baseConfig);
  }
}