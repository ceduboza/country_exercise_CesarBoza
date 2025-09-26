import type { Country } from "src/modules/Countries/domain/entities/Country";
import type { CountryContract } from "src/modules/Countries/domain/entities/CountryContract";

export class CountryNormalizer {
    normalize(country: CountryContract[]): Country[] {
        return country.map((country: CountryContract) => ({
            name: country.name?.common || '',
            capital: country.capital?.[0] || '',
            flag: country?.flag || '',
            population: country.population || 0,
            region: country.region || '',
        }))
    }
}