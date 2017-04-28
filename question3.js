EventTarget.prototype.addEventListener = listenerWrapper();

function getEvents(elm) {
	if (!elm.customEvents){
		return false;
	}
    return elm.customEvents;
};

function listenerWrapper() {
    var listener = EventTarget.prototype["addEventListener"];
    return function (type, callback, capture) {

		if (!this.customEvents) {
			this.customEvents = [];
			// Object.defineProperty(this.prototype, customEvents, {value:[]});
		}
		this.customEvents.push({type, callback});
		listener.call(this, type, callback, capture);
    };
}

function replace() {
	replaceSpanToDiv(Array.prototype.slice.call(document.getElementsByTagName('span')));
}

function replaceSpanToDiv(spanList) {
    var childSpans = [],
    	childNode;

    spanList.forEach(function(span){
    	var div = document.createElement('div');
    		div.style.display = "inline";
    	
		var appendEvents = function(newNode, element){
			var customEvents = element.customEvents;
			if (customEvents && customEvents.length){
				customEvents.forEach(function(event){
					newNode.addEventListener(event.type, event.callback);
				});
			}
			return newNode;
		}

    	Array.prototype.slice.call(span.childNodes).forEach(function(child){
    		var newNode = child.cloneNode(true);
    		child = appendEvents(newNode, child);
    		div.appendChild(child);
    	});

    	// if (div.getElementsByTagName('span').length > 0){
    	// 	replaceSpanToDiv(Array.prototype.slice.call(div.getElementsByTagName('span')));
    	// }
    	span.parentElement.replaceChild(div, span);
    	console.log(div);

    });
}

