window.onload = function() {
	addInputs();
	remove();
	add();
	contentOrDesign();
}
function contentOrDesign(){
	var content=document.getElementById('contentBtn');
	var design=document.getElementById('designBtn');

//click content
content.addEventListener("click",function(){


	//fadeInContent();
	var designSide=document.getElementById("design");
	var contentSide=document.getElementById("location");

	contentSide.style.display="block";
	designSide.style.display="none";

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

	if(this.classList.contains('selected')==false)
	{
		this.classList.add('selected');
		this.classList.add('fadeInRight');
		var content=document.getElementById('contentBtn');
		content.classList.remove('selected');

	}
});

}

function remove(){
	var removeBtn=document.querySelectorAll(".myTrash");

	for(var i=0;i<removeBtn.length;++i)
	{
		removeBtn[i].addEventListener("click",function(){
			var lenBtn=document.querySelectorAll(".myTrash").length;
			console.log(lenBtn);

			if(lenBtn!=1)
			{
				this.parentElement.parentElement.remove();
			}
			addInputs();

		});
	}
}

function add(){
	var addBtn=document.querySelectorAll(".addLocationBtn");

	for(var i=0;i<addBtn.length;++i)
	{
		addBtn[i].addEventListener("click",function(){

			var table=document.querySelectorAll(".btnContainer");
			var endOfTable=table[table.length-1];
			var p=document.createElement("p");
			var textNode=document.createTextNode("Test");


			p.appendChild(textNode);
			endOfTable.insertAdjacentHTML( 'afterend',`<div class='col-lg-12 padding-left-30 padding-right-30 btnContainer padding-top-20'>
							<div class='col-lg-1 clickable'>
								<i class='fas fa-map-marker-alt'></i>
							</div>
							<div class='col-lg-6 clickable'>
								<p style='margin-bottom: 0px;'>Location `+(table.length+1)+`</p>
							</div>
							<div class='col-lg-1'>
								<i class='myTrash fas fa-trash-alt'></i>
							</div>
							<div class='col-lg-4 clickable'>
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
		});
	}

}

