<template>
    <q-btn flat round icon="favorite" :color="color" @click.prevent="handleClick" />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useWishlist } from 'src/modules/Wishlist/infraestructure/wishlist';
import type { ICountryUI } from 'src/modules/Countries/domain/entities/ICountryUI';

const props = defineProps<{
    country: ICountryUI
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