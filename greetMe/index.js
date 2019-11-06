// 2-25 Lambda handler syntax (Nodejs 6 & 8)
// Nodejs 6 without async/await
// exports.handler = (event, context, callback) => {
//     ...
//     callback(null, result);
// }

// lambda handler using async/await with Promise - Nodejs 8 with async/await (no callback needed)
// this pattern will be used a lot with AWS Lambda
// event is the source of data
// context eg function name, remaining time, memory allocation &c
exports.handler = async (event, context) => {
    
    context.getRemainingTimeInMillis(); // 2-27 Context object properties & methods

    context.functionName;   // sample function context properties
    context.functionVersion;
    context.functionArn;
    context.awsRequestId;   
    context.memoryLimitInMB;    // re function settings
    context.identity; // Cognito /AWS mobile SDK
    context.logGroupName;
    context.logStreamName;
    context.clientContext.client.app_title; // useful for AWS mobile SDK re user's device
    context.clientContext.Custom;
    context.clientContext.env.platform_version;
    context.clientContext.env.model;

    // 2-28 Logging and error handling
    const error = new Error("An error occurred");
    throw error;    // if using async/await
    console.error("Error occurred" + error.message);
    console.log("A log message");
    console.info("An informative styling of message")
    console.warn("Warning style of message!");
    // all of these are logged into AWS CloudWatch


    const data = event.data;
    let newImage = await resizeImage();     // await Promise from resizeImage's lambda/arrow expression;  no need for .then()
    return newImage;
    //return result;
}

// write function that'll return a promise
const resizeImage = (data) => new Promise((resolve, reject) =>
{

    if (error)
    {
        reject(error);
    } else
    {
        resolve(result);
    }
});