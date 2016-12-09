const assert = require('assert');
const amigo = require('../lib/index');

describe('Oauth With Amigo', function() {
    const context = {
        host : 't-id.amigo.cn', //测试环境
        port : '6443',
        timestamp : new Date().getTime(), //时间戳,距离 1970-01-01 00:00:00 GMT 的秒数。
        nonce:'1qazxcvgt54', // 随机字符串。
        method:'POST',
        uri: '/account/verify.do',
        appId:'A05B5DA7546645F99840F1B5578707D2' //应用程序标识,由帐号系统分配
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