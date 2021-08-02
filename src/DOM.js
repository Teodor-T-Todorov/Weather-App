const container = document.querySelector('#container');
const weekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getWeatherInfo = async (city) =>{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=0bf0593897df7259794fa8cd2be77e22`);
    const data = await response.json();
    return data;
}

const createDailyWeatherHTML = (city) => {
    const dailyContainer = document.createElement('div');
    dailyContainer.setAttribute('id', 'dailyContainer');

    const currentWeather = document.createElement('div')
    currentWeather.setAttribute('id', 'currentWeather')

    const lhsCurrent = document.createElement('div');
    lhsCurrent.setAttribute('id', 'lhsCurrent');

    const cityName = document.createElement('h3');
    cityName.setAttribute('id', 'cityName');
    lhsCurrent.append(cityName);
    
    const tempCurrent = document.createElement('p');
    tempCurrent.setAttribute('id', 'tempCurrent');
    lhsCurrent.append(tempCurrent);

    const wind = document.createElement('p');
    wind.setAttribute('id', 'wind');
    lhsCurrent.append(wind);

    const rhsCurrent = document.createElement('div');
    rhsCurrent.setAttribute('id', 'rhsCurrent');

    const iWeatherCurrent = document.createElement('img');
    iWeatherCurrent.setAttribute('src', '');
    iWeatherCurrent.setAttribute('id', 'iWeatherCurrent');

    const weather = document.createElement('p');
    weather.setAttribute('id', 'weather');

    rhsCurrent.append(iWeatherCurrent);
    rhsCurrent.append(weather);

    currentWeather.append(lhsCurrent, rhsCurrent);

    const dailyWeather = document.createElement('div');
    dailyWeather.setAttribute('id', 'dailyWeather')

    for(let i = 1; i <= 8; i++){
        const dailyWeatherInfo = document.createElement('div')
        dailyWeatherInfo.setAttribute('class', 'dailyWeatherInfo');
        dailyWeatherInfo.setAttribute('id', `dailyWeatherInfo${i}`);

        const time = document.createElement('p');
        time.setAttribute('class', 'time');
        time.setAttribute('id', `time${i}`);

        const iWeatherDaily = document.createElement('img');
        iWeatherDaily.setAttribute('src', '');
        iWeatherDaily.setAttribute('class', 'iWeatherDaily');
        iWeatherDaily.setAttribute('id', `iWeatherDaily${i}`)

        const tempDaily = document.createElement('p')
        tempDaily.setAttribute('class', 'tempDaily');
        tempDaily.setAttribute('id', `tempDaily${i}`)

        dailyWeatherInfo.append(time, iWeatherDaily, tempDaily);
        
        dailyWeather.append(dailyWeatherInfo);
    }

    dailyContainer.append(currentWeather, dailyWeather);
    container.append(dailyContainer);
}

const createWeeklyWeatherHTML = (city) => {
    const weeklyContainer = document.createElement('div');
    weeklyContainer.setAttribute('id', 'weeklyContainer');

    for(let i = 1; i <= 5; i++){
        const day = document.createElement('div');
        day.setAttribute('class', 'day');
        day.setAttribute('id', `day${i}`);

        const lhsWeekly = document.createElement('div');
        lhsWeekly.setAttribute('class', 'lhsWeekly');

        const dayOfTheWeek = document.createElement('p');
        dayOfTheWeek.setAttribute('class', 'dayOfTheWeek');
        dayOfTheWeek.setAttribute('id', `dayOfTheWeek${i}`);

        lhsWeekly.append(dayOfTheWeek);

        const rhsWeekly = document.createElement('div');
        rhsWeekly.setAttribute('class', 'rhsWeekly');
        const tempWeekly = document.createElement('p');
        tempWeekly.setAttribute('class', 'tempWeekly');
        tempWeekly.setAttribute('id', `tempWeekly${i}`);
        const iWeatherWeekly = document.createElement('img');
        iWeatherWeekly.setAttribute('src', '');
        iWeatherWeekly.setAttribute('class', 'iWeatherWeekly');
        iWeatherWeekly.setAttribute('id', `iWeatherWeekly${i}`);
        rhsWeekly.append(tempWeekly, iWeatherWeekly);

        day.append(lhsWeekly, rhsWeekly);
        weeklyContainer.append(day);
    }

    container.append(weeklyContainer);
}

const renderData = (city) => {

    getWeatherInfo(city)
    .then(data => {
        console.log(data);
        // Current div
        document.querySelector('#cityName').innerText = data.city.name;
        document.querySelector('#tempCurrent').innerText = `${data.list[0].main.temp}° C`;
        document.querySelector('#wind').innerText = `Wind: ${data.list[0].wind.speed} m/s`;
        document.querySelector('#iWeatherCurrent').src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
        document.querySelector('#weather').innerText = data.list[0].weather[0].main;

        // Daily and weekly div
        for(let i = 1; i <= 8; i++){
            const time = new Date(data.list[i].dt_txt);
            document.querySelector(`#time${i}`).innerText = `${time.getHours()}:00`;
            document.querySelector(`#iWeatherDaily${i}`).src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;         
            document.querySelector(`#tempDaily${i}`).innerText = `${data.list[i].main.temp}° C`;

            if(i <= 5){
                const dateToday = new Date(data.list[0].dt_txt);
                document.querySelector(`#dayOfTheWeek${i}`).innerText = weekArray[(dateToday.getDay() + i) % 7];
                let index12hours = ((24 - dateToday.getHours()) / 3) + (4 + (i-1)*8);
                while(index12hours > 39){
                    index12hours--;
                }
                document.querySelector(`#tempWeekly${i}`).innerText = `${data.list[index12hours].main.temp}° C`;
                document.querySelector(`#iWeatherWeekly${i}`).src = `http://openweathermap.org/img/wn/${data.list[index12hours].weather[0].icon}@2x.png`;
            }
        }
    })
    .catch(err => {
        console.log(`Error message:${err.message}`);
        if (document.querySelector('#dailyContainer') !== null || document.querySelector('#weeklyContainer') !== null) {
            document.querySelector('#dailyContainer').remove();
            document.querySelector('#weeklyContainer').remove();
        }
    });
}

export{createDailyWeatherHTML, createWeeklyWeatherHTML, renderData};