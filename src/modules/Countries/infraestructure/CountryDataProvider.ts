import type { Country } from "../domain/entities/Country";
import type { CountryContract } from "../domain/entities/CountryContract";
import type { ICountryRepository } from "../domain/repositories/ICountryRepository";
import { CountryNormalizer } from "./CountryNormalizer";

export class CountryDataProvider implements ICountryRepository {
    private _normalizer: CountryNormalizer;

    constructor() {
        this._normalizer = new CountryNormalizer();
    }

    getCountries(): Promise<Country[]> {
        const params = new URLSearchParams({
            fields: 'name,capital,population,region,flag'
        }).toString();

        return fetch(`https://restcountries.com/v3.1/all?${params}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => this._normalizer.normalize(data as CountryContract[]));
    }

    getCountriesByName(name: string): Promise<Country[]> {
        return fetch(`https://restcountries.com/v3.1/name/${name}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => this._normalizer.normalize(data as CountryContract[]));
    }
}
