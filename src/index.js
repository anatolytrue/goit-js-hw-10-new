import { Notify } from "notiflix";
import { fetchBreeds , fetchCatByBreed } from "./cat-api";
import axios from "axios";
// import SlimSelect from "slim-select";
// import 'slim-select/dist/slimselect.css'
axios.defaults.headers.common["x-api-key"] = "live_gKiwJxpEjJ6OHtG2vUYRJK3SZWJdPvZYBj249moXarE2OegWiTWExWMzXEKkLV8P";

const selector = document.querySelector('.breed-select')
const loader = document.querySelector(".loader")
const error = document.querySelector(".error")
const catInfo = document.querySelector(".cat-info")

selector.addEventListener('change', selectCat)

function createList() {
    loader.classList.remove('is-hidden')
    selector.classList.add('is-hidden')
    error.classList.add("is-hidden")

    fetchBreeds().
    then(data => {
        const markupOption = data.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('')
        selector.innerHTML = markupOption

        // new SlimSelect({
        //     select: selector
        // })

        loader.classList.add("is-hidden")
        selector.classList.remove("is-hidden")
    console.log(data)
    })
    .catch(error => {Notify.failure('Oops! Something went wrong! Try reloading the page!')})
}

createList()

function selectCat(e) {
    loader.classList.remove('is-hidden')
    catInfo.classList.add('is-hidden')

    const selectedId = e.currentTarget.value

    fetchCatByBreed(selectedId)
        .then(data => {
            renderInfo(data)
            loader.classList.add('is-hidden')
            catInfo.classList.remove('is-hidden')
        })
        .catch(error => { Notify.failure('Oops! Something went wrong! Try reloading the page!') })
}

function renderInfo(data) {
    console.log(data)
    const { breeds, url } = data[0]
    const {name, temperament, description} = breeds[0]
    const infoCard = `
    <img class="cat-img" width="300px" src="${url}" alt="${name}">
    <div class="text-block">
        <h2 class="cat-name">${name}</h2>
        <p class="cat-description">${description}</p>
        <p class="cat-temperament">${temperament}</p>
    </div>
    `
    catInfo.innerHTML = infoCard
}