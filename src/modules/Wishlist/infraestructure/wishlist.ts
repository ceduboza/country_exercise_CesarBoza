import { useStorage } from '@vueuse/core'
import type { Country } from 'src/modules/Countries/domain/entities/Country'

export const useWishlist = () => {
    const wishlist = useStorage('wishlist', [] as Country[])

    const addToWishlist = (country: Country) => {
        wishlist.value.push(country)
    }

    const removeFromWishlist = (country: Country) => {
        wishlist.value = wishlist.value.filter((c: Country) => c.name !== country.name)
    }

    const isCountryInWishlist = (country: Country) => {
        return wishlist.value.some((c: Country) => c.name === country.name)
    }

    return {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isCountryInWishlist
    }
}
