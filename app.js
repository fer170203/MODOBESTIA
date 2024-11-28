const contenido = document.getElementById("rutinas-contenido");

/*/BOTÓN ACCEDER-OCULTAR/*/

document.getElementById("app").addEventListener("hide.bs.collapse", function() {
      document.getElementById("acceder").textContent= "Acceder";
});

document.getElementById("app").addEventListener("show.bs.collapse", function(){
      document.getElementById("acceder").textContent= "Ocultar";
});


/*/ FILTRO VERSIÓN PROPIA /*/
filtro.addEventListener("change", function () {
      const musculoElegido = filtro.value; 
      const cards = document.querySelectorAll("#rutinas-contenido .card"); 
    
      
      cards.forEach((card) => {
        card.classList.add("oculto");
      });
    
      // Si "todos" está seleccionado, muestra todas las tarjetas
      if (musculoElegido === "todos") {
        cards.forEach((card) => {
          card.classList.remove("oculto");
        });
        return; // Termina la ejecución
      }
    
      
      document.querySelectorAll(`#rutinas-contenido .${musculoElegido}`).forEach((card) => {
          card.classList.remove("oculto");
        });
    });
    

/*/AÑADIR NUEVA CARD VERSIÓN PROPIA/*/

const Ejercicios = document.querySelector("#Ejercicios"); 
const SeriesXrepeticiones = document.querySelector("#SeriesXrepeticiones"); 
const filtro_form = document.querySelector("#filtro-form"); 

form_ingresar.addEventListener("submit", function (e) {
  e.preventDefault(); 
  const texto_musculo = document.querySelector("#filtro-form option:checked").textContent;
  const Ejercicios_ingresados = Ejercicios.value;
  const SeriesXrepeticiones_ingresados = SeriesXrepeticiones.value;
  const musculo_ingresado = filtro_form.value;

  const div = document.createElement("div");
  div.classList.add("card", musculo_ingresado); 

  div.innerHTML = `
    <div class="card-header d-flex">
      <h3 class="mb-0 text-light flex-grow-1">${texto_musculo}</h3>
      <img src="imagenes/pencil-square.svg" alt="editar" class="me-3 flex-grow-0" data-action="editar" data-bs-toggle="modal" data-bs-target="#editar">
      <img src="imagenes/trash.svg" alt="eliminar" class="flex-grow-0" data-action="eliminar">
    </div>
    <div class="card-body">
      <p class="card-text"><strong>Ejercicios:</strong> <span>${Ejercicios_ingresados}</span></p>
      <p class="card-text"><strong>Series (respectivamente):</strong> <span>${SeriesXrepeticiones_ingresados}</span></p>
    </div>
  `;

  contenido.prepend(div);
  form_ingresar.reset();

  let card_actuales= contenido.innerHTML;
  localStorage.setItem("rutinas", card_actuales);
});

/* Botón eliminar todo /*/
document.getElementById("eliminar-todo").addEventListener("click", function() {
let respuesta = confirm("¿Está seguro de que desea eliminar todas las rutinas?");
if(respuesta){
  contenido.innerHTML="";
  localStorage.clear();
}
});

/* Eliminar card específico /*/
contenido.addEventListener("click", function(e){
  if(e.target.dataset.action =="eliminar"){
    let respuesta = confirm("¿Está seguro de que desea eliminar esta rutina?");

    if(respuesta){
     e.target.parentElement.parentElement.remove();
     let card_actuales= contenido.innerHTML;
  localStorage.setItem("rutinas", card_actuales);
    }
  }
});

/* BOTON MODIFICAR (NO FUNCIONA MOMENTÁNEAMENTE)/*

contenido.addEventListener("click", function (e) {

  if (e.target.dataset.accion == "modificar") {

    let card = e.target.parentElement.parentElement;
    
    let color_actual;

    
    if (card.classList.contains("azules")) {
      color_actual = "azules"
    } else if (card.classList.contains("rojas")) {
      color_actual = "rojas"
    } else if (card.classList.contains("violetas")) {
      color_actual = "violetas"
    } else if (card.classList.contains("violetas")) {
      color_actual = "violetas"
    } else if (card.classList.contains("naranjas")) {
      color_actual = "naranjas"
    }
    
    card.dataset.modificando = color_actual;

   
    let ejercicio_actual = document.querySelector("[data-modificando] h3").textContent;
    let usuario_actual = document.querySelector("[data-modificando] p:first-of-type span").textContent;
    let series_actual = document.querySelector("[data-modificando] p:last-of-type span").textContent;
    
    filtro_edit.value = filtro_actual;
    Ejercicios_edit.value = ejercicio_actual;
    SeriesXrepeticiones_edit.value = series_actual;

    
    document.querySelectorAll("#colores_mod option").forEach(option => {
     
      option.removeAttribute("selected");
    });

    
    document.querySelector(`#colores_mod option[value="${color_actual}"]`).setAttribute("selected",
      "selected");

  }
});
 
/* Evento de carga local storage HTML /*/
document.addEventListener("DOMContentLoaded", function(){
  let card_guardados = localStorage.getItem("rutinas");
  if(card_guardados !== null){
    contenido.innerHTML = card_guardados;
  }
});
