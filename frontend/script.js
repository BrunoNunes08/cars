const init = async () => {
    const res = await fetch("http://localhost:3333/car/list");
    const results = await res.json();

    if (!results.success) {
        alert("Erro ao listar carros");
        return;
    }

    const carSection = document.querySelector(".car-section");
    for (let car of results.data) {
        carSection.innerHTML += `
        <div class="car-info">
                <div>
                    <img src="assets/car.png" alt="">
                </div>
                <div>
                    <span>Placa:</span>
                    <span>${car.licensePlate}</span>
                </div>
                <div>
                    <span>Dono:</span>
                    <span>${car.driver}</span>
                </div>
                <div>
                    <span>Vaga:</span>
                    <span>${car.parkingSpace}</span>
                </div>
        </div>
        `;
    }
};

init();