

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

		
	}
}

