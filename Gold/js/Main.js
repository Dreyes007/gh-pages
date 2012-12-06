	// New main

var parseplaceorder = function(data){
	//uses form data here;
	console.log(data);
	
};

$(document).on('pageinit', function(){
	
	var oform = $('#placeorder')
		odererrorlink = $('odererrorlink')
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
			parseplaceorder(data);
		}
	});
	
});

