const btnSubmit = document.querySelector('#btnSubmit');
const textInput = document.querySelector('#textInput');

const getWeatherInfo = async (city) =>{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=0bf0593897df7259794fa8cd2be77e22`);
    const data = await response.json();
    return data;
}

const createCurrentWeatherHTML = (city) => {
    const currentWeatherInfo = document.createElement('div');
    currentWeatherInfo.setAttribute('id', 'currentWeatherInfo');

    const leftSide = document.createElement('div');
    leftSide.setAttribute('id', 'leftSideDaily');

    const cityName = document.createElement('h3');
    cityName.setAttribute('id', 'cityName');
    leftSide.appendChild(cityName);
    
    const temperature = document.createElement('p');
    temperature.setAttribute('id', 'temperature');
    leftSide.appendChild(temperature);

    const wind = document.createElement('p');
    wind.setAttribute('id', 'wind');
    leftSide.appendChild(wind);

    const rightSide = document.createElement('div');
    rightSide.setAttribute('id', 'rightSideDaily');

    const iconWeather = document.createElement('img');
    iconWeather.setAttribute('src', '');
    iconWeather.setAttribute('id', 'iconWeather');

    const weather = document.createElement('p');
    weather.setAttribute('id', 'weather');

    rightSide.appendChild(iconWeather);
    rightSide.appendChild(weather);

    currentWeatherInfo.appendChild(leftSide);
    currentWeatherInfo.appendChild(rightSide);

    document.querySelector('body').appendChild(currentWeatherInfo);

    getWeatherInfo(city)
    .then((data) => {
        console.log(data);
        cityName.innerText = data.city.name;
        temperature.innerText = `${data.list[0].main.temp}° C`;
        wind.innerText = `Wind: ${data.list[0].wind.speed} m/s`;
        iconWeather.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
        weather.innerText = data.list[0].weather[0].main;
    })
}

btnSubmit.addEventListener('click', () => {
    if (document.querySelector('#currentWeatherInfo') !== null) {
        document.querySelector('#currentWeatherInfo').remove();
    }
    createCurrentWeatherHTML(textInput.value);
})


const weekArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dateTest= new Date("2021-07-25 09:00:00");
console.log(weekArr[dateTest.getDay()])