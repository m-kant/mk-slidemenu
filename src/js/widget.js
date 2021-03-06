
	widget = function(root,options){
		this.options = _join(_defaults,options);
		this.root = root;
		this.root.className += ' mk-slidemenu-root mk-active';
		this.wrapper = this.getWrapper();
		if(this.options.width)this.wrapper.style.width = this.options.width;
		if(this.options.height){
			this.wrapper.style.height = this.options.height;
			this.wrapper.style.overflowY = 'auto';
		}
		this.decompose();
	};

	widget.prototype = {

		/**
		 * decomposes nested root ul-list element into set of elementary
		 * ul-lists, remembering theirs ul-parents and ul-children,
		 * puts all of it into wrapper
		 * @returns {undefined}
		 */
		decompose: function(){
			var submenus = this.findSubmenus();
			for(var i=0; i<submenus.length; i++){
				var submenu = submenus[i];
				this.processSubmenu( submenu );
			}
			// put all submenus directly into the root
			for(var i=0; i<submenus.length; i++){
				this.wrapper.appendChild(submenus[i])
			}
		},

		findSubmenus: function(){
			return this.root.querySelectorAll('li>ul');
		},

		processSubmenu: function(submenu){
			submenu.className += ' mk-submenu mk-future';
			var parent = submenu.parentNode;
			parent.className += ' mk-has-submenu';
			var data = {
				upmenu:  parent.parentNode,
				submenu: submenu,
				widget: this
			};
			this.getTrigger(parent).onclick = _gointo.bind(data);

			this.getBackTrigger(submenu).onclick = _goback.bind(data);
		},


		getTrigger: function(parent){
			// find A link - direct ancessor of parent
			var A;
			var list = parent.querySelectorAll('a');
			for(var i=0; i<list.length; i++){
				if(list[i].parentNode === parent){
					A = list[i];
					break;
				}
			}
			// no A? add some trigger
			if(!A){
				// Wrap first text node with A
				txtNode = _firstTextNode(parent);
				if(txtNode){
					A = _wrap(txtNode,'a');
				// no even text? coder is fool
				}else{
					A = document.createElement('a');
					A.innerHTML = '>>';
					_prepend(parent,A);
				}
			}

			return (A)?A:parent;
		},

		getBackTrigger: function(submenu){
			var back = submenu.querySelector( '.'+this.options.backButtonClass );
			if(!back) back = this.createBackTriggerElement(submenu);
			return back;
		},

		createBackTriggerElement: function(submenu){
			var back = document.createElement('li');
			var backA = document.createElement('a');
			back.className = this.options.backButtonClass;
			backA.innerHTML = this.options.backButtonContent;
			back.appendChild(backA);
			submenu.insertBefore(back,submenu.firstChild);
			return back;
		},


		getWrapper: function(){
			// may be it exists
			if(this.wrapper) return this.wrapper;
			if(this.options.wrapper) return this.options.wrapper;
			// if not, create new one
			var wrapper = document.createElement('div');
			wrapper.className = 'mk-slidemenu';
			if(this.options.className)wrapper.className += ' '+this.options.className;

			this.root.parentNode.insertBefore(wrapper,this.root);
			wrapper.appendChild(this.root);
			return wrapper;
		}

	};