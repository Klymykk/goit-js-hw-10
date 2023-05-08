import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from "./fetchCountries";

const input = document.querySelector("#search-box");
const list = document.querySelector(".country-list");
const container = document.querySelector(".country-info")
const DEBOUNCE_DELAY = 300;

input.addEventListener( "input", debounce(getState, DEBOUNCE_DELAY));

function getState(event) {
    const name = event.target.value.trim();
    if(!name){
        list.innerHTML = "";
        container.innerHTML = "";
        return;
    }

    fetchCountries(name)
    .then(data => createMarkup(data))
    .catch(err => console.log(err))
}

function createMarkup(arr) {
    if(arr.length > 10){
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        list.innerHTML = "";
        container.innerHTML = "";

        return;
    } else if(arr.length === 1){
        list.innerHTML = "";
        return createMarkupContainer(arr);
    } else if(arr.length > 1){
        container.innerHTML = "";
        return createMarkupList(arr);
    } 
}

function createMarkupContainer(array) {
    const markupContainer = array.map(({flags:{svg}, name:{official}, capital, languages, population}) =>{
        return `<li>
            <div class="container">
                <img src="${svg}" alt="Flag of ${official}" width="60">
                <h2>${official}</h2>
            </div>
            <p>Capital: ${capital}</p>
            <p>Population: ${population}</p>
            <p>Languages: ${Object.values(languages).join(", ")}</p>
        </li>`
    }).join('');
    container.innerHTML = markupContainer;
}

function createMarkupList(array) {
    const markupList = array.map(({flags:{svg}, name:{official}}) =>{
        return `<li>
            <div class="container">
            <img src="${svg}" alt="Flag of ${official}" width="60" >
            <h2>${official}</h2>
            </div>
        </li>`
    }).join('');
    list.innerHTML = markupList;
}