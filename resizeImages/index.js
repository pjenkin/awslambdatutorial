// 2-33 S3 events example - serverless image resizing

const im = require('imagemagick');
const fs = require('fs');
const os = require('os');
const uuidv4 = require('uuid/v4');
const {promisify} = require('util');
const AWS = require('aws-sdk');

AWS.config.update({region: 'eu-west-2'});
const s3 = new AWS.S3();

// always export.handler for Lambda event handler
exports.handler = async (event) =>
{
    // NB process multiple files - could be multiple Promises
    let filesProcessed = event.Records.map(async(record) => {        // :-o map again....

    });

    // wait for all Promises to resolve
    await Promise.all(filesProcessed);
    console.log("done");
    return "done";
}
