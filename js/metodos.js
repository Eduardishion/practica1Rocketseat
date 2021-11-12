

//definicion de objeto modal
const Modal = {
	open(){
		//abrir modal
		//lo usamos para agregar la clase active
		//alert("se dio clic");
		//con el uso del objeto DOM podemos manipular cualquier elemento html

		//seleccionamos el contendedor 
		const contendedor = document.querySelector("div.model-overlay");
		//y le agregamos la clase active
		contendedor.classList.add("active");
	},
	close(){
		//cerrar modal
		//lo usamos para quitar la clase 

		//seleccionamos el contendedor 
		const contendedor = document.querySelector("div.model-overlay");
		//y le removeos  la clase active
		contendedor.classList.remove("active");

		
	},
	
}

//arreglo de transacciones y donde guardaremos las transacciones
const Transanctions = [
	{
		id: 1,
		description: "lus",
		amount: 50000, //el precio de momento colocamos dos ceros mas para despues formatear la salida en valor monetario,
		date: '23/01/21'
	
	},
	{
		id: 2,
		description: "webside",
		amount: -50001, //el precio de momento colocamos dos ceros mas para despues formatear la salida en valor monetario,
		date: '23/04/21'
	},
	{
		id: 3,
		description: "internet",
		amount: -20012, //el precio de momento colocamos dos ceros mas para despues formatear la salida en valor monetario,
		date: '23/02/21'
	},
	{
		id: 4,
		description: "internet",
		amount: 200000, //el precio de momento colocamos dos ceros mas para despues formatear la salida en valor monetario,
		date: '23/02/21'
	}
	
	
];

//este objeto permite hacer las opeaciones basicas 
const Transaction = {
	all : Transanctions,
	add(newTransaction){
		console.log(Transaction.all.length);
		Transaction.all.push(newTransaction);
		console.log(Transaction.all);
	},
	incomes(){

		let income = 0;

		Transaction.all.forEach((transaccion) => {

			if(transaccion.amount > 0){

				income = income + transaccion.amount;
			}
		});

		return income;
	},
	expenses(){
		//sumar las salidas
		let expense = 0;

		Transaction.all.forEach((transaccion) => {

			if(transaccion.amount < 0){

				expense = expense + transaccion.amount;
			}
		});

		return expense;

	},
	total(){
		//total de entradas menos salidas 

		return Transaction.incomes() + Transaction.expenses();
	}


}


//ahora se van a sustituir los datos del arreglo en JS en el HTML


const DOM = {

	//objeto para capturar el eleemnto tbody de html
	transactionsContainer: document.querySelector('table#data-table tbody'),
	
	addTransaction(transaction, index){
		
		//console.log(transaction);
		const tr = document.createElement('tr')
		tr.innerHTML = DOM.innerHTMLTransaction(transaction);
		//console.log(tr.innerHTML);

		DOM.transactionsContainer.appendChild(tr);

	},

	innerHTMLTransaction(transaction){
		const CSSclass = transaction.amount > 0 ? "income" : "expence";
		
		//aqui recibe el valor ya formateado para poder ser incrustado en el html
		const amount = Utils.formatCurrency(transaction.amount);
		//templete para hacer el html dinamico 
		const html = ` 
				<td class="description">${transaction.description}</td>
				<td class="${CSSclass}">${amount}</td>
				<td class="date">${transaction.date}</td>
				<td> <img src="./assets/minus.svg" alt="Remove"></td>
		`
		return html;
	},

	updateBalance(){
		document.getElementById("imcomeDisplay")
				.innerHTML = Utils.formatCurrency(Transaction.incomes());

		document.getElementById("expenceDisplay")
				.innerHTML = Utils.formatCurrency(Transaction.expenses());
		
		document.getElementById("totalDisplay")
				.innerHTML = Utils.formatCurrency(Transaction.total());
	}
}

const Utils = {
	formatCurrency(value){
		//console.log(value);
		//para formato de moneda
		//https://www.tutofox.com/javascript/como-convertir-valor-a-formato-moneda-en-javascript/
		//https://www.w3schools.com/jsref/jsref_tolocalestring_number.asp
		//valor positivo o negativo  dependiente el valor numerico
		//https://www.w3schools.com/jsref/jsref_tolocalestring_number.asp
		const signal = Number(value) < 0 ? "-" : "";
		//console.log(signal);
		value = String(value).replace(/\D/g,"");

		value = Number(value)/ 100;
		
		//para dar formato de moneda a numeros 
		//en este caso en pesos mexicamos 
		//pt-BR , BRL
		//es-MX , MXN
		value = value.toLocaleString('es-MX',{
			style:"currency",
			currency: 'MXN',
			//minimumFractionDigits: 00
		})
		//impresion del valor final
		//console.log(value);
		return signal+value;
	}
}



Transanctions.forEach(transaction => {
	DOM.addTransaction(transaction);
	
});

DOM.updateBalance();

Transaction.add({
	id: 4,
	description: "new webside",
	amount: 2000, //el precio de momento colocamos dos ceros mas para despues formatear la salida en valor monetario,
	date: '23/04/21'
});