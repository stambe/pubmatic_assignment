function multiply(number1, number2){

	var digitMultiplication = [], 
		firstNumber = number1.split("").reverse(),
		secondNumber = number2.split("").reverse(),
		multiplicationValue = [],
		index,
		remaining;

	firstNumber.forEach(function(firstNumberDigit, firstNumberIndex){
		secondNumber.forEach(function(secondNumberDigit, secondNumberIndex){
			index = firstNumberIndex + secondNumberIndex;
			multiplicationValue = (secondNumberDigit * firstNumberDigit);
			if (multiplicationValue){
				(!digitMultiplication[index]) ? digitMultiplication.push(multiplicationValue) : digitMultiplication[index] = (digitMultiplication[index] + multiplicationValue);
			}
		});
		index++;
	});

	digitMultiplication.forEach(function(multiValue, multiValueIndex){
		remaining = parseInt(multiValue / 10);
		if (!digitMultiplication[multiValueIndex+1] && remaining){
			digitMultiplication[multiValueIndex+1] = remaining;
		} else if (digitMultiplication[multiValueIndex+1]) {
			digitMultiplication[multiValueIndex+1] = digitMultiplication[multiValueIndex+1] + remaining;
		}
		digitMultiplication[multiValueIndex] = multiValue%10;
	});
	return digitMultiplication.reverse().join("");
}

console.log(multiply("456", "987"));
console.log(multiply("987654353", "12345678934534534534534"));
console.log(multiply("0123", "004"));



