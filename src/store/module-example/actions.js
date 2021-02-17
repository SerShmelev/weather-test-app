import axios from 'axios'

export const getCurrentWeather = ({ dispatch }, payload) => {
  const api = axios.create({
    baseURL: '/'
  })
  api.get(`current.json?key=4b0b50da88304b75a1d64125211002&lang=ru&q=${payload}`)
    .then(({ data }) => {
      dispatch('weatherParsing', data)
    })
}

export function weatherParsing ({ state, commit }, payload) {
  const weater = {
    currentCity: payload.location.name,
    temperature_c: payload.current.temp_c,
    temperature_f: payload.current.temp_f,
    wind_dir: state.wind_dirs.find(dir => dir.resp_value === payload.current.wind_dir).rus_value,
    wind_mps: payload.current.wind_kph * 0.277778.toFixed(2),
    condition: payload.current.condition.text,
    pressure_mm: payload.current.pressure_mb * 0.7500637554192,
    humidity: payload.current.humidity
  }
  commit('SET_WEATHER_OBJ', weater)
}
