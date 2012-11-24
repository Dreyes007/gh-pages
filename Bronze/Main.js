// Daniel Reyes
// MIU-1212
// Bronze App
// Nov 15th

//Wait untill DOM is ready.
window.addEventListener("DOMContentLoaded", function(){

	//getElementById function
	function ge(x){
		var theElement = document.getElementById(x);
		return theElement;		
	}
		//Select field element populated with options
	function chooseMenu(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = ge('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "menus");
		for(var i=0, j=menuGroups.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = menuGroups[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);		
	}
	//Find value of selected radion button
	function getSelectedRadio(){
		var radios = document.forms[0].order;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				orderValue = radios[i].value;
			}						
		}
	}
	//Find value of selected checkbox button
	function getSelectedCheckbox(){
		var checkbox = document.forms[0].payment;
		for(var i=0; i<checkbox.length; i++){
			if(checkbox[i].checked){
				paymentValue = checkbox[i].value;
			}						
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
			ge('informationForm').style.display = "none";
			ge('clear').style.display = "inline";	
			ge('addNew').style.display = "inline";	
			break;
			case "off":
			ge('informationForm').style.display = "block";
			ge('clear').style.display = "inline";	
			ge('addNew').style.display = "none";
			ge('items').style.display = "none";	
			break;
			default:
			return false;

		}
	}
	
	
	function storeData(key){
		//If there is not key, this means this is a  brand new Item and need a new key
		if(!key){		
			var id 				= Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same key that's been passed along from the editSubmit event handler
			//to the validate function, and then passed here into the storeData function.
			id = key;
		}
		getSelectedRadio();
		getSelectedCheckbox();
		var item			= {};
			item.fname		= ["First Name:", ge('fname').value];
			item.lname		= ["Last Name:", ge('lname').value];	
			item.email		= ["Email:", ge('email').value];
			item.phone		= ["Phone Number:", ge('phone').value];
			item.address	= ["Address:", ge('address').value];
			item.order		= ["Order:", orderValue];
			item.payment	= ["Payment", paymentValue];
			item.select 	= ["Menus:", ge('menus').value];
			item.amount 	= ["Order Amount:", ge('amount').value];
			item.date		= ["Delivery Date:", ge('date').value];
			item.comments	= ["Additional Instructions:", ge('comments').value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Order Saved!");
	}
	function getData(){
		toggleControls("on");
		if(localStorage.length == 0){
			alert("There is no data in Local Storage so default data was added.");
			autoFillData();
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeLi = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			getImage(obj.select[1], makeSubList);
			for(var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);			
			}
			makeItemLinks(localStorage.key(i),linksLi);//Create edit and delete button/link for each item in the local storage
		}		
	}
	
	//Get the image for the right category
	function getImage(imgName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ imgName + ".png");
		imageLi.appendChild(newImg);
		
	}
	
	//Auto Populate Local Storage
	function autoFillData(){
		//The actual JSON OBJECT data required for this to work is coming from our json.js file which is loaded from our HTML page.
		//Store JSON OBJECT into local storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	//Make Items Links
	//Create Edite and Deleted links for each stored Item when displayed.
	function makeItemLinks(key, linksLi){
		//Add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Order";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//Add line break.
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		//Add Delete single item link.
		var deleteLink = document.createElement('a');
			deleteLink.href = "#";
			deleteLink.key = key;
			var deleteText = "Delete Order";
			deleteLink.addEventListener("click", deleteItem);
			deleteLink.innerHTML = deleteText;
			linksLi.appendChild(deleteLink);
			
	}
	
	function editItem(){
		//Grab the data from our item on local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
			
		//Show the form
		toggleControls("off");
			
		//Populate form with with current local storage values.
		ge('fname').value = item.fname[1];
		ge('lname').value = item.lname[1];
		ge('email').value = item.email[1];
		ge('phone').value = item.phone[1];
		ge('address').value = item.address[1];
		var radios = document.forms[0].order;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Carryout" && item.order[1] == "Carryout"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Delivery" && item.order[1] == "Delivery"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		for(var i=0; i<checkbox.length; i++){
			if(checkbox[i].value == "Visa" && item.payment[1] == "Visa"){
				checkbox[i].setAttribute("checked", "checked");
			}else if(checkbox[i].value == "Mastercard" && item.payment[1] == "Mastercard"){
				checkbox[i].setAttribute("checked", "checked");
			}
		}
		ge('select').value = item.select[1];
		ge('amount').value = item.select[1];
		ge('date').value = item.select[1];
		ge('time').value = item.select[1];
		ge('comments').value = item.select[1];
			
		//Remove the initial listener from the input 'Save Order' button.
		save.removeEventListener("click", storeData);
		//Change Submit Button value to Edit Button
		ge('submit').value = "Edit Information";
		var editSubmit = ge('submit');
		//Save the key value establish in this function as a property of the edit submit event
		//so we can use that value when the edited data is saved.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
			
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this information?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Information was deleted");
			window.location.reload();
		}else{
			alert("Information was NOT deleted");
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
			
		}else{
			localStorage.clear();
			alert("All information has been deleted!");
			window.location.reload();
			return false;
		}
	
	}
	
	function validate(e){
		//Define the elements we want to check
		var getfname = ge('fname');
		var getlname = ge('lname');
		var getEmail = ge('email');
		var getPhone = ge('phone');
		
		//Reset Error Message.
		errMsg.innerHTML = "";
		getfname.style.border = "1px solid black";
		getlname.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";
		getPhone.style.border = "1px solid black";
		
		//Get error message
		var messageAry = [];
		
		//First Name Validation
		if(getfname.value === ""){
			var fnameError = "Please enter a first name";
			getfname.style.border = "1px solid red";
			messageAry.push(fnameError);
		}
		//Last Name Validation
		if(getlname.value === ""){
			var lnameError = "Please enter a last name";
			getlname.style.border = "1px solid red";
			messageAry.push(lnameError);			
		}
		//Email Validation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}
		//Phone number Validation
		if(getPhone.value === ""){
			var phoneError = "Please enter a phone number";
			getPhone.style.border = "1px solid red";
			messageAry.push(phoneError);
		}
		
		//If there were errors display them on the screen.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault;
			return false;
		}else{
			//If all is Ok, save our Data! Send the key value (Wich came from the editData function).
			//Remember this key value was passed as through the editSubmit event listener as a property.
			storeData(this.key);
			
		}	
			
	}
		
				
	//Variable default
	var menuGroups = ["--Choose A Menu--", "Appetizer", "Entree", "Dessert"],
		orderValue,
		paymentValue,
		errMsg = ge('errors');
					
	chooseMenu();
	
	
	
	//Set link & Submit Click Events
	
	var displayLink = ge('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = ge('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = ge('submit');
	save.addEventListener("click", validate);

});