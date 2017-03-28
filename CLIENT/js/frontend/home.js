$(document).ready(function() {
	$(document).on('click', '.link_slide', function(ev) {
		ev.preventDefault();
		$('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top -80
        }, 2000, 'swing');
		console.log($(this).attr('href'), ":::href");
	});
});