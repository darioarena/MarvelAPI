// VALIDACIONES NECESARIAS PARA UTILIZAR LA API
let ts = Date.now();
const privateKey = "2f301a3c04ad49ad37f407b76eb8881be8b35980";
const publicKey = "32e06f4ee3000e7af101745207c00e3e";
let hash = md5(ts + privateKey + publicKey);

// ARRAY PARA FAVS
let favoritos = [];

window.onload = favScreen;
// CREACION DE LA PANTALLA DE FAVORITOS
function favScreen() {
  cargaLs();
  for (i = 0; i < favoritos.length; i++) {
    const urlFav = `https://gateway.marvel.com:443/v1/public/characters/${favoritos[i]}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    apiMarvel(urlFav);
  }
}

function cargaLs() {
  if (localStorage.getItem("favLs") != null) {
    favoritos = JSON.parse(localStorage.getItem("favLs"));
  }
}


// API MARVEL
function apiMarvel(urlFav) {
  console.log(urlFav);
  fetch(urlFav)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      for (i = 0; i < favoritos.length; i++) {
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
    })
    .catch((err) => console.log(err));
}
