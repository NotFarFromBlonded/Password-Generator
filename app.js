const password = document.getElementById("password")
const copy = document.getElementById("copy")
const passLength = document.getElementById("length")
const lowercase = document.getElementById("lowercase")
const uppercase = document.getElementById("uppercase")
const symbols = document.getElementById("symbols")
const ambiguousSymbols = document.getElementById("ambiguousSymbols")
const numbers = document.getElementById("numbers")
const generate = document.getElementById("generate")

getRandomLower=()=>{
    let randomLowerAscii = Math.floor((Math.random() * 26) + 97)
    return String.fromCharCode(randomLowerAscii)
}

getRandomUpper=()=>{
    let randomUpperAscii = Math.floor((Math.random() * 26) + 65)
    return String.fromCharCode(randomUpperAscii)
}

getRandomSymbols=()=>{
    const randomSymbols = "!@#$%^&*?_-"
    return randomSymbols[Math.floor(Math.random() * randomSymbols.length)]
}

getRandomAmbiguousSymbols=()=>{
    const randomAmbiguousSymbols = "{}[]()/\'\"`~,;:.<>\\"
    return randomAmbiguousSymbols[Math.floor(Math.random() * randomAmbiguousSymbols.length)]
}

getRandomNumber=()=>{
    let randomNumberAscii = Math.floor((Math.random()*10) + 48)
    return String.fromCharCode(randomNumberAscii)
}

const func = {
	lower: getRandomLower,
	upper: getRandomUpper,
	symbol: getRandomSymbols,
    ambiguousSymbol: getRandomAmbiguousSymbols,
    number: getRandomNumber,
}

generatePassword = (lower, upper, symbol, ambiguousSymbol, number, length) =>{
    let generatedPassword = '';
	const typesCount = lower + upper + symbol + ambiguousSymbol + number;
	const typesArr = [{lower}, {upper}, {symbol}, {ambiguousSymbol}, {number}].filter(item => Object.values(item)[0]);
	
	if(typesCount === 0) {
		return '';
	}
	
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += func[funcName]();
		});
	}
	const finalPassword = generatedPassword.slice(0, length);
	return finalPassword;
}

generate.addEventListener('click',()=>{
    const hasLength = passLength.value;
    const hasLower = lowercase.checked;
    const hasUpper = uppercase.checked;
    const hasSymbol = symbols.checked;
    const hasAmbiguousSymbol = ambiguousSymbols.checked;
    const hasNumber = numbers.checked;

    password.value = generatePassword(hasLower, hasUpper, hasSymbol, hasAmbiguousSymbol, hasNumber, hasLength);
    console.log(password.innerText);
});

copy.addEventListener('click', ()=>{
    const textarea = document.createElement('textarea');
	const copyPassword = password.value;
	
	if(!copyPassword) { return; }
	
	textarea.value = copyPassword;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Copied Password: '+password.value);
});