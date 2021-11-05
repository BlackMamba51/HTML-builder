const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');
const stream = fs.createReadStream(folderPath);

fs.readdir(folderPath, 'utf-8', (err, data) => {
    if(err) throw err;

    for (let i = 0; i < data.length; i++) {
        let pathFile = path.join(folderPath, data[i]);
        
        fs.stat(pathFile, (error, stats) => {
            if(error) throw error;

            if(stats.isFile()) {
                const fileName = path.parse(pathFile);
                console.log(`${fileName['name']} - ${path.extname(data[i]).slice(1)} - ${stats.size}`);
            }
        }) 
    }
})


