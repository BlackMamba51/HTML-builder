const fs = require('fs');
const path = require('path');

const pathToStyles = path.join(__dirname, 'styles');
const pathToProjectDist = path.join(__dirname, 'project-dist');

const newCssFile = fs.createWriteStream(path.join(pathToProjectDist,'bundle.css'));

fs.readdir(pathToStyles, 'utf-8', (err, data) => {
    if (err) throw err;
    
    for(let file of data) {
        let pathToCss = path.join(pathToStyles,file);
        
        fs.stat(pathToCss, (error, stats) => {
            if(error) throw error; 

            if(stats.isFile() && path.extname(file).slice(1) === 'css') {
                const readStream = fs.createReadStream(pathToCss, 'utf-8');
                
                let data = []; 

                readStream.on('data',chunk => {
                    data += chunk;
                    newCssFile.write(data);
                });
                console.log(path.extname(file).slice(1));
            }
        })

    }

});
