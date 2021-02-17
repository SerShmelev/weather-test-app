export default function () {
  return {
    weatherObject: {
      currentCity: '',
      temperature_c: 0,
      temperature_f: 0,
      wind_dir: '',
      wind_mps: 0,
      condition: '',
      pressure_mm: 0,
      humidity: 0
    },
    cities: [{
      label: 'Москва',
      value: 'Moscow'
    },
    {
      label: 'Омск',
      value: 'Omsk'
    }, {
      label: 'Екатеринбург',
      value: 'Ekaterinburg'
    }, {
      label: 'Сочи',
      value: 'Sochi'
    }, {
      label: 'Новгород',
      value: 'Novgorod'
    }],
    wind_dirs: [
      {
        resp_value: 'N',
        rus_value: 'северный'
      }, {
        resp_value: 'E',
        rus_value: 'восточный'
      }, {
        resp_value: 'S',
        rus_value: 'южный'
      }, {
        resp_value: 'W',
        rus_value: 'западный'
      }, {
        resp_value: 'NE',
        rus_value: 'северо-восточный'
      }, {
        resp_value: 'SE',
        rus_value: 'юго-востоный'
      }, {
        resp_value: 'NW',
        rus_value: 'севро-западный'
      }, {
        resp_value: 'SW',
        rus_value: 'юго-западный'
      }, {
        resp_value: 'NNE',
        rus_value: 'северо-северо-восточный'
      }, {
        resp_value: 'ENE',
        rus_value: 'восточно-северо-восточный'
      }, {
        resp_value: 'ESE',
        rus_value: 'восточно-юго-восточный'
      }, {
        resp_value: 'SSE',
        rus_value: 'юго-юго-восточный'
      }, {
        resp_value: 'SSW',
        rus_value: 'юго-юго-западный'
      }, {
        resp_value: 'WSW',
        rus_value: 'западно-юго-западный'
      }, {
        resp_value: 'WNW',
        rus_value: 'западо-северо-западный'
      }, {
        resp_value: 'NNW',
        rus_value: 'северо-северо-западный'
      }
    ]
  }
}
