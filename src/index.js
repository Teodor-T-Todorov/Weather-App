import {createDailyWeatherHTML, createWeeklyWeatherHTML, renderData} from './DOM'

const btnSubmit = document.querySelector('#btnSubmit');
const textInput = document.querySelector('#textInput');

btnSubmit.addEventListener('click', () => {
    if (document.querySelector('#dailyContainer') !== null || document.querySelector('#weeklyContainer') !== null) {
        document.querySelector('#dailyContainer').remove();
        document.querySelector('#weeklyContainer').remove();
    }

    const city = textInput.value;
    createDailyWeatherHTML(city);
    createWeeklyWeatherHTML(city);
    renderData(city);
})