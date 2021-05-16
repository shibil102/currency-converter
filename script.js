const currencySelectOne = document.getElementById('selectOne');
const currencySelectTwo = document.getElementById('selectTwo');
const currencyOne = document.getElementById('amount-1');
const currencyTwo = document.getElementById('amount-2');
const exchangeRate = document.getElementById('exchangeRate');
const swap = document.getElementById('btn')

function currencyCode(){
fetch('https://openexchangerates.org/api/currencies.json')
.then((res) => res.json())
.then((data) => {
    Object.keys(data).forEach((values) => {
    
    const optionOne = document.createElement('option')
    optionOne.setAttribute('value', values)
    const valuesOne = document.createTextNode(values)
    optionOne.appendChild(valuesOne)
    currencySelectOne.appendChild(optionOne)

    const optionTwo = document.createElement('option')
    optionTwo.setAttribute('value', values)
    const valuesTwo = document.createTextNode(values)
    optionTwo.appendChild(valuesTwo)
    currencySelectTwo.appendChild(optionTwo)
    })
})
}



function convert(){
const currencyCodeOne = currencySelectOne.value;
const currencyCodeTwo = currencySelectTwo.value;

fetch(`https://v6.exchangerate-api.com/v6/294882bb423607f50daa7bfb/latest/${currencyCodeOne}`)
.then((res) => res.json())
.then((data) => {

console.log(data)
const rate = data.conversion_rates[currencyCodeTwo]

exchangeRate.innerText = `1 ${currencyCodeOne} = ${rate} ${currencyCodeTwo}`

currencyTwo.value = (currencyOne.value * rate).toFixed(2)

})

//events
    currencySelectOne.addEventListener('change', convert);
    currencySelectTwo.addEventListener('change', convert);
    currencyOne.addEventListener('input', convert);
    currencyTwo.addEventListener('input', convert);


    //swap 
    swap.addEventListener('click', () => {
        const temp = currencySelectOne.value
        currencySelectOne.value = currencySelectTwo.value 
        currencySelectTwo.value = temp
        convert()
    })
    
}

currencyCode()
convert()
