import type { CountryContract } from "src/modules/Countries/domain/entities/CountryContract";
import { Country } from "src/modules/Countries/domain/entities/Country";

export class CountryNormalizer {
    normalize(country: CountryContract[]): Country[] {
        return country.map((country: CountryContract) => (
            new Country(
                country.name?.common || '',
                country.capital?.[0] || '',
                country.population || 0,
                country.region || '',
                country.flag || ''
            )
        ));
    }
}