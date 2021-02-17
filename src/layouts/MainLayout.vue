<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MainLayout',
  computed: {
    ...mapGetters({
      currentWeather: 'example/getWeather',
      cities: 'example/getCities'
    }),
    getTemperature () {
      return this.tempDem === 'c' ? this.currentWeather.temperature_c : this.currentWeather.temperature_f
    },
    getWeatherType () {
      switch (this.currentWeather.condition) {
        case 'Солнечно':
        case 'Ясно':
          return 'sun'
        case 'Переменная облачность':
          return 'partly_cloudy'
        case 'Облачно':
        case 'Пасмурно':
        case 'Дымка':
        case 'Местами дождь':
        case 'Местами снег':
        case 'Местами дождь со снегом':
        case 'Местами замерзающая морось':
        case 'Поземок':
        case 'Метель':
        case 'Туман':
        case 'Переохлажденный туман':
        case 'Местами слабая морось':
        case 'Слабая морось':
        case 'Замерзающая морось':
        case 'Сильная замерзающая морось':
        case 'Местами небольшой дождь':
        case 'Небольшой дождь':
        case 'Временами умеренный дождь':
        case 'Умеренный дождь':
        case 'Временами сильный дождь':
        case 'Сильный дождь':
        case 'Слабый переохлажденный дождь':
        case 'Умеренный или сильный переохлажденный дождь':
        case 'Небольшой дождь со снегом':
        case 'Умеренный или сильный дождь со снегом':
        case 'Местами небольшой снег':
          return 'cloud'
        case 'Небольшой снег':
        case 'Местами умеренный снег':
        case 'Умеренный снег':
        case 'Местами сильный снег':
        case 'Сильный снег':
        case 'Ледяной дождь':
        case 'Небольшой ливневый дождь':
        case 'Умеренный или сильный ливневый дождь':
        case 'Сильные ливни':
        case 'Небольшой ливневый дождь со снегом':
        case 'Умеренные или сильные ливневые дожди со снегом':
        case 'Умеренный или сильный снег':
        case 'Небольшой ледяной дождь':
        case 'Умеренный или сильный ледяной дождь':
          return 'rain'
        case 'Местами грозы':
        case 'В отдельных районах местами небольшой дождь с грозой':
        case 'В отдельных районах умеренный или сильный дождь с грозой':
        case 'В отдельных районах местами небольшой снег с грозой':
        case 'В отдельных районах умеренный или сильный снег с грозой':
          return 'storm'
        default: return ''
      }
    }
  },
  data () {
    return {
      selectedCity: { value: 'Moscow', label: 'Москва' },
      tempDem: 'c',
      isSelectCity: false
    }
  },
  created () {
    this.$store.dispatch('example/getCurrentWeather', this.selectedCity.value)
  },
  methods: {
    selectCity () {
      this.isSelectCity = false
      this.$store.dispatch('example/getCurrentWeather', this.selectedCity.value)
    },
    getCurrentCity () {
      return this.cities.find(city => city.value === this.selectedCity.value).label
    }
  }
}
</script>

<template>
  <div class="weather-page">
    <div class="header flex justify-between">
      <div class="active-select" v-if="isSelectCity">
        <q-select
          style="width: 100%"
          outlined
          v-model="selectedCity"
          label="Города"
          :options="cities">
          <template v-slot:after>
            <q-btn round dense flat @click="selectCity">OK</q-btn>
          </template>
        </q-select>
      </div>
      <div class="city-place" v-else>
        <div class="city">
          {{getCurrentCity()}}
        </div>
        <div class="flex justify-between place-button">
          <div class="button"
               @click="isSelectCity=true"
          >Сменить город</div>
          <div class="button">Мое местоположение</div>
        </div>
      </div>
      <div class="temperature-dimension ">
        &#176;
        <q-btn-toggle
          v-model="tempDem"
          unelevated
          push
          toggle-color="primary"
          :options="[
          {label: 'C', value: 'c'},
          {label: 'F', value: 'f'},
        ]"></q-btn-toggle>
      </div>
    </div>
    <div class="current-weather" >
      <div class="flex justify-center">
        <q-img v-if="getWeatherType === 'cloud'" style="width: 200px; height: 200px" src="~assets/weather-icons/cloud.svg"></q-img>
        <q-img v-if="getWeatherType === 'partly_cloudy'" style="width: 200px; height: 200px" src="~assets/weather-icons/partly_cloudy.svg"></q-img>
        <q-img v-if="getWeatherType === 'rain'" style="width: 200px; height: 200px" src="~assets/weather-icons/rain.svg"></q-img>
        <q-img v-if="getWeatherType === 'storm'" style="width: 200px; height: 200px" src="~assets/weather-icons/storm.svg"></q-img>
        <q-img v-if="getWeatherType === 'sun'" style="width: 200px; height: 200px" src="~assets/weather-icons/sun.svg"></q-img>
        <div class="temperature">
          {{getTemperature}} &#176;
        </div>
      </div>
      <div class="condition">
        {{currentWeather.condition}}
      </div>
    </div>
    <div class="footer flex justify-between" >
      <div>
        <div class="title">
          Ветер
        </div>
        <div class="value">
          {{currentWeather.wind_mps.toFixed(2)}} м/с, {{currentWeather.wind_dir}}
        </div>
      </div>
      <div>
        <div class="title">
          Давление
        </div>
        <div class="value">
          {{currentWeather.pressure_mm.toFixed(2)}} мм рт. ст.
        </div>
      </div>
      <div>
        <div class="title">
          Влажность
        </div>
        <div class="value">
          {{currentWeather.humidity}} %
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .weather-page {
    padding: 30px;
    background-color: #498CEC;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .title {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    mix-blend-mode: normal;
    opacity: 0.6;
  }
  .value {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    line-height: 30px;
    color: #FFFFFF;
  }
  .temperature {
    font-style: normal;
    font-weight: normal;
    font-size: 180px;
    line-height: 216px;
    text-align: center;
    color: #FFFFFF;
  }
  .condition {
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    line-height: 30px;
    text-align: center;
    color: #FFFFFF;
  }

  .button {
    cursor: pointer;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    mix-blend-mode: normal;
    opacity: 0.6
  }
  .button:hover {
    opacity: 1;
  }
  .city {
    font-weight: normal;
    font-size: 50px;
    line-height: 60px;
    color: #FFFFFF;
  }
  .city-place {
    width: 30%;
  }
  .active-select {
    width: 30%;
    background-color: white;
    border-radius: 5px;
  }
</style>
