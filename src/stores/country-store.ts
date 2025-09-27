import { defineStore } from 'pinia';
import type { ICountryUI } from 'src/modules/Countries/domain/entities/ICountryUI';

interface State {
  countries: ICountryUI[],
  countryDetail: ICountryUI | null,
  loading: boolean,
}

export const useCountryStore = defineStore('country', {
  state: (): State => ({
    countries: [],
    countryDetail: null,
    loading: false,
  }),
  getters: {
    isMobile() {
      return document.querySelector('body.mobile') !== null;
    }
  },
  actions: {
    getCountryList() {
      this.loading = true;

      this.$countryDataProvider.getCountries().then((countries) => {
        this.countries = countries;
      }).catch((error) => {
        this.countries = [];
        console.error('Failed to fetch countries:', error);
      }).finally(() => {
        this.loading = false;
      })
    },
    getCountryListByName(name: string) {
      this.loading = true;

      this.$countryDataProvider.getCountriesByName(name).then((countries) => {
        this.countries = countries;
      }).catch((error) => {
        this.countries = [];
        console.error('Failed to fetch countries by name:', error);
      }).finally(() => {
        this.loading = false;
      })
    },
    getCountryDetail(name: string) {
      this.loading = true;
      if (this.countries.length) {
        const country = this.countries.find((country) => country.name.toLowerCase() === name.toLowerCase());
        this.countryDetail = country || null;
        this.loading = false;
      } else {
        this.$countryDataProvider.getCountriesByName(name).then((countries) => {
          const selectedCountry = countries?.[0];
          if (selectedCountry) {
            this.countryDetail = selectedCountry;
          }
        }).catch((error) => {
          console.error('Failed to fetch countries by name:', error);
          this.countryDetail = null;
        }).finally(() => {
          this.loading = false;
        })
      }
    },
  },
});
