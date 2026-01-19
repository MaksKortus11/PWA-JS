// Rejestracja Service Workera
window.onload = () => {
  'use strict';
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker registered successfully.'))
    .catch((error) => console.error('Service Worker registration failed:', error));
  }

  // Dropdown menu
  const citySelect = document.getElementById('citySelect');
  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      const selectedCity = e.target.value;
      if (selectedCity) {
        window.location.href = selectedCity;
      }
    });
  }
};
