// 2-33 S3 events example - serverless image resizing
// NB at the moment, must use .jpg extension files

const im = require('imagemagick');
const fs = require('fs');
const os = require('os');
const uuidv4 = require('uuid/v4');
const {promisify} = require('util');    // {} for destructuring of an object https://stackoverflow.com/a/48064893
const AWS = require('aws-sdk');

// NB several conversions here, of returned library functions to await-able Promises
const resizeAsync = promisify(im.resize);       // convert ImageMagick resize function into one which d'return a Promise
const readFileASync = promisify(fs.readFile);  // ... likewise, instead of returned fs (filesystem) function, convert this to an await-able Promise
const unlinkAsync = promisify(fs.unlink);          // for use in un-linking the Lambda temp directory/file (to free up memory)

AWS.config.update({region: 'eu-west-2'});
const s3 = new AWS.S3();

// always export.handler for Lambda event handler
exports.handler = async (event) =>
{
    // NB process multiple files - could be multiple Promises
    let filesProcessed = event.Records.map(async(record) => {        // :-o map again....

    // 2-34 handling S3 events in Lambda
    let bucket = record.s3.bucket.name;
    let filename = record.s3.object.key;

    // Get the file from S3
    var params = {
        Bucket: bucket,
        Key: filename
    };
    let inputData = await s3.getObject(params).promise(); // await is nice & simple

    // Resize the file
    let tempFile = os.tmpdir() + '/' + uuidv4() + '.jpg';      // access temp directory on the Lambda container environment
    let resizeArgs = {      // parameters for resizing
        srcData: inputData.Body,
        dstPath: tempFile,
        width: 150
    };
    
    await resizeAsync(resizeArgs);      // await promisify'd Promise of Image Magick resize

    // Read the resized file
    let resizedData = await readFileASync(tempFile);

    // Upload the new file to S3 (and rename)
    let targetFilename = filename.substring(0, filename.lastIndexOf('.')) + '-small.jpg';
    var params =
    {
        Bucket: bucket + '-dest',
        Key: targetFilename,
        Body: new Buffer(resizedData),
        ContentType: 'image/jpeg'
    };

    await s3.putObject(params).promise();     // convert this output S3 object to a Promise, to be await'd
    return await unlinkAsync(tempFile);         // free up memory on Lambda container

    });

    // wait for all Promises to resolve
    await Promise.all(filesProcessed);
    console.log("done");
    return "done";
}
