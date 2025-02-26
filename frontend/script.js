import { initCarRegister, initHome, initLogin, initParkingSpaceEdit, initRegister } from "./scripts/initsScripts.js";

switch (document.title) {
    case "Carros Tunados":
        initHome();
        break;
    case "Login - Carros Tunados":
        initLogin();
        break;
    case "Cadastro - Carros Tunados":
        initRegister();
        break;
    case "Cadastro de Carros - Carros Tunados":
        initCarRegister();
        break;
    case "Editar Vaga - Carros Tunados":
        initParkingSpaceEdit();
        break;
}
