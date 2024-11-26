import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'data.json');


function readFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}


function writeFile(content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


async function updateFile() {
    try {
        let data = await readFile();
        console.log('Original Content:', data);

        const newData = [{ name: 'Kevin' }, { name: 'John Pork' }, { name: 'Meat Matthew' }];
        data = data.concat(newData);

        await writeFile(data);

        const updatedData = await readFile();
        console.log('Updated Content:', updatedData);
    } catch (err) {
        console.error('Error:', err);
    }
}

updateFile();