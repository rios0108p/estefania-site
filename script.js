document.addEventListener('DOMContentLoaded', function() {
  // Inicializar animaciones
  initHearts();
  initFloatingFlowers();
  initFloatingHearts();
  initTravelCarousels();
  initConfetti();
  initCarousel();
  initQuotes();
  initMusicPlayer();
  
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
      <p>Cada momento a tu lado es un regalo que atesoro en mi corazón. Tu sonrisa ilumina mis días y tu amor llena mi vida de alegría.</p>
      <p>Eres mi inspiración, mi paz y mi mayor felicidad. Gracias por ser quien eres y por permitirme compartir esta vida contigo.</p>
      <p>Te amo más de lo que las palabras pueden expresar.</p>
    `;
    triggerConfetti();
    
    // Animación especial para el mensaje
    mensaje.style.animation = 'pulse 2s ease';
    setTimeout(() => {
      mensaje.style.animation = '';
    }, 2000);
  };
  
  // Control de música
  const musicControl = document.querySelector('.music-control');
  const audio = document.getElementById('background-music');
  
  musicControl.addEventListener('click', function() {
    if (audio.paused) {
      audio.play();
      musicControl.innerHTML = '<i class="fas fa-music"></i> <span>Música ON</span>';
    } else {
      audio.pause();
      musicControl.innerHTML = '<i class="fas fa-music"></i> <span>Música OFF</span>';
    }
  });
});

// Corazones flotantes
function initHearts() {
  setInterval(() => {
    const container = document.querySelector('.hearts-container');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = ['❤', '💖', '💗', '💓', '💘', '💝', '💞'][Math.floor(Math.random() * 7)];
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
  const flowers = ['🌸', '🌺', '🌼', '🌷', '💐', '🌹', '🌻'];
  const container = document.querySelector('.floating-flowers');
  
  for (let i = 0; i < 10; i++) {
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

// Corazones flotantes adicionales
function initFloatingHearts() {
  const hearts = ['❤', '💖', '💗', '💓', '💘'];
  const container = document.querySelector('.floating-hearts');
  
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
    heart.style.opacity = Math.random() * 0.4 + 0.3;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    heart.style.animation = `float ${Math.random() * 8 + 8}s infinite ease-in-out ${Math.random() * 3}s`;
    heart.style.zIndex = '-1';
    container.appendChild(heart);
  }
}

// Carruseles automáticos de viajes
function initTravelCarousels() {
  const travelCarousels = {
    cozumel: { index: 0, interval: null },
    cdmx: { index: 0, interval: null },
    futuro: { index: 0, interval: null }
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

// Carrusel de imágenes
function initCarousel() {
  let currentIndex = 0;
  const items = document.querySelectorAll('.carousel-item');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  // Crear puntos indicadores
  items.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.carousel-dot');
  
  window.moveSlide = function(direction) {
    currentIndex += direction;
    
    if (currentIndex >= items.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = items.length - 1;
    
    goToSlide(currentIndex);
  };
  
  function goToSlide(index) {
    const inner = document.querySelector('.carousel-inner');
    inner.style.transform = `translateX(-${index * 100}%)`;
    
    items.forEach(item => item.classList.remove('active'));
    items[index].classList.add('active');
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    currentIndex = index;
  }
  
  // Carrusel automático
  setInterval(() => {
    moveSlide(1);
  }, 6000);
}

// Ciclo de citas de amor
function initQuotes() {
  const quotes = document.querySelectorAll('.quote');
  let currentQuote = 0;
  
  setInterval(() => {
    quotes[currentQuote].classList.remove('active');
    currentQuote = (currentQuote + 1) % quotes.length;
    quotes[currentQuote].classList.add('active');
  }, 5000);
}

// Reproductor de música
function initMusicPlayer() {
  const audio = document.getElementById('background-music');
  const progressBar = document.querySelector('.progress-bar');
  const player = document.querySelector('.music-player');
  const playBtn = document.querySelector('.play-btn');
  
  window.playSong = function(songName) {
    player.classList.remove('hidden');
    audio.src = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${Math.floor(Math.random() * 3) + 1}.mp3`;
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  };
  
  window.togglePlay = function() {
    if (audio.paused) {
      audio.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      audio.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  };
  
  window.skipForward = function() {
    audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
  };
  
  window.skipBackward = function() {
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };
  
  audio.addEventListener('timeupdate', function() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
  });
  
  document.querySelector('.progress-container').addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * audio.duration;
  });
}

// Confeti
function initConfetti() {
  window.triggerConfetti = function() {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#ff00aa', '#ff5500', '#ffaa00', '#ffff00', '#ff69b4', '#ff1493'],
      shapes: ['circle', 'heart'],
      scalar: 1.2
    });
    
    // Segundo efecto de confeti
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: ['#ff0000', '#ff00aa', '#ff5500']
      });
      
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: ['#ffaa00', '#ffff00', '#ff69b4']
      });
    }, 300);
  };
}