/*const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const port = new SerialPort({
    path: 'COM3', //EDIT AS NEEDED
    baudRate: 9600 //EDIT AS NEEDED
})

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (data) => {
    document.querySelector('#root').innerHTML = data;

})
*/