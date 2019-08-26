/*-------------------------------------------------------------------------------------------------------------------------------------------------------
C O M I C S: Lista de comics filtrados por personajes (Iron Man: 1009368; Captain America: 1009220)
requestURL: st1 + idLista + st3 (donde idLista es el idLista de la entidListaad: Personaje, Comic o Creador)
Para:
    id = 1009368  ->  Iron Man
    id = 1009220  ->  Captain America

    entidad = "character"
    entidad = "comic"
    entidad = "creator"

    role  = "editor"
    role  = "colorist"
    role  = "writer"

request URL (IRONMAN):    https://gateway.marvel.com:443/v1/public/characters/1009368/comics?ts=1&apikey=a90d074cc0483b65fe3c15a6c9970912&hash=792414c616577193fbe3817ba81822a8
request URL (CAPAMERICA): https://gateway.marvel.com:443/v1/public/characters/1009220/comics?ts=1&apikey=a90d074cc0483b65fe3c15a6c9970912&hash=792414c616577193fbe3817ba81822a8

request URL (IRONMAN):    https://gateway.marvel.com:443/v1/public/characters/1009368?ts=1&apikey=a90d074cc0483b65fe3c15a6c9970912&hash=792414c616577193fbe3817ba81822a8
request URL (CAPAMERICA): https://gateway.marvel.com:443/v1/public/characters/1009220?ts=1&apikey=a90d074cc0483b65fe3c15a6c9970912&hash=792414c616577193fbe3817ba81822a8

--------------------------------------------------------------------------------------------------------------------------------------------------------*/

console.log(obtenerLista(1009220, "comic")); // para obtener vector de IDs de los comics donde aparece el personaje especificado
function obtenerLista(id, filtro)
{
  const marvel =
  {
    render: () =>
    {
      let cadena = "";
      switch (filtro)
      {
        case "character":
          cadena = 'https://gateway.marvel.com:443/v1/public/characters/' + id + '?ts=1&apikey=a90d074cc0483b65fe3c15a6c9970912&hash=792414c616577193fbe3817ba81822a8';
          break;
        case "comic":
          cadena = 'https://gateway.marvel.com:443/v1/public/characters/' + id + '/comics?ts=1&apikey=a90d074cc0483b65fe3c15a6c9970912&hash=792414c616577193fbe3817ba81822a8';
          break;
        case "creator":
          cadena = 'https://gateway.marvel.com:443/v1/public/characters/' + id + '/comics?ts=1&apikey=a90d074cc0483b65fe3c15a6c9970912&hash=792414c616577193fbe3817ba81822a8';
          break;
      }
      const url = cadena;
      const container = document.querySelector('#marvel-comics');
      let contentHTML = '';
      let i = 0;
      let idLista = [];
      const arrayDatos = fetch(url).then(res => res.json())
      arrayDatos.then((json) =>
      {
        switch (filtro)
        {
          case "character":
            for (const comic of json.data.results)
            {
              let res = comic.urls[0].url;
              idLista [i]= comic.id;
              contentHTML += `
                <div class="col-md-4">
                    <a href="${res}" target="_blank">
                      <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.name}" class="img-thumbnail">
                    </a>
                    <h3 class="title">${comic.name}</h3>
                    <p>${comic.description}</p>
                </div>`;
                i = i + 1;
            }
            break;
          case "comic":
            for (const comic of json.data.results)
            {
              let res = comic.urls[0].url;
              idLista [i]= comic.id;
              contentHTML += `
                <div class="col-md-4">
                    <a href="${res}" target="_blank">
                      <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}" class="img-thumbnail">
                    </a>
                    <h3 class="title">${comic.title}</h3>
                    <h4 class="title">Rol del creador:</h4>
                    <p>${comic.creators.items[0].role}</p>
                    <p>${comic.id}</p>
                </div>`;
                i = i + 1;
            }
            alert("https://gateway.marvel.com:443/v1/public/characters/"+idLista[1]+"/comics?ts=1&apikey=a90d074cc0483b65fe3c15a6c9970912&hash=792414c616577193fbe3817ba81822a8");
            break;
          case "creator":
            break;
        }
        
        container.innerHTML = contentHTML;
      })
    }
  };
  marvel.render();  
}
