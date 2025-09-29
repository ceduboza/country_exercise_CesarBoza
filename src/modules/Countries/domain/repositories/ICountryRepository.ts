import type { ICountryNormalizer } from "../normalizers/ICountryNormalizer";
import type { ICountryUI } from "../entities/ICountryUI";

export interface ICountryRepository {
    _normalizer: ICountryNormalizer;

    getCountries(): Promise<ICountryUI[]>;
    getCountriesByName(name: string): Promise<ICountryUI[]>;
}