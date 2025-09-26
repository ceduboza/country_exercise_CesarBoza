import type { Country } from "../entities/Country";

export interface ICountryRepository {
    getCountries(): Promise<Country[]>;
    getCountriesByName(name: string): Promise<Country[]>;
}