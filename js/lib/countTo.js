$.fn.countTo = function(options) {
	options = options || {};

	return $(this).each(function() {
		// set options for current element
		var settings = $.extend({}, $.fn.countTo.defaults, {
			from: $(this).data('from'),
			to: $(this).data('to'),
			speed: $(this).data('speed'),
			refreshInterval: $(this).data('refresh-interval'),
			length: $(this).data('length'), //显示数字长度
			decimals: $(this).data('decimals')
		}, options);
		// how many times to update the value, and how much to increment the value on each update
		var loops = Math.ceil(settings.speed / settings.refreshInterval),
			increment = (settings.to - settings.from) / loops;

		//设置验证正则表达式
		settings.regEx = new RegExp('^\\d{' + settings.length + '}$');
		// references & variables that will change with each update
		var self = this,
			$self = $(this),
			loopCount = 0,
			value = settings.from,
			data = $self.data('countTo') || {};

		$self.data('countTo', data);

		// if an existing interval can be found, clear it first
		if (data.interval) {
			clearInterval(data.interval);
		}

		data.interval = setInterval(updateTimer, settings.refreshInterval);

		// initialize the element with the starting value
		render(value);

		function updateTimer() {
			value += increment;
			loopCount++;

			render(value);

			if (typeof(settings.onUpdate) == 'function') {
				settings.onUpdate.call(self, value);
			}

			if (loopCount >= loops) {
				// remove the interval
				$self.removeData('countTo');
				clearInterval(data.interval);
				value = settings.to;

				if (typeof(settings.onComplete) == 'function') {
					settings.onComplete.call(self, value);
				}
			}
			//console.log('timer',$.Tweens.Quad.easeIn(loopCount,loopCount,settings.refreshInterval,settings.refreshInterval)*1000);
		}

		function render(value) {
			var formattedValue = settings.formatter.call(self, value, settings);			
			//console.log(settings.regEx);
			if (formattedValue < settings.length * 10) {//只有当数字小于指定位数时才进行补零运算
				//添加正则校验判断数字的长度，并自动补0
				//同时增加循环退出校验，保证循环能正常退出
				var count = 0;
				while (!settings.regEx.test(formattedValue)) {
					formattedValue = '0' + formattedValue;
					if (count++ > 10) {
						break;
					}
				}
			}
			$self.html(formattedValue);
		}
	});
};

$.fn.countTo.defaults = {
	from: 0, // the number the element should start at
	to: 0, // the number the element should end at
	speed: 1000, // how long it should take to count between the target numbers
	refreshInterval: 100, // how often the element should be updated
	decimals: 0, // the number of decimal places to show
	length: 1, //数字长度，默认一位，即当数字小于10时，不自动在前补0
	formatter: formatter, // handler for formatting the value before rendering
	onUpdate: null, // callback method for every time the element is updated
	onComplete: null // callback method for when the element finishes updating
};

function formatter(value, settings) {
	return value.toFixed(settings.decimals);
}



// custom formatting example
$('.count-number').data('countToOptions', {
	formatter: function(value, options) {
		return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
});

// start all the timers
$('.timer').each(count);

function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
}