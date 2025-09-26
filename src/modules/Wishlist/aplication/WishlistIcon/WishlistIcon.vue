<template>
    <q-btn
        flat
        round
        icon="favorite"
        :color="color"
        @click.prevent="handleClick"
    />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useWishlist } from 'src/modules/Wishlist/infraestructure/wishlist';
import type { Country } from 'src/modules/Countries/domain/entities/Country';

const props = defineProps<{
    country: Country
}>()

const { addToWishlist, removeFromWishlist, isCountryInWishlist } = useWishlist();

const color = computed(() => {
    return isCountryInWishlist(props.country) ? 'red' : 'white'
})

const handleClick = () => {
    if (isCountryInWishlist(props.country)) {
        removeFromWishlist(props.country)
    } else {
        addToWishlist(props.country)
    }
}
</script>