window.onload = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('Service Worker registered successfully.'))
      .catch(err => console.error('Service Worker registration failed:', err));
  }
  // Obsługa dropdown menu
const citySelect = document.getElementById('citySelect');
if (citySelect) {
  citySelect.addEventListener('change', (e) => {
    const selectedCity = e.target.value;
    if (selectedCity) {
      window.location.href = selectedCity; // przeniesienie na podstronę
    }
  });
}

};

