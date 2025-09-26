import { defineStore } from '#q-app/wrappers'
import { createPinia } from 'pinia'
import { CountryDataProvider } from 'src/modules/Countries/infraestructure/CountryDataProvider';

export default defineStore(() => {
  const pinia = createPinia()

  pinia.use(({ store }) => {
    store.$countryDataProvider = new CountryDataProvider()
  });

  return pinia;
})