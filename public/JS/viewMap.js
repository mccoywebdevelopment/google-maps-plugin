window.onload = function() {
	fillCode();
}

function fillCode()
{
	var target=document.getElementById("code");
	var text=document.createTextNode("<div class='container'><div class='row'><div class='col-lg-9 col-md-12 col-sm-12 border-top-bottom custom-padding'><div id='click-box' class='autocomplete'>"+
					"<input  autocomplete='off' type='text' placeholder='Search Locations' id='filter_users'><ul id='users-list' class='z-index-99'>"+
					"</ul></div></div></div><div class='row'><div class='col-lg-9 col-sm-12 col-sm-12 no-pad-rt'><div id='map'><p></p></div></div>"+
					"<div class='col-lg-3 col-md-12 col-sm-12 pre-scrollable border-bottom list-stores'><ul id='store-locations'></ul></div></div></div>"+
					"<script src='http://localhost:3000/JS/code.js'></script><script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyCJyl_DjWAyQrgaRq_xAQjhPb22zUoi_"+
					"xw&libraries=+places&callback=initMap' async defer></script>");
	target.append(text);

	var beg=document.getElementById("beg");
	beg.append(document.createTextNode("<script>"));

	var beg=document.getElementById("end");
	beg.append(document.createTextNode("</script>"));


}