const {contextBridge, ipcRender} = require('electron');

contextBridge.exposeInMainWorld('api', {
    newWindow: () => {
       ipcRender.send('new-window');
    }
});