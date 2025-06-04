📦 Projet : Lecture des données du port série avec Electron
Cette application Electron permet de lire des données à partir d’un port série (par exemple : Arduino connecté via câble USB) et de les afficher dynamiquement dans une interface HTML.
Elle utilise également des notifications système et la communication IPC (Inter-Process Communication) entre le processus principal et le processus de rendu.

🧱 Structure principale
main.js : Fichier principal du processus main d’Electron, responsable de la création de la fenêtre, de la gestion du port série, des notifications, et des canaux IPC.

⚠️ Un fichier preload.js est utilisé pour permettre une communication sécurisée entre le renderer (frontend) et le main process, tout en gardant l'isolation de contexte activée (contextIsolation: true).

🧵 Lecture des données du port série
L’application écoute les données du port COM4 avec une vitesse de transmission (baudRate) de 9600.
Assurez-vous que votre périphérique (Arduino, etc.) est bien connecté sur le port COM4, ou modifiez la valeur dans le code si nécessaire :

const port = new SerialPort({
  path: 'COM4',
  baudRate: 9600
});
Les données reçues sont traitées via un parser en utilisant le délimiteur \r\n 
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

Elles sont ensuite envoyées vers le renderer via IPC :
parser.on('data', (data) => {
  mainWindow.webContents.send('serial-data', data);
});

🔔 Notification système
L'application permet d'afficher une notification système native depuis le processus de rendu.
Dans le main.js, un canal IPC reçoit le message et déclenche la notification :

ipcMain.on('notify', (_, message) => {
  new Notification({ title: 'Notification', body: message }).show();
});

ipcMain.on('notify', (_, message) => {
  new Notification({ title: 'Notification', body: message }).show();
});

Dans preload.js ou le renderer (frontend), utilisez :
ipcRenderer.send('notify', 'Votre message');

📡 Communication IPC (Main → Renderer)
L’application implémente un appel IPC permettant au renderer de demander des valeurs au main process :

ipcMain.handle('products', () => {
  return "hammada";
});

Côté renderer, utilisez :
const value = await ipcRenderer.invoke('products');

✅ Pour démarrer
1. Installez les dépendances :

npm install

2. Lancez l’application en mode développement :
npm start


