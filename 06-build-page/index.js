const fs = require('fs');
const path = require('path');

const folderStyle = path.join(__dirname, 'styles');
const folderProjectDist = path.join(__dirname, 'project-dist');
const newStyleFile = fs.createWriteStream(path.join(folderProjectDist, 'style.css'));
const oldAssetsFile = path.join(__dirname, 'assets');
const newAssetsFile = path.join(folderProjectDist, 'assets');
const componentsPath = path.join(__dirname, 'components');
const pathToTemplate = path.join(__dirname, 'template.html');
const pathToIndex = path.join(folderProjectDist, 'index.html');


fs.readFile(pathToTemplate,('utf-8'), (err, template) => {
    if(err) throw err;
    template = template.toString();
    
    fs.readdir(componentsPath, 'utf-8', (error, data) => {
        if(error) throw error;
    
        for(let file of data) {
            let componentsFiles = path.join(componentsPath, file);
            if (path.extname(file) === '.html') {
                fs.readFile(componentsFiles,('utf-8'), (error, replace) => {
                    if(error) throw error;

                    replace = replace.toString();

                    template = template.replaceAll(`{{${file.slice(0,-5)}}}`, replace);
                    fs.writeFile(pathToIndex, template,(err) => {
                        if(err) throw err;
                    });
                });
            }
        }
    });
});


fs.mkdir(folderProjectDist , {recursive:true}, (err) => {
    if(err) throw err
});

fs.readdir(folderStyle, 'utf-8', (error, data) => {
    if(error) throw error;
    
    for(let file of data) {
        let pathToCssFiles = path.join(folderStyle, file);

        const styleStream = fs.createReadStream(pathToCssFiles, 'utf-8');

        let data = [];

        styleStream.on('data', chunk => {
            data += chunk;
            newStyleFile.write(data);
        })
    }
});

fs.mkdir(newAssetsFile, {recursive:true}, (assetsErr) => {
    if(assetsErr) throw assetsErr;
});
fs.readdir(newAssetsFile, {recursive:true}, (err, data) => {
    for(let file of data) {
        fs.unlink(path.join(newAssetsFile, file), () => {
            
        })
    }
})
fs.readdir(oldAssetsFile, 'utf-8', (oldErr, files) => {
    if(oldErr) throw oldErr;

    for(let file of files) {

        let pathToOldAssetsFiles = path.join(oldAssetsFile, file);
        let pathFile = path.parse(pathToOldAssetsFiles);
        let direct = path.join(newAssetsFile,`${pathFile['name']}`);
        
        fs.mkdir(direct, {recursive:true}, (err) => {
            if(err) throw err;
        });
        
        fs.readdir(pathToOldAssetsFiles, 'utf-8', (Error, data) => {
            if(Error) throw Error;
        
            for(let file of data) {
                let pathToCopyFiles = path.join(pathToOldAssetsFiles, file);
                
                fs.copyFile(pathToCopyFiles, path.join(newAssetsFile,`${pathFile['name']}`,file), (copyError) => {
                    if(copyError) throw copyError;
                });
                
            }
        });
    }
});

