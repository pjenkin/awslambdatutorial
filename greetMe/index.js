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