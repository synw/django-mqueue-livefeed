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
        }
	},
	methods: {
		processMsg: function(message, site, event_class, uid) {
			this.drawSparkline();
			this.flashNumMsgs();
			this.msgs.unshift({"event_class": event_class, "message": message, "uid": uid, "site": site});
			this.numMsgs++;
			this.numMsgsSites[site]++;
			var total = 1;
			for(var i in this.timelineNumMsgs) { total += this.timelineNumMsgs[i]; };
			console.log("TOTAL", total);
			this.timelineNumMsgs.push(total);
			console.log(Date.now());
		},
		drawSparkline: function() {
	        $('.numMsgsSparkline').sparkline(app.timelineNumMsgs);
		},
		flashNumMsgs: function() {
			this.msgIconClass["fa-envelope-o"] = false;
			this.msgIconClass["fa-envelope-open-o"] = true;
			setTimeout(function(){
				this.msgIconClass["fa-envelope-o"] = true;
				this.msgIconClass["fa-envelope-open-o"] = false;
			},500);
		},
	    formatMsg: function(msg, prefix) {
			var event_classes = this.ecs();
			var label = "";
			for (i=0;i<event_classes.length;i++) {
				if (msg.event_class !== "default" || msg.event_class !== undefined) {
					if (event_classes[i] === msg.event_class) {
						label = get_label(event_classes[i]);
						break
					}
				}
			}
			var res = label;
			var sitef = '&nbsp;[&nbsp;<span class="site-name">'+msg.site+'</span>&nbsp;]&nbsp; '
			if (prefix !== undefined) {
				res = res+"&nbsp;"+sitef+msg.message;
			} else {
				res = res+"&nbsp;&nbsp;"+msg.message;
			}
			return res
		},
		delMsg: function(msg) {	
			for (i=0;i<this.msgs.length;i++) {
				if (msg.uid === this.msgs[i].uid) {
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