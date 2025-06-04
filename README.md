# 📦 Projet : Lecture des données du port série avec Electron

Cette application **Electron** permet de lire des données à partir d’un **port série** (ex. Arduino) et de les afficher dans une interface HTML.  
Elle utilise également les **notifications système** et la **communication IPC (Inter-Process Communication)** entre le processus principal (main) et le processus de rendu (renderer).

---

## 🧱 Structure principale

- **`main.js`** : Gère la fenêtre principale, la lecture du port série, les notifications, et la communication IPC.
- **`preload.js`** : Sert de pont sécurisé entre le processus de rendu et le processus principal grâce à l’option `contextIsolation`.
- **`index.html`** : Interface utilisateur.
- **`scripte.js`** : Script chargé en preload pour activer la communication sécurisée.

---

## 🧵 Lecture des données du port série

L’application utilise la librairie `serialport` pour lire les données depuis un port série.

### ⚙️ Configuration

```js
const port = new SerialPort({
  path: 'COM4',     // Assurez-vous que votre câble série est connecté à ce port
  baudRate: 9600    // Vitesse de transmission
});
```

> 🔧 Si vous utilisez un autre port que `COM4`, modifiez la valeur dans le code.

Les données reçues sont lues ligne par ligne avec un parser :

```js
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
```

Et envoyées au renderer via IPC :

```js
parser.on('data', (data) => {
  mainWindow.webContents.send('serial-data', data);
});
```

---

## 🔔 Notification système

L’application peut afficher des notifications depuis le processus renderer via une commande IPC.

### Côté main process (`main.js`)

```js
ipcMain.on('notify', (_, message) => {
  new Notification({ title: 'Notification', body: message }).show();
});
```

### Côté renderer (`preload.js` ou script HTML)

```js
const { ipcRenderer } = require('electron');
ipcRenderer.send('notify', 'Message à afficher');
```

---

## 📡 Communication IPC

L'application permet de récupérer une valeur simple depuis le processus principal :

### Côté main process

```js
ipcMain.handle('products', () => {
  return "hammada";
});
```

### Côté renderer

```js
const value = await ipcRenderer.invoke('products');
console.log(value); // Affiche "hammada"
```

---

## ✅ Pour démarrer

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer l’application en développement

```bash
npm start
```

> ℹ️ L'application utilise `electron-reload` pour recharger automatiquement la fenêtre à chaque modification de fichier.

---

## 🧪 Technologies utilisées

- [Electron](https://www.electronjs.org/)
- [serialport](https://serialport.io/)
- HTML, JavaScript

---
