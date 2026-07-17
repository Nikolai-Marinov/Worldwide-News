$(document).ready(function() {

var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);



    map.on('click', async function(e) {

    let lat = e.latlng.lat;
    let lng = e.latlng.lng;

    let locationResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );

    let locationData = await locationResponse.json();


    let city =
        locationData.address?.city ||
        locationData.address?.town ||
        locationData.address?.village ||
        locationData.address?.municipality;


    if (!city) {
        alert("No city found here.");
        return;
    }


    console.log(city);

    showNews(city);

});



async function showNews(city) {

    const modalTitle = document.getElementById("modalTitle");
    const newsContent = document.getElementById("newsContent");


    modalTitle.innerHTML = `News from ${city}`;
    newsContent.innerHTML = "Loading news...";


    let modal = new bootstrap.Modal(
        document.getElementById('newsModal')
    );

    modal.show();



    


  const response = await fetch(
    `http://localhost:3000/news?city=${city}`
);


    let data = await response.json();


    newsContent.innerHTML = "";


    if(!data.articles || data.articles.length === 0) {
        newsContent.innerHTML = "No news found.";
        return;
    }


    data.articles.slice(0,5).forEach(article => {

        newsContent.innerHTML += `
            <div class="mb-3">
                <h5>${article.title}</h5>
                <p>${article.description || ""}</p>
                <a href="${article.url}" target="_blank">
                    Read more
                </a>
            </div>
        `;

    });

}

});