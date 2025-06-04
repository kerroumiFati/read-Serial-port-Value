const { app, BrowserWindow,ipcMain,Notification } = require('electron');
const path = require('path');
const { argv } = require('process');
//const { SerialPort } = require('serialport');
//const { ReadlineParser } = require('@serialport/parser-readline');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const isDev= !app.isPackaged;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor:"white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScripte: true,
      contextIsolation:true,
     preload:path.join(__dirname,'scripte.js')
    },
  
  
  });

  mainWindow.loadFile("index.html");
  mainWindow.openDevTools();

}
 if(isDev)
 {
  require('electron-reload')(__dirname,{
    electron:path.join(__dirname,'node_modules','.bin','electron')
  })
 }

ipcMain.on('notify',(_,message)=>{
  new Notification({title:'Notification',body:message}).show();

})

const port = new SerialPort({
  path: 'COM4', //EDIT AS NEEDED
  baudRate: 9600 //EDIT AS NEEDED
})

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (data) => {
  document.querySelector('#root').innerHTML = data;

})


 function getval(){


  
   const val = "hammada";
  return val;
 }

 
 ipcMain.handle('products',getval);


 app.whenReady().then(createWindow)

/*app.whenReady().then(()=>{
  ipcMain.handle('products',getval);
  createWindow();

 

})*/