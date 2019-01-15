function Location(title,address,link,phoneNumber){
		this.title=title;
		this.address=address;
		this.link=link,
		this.phoneNumber=phoneNumber;

		this.getAddress=function(){
			return this.address;
		}

};

var allLocations=[];
var location1=new Location("location 1",null,null,null);
allLocations.push(location1);
var location1=new Location("location 2",null,null,null);
allLocations.push(location1);



window.onload = function() {
	loadLocations();
	addInputs();
	deleteBtn();
	add();
	contentOrDesign();
}

function deleteBtn()
{
	var trashBtn=document.querySelectorAll('.myTrash');
	for(var i=0;i<trashBtn.length;++i)
	{
		trashBtn[i].addEventListener('click',function(){
			console.log(this.parentElement);
			var id=this.parentElement.id;
			var form=document.getElementById(id);
			form.submit();
		});
	}

}
function loadLocations()
{
	var scrollDiv=document.querySelectorAll(".scrollDiv")[0];


	for(var i=0;i<allLocations.length;++i)
	{

		scrollDiv.insertAdjacentHTML('beforeend',`<div class='col-lg-12 padding-left-30 padding-right-30 btnContainer padding-top-20'>
							<div class='col-lg-1 clickable' >
								<i class='fas fa-map-marker-alt'></i>
							</div>
							<div class='col-lg-6 clickable'>
								<p style='margin-bottom: 0px;'>`+allLocations[i].title+`</p>
							</div>
							<div class='col-lg-1'>
								<form id='deleteForm`+i+`' method='post' action='/delete'>
									<i class='myTrash fas fa-trash-alt'></i>
									<input type='text' name='locationId' style='display:none' value='`+allLocations[i].title+`'>
								</form>
							</div>
							<div class='col-lg-4 clickable'>
								<i style='float:right' class='fas fa-arrow-circle-right '></i>
							</div>
						</div>`);

	}
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
	addInputs();
	remove();
	add();
	contentOrDesign();

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

}

/*function remove(){
	var removeBtn=document.querySelectorAll(".myTrash");

	for(var i=0;i<removeBtn.length;++i)
	{
		removeBtn[i].addEventListener("click",function(){
			var lenBtn=document.querySelectorAll(".myTrash").length;
			console.log(lenBtn);

			if(lenBtn!=1)
			{
				this.parentElement.parentElement.remove();
				var value=this.parentElement.parentElement.value;
				for(var i=0;i<allLocations.length;++i)
				{
					if(value==allLocations[i].placeId)
					{
						allLocations.splice(i,1);
					}
				}

			}
			console.log("Length:"+allLocations.length);
			addInputs();

		});
	}
}*/

function add(){
	var addBtn=document.querySelectorAll(".addLocationBtn");

	for(var i=0;i<addBtn.length;++i)
	{
		addBtn[i].addEventListener("click",function(){
		var table=document.querySelectorAll(".btnContainer");
		var endOfTable=table[table.length-1];
		var textNode="Location "+(table.length+1);
		var newLocation=new Location(textNode,null,null,null,(table.length+1));

		allLocations.push(newLocation);

		endOfTable.insertAdjacentHTML( 'afterend',`<div class='col-lg-12 padding-left-30 padding-right-30 btnContainer padding-top-20'>
						<div class='col-lg-1 clickable' value='`+(table.length+1)+`'>
							<i class='fas fa-map-marker-alt'></i>
						</div>
						<div class='col-lg-6 clickable' value='`+(table.length+1)+`'>
							<p style='margin-bottom: 0px;'>Location `+(table.length+1)+`</p>
						</div>
						<div class='col-lg-1'>
							<i class='myTrash fas fa-trash-alt'></i>
						</div>
						<div class='col-lg-4 clickable' value='`+(table.length+1)+`'>
							<i style='float:right' class='fas fa-arrow-circle-right '></i>
						</div>
					</div>`);


		endOfTable.scrollIntoView();
		remove();
		addInputs();

		});
	}
}

function addInputs()
{
	var locationBtn=document.querySelectorAll(".clickable");
	var trashBtn=document.querySelectorAll(".myTrash");
	for(var i=0;i<locationBtn.length;++i)
	{
		locationBtn[i].addEventListener("click",function(){
			var positionSlide=document.getElementById("location");
			positionSlide.style.display="none";
			var editLocationSlide=document.getElementById("editLocation");
			editLocationSlide.style.display="block";

			//fill in the inputs
			var titleInput=document.getElementsByName("title")[0];
			var placeIdInput=document.getElementsByName("place")[0];
			//IMPORTANT NEED TO FILL THE FIRST FIVE WITH THE OBJECT.SERVER SIDE
			var found=false;
			for(var i=0;i<allLocations.length;++i)
			{
				if(this.getAttribute('value')==allLocations[i].placeId)
				{
					found=true;
					titleInput.value=allLocations[i].title;
				}
			}
			if(!found)
			{
				alert("No matches errror");
			}
		});
	}

}

