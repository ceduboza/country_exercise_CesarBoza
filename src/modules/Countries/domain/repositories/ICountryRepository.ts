import type { ICountryUI } from "../entities/ICountryUI";

export interface ICountryRepository {
    getCountries(): Promise<ICountryUI[]>;
    getCountriesByName(name: string): Promise<ICountryUI[]>;
}