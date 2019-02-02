
function initMap() {
	var marker=[];
		
	var infoWindow = new google.maps.InfoWindow();
	if(blackWhite)
	{
		map = new google.maps.Map(document.getElementById('map'), {
		center:{lat:34.132853,lng:-117.5316293},
		zoom: 6,
		streetViewControl: false,
		styles: [{
            		stylers: [{saturation: -100}]
       			 }],
		});
	}
	else{
		map = new google.maps.Map(document.getElementById('map'), {
		center:{lat:34.132853,lng:-117.5316293},
		streetViewControl: false,
		zoom: 6,
		});
	}

	for(var i=0;i<locations.length;++i)
	{
		marker = new google.maps.Marker({
      
			position:locations[i].position,
	        map:map,
	        title:locations[i].title,
            address:locations[i].address,
            link:locations[i].link,
            phoneNumber:locations[i].phoneNumber

		});
		 google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent("<div style='z-index:99999' class='noScrollBar custom-padding-5'><h4>"+this.title+"</h4>"+
                                      "<p>"+this.address+"</p>"+
                                      "<a href='"+this.link+"'>"+this.link+"</a>"+
                                      "<p>"+this.phoneNumber+"</p>"+
                                      "<button value='2' class='main-color btn' onclick='getDirections("+'"'+this.address+'"'+")'>Directions</button></div>");
                infoWindow.open(map, this);
            
         });

	}


}
function getDirections(address)
{
    window.location.href = "https://www.google.com/maps/search/"+address;
}