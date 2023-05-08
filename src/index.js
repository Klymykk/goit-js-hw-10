import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from "./fetchCountries";

const input = document.querySelector("#search-box");
const list = document.querySelector(".country-list")
const DEBOUNCE_DELAY = 300;

input.addEventListener( "input", debounce(getState, DEBOUNCE_DELAY));

function getState(event) {
    console.log(event.target.value);
    fetchCountries(event.target.value.trim()).then(data => list.innerHTML = createMarkup(data)).catch(err => console.log(err))
}

function createMarkup(arr) {
    if(Number(arr.length) > 10){
       return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    } else if(arr.length <= 10 && arr.length > 1){
        return arr.map(({flags:{svg}, name:{official}}) =>{
            `<li>
                <img src="${svg}" alt="${official}">
                <h2>${official}</h2>
            </li>`
        }).join('');
    } else if(arr.length === 1){
        return arr.map(({flags:{svg}, name:{official}, capital, languages, population}) =>{
            `<li>
                <img src="${svg}" alt="${official}">
                <h2>${official}</h2>
                <p>Capital: ${capital}</p>
                <p>Population: ${population}</p>
                <p>Languages: ${languages.join('')}</p>
            </li>`
        }).join('');
    }
}
// {flags:{svg}, name:{official}, capital, languages, population}