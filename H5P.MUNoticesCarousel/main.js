var H5P = H5P || {};
 
H5P.MUNoticesCarousel = (function ($) {
  /**
   * Constructor function.
   */
  function C(options, id, contentData) {
    this.options = options;
    this.id = id;
	this.contentData = contentData;

	// Set defaults
	this.previousState = {
		lastVisit: 'Never'
	}

    // Get previous state
    if (this.contentData !== undefined && this.contentData.previousState !== undefined) {
		this.previousState = this.contentData.previousState;
	}

	// set state from previous one
    this.setState(this.previousState);
  };
 
  /**
   * Attach function called by H5P framework to insert H5P content into
   * page
   *
   * @param {jQuery} $container
   */
  C.prototype.attach = function ($container) {
    // container.  Allows for styling later.
    $container.addClass("h5p-notices");
	//console.log("layout");
	//console.log(this.options.layout);
	
	if(this.options.layout == '1') {
		$container.addClass("h5p-notices-onecol");
	}
	else {
		$container.addClass("h5p-notices-onecol");
	}

	var html = '';

	html += '<div id="stream-dashboard-notices">';
	html += '<div class="swiper">';
	html += '<div class="swiper-wrapper">';

	for(notice of this.options.notices) {
		if(notice.visible) { /* Skip notices that are not visible */
			var hasImage = notice.image && notice.image.path;
			html += `<div class="swiper-slide"><div class="item${hasImage?" item__has_image":""}">`;

			html += `<div><div class="item__heading">`;

			html += `<h6 title="${notice.title}">${notice.title}</h6><div class="item__info">${notice.update}</div></div>`;
			html += `<div class="item__content">${notice.content}</div>`;

			html += `<div class="item__more_info">`;
			if(notice.moreinformation && notice.moreinformation.startsWith('http')) {
				html += `<a href="${notice.moreinformation}" target="_blank">More information</a>`;
			} else {
				html += `By <a href="mailto:${notice.owneremail}" target="_blank">${notice.owner}</a>`;
			}
			html += '</div>'; /* End .item__more_info */
			
			html += '</div>'; /* Anonymous div */

			if (hasImage) {
				html += `<div class="img" style="background-image:url(${H5P.getPath(notice.image.path, this.id)});"></div>`;
			}

			html += '</div></div>'; /* End .item and .swiper-slide */
		}
	}
	html += '</div>'; /* End .swiper-wrapper */

	html += '<div class="swiper-pagination"></div>';
	html += '<div class="swiper-button-prev"></div><div class="swiper-button-next"></div>';
	html += '<div class="autoplay-progress"><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20"></circle></svg><span></span></div>';
	html += '</div></div>'; /* End .swiper and #stream */
	
	$container.append(html);
	
	$(document).ready(function () {
		// https://codesandbox.io/p/sandbox/kd5g73?file=%2Findex.html%3A111%2C5-112%2C79
		const progressCircle = document.querySelector(".autoplay-progress svg");
    	const progressContent = document.querySelector(".autoplay-progress span");

		// https://swiperjs.com/swiper-api#initialize-swiper

		const swiper = new Swiper('.swiper', {
			direction: 'horizontal',
			spaceBetween: 30,
			autoplay: {
				delay: 5000,
				pauseOnMouseEnter: true,
				disableOnInteraction: true,
			},
			loop: true,
		  
			// We need pagination
			pagination: {
			  el: '.swiper-pagination',
			},
		  
			// Navigation arrows
			navigation: {
			  nextEl: '.swiper-button-next',
			  prevEl: '.swiper-button-prev',
			},

			on: {
				autoplayTimeLeft(s, time, progress) {
				  progressCircle.style.setProperty("--progress", 1 - progress);
				  progressContent.textContent = `${Math.ceil(time / 1000)}s`;
				}
			  },
		  });		
	});
  };
  
  C.prototype.getCurrentState = function () {
	console.log('AJR:getCurrentState');
    return {
      'lastVisit': new Date().toLocaleString()
    };
  };

  /**
   * Set state from previous state.
   * @param {object} previousState - PreviousState.
   */
  C.prototype.setState = function (previousState) {
    console.log('AJR:setState');

    if (previousState === undefined) {
      return;
    }

    if (typeof previousState === 'object' && !Array.isArray(previousState)) {
		console.log(`Last visit: ${previousState.lastVisit || 'Never'}`)
    }
  };
  return C;
})(H5P.jQuery);