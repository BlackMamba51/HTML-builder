const fs = require('fs');
const path = require('path');
const { stdout, stdin } = require('process');
const process = require('process');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
});
const output = fs.createWriteStream(path.join(__dirname,'text.txt'));

stdout.write("Здравствуйте, введите текст:\n")

rl.on('line', (line) => {
    if(line === 'exit') {
        rl.close();
        process.exit();
    }
});

stdin.on('data', data => {
    output.write(data);
});

process.on('SIGINT', () => {
    stdout.write('Удачи!!!')
    process.exit();
});

rl.on('close', () => {
    stdout.write('Удачи!!!');
})
