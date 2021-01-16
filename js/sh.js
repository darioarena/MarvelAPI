// VALIDACIONES NECESARIAS PARA UTILIZAR LA API
let ts = Date.now();
const privateKey = "2f301a3c04ad49ad37f407b76eb8881be8b35980";
const publicKey = "32e06f4ee3000e7af101745207c00e3e";
let hash = md5(ts + privateKey + publicKey);

// TRAER ID PARA BUSQUEDA DE DETALLES
let paramstr = window.location.search.substr(1);
let paramarr = paramstr.split("&");
let params = {};
for (let i = 0; i < paramarr.length; i++) {
  let tmparr = paramarr[i].split("=");
  params[tmparr[0]] = tmparr[1];
}
const idSh = params.num;

// CARGA DE DATOS AL INICIAR LA CARGA
window.onload = inicio;
function inicio() {
  const urlDet = `https://gateway.marvel.com:443/v1/public/characters/${idSh}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  apiDetalle(urlDet);
}

// PETICION A LA API DE MARVEL
function apiDetalle(urlDet) {
  fetch(urlDet)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      let imgSh = json.data.results[0].thumbnail.path + "." + json.data.results[0].thumbnail.extension;
      let imgDet = document.createElement("img");
      document.getElementById("imgdet").appendChild(imgDet);
      imgDet.setAttribute("src", imgSh);
      imgDet.setAttribute("class", "imagendetalle");

      let nameDet = document.createElement("h2");
      document.getElementById("namedet").appendChild(nameDet);
      nameDet.innerHTML = json.data.results[0].name;
      nameDet.setAttribute("class", "nombredetalle");

      let det = document.createElement("h3");
      document.getElementById("detalle").appendChild(det);
      if ((json.data.results[0].description.length == 0)) {
        det.innerHTML = "Descripcion no disponible";
      } else {
        det.innerHTML = json.data.results[0].description;
      }

      det.setAttribute("class", "detalle");
    })
    .catch((err) => console.log(err));
}
