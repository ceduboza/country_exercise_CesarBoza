<template>
    <q-page class="wishlist-page">
        <header-page title="Wishlist" />
        <template v-if="wishlist.length">
            <country-grid :countries="wishlist" :isLoading="false">
                <template #actions="{ country }">
                    <wishlist-icon :country="country" />
                </template>
            </country-grid>
        </template>
        <template v-else>
            <empty-state class="wishlist-page__empty-state" title="No countries in wishlist" icon="favorite" />
        </template>
    </q-page>
</template>
<script setup lang="ts">
import { useWishlist } from 'src/modules/Wishlist/infraestructure/wishlist';
import HeaderPage from 'src/components/Header.vue'
import CountryGrid from 'src/modules/Countries/aplication/CountryGrid/CountryGrid.vue';
import WishlistIcon from 'src/modules/Wishlist/aplication/WishlistIcon/WishlistIcon.vue';
import EmptyState from 'src/components/EmptyState.vue';

const { wishlist } = useWishlist()
</script>

<style lang="scss">
.wishlist-page {
    display: flex;
    flex-direction: column;
    gap: 3vh;

    &__empty-state {
        padding: 10%;
    }
}
</style>
