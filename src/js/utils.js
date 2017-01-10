
	// non recursive extend with priority of last arguments
	var _join = function(){
		var target = {};
		for(var i=0; i<arguments.length; i++){
			mixin = arguments[i];
			for(var k in mixin){
				if(!mixin.hasOwnProperty(k)) continue;
				target[k] = mixin[k];
			}
		}
		return target;
	};

	/**
	 * goes into submenu
	 * @this {object}
	 * @property {DOMElement} this.upmenu parent menu UL
	 * @property {DOMElement} this.submenu parent menu UL
	 * @returns {undefined}
	 */
	var _gointo = function(){
		if(!this.upmenu || !this.submenu )return;

		_removeClass(this.upmenu,'mk-active');
		_addClass(this.upmenu,'mk-past');

		_addClass(this.submenu,'mk-active');
		_removeClass(this.submenu,'mk-future');
	};

	/**
	 * goes back to upper menu
	 * @this {object}
	 * @property {DOMElement} this.upmenu parent menu UL
	 * @property {DOMElement} this.submenu parent menu UL
	 * @returns {undefined}
	 */
	var _goback = function(){
		if(!this.upmenu || !this.submenu )return;

		_removeClass(this.submenu,'mk-active');
		_addClass(this.submenu,'mk-future');

		_addClass(this.upmenu,'mk-active');
		_removeClass(this.upmenu,'mk-past');
	};

	var _addClass = function(el,c){
		var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
		if (re.test(el.className)) {return;}
		el.className = (el.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
		return el;
	};

	var _removeClass = function(el,c){
		var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
		el.className = el.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
	};

	var _firstTextNode = function(el){
		var list = el.childNodes;
		for(var i=0; i<list.length; i++){
			if(list[i].nodeType === Node.TEXT_NODE){
				return list[i];
			}
		}
	};

	var _wrap = function(node,tagName){
		var wrapper = document.createElement(tagName);
		node.parentNode.insertBefore( wrapper,node );
		wrapper.appendChild(node);
		return wrapper;
	};

	var _prepend = function(target,el){
		var firstEl = target.firstChild;
		if(firstEl){
			target.insertBefore(el,firstEl);
		}else{
			target.appendChild(el);
		}
	};