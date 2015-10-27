"use strict";

var SomethingDigitalRecentlyViewed = Class.create();

SomethingDigitalRecentlyViewed.prototype = {
	items: null,
	initialize: function(){
		this.initStorage();
		this.render();
	},

	initStorage: function(){
		var recentlyViewed = this.getRecentlyViewed(this.getLoadedStorage());
		this.reloadStorage(recentlyViewed);
	},

	getLoadedStorage: function(){
		if(!this.items){
			this.items = JSON.parse(localStorage.getItem('recently-viewed')) || [];
		}
		return this.items;
	},

	reloadStorage: function(recentlyViewed){
		localStorage.setItem('recently-viewed',JSON.stringify(recentlyViewed));
	},

	reduceRecent: function(memo,a){
		if(memo.indexOf(a.id) === -1){
			memo.push(a.id);
		}
		return memo;
	},

	getRecentlyViewed: function(recentlyViewed){

		if(typeof sdRecentlyViewed == 'undefined'){
			return recentlyViewed;
		}

		//get unique keys
		var uniqueKeys = recentlyViewed.reduce(this.reduceRecent, []),
			index = uniqueKeys.indexOf(sdRecentlyViewed.productId);

		//add if current product is not in the unique keys
		if(index === -1 && $('recently-viewed')){

			recentlyViewed.push({
				id: sdRecentlyViewed.productId,
				html: $('recently-viewed').innerHTML
			});

			if(recentlyViewed.length > sdRecentlyViewed.maxDisplay){
				recentlyViewed.shift();
			}

		//move to end if current product *is* in unique keys
		} else {
			var obj = recentlyViewed.splice(index, 1)[0];
			recentlyViewed.push(obj);
		}

		return recentlyViewed;
	},

	getRenderedItems: function(){
		var items = this.getLoadedStorage();

		if(sdRecentlyViewed.sortOrder === 'newold'){
			var reversedItems = items;
			reversedItems.reverse();

			return reversedItems.map(function(a){
			if($(document.body).hasClassName('catalog-product-view')){

				var currentProductId = $$('#product_addtocart_form input[name=product]')[0].value;

				if(a.id !== currentProductId){
					return a.html;
				}

			} else {
				return a.html;
			}
			}).join('');
		}

		return items.map(function(a){
			if($(document.body).hasClassName('catalog-product-view')){

				var currentProductId = $$('#product_addtocart_form input[name=product]')[0].value;

				if(a.id !== currentProductId){
					return a.html;
				}

			} else {
				return a.html;
			}
		}).join('');
	},

	render: function(){

		if(!this.items || this.items.length < 1){
			return;
		}

		var rvTemplate = $('recently-viewed-product-list'),
			target = $$(sdRecentlyViewed.insertAt)[0];

		if(!rvTemplate || !target){
			return;
		}

		var insertParams = {}, //to enable use of variable keys (i.e. $position: content)
			insertPosition = sdRecentlyViewed.insertPosition,
			html = rvTemplate.innerHTML.replace('{{items}}',this.getRenderedItems());

		insertParams[insertPosition] = html;

		$(target).insert(insertParams);

	}
};

document.observe('dom:loaded',function(){
	new SomethingDigitalRecentlyViewed();
});
