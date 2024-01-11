var H5P = H5P || {};
 
H5P.MUNoticesCarousel = (function ($) {
  /**
   * Constructor function.
   */
  function C(options, id) {
    this.options = options;
    this.id = id;
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

	var html ='<div class="carousel slide" data-ride="carousel" data-interval="7000" id="stream-dashboard-notices">';
	html += '<div class="carousel-inner" role="listbox">';

	var buttonHTML = '<div class="carousel-indicators js-only">';
	var buttonIndex = 0;

	var firstItem = true;

	for(notice of this.options.notices) {
		if(notice.visible) {
			if(firstItem) {
				html += '<div class="carousel-item item active">';
				firstItem = false;
			}
			else {
				html += '<div class="carousel-item item">';
			}

			buttonHTML += `<button data-target="#stream-dashboard-notices" data-slide-to="${buttonIndex}" class="" aria-label="slide-0" aria-current="true">${buttonIndex + 1}</button>`;
			buttonIndex+=1;

			html += `<div class="item__info"><div class="item__info_category category_support">Support</div><div class="item__info_update">${notice.update}</div></div>`;
			html += `<div class="item__heading">`;
			if (notice.image && notice.image.path) {
				html += `<img alt="" src="${H5P.getPath(notice.image.path, this.id)}">`;
			}
			html += `<h6>${notice.title}</h6></div>`;
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
		}
	}
	html += '</div>'; /* carousel-inner */

	html += '<a class="carousel-control carousel-control-prev" href="#stream-dashboard-notices" role="button" data-slide="prev"><span class="carousel-control" aria-hidden="true"><i class="icon fa fa-chevron-left fa-fw " aria-hidden="true"></i></span><span class="sr-only">Previous</span></a><a class="carousel-control carousel-control-next" href="#stream-dashboard-notices" role="button" data-slide="next"><span class="carousel-control" aria-hidden="true"><i class="icon fa fa-chevron-right fa-fw " aria-hidden="true"></i></span><span class="sr-only">Next</span></a>';

	buttonHTML += '</div>';

	html += buttonHTML;

	html += '</div>'; /* carousel */
	
	$container.append(html);
	
	//console.log(this);
	//console.log($container);
  };
 
  return C;
})(H5P.jQuery);