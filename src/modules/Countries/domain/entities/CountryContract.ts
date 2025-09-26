type CountryName = {
    common: string
}

export interface CountryContract {
    name: CountryName,
    capital: string[]
    flag: string
    population: number
    region: string
}