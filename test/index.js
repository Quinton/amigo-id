const assert = require('assert');
const amigo = require('../index');

describe('Oauth With Amigo', function() {
    const context = {
        host : 'id.amigo.cn',
        port : '443',
        timestamp : Math.floor(Date.now() / 1000), //时间戳,距离 1970-01-01 00:00:00 GMT 的秒数。
        //2rT3gh72u8GbQARNn556eEZgmpo=
        nonce:'8FINtYTUsKbSZGfl', // 随机字符串。
        method:'POST',
        uri: '/account/verify.do',
        appId:'', //应用程序标识,由帐号系统分配, appId
        appKey:'' //应用程序标识,由帐号系统分配, appKey
    };
    //替换有效的token
    const token = {'h':'9DEDD8D5E6F04C2AA6EB34DED0721315','n':'BCC6D4CE','t':'1481523626','v':'CC0A4AE0E3CD30868F107D7CF0026446A8401721'};
    it('should return {"wid": "xxx","r": "xxx","err": "不存在该应用(AppId|AppKey)"} when the value is not present', function(done) {
        amigo.macSign(token, context).then((res) => {
            console.log(res);
	    done();
        });
    });
});
