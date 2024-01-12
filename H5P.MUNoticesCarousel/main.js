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

	var html = '<div class="alert alert-info">Alert!</div>';

	html += '<div class="carousel slide" data-ride="carousel" data-interval="7000" id="stream-dashboard-notices">';
	html += '<div class="carousel-inner" role="listbox">';

	var buttonHTML = '<div class="carousel-indicators js-only">'; /* Start slide button markup */
	var buttonIndex = 0;

	var firstItem = true;

	for(notice of this.options.notices) {
		if(notice.visible) { /* Skip notices that are not visible */
			/* First item is always marked as active  */
			html += `<div class="carousel-item ${firstItem ? " active" : ""}"><div class="item">`;

			buttonHTML += `<button data-target="#stream-dashboard-notices" data-slide-to="${buttonIndex}" class="${firstItem ? "active" : ""}" aria-label="slide-0" aria-current="true">${buttonIndex + 1}</button>`;
			buttonIndex+=1;

			firstItem = false;

			html += `<div><div class="item__heading">`;

			html += `<h6>${notice.title}</h6><div class="item__info item__info_update">${notice.update}</div></div>`;
			html += `<div class="item__content">${notice.content}</div>`;

			if(notice.moreinformation) {
				html += `<div class="item__more_info">`;
				if(notice.moreinformation.startsWith('http')) {
					html += `<a href="${notice.moreinformation}" target="_blank">More information</a>`;
				} else {
					html += `By <a href="mailto:${notice.moreinformation}" target="_blank">${notice.owner}</a>`;
				}
				html += '</div>';	
			}

			html += '</div>';

			if (notice.image && notice.image.path) {
				html += `<div><img alt="" src="${H5P.getPath(notice.image.path, this.id)}"></div>`;
			}

			html += '</div></div>'; /* End item and carousel-item */
		}
	}
	html += '</div>'; /* carousel-inner */

	/* Standard left and right controls */
	html += '<a class="carousel-control carousel-control-prev" href="#stream-dashboard-notices" role="button" data-slide="prev"><span class="carousel-control" aria-hidden="true"><i class="icon fa fa-chevron-left fa-fw " aria-hidden="true"></i></span><span class="sr-only">Previous</span></a><a class="carousel-control carousel-control-next" href="#stream-dashboard-notices" role="button" data-slide="next"><span class="carousel-control" aria-hidden="true"><i class="icon fa fa-chevron-right fa-fw " aria-hidden="true"></i></span><span class="sr-only">Next</span></a>';

	/* End slide button markup */
	buttonHTML += '</div>';
	html += buttonHTML;

	html += '</div>'; /* carousel */
	
	$container.append(html);
	
	//console.log(this);
	//console.log($container);
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

/*
<p>
<script src="https://cdn.jsdelivr.net/npm/swiper@11.0.5/swiper-bundle.min.js" type="text/javascript"></script>
</p>
<p><link href="https://cdn.jsdelivr.net/npm/swiper@11.0.5/swiper-bundle.min.css" rel="stylesheet" /></p>
<!-- Slider main container -->
<div class="swiper" style="height: 300px;"><!-- Additional required wrapper -->
<div class="swiper-wrapper"><!-- Slides -->
<div class="swiper-slide">Slide 1</div>
<div class="swiper-slide">Slide 2</div>
<div class="swiper-slide">Slide 3</div>
</div>
<!-- If we need pagination -->
<div class="swiper-pagination"></div>
<!-- If we need navigation buttons -->
<div class="swiper-button-prev"></div>
<div class="swiper-button-next"></div>
<!-- If we need scrollbar -->
<div class="swiper-scrollbar"></div>
</div>


const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
*/