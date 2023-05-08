import Notiflix from 'notiflix';
const list = document.querySelector(".country-list");
const container = document.querySelector(".country-info");
const BASE_URL = "https://restcountries.com/v3.1/";
const END_POINT = "name/";

function fetchCountries(state) {
    const URL = `${BASE_URL}${END_POINT}${state}?fields=name,capital,population,flags,languages`;
    return fetch(URL).then(resp => {
        if (!resp.ok) {
            list.innerHTML = "";
            container.innerHTML = "";
            throw new Error(Notiflix.Notify.failure("Oops, there is no country with that name"));
        }
    
        return resp.json();
    });
};

export { fetchCountries };