import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from "./fetchCountries";

const input = document.querySelector("#search-box")
const DEBOUNCE_DELAY = 300;

input.addEventListener( "input", (event) =>{
    console.log(event.target.value);
    fetchCountries(event.target.value).then(data => console.log(data)).catch(err => console.log(err))
});

// function getState(event) {
//     console.log(event);
//     fetchCountries(event.value).then(data => console.log(data)).catch(err => console.log(err))
// }

