/**
 *   @version : 1.0.0
 *   @author: guoqingzhou
 *   微信分享Lite版
 */
;(function(win) {
    "use strict";
    function wxShare(shareData) {
        var isWx = !! (window['WeixinJSBridge'] || /MicroMessenger/i.test(window.navigator.userAgent));
        if (!isWx){
            console.log('use wxShare 请用微信客户端打开');
            return 0;
        }

        window.getShareData =function(data) {
            var getMetaData = function () {
                //解析meta data
                var o = document.getElementsByTagName("meta");
                var rlt = {};
                for (var i = 0; i < o.length; i++) {
                    var vn = o[i].getAttribute('name');
                    var vp = o[i].getAttribute('property');
                    var vl = o[i].getAttribute('content') || "";
                    if (vn == null || vn == undefined || vn.length == 0) {
                        vn = vp;
                    }
                    if (vn == null || vn == undefined || vn.length == 0) {
                        continue;
                    }
                    rlt[vn] = vl;
                }
                return rlt;
            };
            var meta  =   getMetaData();
            data = data ? data : meta;
            var rlt = {
                'appid': '',
                'img_url': data['image']||meta['og:image']||'http://css.tv.itc.cn/global/images/nav1/logo.gif',
                'img_width': '100',
                'img_height': '100',
                'link':data['url']||meta['og:url']|| location.href,
                'desc':data['desc']|| meta['og:desc']||meta['description']||'搜狐视频一家专业在线视频网站。',
                'title':data['title']||meta['og:title']|| '搜狐视频'
            };
            return rlt;
        };

        window.wxShareData = window.getShareData(shareData);
        // 分享内容
        // ==============================
        var shareContent = {
            title: wxShareData.title || document.title, // 分享标题
            desc: wxShareData.desc || '', // 分享描述
            link: wxShareData.link|| wxShareData.url || window.location.href, // 分享链接
            imgUrl: wxShareData.imgUrl ||wxShareData.img_url || '', // 分享图标
            type: wxShareData.type || '', // 分享类型,music、video或link,不填默认为link
            dataUrl: wxShareData.dataUrl || '' // 如果type是music或video，则要提供数据链接，默认为空
        };
        //config
        var _config = {
            debug: false,
            url:window.location.href.replace(window.location.hash,''),
            signature:'',  //后台出
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'hideOptionMenu',
                'showOptionMenu'
            ]
        };
        // 权限验证
        // ==============================
        window.wxJsVerify = function(res) {
            if(typeof(wx) !='undefined' && res && res.signature && res.appId){
                _config.appId=res.appId;
                _config.timestamp=res.timestamp;
                _config.nonceStr=res.nonceStr;
                _config.signature=res.signature;
                console.log("接口返回验证签名",res);
                wx.config(_config);
                // 分享接口
                wx.ready(function() {
                    wx.showOptionMenu(); //显示右上角菜单接口
                    wx.onMenuShareTimeline(shareContent); //分享到朋友圈
                    wx.onMenuShareAppMessage(shareContent); //分享给朋友
                    wx.onMenuShareQQ(shareContent); //分享到QQ
                    wx.onMenuShareWeibo(shareContent); //分享到腾讯微博
                });

            }else{
                if(typeof(wx) =='undefined'){
                    console.log('未加载文件 http://res.wx.qq.com/open/js/jweixin-1.1.0.js');
                }else{
                    console.log('服务端验证签名错误');
                }
                if(typeof(WeixinJSBridge) !='undefined' ) {
                    WeixinJSBridge.on('menu:share:timeline', function (argv) {//分享到朋友圈
                        WeixinJSBridge.invoke('shareTimeline', window.wxShareData, function (res) {
                        });
                    });
                    WeixinJSBridge.on('menu:share:appmessage', function (argv) {//分享给朋友
                        WeixinJSBridge.invoke('sendAppMessage', window.wxShareData, function (res) {
                        });
                    });
                }
            }
        };
        (function() {
            var hp = ('https:' === document.location.protocol) ? 'https://' : 'http://';
            var s = document.createElement('script');
            var ajaxUrl = hp +'m.tv.sohu.com/wxauth/jsticket/signature?callback=wxJsVerify&url=' + _config.url+"&_rd="+ (new Date().getTime()); //or wxJsVerify
            console.log(ajaxUrl);
            s.src = ajaxUrl;
            document.body.appendChild(s);
        })();
    }
    window.wxShare = wxShare;
}(window));