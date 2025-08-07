document.addEventListener('DOMContentLoaded', function() {
  // Inicializar animaciones
  initHearts();
  initFloatingFlowers();
  initTravelCarousels();
  initConfetti();
  
  // Efecto al hacer clic en la polaroid
  window.shakePolaroid = function() {
    const polaroid = document.querySelector('.polaroid');
    polaroid.classList.add('shake');
    setTimeout(() => polaroid.classList.remove('shake'), 500);
    triggerConfetti();
  };
  
  // Mostrar mensaje especial con confeti
  window.mostrarMensaje = function() {
    const mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = `
      <h3>Querida Estefanía</h3>
      <p>Cada momento a tu lado es un regalo que atesoro...</p>
      <p>Gracias por llenar mi vida de alegría y amor.</p>
    `;
    triggerConfetti();
  };
});

// Corazones flotantes
function initHearts() {
  setInterval(() => {
    const container = document.querySelector('.hearts-container');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = ['❤', '💖', '💗', '💓'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 5000);
  }, 300);
}

// Flores flotantes adicionales
function initFloatingFlowers() {
  const flowers = ['🌸', '🌺', '🌼', '🌷', '💐'];
  const container = document.querySelector('.floating-flowers');
  
  for (let i = 0; i < 5; i++) {
    const flower = document.createElement('div');
    flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.position = 'fixed';
    flower.style.fontSize = (Math.random() * 20 + 15) + 'px';
    flower.style.opacity = Math.random() * 0.6 + 0.2;
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.top = Math.random() * 100 + 'vh';
    flower.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out ${Math.random() * 5}s`;
    flower.style.zIndex = '-1';
    container.appendChild(flower);
  }
}

// Carruseles automáticos de viajes
function initTravelCarousels() {
  const travelCarousels = {
    cozumel: { index: 0, interval: null },
    cdmx: { index: 0, interval: null }
  };
  
  // Iniciar carruseles
  function startCarousel(city) {
    travelCarousels[city].interval = setInterval(() => {
      moveTravelMedia(1, city);
    }, 5000);
  }
  
  // Mostrar viaje seleccionado
  window.showTravel = function(city) {
    // Detener todos los carruseles
    Object.keys(travelCarousels).forEach(c => {
      clearInterval(travelCarousels[c].interval);
      document.getElementById(`${c}-travel`).classList.remove('active');
      document.querySelector(`button[onclick="showTravel('${c}')"]`).classList.remove('active');
    });
    
    // Activar el seleccionado
    document.getElementById(`${city}-travel`).classList.add('active');
    document.querySelector(`button[onclick="showTravel('${city}')"]`).classList.add('active');
    
    // Reiniciar índice y puntos
    travelCarousels[city].index = 0;
    updateDots(city);
    
    // Iniciar carrusel automático
    startCarousel(city);
  };
  
  // Mover medios en el carrusel
  window.moveTravelMedia = function(direction, city) {
    const wrapper = document.querySelector(`#${city}-travel .travel-media-wrapper`);
    const items = wrapper.querySelectorAll('.travel-media-item');
    const totalItems = items.length;
    
    travelCarousels[city].index += direction;
    
    if (travelCarousels[city].index >= totalItems) travelCarousels[city].index = 0;
    if (travelCarousels[city].index < 0) travelCarousels[city].index = totalItems - 1;
    
    wrapper.style.transform = `translateX(-${travelCarousels[city].index * 100}%)`;
    
    // Actualizar items activos
    items.forEach(item => item.classList.remove('active'));
    items[travelCarousels[city].index].classList.add('active');
    
    // Actualizar puntos
    updateDots(city);
    
    // Reiniciar intervalo
    clearInterval(travelCarousels[city].interval);
    startCarousel(city);
  };
  
  // Actualizar puntos indicadores
  function updateDots(city) {
    const dotsContainer = document.querySelector(`#${city}-travel .travel-dots`);
    const items = document.querySelectorAll(`#${city}-travel .travel-media-item`);
    
    // Crear puntos si no existen
    if (!dotsContainer.hasChildNodes()) {
      dotsContainer.innerHTML = '';
      items.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('travel-dot');
        if (i === travelCarousels[city].index) dot.classList.add('active');
        dot.addEventListener('click', () => {
          const direction = i > travelCarousels[city].index ? 1 : -1;
          moveTravelMedia(direction, city);
        });
        dotsContainer.appendChild(dot);
      });
    } else {
      // Actualizar puntos existentes
      const dots = dotsContainer.querySelectorAll('.travel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === travelCarousels[city].index);
      });
    }
  }
  
  // Iniciar el primer carrusel
  showTravel('cozumel');
}

// Confeti
function initConfetti() {
  window.triggerConfetti = function() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff00aa', '#ff5500', '#ffaa00', '#ffff00']
    });
  };
}