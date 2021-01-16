// VALIDACIONES NECESARIAS PARA UTILIZAR LA API
let ts = Date.now();
const privateKey = "2f301a3c04ad49ad37f407b76eb8881be8b35980";
const publicKey = "32e06f4ee3000e7af101745207c00e3e";
let hash = md5(ts + privateKey + publicKey);

// CARGA DE DATOS AL INICIAR LA CARGA
window.onload = inicio;
function inicio() {
  home();
}

// LIMITE DE ELEMENTOS TRAIDOS POR CONSULTA Y OFFSET
const qLimit = 12;
let offset = 0;

// RECARGA PAGINA LOGO
document.getElementById("logo").addEventListener("click", recargar);
function recargar() {
  location.reload();
  document.getElementById("busqueda").value = "";
}

// CREACION DE LA PANTALLA DE HOME
function home() {
  document.getElementById("vermas").style.display = "none";
  let loadingHome = document.createElement("h2");
  document.getElementById("main").appendChild(loadingHome);
  loadingHome.setAttribute("id", "cargando");
  loadingHome.innerHTML = "AGUARDA STAN LEE ESTA OCUPADO...";

  const urlApi = `https://gateway.marvel.com:443/v1/public/characters?&limit=${qLimit}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  apiMarvel(urlApi);
}

// API MARVEL
function apiMarvel(urlApi) {
  console.log(urlApi);
  fetch(urlApi)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      for (i = 0; i < qLimit; i++) {
        let contenedor = document.createElement("a");
        document.getElementById("imghome").appendChild(contenedor);
        contenedor.setAttribute("id", json.data.results[i].id);
        contenedor.setAttribute("class", "shcontenedor");
        contenedor.setAttribute("href","sh.html?num="+json.data.results[i].id)

        let pathImg = json.data.results[i].thumbnail.path + "." + json.data.results[i].thumbnail.extension;
        let homeImg = document.createElement("img");
        document.getElementById(json.data.results[i].id).appendChild(homeImg);
        homeImg.setAttribute("src", pathImg);

        let pathName = json.data.results[i].name;
        let homeName = document.createElement("h3");
        document.getElementById(json.data.results[i].id).appendChild(homeName);
        homeName.setAttribute("class", "homeName");
        homeName.innerHTML = pathName;
      }
      document.getElementById("cargando").remove();
      document.getElementById("vermas").style.display = "block";
    })
    .catch((err) => console.log(err));
}

// VERMAS
document.getElementById("vermas").addEventListener("click", verMas);
function verMas() {
  offset = offset + 12;
  home();
}

// BUSQUEDA
function search(textoIntoducido) {
  document.getElementById("vermas").style.display = "none";
  let loadingSearch = document.createElement("h2");
  document.getElementById("main").appendChild(loadingSearch);
  loadingSearch.setAttribute("id", "cargando");
  loadingSearch.innerHTML = "AGUARDA STAN LEE ESTA OCUPADO...";

  const urlApi = `https://gateway.marvel.com:443/v1/public/characters?name=${textoIntoducido}&limit=${qLimit}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  apiMarvel(urlApi);
  document.getElementById("cargando").remove();
}
document.getElementById("busqueda").addEventListener("keydown", resultadoBusqueda);
function resultadoBusqueda() {
  let textoIntoducido = document.getElementById("busqueda").value;
  if ((event.key == "Enter" || enter == true)) {
    if (textoIntoducido.length != 0) {
      offset = 0;
      imgDelete();
      search(textoIntoducido);
      eliminarSugerencias();
      document.getElementById("busqueda").value = "";
    } else {
      document.getElementById("busqueda").setAttribute("placeholder", "Alguien olvido escribir aqui...");
    }
  }
}

// ELIMINAR ELEMENTOS CREADOS
function imgDelete() {
  let borraImg = document.getElementById("imghome");
  while (borraImg.firstChild) {
    borraImg.removeChild(borraImg.firstChild);
  }
}
function eliminarSugerencias() {
  let borraSug = document.getElementById("sugerir");
  while (borraSug.firstChild) {
    borraSug.removeChild(borraSug.firstChild);
  }
}

// SUGERENCIAS
let enter = false;
function suggestion() {
  let buscarSugerencia = document.getElementById("busqueda").value;
  const apiSuggestion = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${buscarSugerencia}&orderBy=name&limit=3&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  fetch(apiSuggestion)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      eliminarSugerencias();
      if (document.getElementById("busqueda").value.length != 0) {
        console.log(json);
        console.log(json.data.results.length);
        for (i = 0; i < json.data.results.length; i++) {
          let palabraSug = document.createElement("label");
          document.getElementById("sugerir").appendChild(palabraSug);
          palabraSug.setAttribute("class", "sugerencia");
          palabraSug.setAttribute("title", json.data.results[i].name);
          palabraSug.textContent = json.data.results[i].name;
          palabraSug.addEventListener("click", function () {
            document.getElementById("busqueda").value;
            document.getElementById("busqueda").value = event.target.title;
            enter = true;
            resultadoBusqueda();
            enter = false;
          });
        }
      } else {
        eliminarSugerencias();
      }
    })
    .catch((err) => console.log(err));
}

// BUSQUEDA INPUT
document.getElementById("busqueda").addEventListener("input", suggestion);
