import type { ICountryNormalizer } from "../normalizers/ICountryNormalizer";
import type { Country } from "../entities/Country";

export interface ICountryRepository {
    _normalizer: ICountryNormalizer;

    getCountries(): Promise<Country[]>;
    getCountriesByName(name: string): Promise<Country[]>;
}