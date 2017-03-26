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
    	var uid = res['uid'];
    	// handlers
    	if (instantDebug === true) {
    			console.log('Msg: '+message+"\nChan: "+channel+"\nEvent_class: "+event_class+'\nData: '+JSON.stringify(data));
    	}
    	var timenow = getClockTime(false);
    	var datapack = data;
    	var output = "";
    	if ( site != "" ) {
    		output = '<span class="badge" style="margin:0.5em 0 0.5em 0;font-size:85%">'+site+'</span>&nbsp;'
    	}
    	if ( datapack.hasOwnProperty('admin_url') ) {
    		message = '<a href="'+datapack['admin_url']+'" target="_blank">'+message+'</a>';
    	}
    	
    	var label = get_label(event_class);
    	output = output+timenow+' '+label+'&nbsp;&nbsp;'+message;
    	handlers_for_event(event_class, channel, output, data, site, uid);
    	
    },
    {% include "instant/js/join_events.js" %}
}

var subscription = centrifuge.subscribe("{% mqchannel %}", mqfeed_callbacks);