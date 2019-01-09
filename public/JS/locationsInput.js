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
	var removeBtn=document.querySelectorAll(".my-0");

	for(var i=0;i<removeBtn.length;++i)
	{
		removeBtn[i].addEventListener("click",function(){
			var lenBtn=document.querySelectorAll(".my-0").length;
			console.log(lenBtn);

			if(lenBtn!=1)
			{
				this.parentElement.parentElement.parentElement.remove();
			}

		});
	}
}

function add(){
	var addBtn=document.querySelectorAll(".fa-plus");

	for(var i=0;i<addBtn.length;++i)
	{
		addBtn[i].addEventListener("click",function(){

			var table=document.querySelectorAll(".data");
			var endOfTable=table[table.length-1];
			var p=document.createElement("p");
			var textNode=document.createTextNode("Test");


			p.appendChild(textNode);
			endOfTable.insertAdjacentHTML( 'afterend',"<tr class='data'>"+
				"<td class='pt-3-half'><input type='text' name='address'></td>"+
				"<td class='pt-3-half'><input type='text' name='city'></td>"+
				"<td class='pt-3-half'><input type='text' name='state'></td>"+
				"<td class='pt-3-half'><input type='text' name='companyName'></td>"+
				"<td class='pt-3-half'><input type='text' name='phone'></td>"+
				"<td class='pt-3-half'><input type='text' name='link'></td>"+
				"<td><span class='table-remove'><button type='button' class='btn btn-danger btn-rounded btn-sm my-0'>Delete</button></span>"+
				"</td></tr>");

			remove();

		});
	}
}