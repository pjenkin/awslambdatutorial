const moment = require('moment');   // 2-30 Accessing path & query string parameters from the event object
// 2-29 Passing parameters via the Event object
const greeting =
{
    "en": "Hello",
    "kr": "Dydh da",
    "fr": "Bonjour",
    "hi": "Namaste",
    "bg": "Dobry den"
}

// now write the Lambda handler (where 'event' will give URL data)
exports.handler = async (event) => {
    // 2-30 Accessing path & query string parameters from the event object
    let name = event.pathParameters.name;   // to get at query parameters in URL
    // NB policy JSON for Lambda test event template 'APIGatewayAWSProxy' ...
    // ... has attributes called quenryStringParameters, and pathParameters
    let {lang, ...info} = event.queryStringParameters; // NB 'lang' parameter (in URL querystring) & spread operator to assign others to 'info'

    let message = `${greeting[lang] ? greeting[lang] : greeting['en'] } ${name}`;
    // string-interpolate the url and the message

    // assemble a HTTP response body content object ready to return from this event
    let response = {
        message : message,
        info: info, // anything else
        timestamp: moment().unix() // have to npm init then npm install moment --save
    }

    // well-formed HTTP response object (status code and body) expected by Lambda
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
}