(function(root){

	var doc = document;
	var noop = function(){}

	function ScrollPage(options){
		var def , conf;
		def = {
			target: this.$('body'),
			predict: 100,							// 预先多少距离加载，单位px
			scrollDely: 100,					// 滚动时延迟执行时间，单位 ms
			callback: noop
		};

		this.conf = this.extend(def, options || {});
		this.previousTime = null;
		this.previousScrollHeight = null;
		this.changeTimers = null;

		return this.init(conf);
	}

	ScrollPage.prototype.init = function (conf) {
		this.previousTime = this.now();
		this.changeTimers = 0;
		this.event(conf)
	}

	ScrollPage.prototype.event = function (conf) {
		conf = conf || this.conf;
		fn = this.position.bind(this);
		this.on(conf.target, 'scroll', fn)
		this.on(conf.target, 'touchmove', fn)
	}

	ScrollPage.prototype.position = function (event){
		var target, cur, prev, check;
		prev = this.previousTime;
		this.previousTime = cur = this.now();
		if(cur - prev < this.scrollDely) return;

		target = event.target;

		check = target.scrollTop + target.clientHeight 
			>= target.scrollHeight - this.conf.predict;

		if (target !== this.conf.target) return;
		if (check && target.scrollHeight !== this.previousScrollHeight) {
			this.previousScrollHeight = target.scrollHeight;
			this.conf.callback.call(this, this.changeTimers++);
		}
	}

	ScrollPage.prototype.extend = function(target, destination) {
		Object.keys(destination).forEach(function(val, index){
			target[val] = destination.hasOwnProperty(val) 
				? destination[val] 
				: target[val]
		});
		return target;
	}

	ScrollPage.prototype.$ = function (selector) {
		return doc.querySelector(selector);
	}

	ScrollPage.prototype.on = function (elem, type, callback) {
		elem.addEventListener(type, callback, false)
	}

	ScrollPage.prototype.off = function (elem, type, callback) {
		elem.removeEventListener(type, callback, false)
	}

	ScrollPage.prototype.now = function(){
		return new Date() * 1;
	}

	if (typeof define === 'function') {
		define(function () {
			return ScrollPage
		})
	} else {
		root.ScrollPage = ScrollPage
	}

})(this)