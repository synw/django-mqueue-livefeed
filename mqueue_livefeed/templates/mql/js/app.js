{% load instant_tags i18n %}

const app = new Vue({
	el: '#app',
	mixins: [vvMixin],
    data () {
        return {
        	msgIconClass: {
        		"fa": true,
        		"fa-envelope-o": true,
        		"fa-envelope-open-o": false
        	},
        	msgs: [],
        	numMsgs: 0,
        	numMsgsSites: {
        		{% for site in sites %}"{{site.slug}}": 0,{% endfor %}
        	},
        	timelineNumMsgs: [],
        	timeframeMsgs: 0,
        	numMsgsClasses: {},
        }
	},
	methods: {
		processMsg: function(message, site, event_class, uid) {
			this.drawSparkline();
			this.flashNumMsgs();
			var obj = {
					"event_class": event_class, 
					"message": message, 
					"uid": uid, 
					"site": site,
					"time": getClockTime(true)
					};
			this.msgs.unshift(obj);
			this.numMsgs++;
			this.numMsgsSites[site]++;
			this.timeframeMsgs++;
			//console.log(this.timeframeMsgs);
			this.timelineNumMsgs.push(this.timeframeMsgs);
			this.incrementNumMsgsClass(event_class);
		},
		drawSparkline: function() {
	        $('.numMsgsSparkline').sparkline(app.timelineNumMsgs);
		},
		incrementNumMsgsClass: function(event_class) {
			if (event_class in this.numMsgsClasses) {
				this.numMsgsClasses[event_class]++;
			} else {
				this.numMsgsClasses[event_class] = 1; 
			}
		},
		flashNumMsgs: function() {
			this.msgIconClass["fa-envelope-o"] = false;
			this.msgIconClass["fa-envelope-open-o"] = true;
			setTimeout(function(){
				this.msgIconClass["fa-envelope-o"] = true;
				this.msgIconClass["fa-envelope-open-o"] = false;
			},500);
		},
		getEventLabel: function(event_class) {
			var event_classes = this.ecs();
			var label = get_label(event_class);
			return label
		},
	    formatMsg: function(msg, prefix) {
			var res = this.getEventLabel(msg.event_class);
			var sitef = '&nbsp;[&nbsp;<span class="site-name">'+msg.site+'</span>&nbsp;]&nbsp; '
			if (prefix !== undefined) {
				res = res+"&nbsp;"+sitef+msg.message;
			} else {
				res = res+"&nbsp;&nbsp;"+msg.time+"&nbsp;"+msg.message;
			}
			return res
		},
		delMsg: function(msg) {	
			for (i=0;i<this.msgs.length;i++) {
				if (msg.uid === this.msgs[i].uid) {
					this.numMsgsClasses[msg.event_class]--;
					var index = this.msgs.indexOf(msg);
					this.msgs.splice(index, 1);
					this.numMsgs--;
					break
				}
			}
		},
		ecs: function() {
			return ['default', 'important', 'ok', 'info', 'debug', "error", 'warning', 'edited', "created", "deleted", "default"]
		},
	},
});