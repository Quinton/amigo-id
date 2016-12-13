const crypto = require('crypto');
const https = require("https");


//FIX: http://stackoverflow.com/questions/20433287/node-js-request-cert-has-expired
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

exports.macSign = function (token, context) {
    const timestamp = context.timestamp;
    const nonce = context.nonce;
    const method = context.method;
    const uri = context.uri;
    const host = context.host;
    const port = context.port;
    const appId = context.port;
    const appKey = context.appKey;
    const amigoConsumerSecret = [timestamp, nonce, method, uri, host, port].join('\n') + '\n\n';
    //macKey: 对请求进行 mac 签名, macKey 为应用程序的 AppKey, 由帐号系统分配。算法 HmacSHA1
    const macKey = crypto.createHmac('sha1', appKey).update(amigoConsumerSecret).digest('base64');
    var options = {
        method: method.toUpperCase(),
        hostname: host,
        port: port,
        path: uri,
        headers: {
            Authorization: 'MAC id=' + appId + ',' + 'ts=' + timestamp + ',' + 'nonce=' + nonce + ',' + 'mac='+ macKey + ',',
            'Content-Type': 'application/json'
        },

    };

    return new Promise(function (resolve, reject) {
        var req = https.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            req.on('error', function (e) {
                return reject(e);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                return resolve(body.toString());
            });
        });
        req.write(JSON.stringify(token));

        req.end();
    })
};
