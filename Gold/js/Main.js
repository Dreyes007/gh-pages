	// New main

var parseplaceorder = function(data){
	//uses form data here;
	console.log(data);
	
};

$(document).on('pageinit', function(){
	
	var oform = $('#placeorder')
		odererrorlink = $('#odererrorlink')
	;
	
	oform.validate({
		invalidHandler: function(form, validator){
			odererrorlink.click();
			var html = '';
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				var fieldName = legend.length ? legend.text() : label.text();
				html += '<li>'+ fieldName +'</li>';
			};
			$("#ordererror ul").html(html);			
		},
		submitHandler: function(){
			var data = oform.serializeArray();
			storeData(data);
		}
	});
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
			
		}else{
			localStorage.clear();
			alert("All information has been deleted!");
			window.location.reload();
			return false;
		}
};