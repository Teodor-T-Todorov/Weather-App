const btnSubmit = document.querySelector('#btnSubmit');
const textInput = document.querySelector('#textInput');
const container = document.querySelector('#container');



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

    getWeatherInfo(city)
    .then((data) => {
        console.log(data);
        cityName.innerText = data.city.name;
        tempDaily.innerText = `${data.list[0].main.temp}° C`;
        wind.innerText = `Wind: ${data.list[0].wind.speed} m/s`;
        iconWeather.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
        weather.innerText = data.list[0].weather[0].main;
    })
}

const weekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const birthday = new Date("2021-07-25 18:00:00");
console.log(birthday.getHours())

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

        leftSideWeekly.append(dayOfTheWeek);

        const rightSideWeekly = document.createElement('div');
        rightSideWeekly.setAttribute('class', 'rightSideWeekly');
        const tempWeekly = document.createElement('p');
        tempWeekly.setAttribute('class', 'tempWeekly');
        const iconWeather = document.createElement('img');
        iconWeather.setAttribute('src', '');
        iconWeather.setAttribute('class', 'iconWeatherWeekly');
        rightSideWeekly.append(tempWeekly, iconWeather);

        day.append(leftSideWeekly, rightSideWeekly);
        weeklyWeatherInfo.append(day);

        getWeatherInfo(city)
            .then(data => {
                const dateToday = new Date(data.list[0].dt_txt);
                dayOfTheWeek.innerText = weekArray[dateToday.getDay() + i];
                const index12hours = ((24 - dateToday.getHours()) / 3) + (4 + (i-1)*8);
                tempWeekly.innerText = `${data.list[index12hours].main.temp}° C`;
                iconWeather.src = `http://openweathermap.org/img/wn/${data.list[index12hours].weather[0].icon}@2x.png`;

            })
    }

    container.append(weeklyWeatherInfo);
}

btnSubmit.addEventListener('click', () => {
    if (document.querySelector('#currentWeatherInfo') !== null && document.querySelector('#weeklyWeatherInfo') !== null) {
        document.querySelector('#currentWeatherInfo').remove();
        document.querySelector('#weeklyWeatherInfo').remove();
    }
    createCurrentWeatherHTML(textInput.value);
    createWeeklyWeatherHTML(textInput.value);
})

