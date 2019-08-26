const marvel = 
{
  render: () => {
    // P E R S O N A J E S: Lista de personajes filtrado por nombre de personaje o id de personaje

    //request URL (todos):      https://gateway.marvel.com:443/v1/public/characters?apikey=f664d445c92baa167412678422dd5def
          //uso:                https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=a90d074cc0483b65fe3c15a6c9970912&hash=792414c616577193fbe3817ba81822a8

    //request URL (IRONMAN):    https://gateway.marvel.com:443/v1/public/characters?name=Iron%20Man&apikey=f664d445c92baa167412678422dd5def
          //uso:                https://gateway.marvel.com:443/v1/public/characters?name=Iron%20Man&ts=1&apikey=a90d074cc0483b65fe3c15a6c9970912&hash=792414c616577193fbe3817ba81822a8

    //request URL (CAPAMERICA): https://gateway.marvel.com:443/v1/public/characters/1009220?apikey=f664d445c92baa167412678422dd5def
          //uso:                https://gateway.marvel.com:443/v1/public/characters/1009220?ts=1&apikey=a90d074cc0483b65fe3c15a6c9970912&hash=792414c616577193fbe3817ba81822a8
    //  
    const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters/1009220?ts=1&apikey=a90d074cc0483b65fe3c15a6c9970912&hash=792414c616577193fbe3817ba81822a8';
    const container = document.querySelector('#marvel-characters');
    let contentHTML = '';
    fetch(urlAPI)
      .then(res => res.json())
      .then((json) =>
      {
        for (const hero of json.data.results)
        {
          let urlCharacter = hero.urls[0].url;
          contentHTML += `
            <div class="col-md-4">
                <a href="${urlCharacter}" target="_blank">
                  <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                </a>
                <h3 class="title">${hero.name}</h3>
                <h4 class="title">Descripción:</h4>
                <p>${hero.description}</p>
            </div>`;
        }
        container.innerHTML = contentHTML;
      })
  }
};
marvel.render();