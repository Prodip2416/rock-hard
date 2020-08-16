const searchValue = document.getElementById('searchValue');
const searchButton = document.getElementById('searchButton');
const apiLink = 'https://api.lyrics.ovh/suggest/';
const resultItem = document.getElementById('resultItem');
const lyric = 'https://api.lyrics.ovh/v1/';
const showLyricItem = document.getElementById('showLyric');

const getLyrics = () => {
    fetch(`${apiLink}${searchValue.value}`)
        .then(res => res.json())
        .then(data => {
            createEachDivBySearchResult(data.data);
        })
}

searchButton.addEventListener('click', () => {
    resultItem.innerHTML = '';
    showLyricItem.innerHTML = '';
    getLyrics();
});

const createEachDivBySearchResult = (totalResult) => {
    for (let i = 0; i < totalResult.length; i++) {
        if (i > 9) {
            break;
        } else {
            console.log(totalResult[i]);
            // const title = totalResult[i].title;
            // const album = totalResult[i].album.title;
            // const artist = totalResult[i].artist.name;

            createElements(totalResult[i].title, totalResult[i].album.title, totalResult[i].artist.name);
        }
    }
}

const createElements = (title, album, artist) => {
    resultItem.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                              <div class="col-md-9">
                              <h3 class="lyrics-name">${title}</h3>
                              <p class="author lead">Album by <span>${album}</span></p>
                              </div>
                              <div class="col-md-3 text-md-right text-center">
                              <button onclick="getLyric('${artist}', '${title}')" class="btn btn-success">Get Lyrics</button>
                              </div>                         
                              </div>`;
}

const getLyric = (artist, title) => {
    fetch(`${lyric}/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            showLyric(title, data.lyrics);
        })
}

const showLyric = (title, lyric='lyric not found! Please another one.')=>{
showLyricItem.innerHTML = ` <button class="btn go-back">&lsaquo;</button>
                            <h2 class="text-success mb-4">${title}</h2>
                            <pre class="lyric text-white">${lyric}</pre>
                          `
}
