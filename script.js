let songs = [
    // {
    //     title: 'Rodorodo',
    //     artist: 'Jhonito',
    //     style: 'watsa',
    //     length: 3,
    //     picture: 'https://picsum.photos/100',
    //     id: 1598162641766,
    //     score: 4
    // },
    // {
    //     title: 'Gogon',
    //     artist: 'Boessa',
    //     style: 'watsa',
    //     length: 4,
    //     picture: 'https://picsum.photos/100',
    //     id: 1598162641767,
    //     score: 23,
    // }
]

const tableList = document.querySelector('tbody');
const inputForm = document.querySelector('.input');
const filterForm = document.querySelector('.filter');
const titleFilter = document.querySelector('#search-song');
const styleFilter = document.querySelector('#search-style');
const resetFilterBtn = document.querySelector('.reset-filter');

//display the songs in the list
const displaySongs = () => {
    const html = songs
        .map(song => {
        return `
        <tr>
            <td><img src=${song.picture} alt="${song.artist}"></td>
            <td><h4>${song.title}</h4><br>${song.style}</td>
            <td><h4>${song.artist}</h4><br>${song.length}mn</td>
            <td>SCORE:${song.score}</td>   
            <td>
                <button class="increment" value="${song.id}" area-label="add score">+1</button>
            </td>
            <td>
                <button class="delete" value="${song.id}" area-label="delete the song from the list">
                <img src="./assets/trash.svg" alt="Delete ${song.title} from the list">
                </button>
            </td>
            </tr>
        `
}).join('');

tableList.innerHTML = html;
}


// Add a new song to the list
const addSong = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newSong = {
        title: form.title.value,
        artist: form.artist.value,
        style: form.style.value,
        length: form.length.value,
        picture: form.picture.value,
        id: Date.now(),
        score: 0,
    };
    songs.push(newSong);
    form.reset();
    songs = songs.sort((song1, song2) => song2.score - song1.score);//sort the list by score
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
}

//filter with title
const filterTitleSearch = (e) => {
   let textToFilter = titleFilter.value;
    let songWithThisTitle = songs.filter(song => song.title.toLowerCase().includes(textToFilter.toLowerCase()));

    const html = songWithThisTitle
        .map(song => {
        return `
        <tr>
            <td><img src=${song.picture} alt="${song.artist}"></td>
            <td><h4>${song.title}</h4><br>${song.style}</td>
            <td><h4>${song.artist}</h4><br>${song.length}mn</td>
            <td>${song.score}</td>   
            <td>
                <button class="increment" value="${song.id}" area-label="add score">+1</button>
            </td>
            <td>
                <button class="delete" value="${song.id}" area-label="delete the song from the list">
                <img src="./assets/trash.svg" alt="Delete ${song.title} from the list">
                </button>
            </td>
            </tr>
        `
    }).join('');
    songWithThisTitle = songWithThisTitle.sort((song1, song2) => song2.score - song1.score);//sort the list by score
    tableList.innerHTML = html;
    
}

//filter with style
const filterStyleSearch = (e) => {
    let styleToFilter = styleFilter.value;
    let songWithThisStyle = songs.filter(song => song.style.toLowerCase() === styleToFilter.toLowerCase());
    const html = songWithThisStyle
        .map(song => {
        return `
        <tr>
            <td><img src=${song.picture} alt="${song.artist}"></td>
            <td><h4>${song.title}</h4><br>${song.style}</td>
            <td><h4>${song.artist}</h4><br>${song.length}mn</td>
            <td>${song.score}</td>   
            <td>
                <button class="increment" value="${song.id}" area-label="add score">+1</button>
            </td>
            <td>
                <button class="delete" value="${song.id}" area-label="delete the song from the list">
                <img src="./assets/trash.svg" alt="Delete ${song.title} from the list">
                </button>
            </td>
            </tr>
        `
    }).join('');
    songWithThisStyle = songWithThisStyle.sort((song1, song2) => song2.score - song1.score);//sort the list by score
    tableList.innerHTML = html;
    
}

//reset the filter
const resetFilter = (e) => {
    console.log(e);
    songs = songs;
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
}

const handleClick = (e) => {
     console.log(e.target);
     const increamentBtn = e.target.closest('button.increment');
    if(increamentBtn) {
        const id = Number(increamentBtn.value);
        incrementScore(id);
    }

    const deleteBtn = e.target.closest('button.delete');
    if(deleteBtn) {
        const id = Number(deleteBtn.value);
        deleteSong(id);
    }
}

// delete a song from the list
const deleteSong = (id) => {
    songs = songs.filter(song => song.id !== id);
    songs = songs.sort((song1, song2) => song2.score - song1.score);//sort the list by score
    //displaySongs();
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
}

// increament the score
const incrementScore = (id) => {
    const songToIncrement = songs.find(song => song.id === id);
    console.log(songToIncrement)
    songToIncrement.score++;
    songs = songs.sort((song1, song2) => song2.score - song1.score);//sort the list by score
    //displaySongs()
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
}

//When we reload the app we want to look inside the local storage 
const initLocalStorage = () => {
    const songsLs = JSON.parse(localStorage.getItem('songs'));
    if(!songsLs) {
        songs = [];
    } else {
        songs = songsLs;
    }
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
};

const updateLocalStorage = () => {
    localStorage.setItem('songs', JSON.stringify(songs));
};

//Event listeners
inputForm.addEventListener('submit', addSong);
window.addEventListener('DOMContentLoaded', displaySongs); 
tableList.addEventListener('listUpdated', displaySongs);
tableList.addEventListener('click', handleClick);
titleFilter.addEventListener("keyup", filterTitleSearch);
styleFilter.addEventListener("change", filterStyleSearch);
resetFilterBtn.addEventListener('click', resetFilter);
tableList.addEventListener('listUpdated', updateLocalStorage);
initLocalStorage();