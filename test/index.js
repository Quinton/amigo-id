const assert = require('assert');
const amigo = require('../lib/index');

describe('Auth With Amigo', function() {
    const context = {
        host : 't-id.amigo.cn',
        port : '6443',
        timestamp : new Date().getTime(),
        nonce:'1qazxcvgt54',
        method:'POST',
        uri: '/account/verify.do',
        appId:'012BA6F15BF04CAAA7A53B3AEA11A57C'
    };
    const token = {"h":"BBFA0DB5590D430399AA6A912191E37B","n":"2494BABE","t":"1481250344","v":"EEF0C3AAF3636628B333B77A10543D6169D2D333"};
    it('should return {"wid": "xxx","r": "xxx","err": "不存在该应用(AppId|AppKey)"} when the value is not present', function(done) {
        amigo.macSign(token, context, function (err, res)  {
            done();
            assert.equal(res.err, "不存在该应用(AppId|AppKey)");
            assert.equal(res.r, "1011");
        });
    });
});