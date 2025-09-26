import 'pinia';
import type { ICountryRepository } from 'src/modules/Countries/domain/repositories/ICountryRepository'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $countryDataProvider: ICountryRepository;
  }
}