/**
 * @description 工具拓展函数
 * @description 搜集与网络 http://www.cnblogs.com/kissdodog/p/3386480.html
 * @version v0.1 2014.11.17 14:30
 * @author kong.qf
 */


/**
 * @description 检测对象是否为空
 */
/*Object.prototype.isNullOrEmpty = function() {
	var obj = this;
	var flag = false;
	if (obj == null || obj == undefined || typeof(obj) == 'undefined' || obj == '') {
		flag = true;
	} else if (typeof(obj) == 'string') {
		obj = obj.trim();
		if (obj == '') { //为空  
			flag = true;
		} else { //不为空  
			obj = obj.toUpperCase();
			if (obj == 'NULL' || obj == 'UNDEFINED' || obj == '{}') {
				flag = true;
			}
		}
	} else {
		flag = false;
	}
	return flag;
};
*/

/**  
 * @description Unicode还原
 */
Number.prototype.chrW = function() {
	return String.fromCharCode(this);
};
/**
 * @description 数字补零,将数字补齐长度后返回(前端加0)
 */
Number.prototype.lenWithZero = function(oCount) {
	var strText = this.toString();
	while (strText.length < oCount) {
		strText = '0' + strText;
	}
	return strText;
};


/**
 * @description 格式化字符串
 */
String.format = function() {
	if (arguments.length == 0) return '';
	if (arguments.length == 1) return arguments[0];
	var reg = /{(\d+)?}/g,
		args = arguments,
		result = arguments[0].replace(reg, function($0, $1) {
			return args[parseInt($1) + 1];
		});
	return result;
};
/** 
 * @description 获取字符串中的数字(按原顺序)
 */
String.prototype.getNum = function() {
	return this.replace(/[^\d]/g, '');
};
/**  
 * @description 获取文件名全名
 */
String.prototype.getFileName = function() {
	return this.replace(/^.*\/([^\/\?]*).*$/, '$1');
};
/**
 * @description 获取文件扩展名
 */
String.prototype.getExtensionFileName = function() {
	return this.replace(/^.*\/[^\/]*(\.[^\.\?]*).*$/, '$1');
};


/**
 * @description 拓展Date操作,格式化时间
 * @param format 格式化字符串，如:'yyyy-MM-dd hh:mm:ss:S'或'E'
 */
Date.prototype.format = function(format) {
	var o = {
		'M+': this.getMonth() + 1, // Month
		'd+': this.getDate(), // day
		'h+': this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
		'H+': this.getHours(), //小时 
		'm+': this.getMinutes(), // minute
		's+': this.getSeconds(), // second
		'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
		'S+': this.getMilliseconds() // millisecond
	}
	var week = {
		"0": "\u65e5",
		"1": "\u4e00",
		"2": "\u4e8c",
		"3": "\u4e09",
		"4": "\u56db",
		"5": "\u4e94",
		"6": "\u516d"
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(format)) {
		format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.langth == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
		}
	}
	return format;
};
/**
 * @description 获取当前时间的中文形式
 * @param format 格式化字符串
 */
Date.prototype.getCNDate = function(format) {
	var o = {
		'M+': this.getMonth().lenWithZero(2) + new Number(26376).chrW(), // Month
		'd+': this.getDate().lenWithZero(2) + new Number(26085).chrW(), // day
		'h+': this.getHours().lenWithZero(2) + new Number(26102).chrW(), //小时           
		'H+': this.getHours().lenWithZero(2) + new Number(26102).chrW(), //小时 
		'm+': this.getMinutes().lenWithZero(2) + new Number(20998).chrW(), // minute
		's+': this.getSeconds().lenWithZero(2) + new Number(31186).chrW(), // second
		'q+': new Number(32).chrW() + new Number(32).chrW() + new Number(26143).chrW() + new Number(26399).chrW() + new String('26085199682010819977222352011620845').substr(this.getDay() * 5, 5).ToInt().chrW() // quarter
	}
	if (/(y+)/.test(format)) {
		var y = this.getFullYear().lenWithZero(4) + new Number(24180).chrW();
		format = format.replace(RegExp.$1, (y + ''));
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.langth == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
		}
	}
	return format;
};
/**
 * @description 校验时间与当前系统时间的时间差
 * @param datetime 需要校验的时间
 * @param interval 校验格式,默认为d
 */
Date.prototype.Diff = function(datetime, interval) {
	//若参数不足或 datetime 不是日期类型則回传 undefined  
	if (!datetime || datetime.constructor != Date) return undefined;

	interval = interval || 'd';
	switch (interval) {
		//计算秒差                                                          
		case 's':
			return parseInt((datetime - this) / 1000);
			//计算分差  
		case 'n':
			return parseInt((datetime - this) / 60000);
			//计算時差  
		case 'h':
			return parseInt((datetime - this) / 3600000);
			//计算日差  
		case 'd':
			return parseInt((datetime - this) / 86400000);
			//计算周差  
		case 'w':
			return parseInt((datetime - this) / (86400000 * 7));
			//计算月差  
		case 'm':
			return (datetime.getMonth() + 1) + ((datetime.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
			//计算年差  
		case 'y':
			return datetime.getFullYear() - this.getFullYear();
			//输入有误  
		default:
			return undefined;
	}
};
/**
 * @description 增减天数后返回时间对象
 * @param days 天数数量，可以为正负整数
 */
Date.prototype.addDays = Date.prototype.addDays || function(days) {
	days = days || 0;
	this.setDate(this.getDate() + days);
	return this;
};
/**
 * @description 获取指定月份的天数
 * @param month 月份数(默认指本月)
 * @param year 年份(默认指本年)
 */
Date.prototype.getDays = Date.prototype.getDays || function(month, year) {
	year = year || this.getFullYear();
	month = month || this.getMonth();
	return new Date(year, month, 0).getDate();
};
/**
 * @description 获取指定日期是本年的第几周
 * @param {Date} date 需要获取的日期
 * @return {Int} 返回指定日期为本年度的第几周
 */
Date.prototype.getYearWeek = Date.prototype.getYearWeek || function(date) {
	date = date || this;
	var date2 = new Date(date.getFullYear(), 0, 1),
		day1 = date.getDay();
	if (day1 == 0) day1 = 7;
	var day2 = date2.getDay();
	if (day2 == 0) day2 = 7;
	var d = Math.round((date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000);
	//return Math.ceil(d/7)+1;//向上取整,有小数就整数部分加1
	return parseInt(d / 7) + 1; //丢弃小数部分,保留整数部分
};
/**
 * @description 获取指定日期
 * @param p 指定参数,年(y)、月(m)、周(w)、季度(q),默认为月份
 * @param istime 返回值是否携带时间,false默认值，不携带,true为携带返回日期,如:2014-11-01 00:00:00
 * @param fol first or last(第一天或最后一天)
 */
Date.prototype.getDateFromParam = Date.prototype.getDateFromParam || function(p, istime, fol) {
	istime = istime || true;
	p = (p || 'm').toLowerCase(); //都转化为小写,默认值为月份
	var return_time = [], // 分别存储开始时间和结束时间
		date = this,
		start, end, o = {
			'm': date.getMonth() + 1, // Month
			'd': date.getDate(), // day
			'y': date.getFullYear(), // year
			'w': date.getDay() // week
		}
	switch (p) {
		// 星期
		case 'w':
			return_time = [new Date(o['y'], o['m'] - 1, o['d'] - o['w'] + 1, 0, 0, 0), new Date(o['y'], o['m'] - 1, o['d'] - o['w'] + 7, 23, 59, 59)];
			break;
			// 月
		case 'm':
			return_time = [new Date(o['y'], o['m'] - 1, 1, 0, 0, 0), new Date(o['y'], o['m'] - 1, this.getDays(o['m'], o['y']), 23, 59, 59)];
			break;
			// 年
		case 'y':
			return_time = [new Date(o['y'], 0, 1, 0, 0, 0), new Date(o['y'], 11, this.getDays(o['m'], o['y']), 23, 59, 59)];
			break;
			// 季度
		case 'q':
			var quarter = parseInt(date.format('q')); //获取季度
			var ms = quarter == 1 ? [0, 2] : (quarter == 2 ? [3, 5] : (quarter == 3 ? [6, 8] : [9, 11]));
			return_time = [new Date(o['y'], ms[0], 1, 0, 0, 0), new Date(o['y'], ms[1], this.getDays(o['m'], ms[1]), 23, 59, 59)];
			break;
		default:
			return_time = [undefined, undefined];
			break;
	}
	if (!istime) {
		return_time = [return_time[0].format('yyyy-MM-dd H:m:ss'), return_time[1].format('yyyy-MM-dd H:m:ss')];
	}
	//返回对应的值
	if (fol) {
		if (fol == 'last') return return_time[1];
		if (fol == 'first') return return_time[0];
	}
	return return_time;
};