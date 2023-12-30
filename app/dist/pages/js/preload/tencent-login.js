
window.login = function (data){
  const { ipcRenderer } = require('electron');
  ipcRenderer.sendToHost(data)
}

