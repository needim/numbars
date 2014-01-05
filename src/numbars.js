window.Numbars = function (element, num) {
	num = num || 0;
	this.element = element;
	this.element.className += ' numbars';
	this.max = parseInt(this.element.getAttribute('data-max'));
	this.element.innerHTML = '<span class="numbars-progress"><span class="numbars-num">' + this.element.innerHTML + '</span></span>';
	this.element.style.visibility = 'visible';

	this.set = function (num) {
		var that = this, o, currentNum = parseInt(that.element.firstChild.firstChild.innerText);

		if (num > that.max) num = that.max;
		else if (num < 0) num = 0;

		if (num > currentNum) {
			currentNum++;
			that.element.firstChild.firstChild.innerText = currentNum;
			o = (currentNum / that.max) * 100;
			this.element.firstChild.style.width = o + '%';
			setTimeout(function () { that.set(num); }, 1);
		} else if (num < currentNum) {
			currentNum--;
			that.element.firstChild.firstChild.innerText = currentNum;
			o = (currentNum / that.max) * 100;
			this.element.firstChild.style.width = o + '%';
			setTimeout(function () { that.set(num); }, 1);
		}

		return this;
	};
	return this.set(Math.floor(parseInt(num)));
};