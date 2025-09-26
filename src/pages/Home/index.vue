<template>
    <q-page class="contry-grid">
        <header-page title="Countries">
            <q-btn
                class="contry-grid__filter-btn"
                round
                icon="tune"
                aria-label="Filters"
                @click="toggleLeftDrawer"
            />
        </header-page>
        <country-grid :countries="countries" :isLoading="isLoading">
            <template #actions="{ country }">
                <wishlist-icon :country="country" />
            </template>
        </country-grid>
        <q-drawer
            :width="300"
            :overlay="true"
            class="contry-grid__filter-drawer"
            v-model="leftDrawerOpen"
        >
            <q-item-label header>Filters</q-item-label>
            <q-separator light inset />
            <country-filter-form @onReset="toggleLeftDrawer" @onSubmit="toggleLeftDrawer" />
        </q-drawer>
    </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useCountryStore } from 'src/stores/country-store';
import HeaderPage from 'src/components/Header.vue'
import CountryGrid from 'src/modules/Countries/aplication/CountryGrid/CountryGrid.vue';
import CountryFilterForm from 'src/modules/Countries/aplication/CountryFilterForm/CountryFilterForm.vue';
import WishlistIcon from 'src/modules/Wishlist/aplication/WishlistIcon/WishlistIcon.vue';

const store = useCountryStore()

const leftDrawerOpen = ref(false)

const countries = computed(() => store.countries)
const isLoading = computed(() => store.loading)

function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
}

onMounted(() => {
    store.getCountryList()
})
</script>
<style lang="scss">
.contry-grid {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 3vh;

    &__filter-btn {
        border: 4px solid $dark;

        @media (max-width: 600px) {
            font-size: 1.5rem;
        }

        @media (min-width: 600px) {
            font-size: 2rem;
        }
    }
}
</style>