import type { CountryContract } from "../entities/CountryContract";
import type { ICountryUI } from "../entities/ICountryUI";

export interface ICountryNormalizer {
    normalize(country: CountryContract[]): ICountryUI[];
}