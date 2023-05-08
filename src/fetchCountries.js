const BASE_URL = "https://restcountries.com/v3.1/";
const END_POINT = "name/";

function fetchCountries(state) {
    const URL = `${BASE_URL}${END_POINT}${state}?fields=name,capital,population,flags,languages`;
    return fetch(URL).then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }

        return resp.json();
    });
};

export { fetchCountries };