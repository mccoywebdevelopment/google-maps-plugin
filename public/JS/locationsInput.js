window.onload = function() {
	remove();
	add();
	contentOrDesign();


}
/*function fadeInDesign()
{
	var designSide=document.getElementById("design");
	designSide.classList.add('fadeInLeft');
	var contentSide=document.getElementById("location");

	contentSide.classList.add('fadeInLeft');

	if(contentSide.classList.contains('fadeInRight'))
	{
		contentSide.classList.remove('fadeInRight');
	}
	//contentSide.classList.add("probootstrap-animated");
}
function fadeInContent()
{
	var designSide=document.getElementById("design");
	var contentSide=document.getElementById("location");
	contentSide.classList.add('fadeInRight');

	contentSide.classList.add('fadeInLeft');

	if(designSide.classList.contains('fadeInLeft'))
	{
		designSide.classList.remove('fadeInLeft');
	}
	//designSide.classList.add("probootstrap-animated");
}*/
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

});

//click design
design.addEventListener("click",function(){

	//fadeInDesign();
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
	console.log(removeBtn);

	for(var i=0;i<removeBtn.length;++i)
	{
		removeBtn[i].addEventListener("click",function(){
			var lenBtn=document.querySelectorAll(".myTrash").length;
			console.log(lenBtn);

			if(lenBtn!=1)
			{
				this.parentElement.parentElement.parentElement.parentElement.remove();
			}

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
			endOfTable.insertAdjacentHTML( 'afterend',"<div class='col-lg-12 padding-left-30 padding-right-30 padding-top-20 btnContainer'>"+
              "<div class='locationBtn vertical-center'><p class='vertical-center'><i class='fas fa-map-marker-alt padding-right-20'></i>Location "+
               ""+(table.length+1)+"<span class='myTrash2'><i class='myTrash fas fa-trash-alt'></i></span><i class='fas fa-arrow-circle-right '></i></p></div></div>");

			remove();

		});
	}
}