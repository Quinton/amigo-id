const crypto = require('crypto');
const https = require("https");
const qs = require("querystring");


//FIX: http://stackoverflow.com/questions/20433287/node-js-request-cert-has-expired
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

exports.macSign = function (token, context, next) {
    const {timestamp, nonce, method, uri, host, port, appId, appKey} = context;
    const amigoConsumerSecret = [timestamp, nonce, method, uri, host, port].join('\n') + '\n\n';
    //macKey: 对请求进行 mac 签名, macKey 为应用程序的 AppKey, 由帐号系统分配。算法 HmacSHA1
    let macKey = crypto.createHmac('sha1', appKey).update(amigoConsumerSecret).digest('base64');

    let options = {
        method: method.toUpperCase(),
        hostname: host,
        port: port,
        path: uri,
        headers: {
            Authorization: `MAC id="${appId}",ts="${timestamp}",nonce="${nonce}",mac="${macKey}"`,
            'Content-Type': 'application/json'
        },

    };
    let req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        req.on('error', (e) => {
            return next(e, null)
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            return next(null, body.toString());
        });
    });
    req.write(JSON.stringify(token));

    req.end();
};