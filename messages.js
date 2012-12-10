/**
 * Messages Plugin
 */
;(function($, window, undefined) {

  $.fn.message = function(options) {

		// create default settings, extending them with options provided
		var settings = $.extend({
			message 			: 'this is the default message',
			duration 			: 1500,
			effect				: 'easeOutExpo',
			message_type 		: 'error',
			autoHide 			: 1,
			autoHideDuration	: 4000
		}, options)

		return this.each(function() {
			$('.message').remove();
			$('body').prepend('<div class="message ' + settings.message_type + '"></div>');

			// build message
			$('.message').prepend(settings.message);
			$('.message').append('<a class="message-close" href="#"><i class="icon-circle-arrow-up"></i></a>');

			// adjust height and offset
			var message_height = $('.message').outerHeight();
			$('.message').css({
				'position'	: 'fixed',
				'top'		: -message_height,
				'width'		: '100%',
				'z-index'	: 9999, 
			});
			$('.message-close').css({
				'font-size'	: message_height * 0.85 + 'px',
				'line-height' 	: message_height * 0.85 + 'px'
			});
			
			// show message
			$('.message').animate(
				{ top: 0 },
				{
					duration	: settings.duration,
					easing		: settings.effect
				}
			);

			if (settings.autoHide) {
				setTimeout(function() {
					$('.message').animate(
						{ top: -message_height },
						{
							duration	: settings.duration, 
							easing		: settings.effect
						}
					);
				}, settings.autoHideDuration);
			}

			// hide message and remove
			$('.message-close').click(function() {
				$(this).parent().stop().animate(
					{ top: -message_height },
					{
						duration	: settings.duration,
						easing		: settings.effect
					}
				);
			});
		});
	}
	return this;
}) (jQuery);