fetch('data/hoenn.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('city-list');

    data.cities.forEach(city => {
      const div = document.createElement('div');
      div.className = 'city-card';
      div.innerHTML = `<h2>${city.name}</h2>`;
      div.onclick = () => {
        window.location.href = `city.html?id=${city.id}`;
      };
      container.appendChild(div);
    });
  });
