window.Numbars = function (element, num) {
	num = num || 0;
	this.element = element;

	if (!this.element.classList.contains('numbars'))
		this.element.classList.add('numbars');

	this.getData = function (name, def) {
		if (typeof this.element.attributes[name] == 'undefined') {
			return this.element.getAttribute(name) || def;
		} else {
			return this.element.attributes[name].nodeValue || def;
		}
	};

	this.getCurrentNum = function () {
		if (this.element.firstChild.firstChild.innerText) {
			return parseInt(this.element.firstChild.firstChild.innerText);
		} else if (this.element.firstChild.firstChild.textContent) {
			return parseInt(this.element.firstChild.firstChild.textContent);
		}
		return 0;
	};

	this.setCurrentNum = function (num) {
		if (this.element.firstChild.firstChild.innerText) {
			this.element.firstChild.firstChild.innerText = num;
		} else {
			this.element.firstChild.firstChild.textContent = num;
		}
	};

	this._set = function (num) {
		var that = this, o, currentNum;

		currentNum = that.getCurrentNum();

		if (num > currentNum) {
			currentNum += that.increment;

			if (currentNum > that.max)
				currentNum = that.max;

		} else if (num < currentNum) {
			currentNum -= that.increment;

			if (currentNum < 0)
				currentNum = 0;

		} else {
			this.isWorking = false;
		}

		that.setCurrentNum(currentNum);
		that.lastNum = currentNum;
		o = (currentNum / that.max) * 100;
		that.element.firstChild.style.width = o + '%';

		clearTimeout(that.timer);

		that.timer = setTimeout(function () {
			that._set(num);
		}, 1);

		return this;
	};

	this.forceSet = function (num) {
		if (this.element.firstChild.firstChild.innerText) {
			this.element.firstChild.firstChild.innerText = num;
		} else {
			this.element.firstChild.firstChild.textContent = num;
		}
		var o = (num / this.max) * 100;
		this.element.firstChild.style.width = o + '%';
	};

	this.set = function (num) {
		num = Math.floor(parseInt(num));

		if (num > this.max) num = this.max;
		else if (num < 0) num = 0;

		if (this.isWorking) {
			clearTimeout(this.timer);
			this.forceSet(this.lastNum);
			var that = this;
			setTimeout(function () {
				that._set(num);
			}, 500);
			return this;
		} else {
			clearTimeout(this.timer);
			this.isWorking = true;
			return this._set(num);
		}
	};

	this.max = this.getData('data-max', 100);
	this.increment = parseInt(this.getData('data-increment', 1));
	this.element.innerHTML = '<span class="numbars-progress"><span class="numbars-num">' + this.element.innerHTML + '</span></span>';
	this.element.style.visibility = 'visible';
	this.isWorking = false;

	return this.set(num);
};