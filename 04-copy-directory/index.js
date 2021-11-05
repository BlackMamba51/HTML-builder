const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'files');
const pathToNewFile = path.join(__dirname,'files-copy') 


fs.mkdir(pathToNewFile, {recursive:true}, (err) => {
    if (err) throw err;
});

fs.readdir(pathToFile, 'utf-8', (dirError, data) => {
    if (dirError) throw dirError;

    for(let file of data) {

        let pathFiles = path.join(pathToFile, file);

        fs.copyFile(pathFiles,path.join(pathToNewFile, file),(copyError) => {
            if (copyError) throw copyError
        })
    }
});

