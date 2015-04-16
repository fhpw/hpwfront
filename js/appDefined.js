/**
 * 手机APP样式或操作统一处理
 */
;
(function(window) {
	var APP = function() {};
	APP.constructor.prototype = APP;

	APP.prototype = {
			/**
			 * 拨打电话号码
			 * @param {Object} phone 电话号码
			 */
			dialIphone: function(phone) {
				alert(this._checkPhone(phone));
				plus.device.dial(phone, false);
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