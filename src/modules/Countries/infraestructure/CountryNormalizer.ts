import type { CountryContract } from "src/modules/Countries/domain/entities/CountryContract";
import { Country } from "src/modules/Countries/domain/entities/Country";
import type { ICountryNormalizer } from "src/modules/Countries/domain/normalizers/ICountryNormalizer";

export class CountryNormalizer implements ICountryNormalizer {
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