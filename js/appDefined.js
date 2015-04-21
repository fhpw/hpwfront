/**
 * 手机APP样式或操作统一处理
 */
;
(function(window) {
	var APP = function() {};
	APP.constructor.prototype = APP;

	APP.prototype = {
			/**
			 * 调用弹窗效果
			 * @param {Object} msg 需要显示的信息
			 * @param {Object} title 显示弹窗的标题
			 */
			alert: function(msg, title) {
				plus.nativeUI.alert(msg, null, title||'');
			},
			/**
			 * 拨打电话号码
			 * @param {Object} phone 电话号码
			 */
			dialIphone: function(phone) {
				plus.device.dial(phone, false);
			},
			/**
			 * 设置状态条背景色
			 * @param {Object} color 颜色值，#FFBBDD格式
			 */
			setStatusBarBackground: function(color) {
				plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
				plus.navigator.setStatusBarBackground("#FF0000");
			},
			/**
			 * 点击电话号码弹出菜单，提供打电话或发短信息
			 * @param {Object} phone 电话号码
			 */
			showActionSheet: function(phone) {
				if (!phone) {
					alert('电话号码为空!');
					return;
				}
				if ('iOS' != plus.os.name) {
					compatibleConfirm();
				} else {
					var bts = [{
						title: "电话"
					}, {
						title: "短信"
					}];
					plus.nativeUI.actionSheet({
							//title: "请选择操作",
							cancel: "取消",
							buttons: bts
						},
						function(e) {
							e.index > 0 && bts[e.index - 1].title === '电话' ? plus.device.dial(phone, false) : '';
							e.index > 0 && bts[e.index - 1].title === '短信' ? (function() {
								var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
								msg.to = [phone];
								msg.body = '';
								plus.messaging.sendMessage(msg);
							})() : '';
						}
					);
				}
			},
			/**
			 * 校验号码是否正确，并返回正确的号码(实际上是对号码中的特殊字符进行处理)
			 * @param {Object} phone 号码
			 */
			_checkPhone: function(phone) {
				var p = [],
					ascii = 0;
				for (var i = 0, l = phone.length; i < l; i++) {
					ascii = phone[i].charCodeAt();
					if (ascii >= 48 && ascii <= 57) {
						p.push(phone[i]);
					}
				}
				return p.length > 0 ? p.join('') : false;
			}
		}
		//需要注意赋值的位置问题
	window.APP = function() {
		return new APP();
	}();
})(window);