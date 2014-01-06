window.Numbars = function (element, num) {
	num = num || 0;
	this.element = element;
	this.element.className += ' numbars';
	if (typeof this.element.attributes['data-max'] == 'undefined') {
		this.max = this.element.getAttribute('data-max');
	} else {
		this.max = this.element.attributes['data-max'].nodeValue;
	}
	this.element.innerHTML = '<span class="numbars-progress"><span class="numbars-num">' + this.element.innerHTML + '</span></span>';
	this.element.style.visibility = 'visible';
	this.isWorking = false;

	this._set = function (num) {
		var that = this, o, currentNum;

		if (that.element.firstChild.firstChild.innerText) {
			currentNum = parseInt(that.element.firstChild.firstChild.innerText);
		} else {
			currentNum = parseInt(that.element.firstChild.firstChild.textContent);
		}

		if (num > currentNum) {
			currentNum++;
			if (that.element.firstChild.firstChild.innerText) {
				that.element.firstChild.firstChild.innerText = currentNum;
			} else {
				that.element.firstChild.firstChild.textContent = currentNum;
			}
			this.lastNum = currentNum;
			o = (currentNum / that.max) * 100;
			this.element.firstChild.style.width = o + '%';
			clearTimeout(this.timer);
			this.timer = setTimeout(function () {
				that._set(num);
			}, 1);
		} else if (num < currentNum) {
			currentNum--;
			if (that.element.firstChild.firstChild.innerText) {
				that.element.firstChild.firstChild.innerText = currentNum;
			} else {
				that.element.firstChild.firstChild.textContent = currentNum;
			}
			this.lastNum = currentNum;
			o = (currentNum / that.max) * 100;
			this.element.firstChild.style.width = o + '%';
			clearTimeout(this.timer);
			this.timer = setTimeout(function () {
				that._set(num);
			}, 1);
		} else {
			this.isWorking = false;
		}

		return this;
	};

	this.forceSet = function(num) {
		if (this.element.firstChild.firstChild.innerText) {
			this.element.firstChild.firstChild.innerText = num;
		} else {
			this.element.firstChild.firstChild.textContent = num;
		}
		var o = (num / this.max) * 100;
		this.element.firstChild.style.width = o + '%';
	};

	this.set = function(num) {
		num = Math.floor(parseInt(num));

		if (num > this.max) num = this.max;
		else if (num < 0) num = 0;

		if (this.isWorking) {
			clearTimeout(this.timer);
			this.forceSet(this.lastNum);
			var that = this;
			setTimeout(function() {
				that._set(num);
			}, 500);
			return this;
		} else {
			clearTimeout(this.timer);
			this.isWorking = true;
			return this._set(num);
		}
	};

	return this.set(num);
};