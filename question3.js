EventTarget.prototype.addEventListener = listenerWrapper("add", true);

function getEvents(elm) {
	if (!elm.customEvents){
		return false;
	}
    return elm.customEvents;
};

function listenerWrapper(name, bool) {
    var f = EventTarget.prototype[name + "EventListener"];
    return function (type, callback, capture) {

		if (!this.customEvents) {
			this.customEvents = [];
		}
		this.customEvents.push({type, callback});
		f.call(this, type, callback, capture);
    };
}

function replace(){
	replaceSpanToDiv(Array.prototype.slice.call(document.getElementsByTagName('span')));
}

function replaceSpanToDiv(spanList) {
    var spans = spanList,
    	childSpans = [];

    spans.forEach(function(span){

        var attrs = span.attributes,
        	div = document.createElement('div'),
        	spanEvents = getEvents(span);
        
        div.style.display = "inline";
        div.innerHTML = span.innerHTML;
        div.childNodes = span.childNodes; 
        div.children = span.children; 
        div.childElementCount = span.childElementCount; 
        if (attrs && attrs.length) {
            for (var j = 0; j < attrs.length; j++) {
                div.setAttribute(attrs[j].name, attrs[j].value);
            }
        }

        if (div.children.length > 0){
        	for (var i = 0; i < div.children.length; i++) {
        		var child = div.children[i];
	        	child.parentNode = child.parentElement = div;
	        	childEvents = getEvents(child);
	        	if (childEvents){
	        		childEvents.forEach(function(event){
		        		child.addEventListener(event.type, event.callback);
		        	});
	        	}
        	}
        }

        if (div.childNodes.length > 0){
        	for (var i = 0; i < div.childNodes.length; i++) {
        		var child = div.childNodes[i];
	        	child.parentNode = child.parentElement = div;
	        };
	    }

        if (spanEvents) {
        	spanEvents.forEach(function(event){
        		div.addEventListener(event.type, event.callback);
        	});
        }
        span.parentElement.replaceChild(div, span);
        childSpans = div.getElementsByTagName("span");
        
        if (childSpans.length > 0){
        	replaceSpanToDiv(Array.prototype.slice.call(childSpans));
        }
    });
}