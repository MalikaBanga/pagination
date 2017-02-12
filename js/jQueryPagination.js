(function($){
	$.fn.mbPagination= function(options){
		/* Default elements*/
		var defaults = {
			perPage: 10,
			prevText: '&#10092;',
			nextText: '&#10093;',
			showFirstLast: false,
			firstText: '&#10092;&#10092;',
			lastText: '&#10093;&#10093;',
		};
		/* added settings*/
		var settings = $.extend({},defaults, options);

		var perPage = settings.perPage;
		/* assign variable to modal*/
		var theOuterElem = this;
		var allListElem = $(theOuterElem).children(),
			$numberLi = $('.number-li');

		var totalItems = allListElem.length;
		for(var i = 0; i < totalItems; i++){
			if( i > (settings.perPage - 1) ){
				allListElem.eq(i).hide();
			}
		}

		var totalPages = Math.ceil(totalItems / perPage);
		if(totalItems > perPage){
			var totalLi = '<ul class="mb-pagination">';
			if(settings.showFirstLast){
				totalLi += '<li class="first-list non-number-li"><a href="javascript:;">'+ settings.firstText+ '</a></li>';
			}
			totalLi +=	   '<li class="prev-list non-number-li"><a href="javascript:;">'+ settings.prevText+ '</a></li>';

			for(var i = 1; i <= totalPages; i++){
				var activeClass = '';
				if(i == 1){
					activeClass = ' active';
				}
				totalLi += '<li class="number-li'+ activeClass +'"><a href="javascript:;" >' + i + '</a></li>';
			}
			totalLi += 	 '<li class="next-list non-number-li"><a href="javascript:;">'+ settings.nextText+ '</a></li>';
			if(settings.showFirstLast){
				totalLi += '<li class="last-list non-number-li"><a href="javascript:;">'+ settings.lastText+ '</a></li>';
			}
			totalLi +=  '</ul>';
			$(this).after(totalLi);
		}
		/* Add class on load*/
		$numberLi.first().addClass('active');
		/* show/hide page numbers*/
		function togglePageNumbers(){
			$('.number-li:not(.active)').hide();

			/* remove all the dots*/
			$('.dots').each(function(){
				$(this).remove('.dots');
			});
			/*Append dots before and after active classes*/
			if($('.number-li').hasClass('active')){
				var numberActive = $('.number-li.active');
				numberActive.show();
				if(numberActive.prev().html() !== $('.number-li').first().html()){
					numberActive.prev('.number-li').show().before('<li class="dots"><span>...</span></li>');
				} else{
					$('.number-li').first().show();
				}
				if(numberActive.next().html() !== $('.number-li').last().html()){
					numberActive.next('.number-li').show().after('<li class="dots"><span>...</span></li>');
				} else{
					$('.number-li').last().show();
				}
			} 
		};
		togglePageNumbers();
		/* Pagination on click*/
		$('body').on('click', '.mb-pagination a', function(e){
			var $self = $(this),
				parentElem = $(this).parent(),
				activeElem = $('.number-li.active');
			/* Show and hide items */	
			function showHideElem(pre, current){
				/* Show current page elements*/
				for(var i = pre; i < current; i++){
					allListElem.eq(i).show();			}
				/* Hide rest of the elements*/
				for(var i = 0; i < totalItems; i++){
					if( (i < pre) || (i >= current)){
						allListElem.eq(i).hide();
					}
				}
			}
			/* Toggle active class*/
			function toggleActiveClass($elem){
				$elem.addClass('active').siblings().removeClass('active');
			}


			if(parentElem.hasClass('number-li')){
				toggleActiveClass($self.parent());
				showHideElem(($self.text() - 1) * perPage, $self.text() * perPage);
			} else{
				if(parentElem.hasClass('prev-list')){
					if(activeElem.prev('.non-number-li').length != 0){
						return false;
					} else{
						var pre = (Number(activeElem.prev($numberLi).text()) - 1) * perPage,
							current = Number(activeElem.prev($numberLi).text()) * perPage;
						showHideElem(pre, current);
						toggleActiveClass(activeElem.prev());
					}
				}
				else if(parentElem.hasClass('next-list')){
					if(activeElem.next('.non-number-li').length != 0){
						return false;
					} else{	
					var pre = (Number(activeElem.next($numberLi).text()) - 1) * perPage,
						current = Number(activeElem.next($numberLi).text()) * perPage;
						showHideElem(pre, current);
						toggleActiveClass(activeElem.next());
					}
				}
				/* Go to first page class*/
				if(parentElem.hasClass('last-list')){
					 showHideElem((totalItems - perPage), totalItems);
					 $('.last-list').addClass('disabled').prev().addClass('disabled');
					 toggleActiveClass($('.number-li').eq($('.number-li').length - 1));
				} else{
					 $('.last-list').removeClass('disabled').prev().removeClass('disabled');
				}
				/* Go to last page class*/
				if(parentElem.hasClass('first-list')){
					 showHideElem(0, perPage);
					 $('.first-list').addClass('disabled').next().addClass('disabled');
					 toggleActiveClass($('.number-li').eq(0));
				} else{
					 $('.first-list').removeClass('disabled').next().removeClass('disabled');
				}
			}
			togglePageNumbers();
			return false;
		});

	};
})(jQuery);