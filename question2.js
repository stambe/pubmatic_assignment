var returnVal = (function(value){
    return (function(callback) {
        return(callback(
            function(addCallback) { // addCallback
                return function(value) {
                        if( value < 2 ){
                            return 1;
                        }
                        else{
                            return value + addCallback(value-1);
                        }
                }
            }
        )(value));
    })(
        function(addCallback) { // callback
            return (function(addRecursion) { 
                        return addRecursion(addRecursion); 
                    })(function(addRecursion) { // recursion for addition
                        return addCallback(
                            function(number) { return (addRecursion(addRecursion))(number); }
                        );
                    });
        }
    )
})(5);

console.log(returnVal);