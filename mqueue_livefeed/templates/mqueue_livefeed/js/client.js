{% load mql %}

var mq_callbacks = {
    "message": function(dataset) {
    	if (debug === true) { console.log('SET: '+JSON.stringify(dataset));};
    	res = unpack_data(dataset);
    	var message = res['message']
    	var event_class = res['event_class']
    	var message_label = res['message_label']
    	var data = res['data']
    	var channel = res['channel'];
    	var d = new Date();
    	// handlers
    	if (debug === true) {
    			console.log('Msg: '+message+"\nChan: "+channel+"\nEvent_class: "+event_class+'\nData: '+JSON.stringify(data));
    	}
    	function getClockTime(seconds)
    	{
    	   var now    = new Date();
    	   var hour   = now.getHours();
    	   var minute = now.getMinutes();
    	   var second = now.getSeconds();
    	   if (hour   > 12) { hour = hour - 12;      }
    	   if (hour   == 0) { hour = 12;             }
    	   if (hour   < 10) { hour   = "0" + hour;   }
    	   if (minute < 10) { minute = "0" + minute; }
    	   if (seconds == true && second < 10) { second = "0" + second; }
    	   var timestring = hour +':' +minute;
    	   if (seconds == true) {
    		   timestring = timestring+':'+second;
    	   }
    	   return timestring;
    	}
    	var timenow = getClockTime(false);
    	var datapack = data;
    	if ( datapack.hasOwnProperty('admin_url') ) {
    		message = '<a href="'+datapack['admin_url']+'" target="_blank">'+message+'</a>';
    	}
    	var output = "";
    	if ( datapack.hasOwnProperty('site') ) {
    		site = datapack['site'];
    		var output ='<div class="pull-right badge" style="margin-left:0.5em;font-size:85%">'+site+'</div>';
    	}
    	output = output+'<div style="margin:1.2em;">'+timenow+' '+message_label+'&nbsp;&nbsp;'+message+'</div>';
    	$('#reload').show();
    	$('#feedbox_default').hide();
    	$('#feedbox').prepend(output);
    },
	"join": function(message) {
    	if ( debug === true ) {console.log('JOIN: '+message['channel']+' : '+JSON.stringify(message))};
    },
    "leave": function(message) {
    	if ( debug === true ) {console.log('LEAVE: '+message['channel']+' : '+JSON.stringify(message))};
    },
    "subscribe": function(context) {
    	if ( debug === true ) {console.log('SUSCRIBE: '+context['channel']+' : '+JSON.stringify(context))};
    },
    "error": function(errContext) {
    	if ( debug === true ) {console.log('ERROR: '+errContext['channel']+' : '+JSON.stringify(errContext))};
    },
    "unsubscribe": function(context) {
    	if ( debug === true ) {console.log('UNSUSCRIBE: '+context['channel']+' : '+JSON.stringify(context))};
    }
}

var subscription = centrifuge.subscribe("{% mqchannel %}", mq_callbacks);