function initMap() {
  //var clientPositions=[];
	var infoWindow = new google.maps.InfoWindow();

	map = new google.maps.Map(document.getElementById('map'), {
		center:{lat:39.77828,lng: -85.5272031},
		zoom: 3
	});

	var marker=[];

	for(var i=0;i<clientPositions.length;++i)
	{
		marker = new google.maps.Marker({
      
			position:clientPositions[i].position,
      map:map,
      title:clientPositions[i].title,
      address:clientPositions[i].address
		});
		 google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent("<div class='custom-padding-5'><h4>"+this.title+"</h4>"+
                                      "<p>"+this.address+"</p>"+
                                      "<button value='2' class='main-color btn' onclick='getDirections("+'"'+this.address+'"'+")'>Directions</button></div>");
                infoWindow.open(map, this);
            
         });

	}
	console.log("marker:")
	console.log(marker);
	displayStores(clientPositions);


	var input = document.getElementById('filter_users');
  var autocomplete = new google.maps.places.Autocomplete(input);

	var searchBox = new google.maps.places.SearchBox(input);

         map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });

}


function getDirections(address)
{
    window.location.href = "https://www.google.com/maps/search/"+address;
}

function displayStores(myMarkers)
{
	console.log("executed"+myMarkers.length);
    var storelocations=document.getElementById("store-locations");
    for(var i=0;i<myMarkers.length;++i)
    {
        var li=document.createElement("li");

        var node=document.createElement("div");
        node.classList.add("border-top-bottom");
        node.classList.add("custom-padding");
        node.classList.add("store-li");
        node.value=i;

        var title=document.createElement("p");
        title.classList.add("title");
        textTitle=document.createTextNode(myMarkers[i].title);
        title.appendChild(textTitle);

        node.appendChild(title);

        var address=document.createElement("p");
        var addressText=document.createTextNode(myMarkers[i].address);
        address.appendChild(addressText);

        node.appendChild(address);


        var direction=document.createElement("button");
        var directionText=document.createTextNode("Directions");
        direction.appendChild(directionText);
        direction.setAttribute("onclick",'getDirections('+'"'+myMarkers[i].address+'"'+')');
        direction.classList.add('main-color');
        direction.classList.add('btn');

        node.appendChild(direction);

        li.appendChild(node);

        li.style="list-style-type: none;";


        storelocations.appendChild(li);
    }
    var storeUL=document.querySelectorAll(".store-li");


    for(var i=0;i<myMarkers.length;++i)
    {
        storeUL[i].addEventListener("click",function(){
            map.setCenter(myMarkers[this.value].position);
        });
    }
}