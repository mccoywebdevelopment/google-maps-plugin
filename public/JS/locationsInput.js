window.onload = function() {
	remove();
	add();


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