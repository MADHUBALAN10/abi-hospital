const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        let modified = content.replace(
            /http:\/\/localhost:4000\/api/g,
            'http://localhost:5000/api'
        );

        if (content !== modified) {
            fs.writeFileSync(filePath, modified, 'utf8');
            console.log('Fixed API_URL in:', filePath);
        }
    }
}

function traverse(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                traverse(fullPath);
            }
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            replaceInFile(fullPath);
        }
    });
}

const dirsToScan = [
    'c:\\Users\\madhu\\Music\\abi-hospital\\admin\\src',
    'c:\\Users\\madhu\\Music\\abi-hospital\\client\\src'
];

dirsToScan.forEach(traverse);
