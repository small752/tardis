import fetch from 'dva/fetch';
import reqwest from 'reqwest';
import Promise from 'promise-polyfill';
import { message,Modal } from 'antd';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
window.requestData = function(url, options) {
    options = {
        ...options,
        credentials: 'include',     //fetch  请求加上cookie
        headers: {
            ...options.headers,
            isAjax: 'yes',
        }
    };
  	return fetch(url, options)
    	.then(checkStatus)
    	.then(parseJSON)
    	.then(function(ret) {
            if(ret && ret.errorCode == 2000) {
                window.location = BASE_URL;
            }
            return {ret};
        })
		.catch((err) => ({ err }));
}

window.serviceRequest = function(url, data, suc, fail) {
	//异步请求
    reqwest({
      url: url,
      method: 'POST',
      type: 'json',
      headers: {
          isAjax: 'yes',
      },
      data: data,
    }).then(result => {
    	if(result.errorCode == 9000) {
			if(suc) {
				suc(result);
			}
		} else {
            if(result.errorCode == 2000) {
                window.location = BASE_URL;
            } else {
                if(fail) {
                    fail(result);
                } else {
                    message.error(result.errorMessage||'服务器开小差啦');
                }
            }
		}

    },function(err, msg){
    	message.error('服务器开小差啦');
    });
}

window._ = function(...value) {
	console.info('console', ...value);
}

window.weixinSign = function(shareParams, call) {

    let share_title = shareParams.share_title || '';
    let share_desc = shareParams.share_desc || '';
    let share_link = shareParams.share_link || '';
    let share_imgUrl = shareParams.share_imgUrl || '';
    let weixinSignUrl = "http://wx.ishanshan.com/oauth/wx/jp/jsconfig?url="+encodeURIComponent(location.href);
	let tid =  shareParams.tid || undefined;
	if(tid != undefined) {
		let newLink = share_link.length > 0 && share_link.substring(0,location.href.indexOf("?"))
		share_link = newLink;
	} else {
		share_link = share_link;
	}
    reqwest({
          url: weixinSignUrl,
          type: 'jsonp',
          success: function(ret) {
              wx.config({
	        	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	        	    appId: "wx99b166ead9de02f1", // 必填，公众号的唯一标识
	        	    timestamp: ret.timestamp, // 必填，生成签名的时间戳
	        	    nonceStr: ret.nonceStr, // 必填，生成签名的随机串
	        	    signature: ret.signature,// 必填，签名，见附录1
	        	    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	        	  });
                wx.ready(function(){
                    wx.onMenuShareTimeline({
                        title: share_title, // 分享标题
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function () {
                            call('success');
                        },
                    });
                    wx.onMenuShareAppMessage({
                        title: share_title, // 分享标题
                        desc : share_desc,
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function () {
                            call('success');
                        },
                    });
                    wx.onMenuShareQQ({
                        title: share_title, // 分享标题
                        desc: share_desc,
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function () {
                            call('success');
                        },
                    });
                    wx.onMenuShareWeibo({
                        title: share_title, // 分享标题
                        desc: share_desc,
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function () {
                            call('success');
                        },
                    });
                    wx.onMenuShareQZone({
                        title: share_title, // 分享标题
                        desc: share_desc,
                        link: share_link, // 分享链接
                        imgUrl: share_imgUrl, // 分享图标
                        success: function () {
                            call('success');
                        },
                    });
                });
          	}
        });
}

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}
