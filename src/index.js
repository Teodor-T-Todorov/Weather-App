const btnSubmit = document.querySelector('#btnSubmit');
const textInput = document.querySelector('#textInput');
const container = document.querySelector('#container');
const weekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


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
    leftSide.append(cityName);
    
    const tempDaily = document.createElement('p');
    tempDaily.setAttribute('id', 'tempDaily');
    leftSide.append(tempDaily);

    const wind = document.createElement('p');
    wind.setAttribute('id', 'wind');
    leftSide.append(wind);

    const rightSide = document.createElement('div');
    rightSide.setAttribute('id', 'rightSideDaily');

    const iconWeather = document.createElement('img');
    iconWeather.setAttribute('src', '');
    iconWeather.setAttribute('id', 'iconWeatherDaily');

    const weather = document.createElement('p');
    weather.setAttribute('id', 'weather');

    rightSide.append(iconWeather);
    rightSide.append(weather);

    currentWeatherInfo.append(leftSide, rightSide);

    container.append(currentWeatherInfo);
}

const createWeeklyWeatherHTML = (city) => {
    const weeklyWeatherInfo = document.createElement('div');
    weeklyWeatherInfo.setAttribute('id', 'weeklyWeatherInfo');

    for(let i = 1; i <= 5; i++){
        const day = document.createElement('div');
        day.setAttribute('class', 'day');
        day.setAttribute('id', `day${i}`);

        const leftSideWeekly = document.createElement('div');
        leftSideWeekly.setAttribute('class', 'leftSideWeekly');

        const dayOfTheWeek = document.createElement('p');
        dayOfTheWeek.setAttribute('class', 'dayOfTheWeek');
        dayOfTheWeek.setAttribute('id', `dayOfTheWeek${i}`);

        leftSideWeekly.append(dayOfTheWeek);

        const rightSideWeekly = document.createElement('div');
        rightSideWeekly.setAttribute('class', 'rightSideWeekly');
        const tempWeekly = document.createElement('p');
        tempWeekly.setAttribute('class', 'tempWeekly');
        tempWeekly.setAttribute('id', `tempWeekly${i}`);
        const iconWeather = document.createElement('img');
        iconWeather.setAttribute('src', '');
        iconWeather.setAttribute('class', 'iconWeatherWeekly');
        iconWeather.setAttribute('id', `iconWeatherWeekly${i}`);
        rightSideWeekly.append(tempWeekly, iconWeather);

        day.append(leftSideWeekly, rightSideWeekly);
        weeklyWeatherInfo.append(day);
    }

    container.append(weeklyWeatherInfo);
}

const renderData = (city) => {

    getWeatherInfo(city)
    .then(data => {
        console.log(data);
        // Daily div
        document.querySelector('#cityName').innerText = data.city.name;
        document.querySelector('#tempDaily').innerText = `${data.list[0].main.temp}° C`;
        document.querySelector('#wind').innerText = `Wind: ${data.list[0].wind.speed} m/s`;
        document.querySelector('#iconWeatherDaily').src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
        document.querySelector('#weather').innerText = data.list[0].weather[0].main;

        // Weekly div
        for(let i = 1; i <= 5; i++){
            console.log(i);
            const dateToday = new Date(data.list[0].dt_txt);
            document.querySelector(`#dayOfTheWeek${i}`).innerText = weekArray[(dateToday.getDay() + i) % 7];
            const index12hours = ((24 - dateToday.getHours()) / 3) + (4 + (i-1)*8);
            document.querySelector(`#tempWeekly${i}`).innerText = `${data.list[index12hours].main.temp}° C`;
            document.querySelector(`#iconWeatherWeekly${i}`).src = `http://openweathermap.org/img/wn/${data.list[index12hours].weather[0].icon}@2x.png`;
        }
    })
    .catch(err => {
        console.log(`Error message:${err.message}`);
        document.querySelector('#currentWeatherInfo').remove();
        document.querySelector('#weeklytWeatherInfo').remove();

    });
}

btnSubmit.addEventListener('click', () => {
    if (document.querySelector('#currentWeatherInfo') !== null && document.querySelector('#weeklyWeatherInfo') !== null) {
        document.querySelector('#currentWeatherInfo').remove();
        document.querySelector('#weeklyWeatherInfo').remove();
    }

    const city = textInput.value;
    createCurrentWeatherHTML(city);
    createWeeklyWeatherHTML(city);
    renderData(city);
})

