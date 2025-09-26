import { defineStore } from 'pinia';
import type { Country } from 'src/modules/Countries/domain/entities/Country';

interface State {
  countries: Country[],
  countryDetail: Country,
  loading: boolean,
}

export const useCountryStore = defineStore('country', {
  state: (): State => ({
    countries: [],
    countryDetail: {
      name: '',
      capital: '',
    },
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

      this.$countryDataProvider.getCountries().then((countries: Country[]) => {
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

      this.$countryDataProvider.getCountriesByName(name).then((countries: Country[]) => {
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
        const country = this.countries.find((country: Country) => country.name.toLowerCase() === name.toLowerCase());
        this.countryDetail = country || {
          name: '',
          capital: '',
        }
        this.loading = false;
      } else {
        this.$countryDataProvider.getCountriesByName(name).then((countries: Country[]) => {
          const selectedCountry = countries?.[0];
          if (selectedCountry) {
            this.countryDetail = selectedCountry;
          }
        }).catch((error) => {
          console.error('Failed to fetch countries by name:', error);
          this.countryDetail = {
            name: '',
            capital: '',
          };
        }).finally(() => {
          this.loading = false;
        })
      }
    },
  },
});
