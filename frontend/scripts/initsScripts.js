import { getUserLoggedIn, postUserLoggedIn } from "./userLogged.js";

export const initHome = async () => {
    const user = getUserLoggedIn();
    if (!user) {
        location.pathname = "frontend/pages/login.html";
    }

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
                    <span>${car.parkingSpace ?? "Nenhuma"}</span>
                    ${car.driverId === user.id && `<a href='/frontend/pages/edit-parking-space.html?licensePlate=${car.licensePlate}'>Editar vaga</a>`}
                </div>
        </div>
        `;
    }
};

export const initLogin = async () => {
    const user = getUserLoggedIn();
    if (user) {
        location.pathname = "frontend/";
    }

    const form = document.querySelector(".form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const email = formData.get("email");
        const password = formData.get("password");

        const data = { email, password };

        const res = await fetch("http://localhost:3333/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();

        if (res.status === 400) {
            alert("Email ou senha inválidos");
            return;
        }

        if (!res.ok || !result.success) {
            alert("Algum erro ocorreu. Tente novamente!");
            return;
        }

        postUserLoggedIn(result.data);
        location.pathname = "frontend/";
    });
};

export const initRegister = async () => {
    const user = getUserLoggedIn();
    if (user) {
        location.pathname = "frontend/";
    }

    const form = document.querySelector(".form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const cpf = formData.get("cpf");

        const data = { name, email, password, cpf };

        const res = await fetch("http://localhost:3333/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();

        if (res.status === 400) {
            alert(result.message);
            return;
        }

        if (!res.ok || !result.success) {
            alert("Algum erro ocorreu. Tente novamente!");
            return;
        }

        postUserLoggedIn(result.data);
        location.pathname = "frontend/";
    });
};

export const initCarRegister = async () => {
    const user = getUserLoggedIn();
    if (!user) {
        location.pathname = "frontend/pages/login.html";
    }

    const form = document.querySelector(".form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const brand = formData.get("brand");
        const licensePlate = formData.get("licensePlate");
        const { id: driver } = getUserLoggedIn();

        const data = { brand, licensePlate, driver };

        const res = await fetch("http://localhost:3333/car/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();

        if (res.status === 400) {
            alert(result.message);
            return;
        }

        if (!res.ok || !result.success) {
            console.error(result);
            alert("Algum erro ocorreu. Tente novamente!");
            return;
        }

        location.pathname = "frontend/";
    });
};

export const initParkingSpaceEdit = async () => {
    const user = getUserLoggedIn();
    if (!user) {
        location.pathname = "frontend/pages/login.html";
    }

    const carElement = document.querySelector(".car");
    const licensePlate = new URLSearchParams(location.search).get("licensePlate");
    carElement.textContent = "Carro: " + licensePlate;

    const res = await fetch("http://localhost:3333/parking/list");
    const results = await res.json();
    if (!results.success || !res.ok) {
        alert("Erro");
    }

    const select = document.querySelector("#parkingSpace");
    for (let {id: parkingSpace} of results.data) {
        const option = document.createElement("option");
        option.value = parkingSpace;
        option.textContent = parkingSpace;
        select.append(option);
    }

    const form = document.querySelector(".form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const parkingSpace = formData.get("parkingSpace") || null;

        const data = { parkingSpace };

        const res = await fetch("http://localhost:3333/car/parking/update/" + licensePlate, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();

        if (res.status === 400) {
            alert(result.message);
            return;
        }

        if (!res.ok || !result.success) {
            console.error(result);
            alert("Algum erro ocorreu. Tente novamente!");
            return;
        }

        location.pathname = "frontend/";
    });
};
