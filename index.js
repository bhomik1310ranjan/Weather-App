'use strict';

const userTab = document.querySelector('[userTab]');
const searchTab = document.querySelector('[searchTab]');
const search = document.querySelector('[search]');
const grantAccess = document.querySelector('[grant-access]');
const weatherData = document.querySelector('[weather-data]');
const grantAccessButton = document.querySelector('[grant-access-button]');
const loader = document.querySelector('[loader]');
const cityNotFound = document.querySelector('[city-not-found]')
const unableToAccessLocation = document.querySelector('[unable-to-access-location]');
let currentTab = userTab;
const API_KEY = '5b7b62554459f67a4db71c966351e50c';

currentTab.classList.add('bg-shadowBlue');

function gotLocation(position){
    const coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
    sessionStorage.setItem('user-coordinates', JSON.stringify(coordinates));
    getDataUsingCoordinates(coordinates);
}

function failedToGetLocation(){
    grantAccess.classList.remove('flex');
    grantAccess.classList.add('hidden');
    unableToAccessLocation.classList.remove('hidden');
}

grantAccessButton.addEventListener('click', async () => {
        await navigator.geolocation.getCurrentPosition(gotLocation, failedToGetLocation);
});

function getDataFromSessionStorage(){
    const localCoordinates = sessionStorage.getItem('user-coordinates');
    if(!localCoordinates){
        grantAccess.classList.remove('hidden');
        grantAccess.classList.add('flex');
    }else{
        const coordinates = JSON.parse(localCoordinates);
        getDataUsingCoordinates(coordinates);
    }
}

getDataFromSessionStorage();

function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove('bg-shadowBlue');
        currentTab = clickedTab;
        currentTab.classList.add('bg-shadowBlue');
        if(search.classList.contains('hidden')){
            grantAccess.classList.remove('flex');
            grantAccess.classList.add('hidden');
            weatherData.classList.remove('flex');
            weatherData.classList.add('hidden');
            search.classList.remove('hidden');
            search.classList.add('flex');
            cityNotFound.classList.remove('flex');
            cityNotFound.classList.add('hidden');
            unableToAccessLocation.classList.add('hidden');
        }else{
            search.classList.remove('flex');
            search.classList.add('hidden');
            weatherData.classList.remove('flex');
            weatherData.classList.add('hidden');
            cityNotFound.classList.remove('flex');
            cityNotFound.classList.add('hidden');
            getDataFromSessionStorage();
        }
    }
}

userTab.addEventListener('click', () => {
    switchTab(userTab);
});

searchTab.addEventListener('click', () => {
    switchTab(searchTab);
});

async function getDataUsingCoordinates(coordinates){
    grantAccess.classList.remove('flex');
    grantAccess.classList.add('hidden');
    loader.classList.remove('hidden');
    loader.classList.add('flex');
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${API_KEY}&units=metric`);
        if(!response.ok){
            throw new Error("City Not Found");
        }
        const data = await response.json();
        loader.classList.remove('flex');
        loader.classList.add('hidden');
        weatherData.classList.remove('hidden');
        weatherData.classList.add('flex');
        renderTheData(data);
    }catch(error){
        loader.classList.remove('flex');
        loader.classList.add('hidden');
        cityNotFound.classList.remove('hidden');
        cityNotFound.classList.add('flex');
    }
}

const city = document.querySelector('[city]');
const flag = document.querySelector('[flag]');
const weather = document.querySelector('[weather]');
const weatherImage = document.querySelector('[weather-image]');
const temperature = document.querySelector('[temperature]');
const windspeed = document.querySelector('[windspeed]');
const humidity = document.querySelector('[humidity]');
const clouds = document.querySelector('[clouds]');

function renderTheData(data){
    city.innerText = data?.name;
    flag.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    weather.innerText = data?.weather?.[0]?.description;
    weatherImage.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`
    temperature.innerText = data?.main?.temp;
    windspeed.innerText = `${data?.wind?.speed} m/s`;
    humidity.innerText = `${data?.main?.humidity}%`;
    clouds.innerText = `${data?.clouds?.all}%`;
}

const searchInput = document.querySelector('[search-input]');

search.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityName = searchInput.value;
    if(cityName === ''){
        return;
    }else{
        getDataUsingCityName(cityName);
    }
    searchInput.value = '';
});

async function getDataUsingCityName(cityName){
    cityNotFound.classList.remove('flex');
    cityNotFound.classList.add('hidden');
    loader.classList.remove('hidden');
    loader.classList.add('flex');
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
        if(!response.ok){
            throw new Error("City Not Found");
        }
        const data = await response.json();
        loader.classList.remove('flex');
        loader.classList.add('hidden');
        weatherData.classList.remove('hidden');
        weatherData.classList.add('flex');
        renderTheData(data);
    }catch(error){
        loader.classList.remove('flex');
        loader.classList.add('hidden');
        weatherData.classList.remove('flex');
        weatherData.classList.add('hidden');
        cityNotFound.classList.remove('hidden');
        cityNotFound.classList.add('flex');
    }
} 