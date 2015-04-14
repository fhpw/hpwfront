/**
 *
 * 描述:javascript缓动
 * jQuery Tween算法:算法来源： www.2cto.com
 * @author:xuzengqiang
 * @since :2015-1-23 11:17:51
 * 两种比较复杂的没有收录进来
 * Elastic：指数衰减的正弦曲线缓动；
 * Back：超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
 **/
;
(function($) {
	jQuery.extend({
		Tweens: {
			Linear: function(t, b, c, d) { //无缓动
				return c * t / d + b;
			},
			Quad: { //二次方缓动(t^2)
				easeIn: function(t, b, c, d) {
					return c * (t /= d) * t + b;
				},
				easeOut: function(t, b, c, d) {
					return -c * (t /= d) * (t - 2) + b;
				},
				easeInOut: function(t, b, c, d) {
					if ((t /= d / 2) < 1) return c / 2 * t * t + b;
					return -c / 2 * ((--t) * (t - 2) - 1) + b;
				}
			},
			Cubic: { //三次方缓动(t^3)
				easeIn: function(t, b, c, d) {
					return c * (t /= d) * t * t + b;
				},
				easeOut: function(t, b, c, d) {
					return c * ((t = t / d - 1) * t * t + 1) + b;
				},
				easeInOut: function(t, b, c, d) {
					if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
					return c / 2 * ((t -= 2) * t * t + 2) + b;
				}
			},
			Quart: { //四次方缓动(t^4)
				easeIn: function(t, b, c, d) {
					return c * (t /= d) * t * t * t + b;
				},
				easeOut: function(t, b, c, d) {
					return -c * ((t = t / d - 1) * t * t * t - 1) + b;
				},
				easeInOut: function(t, b, c, d) {
					if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
					return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
				}
			},
			Quint: { //五次方缓动(t^5)
				easeIn: function(t, b, c, d) {
					return c * (t /= d) * t * t * t * t + b;
				},
				easeOut: function(t, b, c, d) {
					return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
				},
				easeInOut: function(t, b, c, d) {
					if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
					return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
				}
			},
			Sine: { //正弦曲线的缓动(sin(t))
				easeIn: function(t, b, c, d) {
					return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
				},
				easeOut: function(t, b, c, d) {
					return c * Math.sin(t / d * (Math.PI / 2)) + b;
				},
				easeInOut: function(t, b, c, d) {
					return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
				}
			},
			Expo: { //指数曲线的缓动(2^t)
				easeIn: function(t, b, c, d) {
					return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
				},
				easeOut: function(t, b, c, d) {
					return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
				},
				easeInOut: function(t, b, c, d) {
					if (t == 0) return b;
					if (t == d) return b + c;
					if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
					return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
				}
			},
			Circ: { //圆形曲线的缓动(sqrt(1-t^2))
				easeIn: function(t, b, c, d) {
					return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
				},
				easeOut: function(t, b, c, d) {
					return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
				},
				easeInOut: function(t, b, c, d) {
					if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
					return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
				}
			},
			Bounce: { //指数衰减的反弹缓动
				easeIn: function(t, b, c, d) {
					return c - jQuery.Tweens.Bounce.easeOut(d - t, 0, c, d) + b;
				},
				easeOut: function(t, b, c, d) {
					if ((t /= d) < (1 / 2.75)) {
						return c * (7.5625 * t * t) + b;
					} else if (t < (2 / 2.75)) {
						return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
					} else if (t < (2.5 / 2.75)) {
						return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
					} else {
						return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
					}
				},
				easeInOut: function(t, b, c, d) {
					if (t < d / 2) return jQuery.Tweens.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
					else return jQuery.Tweens.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
				}
			}
		},
		/**
		 * 描述:获取样式表中的样式名称以及对应的样式值,以数组的形式返回
		 **/
		Properties: function(properties) {
			var //属性对象集合
				props = [],
				//属性名称集合
				names = [],
				len = 0;
			for (var prop in properties) {
				names[len] = prop;
				props[names[len]] = properties[prop];
				len++;
			}
			return {
				names: names,
				props: props
			}
		},
	});
})(jQuery);