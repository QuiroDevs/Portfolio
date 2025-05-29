document.addEventListener("DOMContentLoaded", () => {
  const juegosSection = document.querySelector("#juegos-section");
  const volverBtn = document.querySelector("#btn-volver");

  // Ocultamos todas las demás secciones excepto la de juegos
  const seccionesPrincipales = document.querySelectorAll("body > section:not(#juegos-section), .hero");

  const botonesActivadores = [
    "#btn-ver-mas",
    ".promo-btn",
    ".btn-border",
    ".game-card .btn",
    ".btn-card",
    ".footer-links a"
  ];

  const activadores = botonesActivadores.flatMap(selector =>
    Array.from(document.querySelectorAll(selector))
  );

  function ocultarSecciones() {
    seccionesPrincipales.forEach(sec => {
      sec.style.display = "none";
    });
  }

  function mostrarSecciones() {
    seccionesPrincipales.forEach(sec => {
      sec.style.display = "block";
    });
  }

  activadores.forEach(boton => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // 🔒 Previene que suba el evento al body
      if (boton.tagName === "A") {
        boton.blur(); // 🔧 Borra el foco que puede causar scroll
      }
      ocultarSecciones();
      juegosSection.classList.add("visible");

      // 👇 Evita scroll automático
      setTimeout(() => document.activeElement.blur(), 10);
    });
  });

  volverBtn.addEventListener("click", () => {
    juegosSection.classList.remove("visible");

    // Espera a que termine la animación para mostrar el resto
    setTimeout(() => {
      mostrarSecciones();
    }, 500); // mismo tiempo que el transition del CSS
  });
});

const gameOptions = document.querySelectorAll(".game-option");
const accionSelector = document.getElementById("accion-selector");
const juegoSeleccionadoTexto = document.getElementById("juego-seleccionado");
const tipoAccionTexto = document.getElementById("tipo-accion");
const formularioAccion = document.getElementById("formulario-accion");

let juegoActual = "";

gameOptions.forEach(option => {
  option.addEventListener("click", () => {
    juegoActual = option.dataset.juego;
    juegoSeleccionadoTexto.textContent = "Juego seleccionado: " + option.querySelector("h3").textContent;
    accionSelector.classList.remove("hidden");
    formularioAccion.classList.add("hidden");

    setTimeout(() => document.activeElement.blur(), 10); // 👈 prevenir scroll
  });
});

document.getElementById("btn-comprar").addEventListener("click", () => {
  tipoAccionTexto.textContent = "Comprar en " + juegoSeleccionadoTexto.textContent.replace("Juego seleccionado: ", "");
  formularioAccion.classList.remove("hidden");

  setTimeout(() => document.activeElement.blur(), 10); // 👈 prevenir scroll
});

document.getElementById("btn-vender").addEventListener("click", () => {
  tipoAccionTexto.textContent = "Vender en " + juegoSeleccionadoTexto.textContent.replace("Juego seleccionado: ", "");
  formularioAccion.classList.remove("hidden");

  setTimeout(() => document.activeElement.blur(), 10); // 👈 prevenir scroll
});

document.getElementById("btn-enviar").addEventListener("click", (e) => {
  e.preventDefault();
  const cantidad = document.getElementById("cantidad").value;
  const detalle = document.getElementById("detalle").value;
  alert(`Has enviado una solicitud para ${tipoAccionTexto.textContent.toLowerCase()}:\nJuego: ${juegoActual}\nCantidad: ${cantidad}\nTipo: ${detalle}`);
});

document.body.classList.add("no-scroll");
document.body.classList.remove("no-scroll");

let scrollY = window.scrollY;

document.getElementById("btn-comprar").addEventListener("click", () => {
  window.scrollTo(0, scrollY); // Fijar posición
  tipoAccionTexto.textContent = "Comprar en " + juegoSeleccionadoTexto.textContent.replace("Juego seleccionado: ", "");
  formularioAccion.classList.remove("hidden");
});

document.getElementById("btn-vender").addEventListener("click", () => {
  window.scrollTo(0, scrollY); // Fijar posición
  tipoAccionTexto.textContent = "Vender en " + juegoSeleccionadoTexto.textContent.replace("Juego seleccionado: ", "");
  formularioAccion.classList.remove("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  const observador = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".fade-on-scroll").forEach(el => {
    observador.observe(el);
  });
});

