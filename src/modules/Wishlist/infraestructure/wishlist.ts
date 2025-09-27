import { useStorage } from '@vueuse/core'
import type { ICountryUI } from 'src/modules/Countries/domain/entities/ICountryUI'

export const useWishlist = () => {
    const wishlist = useStorage('wishlist', [] as ICountryUI[])

    const addToWishlist = (country: ICountryUI) => {
        wishlist.value.push({
            name: country.name,
            capital: country.capital,
            population: country.population,
            region: country.region,
            flag: country.flag
        })
    }

    const removeFromWishlist = (country: ICountryUI) => {
        wishlist.value = wishlist.value.filter((wishlistCountry: ICountryUI) => wishlistCountry.name !== country.name)
    }

    const isCountryInWishlist = (country: ICountryUI) => {
        return wishlist.value.some((wishlistCountry: ICountryUI) => wishlistCountry.name === country.name)
    }

    return {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isCountryInWishlist
    }
}
