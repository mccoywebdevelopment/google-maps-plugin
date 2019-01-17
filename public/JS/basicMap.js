var addBtn=document.querySelectorAll(".addLocationBtn")[0];



function initMap() {
	var marker=[];

	var infoWindow = new google.maps.InfoWindow();

	map = new google.maps.Map(document.getElementById('map'), {
		center:{lat:34.132853,lng:-117.5316293},
		zoom: 6
	});


	for(var i=0;i<locations.length;++i)
	{
		marker = new google.maps.Marker({
      
			position:locations[i].position,
	        map:map,
	        title:locations[i].title,
            address:locations[i].address
		});
		 google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent("<div class='custom-padding-5'><h4>"+this.title+"</h4>"+
                                      "<p>"+this.address+"</p>"+
                                      "<button value='2' class='main-color btn' onclick='getDirections("+'"'+this.address+'"'+")'>Directions</button></div>");
                infoWindow.open(map, this);
            
         });

	}


}
function getDirections(address)
{
    window.location.href = "https://www.google.com/maps/search/"+address;
}