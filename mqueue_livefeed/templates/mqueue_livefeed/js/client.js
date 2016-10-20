{% load mql %}

var mqfeed_callbacks = {
    "message": function(dataset) {
    	if (debug === true) { console.log('SET: '+JSON.stringify(dataset));};
    	res = unpack_data(dataset);
    	var message = res['message']
    	var event_class = res['event_class']
    	var data = res['data']
    	var channel = res['channel'];
    	var site = data['site'];
    	var d = new Date();
    	// handlers
    	if (debug === true) {
    			console.log('Msg: '+message+"\nChan: "+channel+"\nEvent_class: "+event_class+'\nData: '+JSON.stringify(data));
    	}
    	var timenow = getClockTime(false);
    	var datapack = data;
    	if ( datapack.hasOwnProperty('admin_url') ) {
    		message = '<a href="'+datapack['admin_url']+'" target="_blank">'+message+'</a>';
    	}
    	var output = "";
    	if ( site != "" ) {
    		var output ='<div class="pull-right badge" style="margin-left:0.5em;font-size:85%">'+site+'</div>';
    	}
    	var label = get_label(event_class);
    	output = output+'<div style="margin:1.2em;">'+timenow+' '+label+'&nbsp;&nbsp;'+message+'</div>';
    	$('#reload').show();
    	$('#feedbox_default').hide();
    	$('#feedbox').prepend(output);
    },
    {% include "instant/js/join_events.js" %}
}

var subscription = centrifuge.subscribe("{% mqchannel %}", mqfeed_callbacks);