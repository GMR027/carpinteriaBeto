console.log('Soluciones en acero');
document.addEventListener('DOMContentLoaded', function() {
  navegacionFija()
  resaltarSeccion()
  scrollNav()
})

function navegacionFija(){
  const header = document.querySelector('.header')  //apuntando a header
  const nosotros = document.querySelector('.nosotros') //apuntando a seccion nosotros

  //detectar cuando se da scroll sobre la pagina
  document.addEventListener('scroll', function() {
    //console.log('escroll sobre pagina web');
    //console.log(nosotros.getBoundingClientRect().bottom); //Permite medir la separacion que hay de la parte inferior de la secion nosotros con respecto a la parte superior de la pagina mediente coordenadas
    
    //Probando la informacion con funcion if para revisar cuando ya se haya pasado la seccion a una parte no visible de la pagina
    if(nosotros.getBoundingClientRect().bottom <1) {
      //console.log('Ya se paso la seccion');
      header.classList.add('navFija');
    } else {
      //console.log('Seccion aun no pasada');
      header.classList.remove('navFija');
    }
  })
} 

function resaltarSeccion() {
  document.addEventListener('scroll', ()=> {
    const secciones = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navegacion-principal a');

    let seccionActual = '';
    secciones.forEach(section => { //forEach para iterar sobre todas las secciones disponibles
      const sectionTop = section.offsetTop //Tomar la parte superior de cada seccion con respecto al Body del cuerpo de la pagina o su padre para saber con respecto su distancia
      const sectionHeight = section.clientHeight //Mide los pixeles que tiene cada seccion para saber su altura de cada apartado
      //console.log(sectionHeight);

      //Comprobando la informacion para poder resaltar la informacion
      if(window.scrollY >= (sectionTop - sectionHeight / 2)) { //Funcion para detectar que seccion esta mas visible en la ventana de la pagina
        console.log(section.id)
        seccionActual = section.id
      }
    })

    navLinks.forEach(link => {  //Poniendo funcion paa agregar la clase sobre la seccion que corresponde visible sobre la base la linea de codigo 38
      if(link.getAttribute('href') === '#' + seccionActual) {
        link.classList.add('linkActivado');
      } else {
        link.classList.remove('linkActivado')
      }
    })
  })
}

function scrollNav() {
  const linksNavegacion = document.querySelectorAll('.navegacion-principal a')
  linksNavegacion.forEach(link => {
    link.addEventListener('click', event => {
      //event.preventDefault() //Detener el comportamiento que se vaya directo a la seccion
      console.log(event.target) //Revisar a que seccion se esta dirigiendo cada link
      console.log(event.target.getAttribute('href')) //Revisar la ruta de destino de cada link

      const seccionSeleccionada = event.target.getAttribute('href') //obtener el atributo de href del link seleccionado
      const seccionApuntada = document.querySelector(seccionSeleccionada) //apuntar al destino del link seleecionado
      console.log(seccionApuntada); //Corroborar a que link esta apuntado

      seccionApuntada.scrollIntoView({behavior: 'smooth'}) //Aplicar el efecto de suavizado sobre la navegacion
      
    })
  })
}

//Funcion para mostrar la informacion adicional
function mostrarInformacion(idInfo) {
  const informacion = document.querySelector(`#${idInfo}`);
  if (informacion) {
    informacion.style.display = 'block'; //mostrar informacion oculta
  }
}

//Funcion para cerrar la informacion adicional
function cerrarInformacion(idInfo) {
  const informacion = document.querySelector(`#${idInfo}`);
  if (informacion) {
    informacion.style.display = 'none'; //Ocultar la informacion
  }
}


//Asignar evento al boton de + información
document.querySelectorAll('.info-btn').forEach(function (boton) {
  boton.addEventListener('click', function() {
    const masInformacion = boton.getAttribute('data-target'); //Obtener el ide de la informacion
    mostrarInformacion(masInformacion); //Mostramos la informacion correspondiente
  })
})

//Asignar evento al boton de cerrar informacion
document.querySelectorAll('.cerrar-info').forEach(function (boton) {
  boton.addEventListener('click', function() {
    const masInformacion = boton.closest('.masInformacion');
    if(masInformacion) {
      cerrarInformacion(masInformacion.id);
    }
  })
})