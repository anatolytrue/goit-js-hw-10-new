import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_gKiwJxpEjJ6OHtG2vUYRJK3SZWJdPvZYBj249moXarE2OegWiTWExWMzXEKkLV8P";
const URL_BREEDS = "https://api.thecatapi.com/v1/breeds"
const URL_CATS = "https://api.thecatapi.com/v1/images/search?breed_ids="

function fetchBreeds() {
    return axios.get(URL_BREEDS)
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(error => {
        throw new Error(error.message)
    })
}
function fetchCatByBreed(breedId) {
    return axios.get(`${URL_CATS}${breedId}`)
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(error => {
        throw new Error(error.message)
    })
}

export {fetchBreeds, fetchCatByBreed}