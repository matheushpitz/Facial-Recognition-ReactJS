const fs = require('fs');
let gen = 0;
const generator = () => gen++;
const tempPath = './tmp';

module.exports.startTempHandle = () => {
    fs.mkdir(tempPath, (err) => {
        if(err)
            console.log('tmp directory was already created.');
        else
            console.log('tmp directory was created.');
    });
}

module.exports.createTempBase64 = (base64) => {
    return new Promise((resolve, reject) => {
        // get the image data.
        let data = base64.split(';base64,').pop();
        // generate filename.
        let filename = 'tmp_'+generator()+'.tmp';
        // save the image temp.
        fs.writeFile(tempPath+'/'+filename, data, {encoding: 'base64'}, (err) => {
            if(err)
                // Reject if a error occurs.
                reject(err);
            else
                // Resolve if it was created.
                resolve(filename);
        });
    });
}

module.exports.readTemp = (id) => {
    // Create the ReadStream.
    return fs.createReadStream(tempPath+'/'+id);
}

module.exports.deleteTemp = (id) => {
    return new Promise((resolve, reject) => {
        // Delete the tempFile.
        fs.unlink(tempPath+'/'+id, (err) => {
            if(err)
                // If a error occurs, reject it !!
                reject(err);
            else
                // If all are ok, resolve it.
                resolve(id);
        });
    });
}