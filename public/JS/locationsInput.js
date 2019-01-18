function Location(title,address,link,phoneNumber,place,position){
		this.title=title;
		this.address=address;
		this.link=link;
		this.phoneNumber=phoneNumber;
		this.placeId=place;
		this.position=position;
};
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}
var locations=[];
var location1=new Location("Location 1","az","www","",0,{lat:34.132853,lng:-118.5316293});
locations.push(location1);
var location1=new Location("Location 2","","","",1,{lat:34.132853,lng:-117.5316293});
locations.push(location1);
var location1=new Location("Location 3","","","",2,{lat:35.132853,lng:-118.5316293});
locations.push(location1);
var location1=new Location("Location 4","","","",3,{lat:34.232853,lng:-118.7316293});
locations.push(location1);
var location1=new Location("Location 5","","","",4,{lat:34.4553,lng:-117.6316293});
locations.push(location1);
window.onload = function() {
	loadLocations();
	addLocation();
	contentOrDesign();

window.onbeforeunload = function(){
  return 'Are you sure you want to leave?';
};
}
function loadLocations()
{

	var scrollDiv=document.querySelectorAll(".scrollDiv")[0];
	var container=document.querySelectorAll(".btnContainer");
	for(var i=0;i<container.length;++i)
	{
		container[i].remove();
	}
	for(var i=0;i<locations.length;++i)
	{
		locations[i].placeId=i;
	}
	for(var i=0;i<locations.length;++i)
	{
		scrollDiv.insertAdjacentHTML('beforeend',`
		<div class='col-lg-12 padding-left-30 padding-right-30 btnContainer padding-top-20' id=`+locations[i].placeId+`>
			<div class='col-lg-1 clickable' id=`+locations[i].placeId+` >
				<i class='fas fa-map-marker-alt'></i>
			</div>
			<div class='col-lg-6 clickable' id=`+locations[i].placeId+`>
				<p style='margin-bottom: 0px;'>`+locations[i].title+`</p>
			</div>
			<div class='col-lg-1'>
				<form id='deleteForm`+locations[i].placeId+`+' method='post' action='/delete'>
					<i class='myTrash fas fa-trash-alt' id='`+locations[i].placeId+`'></i>
					<input type='text' name='locationPlaceId' style='display:none' value='`+locations[i].placeId+`'>
				</form>
			</div>
			<div class='col-lg-4 clickable' id=`+locations[i].placeId+`>
				<i style='float:right' class='fas fa-arrow-circle-right '></i>
			</div>
		</div>`);
	}
	var btnContainer=document.querySelectorAll('.btnContainer');
	btnContainer[btnContainer.length-1].scrollIntoView();
	addInputs();
	deleteBtn();
	initMap();
}
function addLocation()
{
	var addBtn=document.querySelectorAll(".addLocationBtn")[0];


	addBtn.addEventListener("click",function(){
		console.log("clicked");
	var table=document.querySelectorAll(".btnContainer");
	var endOfTable=table[table.length-1];
	var textNode="Location "+(table.length+1);
	var randomNum=Math.floor((Math.random() * 10000) + 100);
	var num="34"+randomNum;
	var randomNum=Math.floor((Math.random() * 10000) + 1);
	var num2="-117"+randomNum;
	num2=Number(num2/10000);
	num=Number(num/10000);
	var newLocation=new Location(textNode,"","","",table.length,{lat:num,lng:num2});

	locations.push(newLocation);

	endOfTable.insertAdjacentHTML( 'afterend',`
		<div class='col-lg-12 padding-left-30 padding-right-30 btnContainer padding-top-20' id=`+table.length+`>
			<div class='col-lg-1 clickable' id=`+table.length+` >
				<i class='fas fa-map-marker-alt'></i>
			</div>
			<div class='col-lg-6 clickable' id=`+table.length+`>
				<p style='margin-bottom: 0px;'>`+textNode+`</p>
			</div>
			<div class='col-lg-1'>
				<form id='deleteForm`+table.length+`' method='post' action='/delete'>
					<i class='myTrash fas fa-trash-alt' id='`+table.length+`'></i>
					<input type='text' name='locationPlaceId' style='display:none' value='`+table.length+`'>
				</form>
			</div>
			<div class='col-lg-4 clickable' id=`+table.length+`>
				<i style='float:right' class='fas fa-arrow-circle-right '></i>
			</div>
		</div>`);
	endOfTable.scrollIntoView();
	initMap();
	loadLocations();


	});

}
function deleteBtn()
{
	var deleteBtn=document.querySelectorAll(".myTrash");
	for(var i=0;i<deleteBtn.length;++i)
	{
		deleteBtn[i].addEventListener("click",function(){
			var clickContainer=document.querySelectorAll(".btnContainer");
			if(clickContainer.length>1)
			{
				console.log(locations);
				
				for(var i=0;i<clickContainer.length;++i)
				{

					if(clickContainer[i].id==this.id)
					{
						console.log("before Delete");
						console.log(locations);
						locations=updateArray(locations,this.id);
						console.log("after Delete");
						console.log(locations);
						var container=document.querySelectorAll(".btnContainer");
						loadLocations();
					}
				}

			}
		});
	}
}
function addInputs()
{
	var locationBtn=document.querySelectorAll(".clickable");
	console.log(locationBtn.length);
	var trashBtn=document.querySelectorAll(".myTrash");
	for(let i=0;i<locationBtn.length;++i)
	{
		let button=locationBtn[i];

		button.addEventListener("click",function(){
			var positionSlide=document.getElementById("location");
			positionSlide.style.display="none";
			var editLocationSlide=document.getElementById("editLocation");
			editLocationSlide.style.display="block";

			//fill in the inputs
			var titleInput=document.getElementsByName("title")[0];
			var placeIdInput=document.getElementsByName("placeId")[0];
			titleInput.value=locations[this.id].title;
			placeIdInput.value=locations[this.id].placeId;
			var addressInput=document.getElementsByName("address")[0];
			addressInput.value=locations[this.id].address;
			var linkInput=document.getElementsByName("link")[0];
			linkInput.value=locations[this.id].link;
			var phoneNumberInput=document.getElementsByName("phoneNumber")[0];
			phoneNumberInput.value=locations[this.id].phoneNumber;


			submitLocation();


		});
	}
}
function updateArray(array,deleteIndex)
{
	var newArray=[];
	for(var i=0;i<array.length;++i)
	{
		if(i!=deleteIndex)
		{
			newArray.push(array[i]);
		}
	}
	return newArray;
}
function contentOrDesign(){
	var content=document.getElementById('contentBtn');
	var design=document.getElementById('designBtn');

//click content
content.addEventListener("click",function(){


	//fadeInContent();
	var designSide=document.getElementById("design");
	var contentSide=document.getElementById("location");
	var editLocation=document.getElementById("editLocation");

	contentSide.style.display="block";
	designSide.style.display="none";
	editLocation.style.display="none";

	if(this.classList.contains('selected')==false)
	{

		this.classList.add('selected');
		var design=document.getElementById('designBtn');
		design.classList.remove('selected');

	}

});

//click design
design.addEventListener("click",function(){

	var designSide=document.getElementById("design");
	var contentSide=document.getElementById("location");

	contentSide.style.display="none";
	designSide.style.display="block";
	editLocation.style.display="none";

	if(this.classList.contains('selected')==false)
	{
		this.classList.add('selected');
		this.classList.add('fadeInRight');
		var content=document.getElementById('contentBtn');
		content.classList.remove('selected');

	}
});

var backBtn=document.getElementById("backToLocation");
backBtn.addEventListener("click",function(){
	
	var designSide=document.getElementById("design");
	var contentSide=document.getElementById("location");

	contentSide.style.display="block";
	designSide.style.display="none";
	editLocation.style.display="none";
});


var toDesign=document.getElementById("toDesign");

toDesign.addEventListener("click",function(){
	var designSide=document.getElementById("design");
	var contentSide=document.getElementById("location");

	contentSide.style.display="none";
	designSide.style.display="block";

	var design=document.getElementById('designBtn');

	if(design.classList.contains('selected')==false)
	{
		design.classList.add('selected');
		design.classList.add('fadeInRight');
		var content=document.getElementById('contentBtn');
		content.classList.remove('selected');

	}
});

var backToLocation=document.getElementById("test");

backToLocation.addEventListener("click",function(){
	var designSide=document.getElementById("design");
	var contentSide=document.getElementById("location");

	contentSide.style.display="block";
	designSide.style.display="none";

	var content=document.getElementById('contentBtn');

	if(content.classList.contains('selected')==false)
	{
		var design=document.getElementById('designBtn');
		design.classList.remove('selected');
		content.classList.add('selected');
		content.classList.add('fadeInRight');

	}

	});
}
function submitLocation()
{
	var submitBtn=document.getElementById("submitLocation");
	submitBtn.addEventListener("click",function(){
		var titleInput=document.getElementsByName("title")[0];
		var placeIdInput=document.getElementsByName("placeId")[0];
		locations[placeIdInput.value].title=titleInput.value;
		var addressInput=document.getElementsByName("address")[0];
		locations[placeIdInput.value].address=addressInput.value;
		var linkInput=document.getElementsByName("link")[0];
		locations[placeIdInput.value].link=linkInput.value;
		var phoneNumberInput=document.getElementsByName("phoneNumber")[0];
		locations[placeIdInput.value].phoneNumber=phoneNumberInput.value;
		if(addressInput!=locations[placeIdInput.value].address)
		{
			var client = new HttpClient();
			var urll = "https://maps.googleapis.com/maps/api/geocode/json?address="+locations[placeIdInput.value].address+"&key="+key;
			client.get(urll, function(response) {
				response=JSON.parse(response);
				console.log(response);
				console.log(response.status);
				if(response.status=="OK")
				{
					var location=response.results[0].geometry.location;
					locations[placeIdInput.value].position=location;
					initMap();
				}
				else{
					alert("No results were found for address:"+locations[placeIdInput.value].address+".");
				}

				
			});
		}
		initMap();
		loadLocations();

	});
}


