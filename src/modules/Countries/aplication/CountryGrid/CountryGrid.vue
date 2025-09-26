<template>
    <div class="country-grid">
        <template v-if="showGrid">
            <ul class="country-grid__container">
                <li v-for="country in countries" :key="country.name">
                    <component :is="countryCardComponent" :country="country">
                        <template #actions="{ country }">
                            <slot name="actions" :country="country" />
                        </template>
                    </component>
                </li>
            </ul>
        </template>
        <template v-else>
            <GridSkeleton class="country-grid__container" />
        </template>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import CountryCard from 'src/modules/Countries/aplication/CountryCardDesktop/CountryCard.vue';
import CountryCardMobile from 'src/modules/Countries/aplication/CountryCardMobile/CountryCardMobile.vue';
import type { Country } from '../../domain/entities/Country';
import GridSkeleton from 'src/components/GridSkeleton.vue';

const props = defineProps<{
    countries: Country[],
    isLoading: boolean
}>();

const countries = computed(() => props.countries);
const isLoading = computed(() => props.isLoading);
const countryCardComponent = computed(() => {
    if (window.innerWidth < 600) {
        return CountryCardMobile;
    }
    return CountryCard;
})

const showGrid = computed(() => !isLoading.value && countries.value.length);
</script>

<style scoped lang="scss">
.country-grid {
    &__container {
        display: grid;
        gap: 1rem;

        @media (max-width: 600px) {
            padding: 0 1rem;
        }

        @media (min-width: 600px) {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 2.5rem;
        }

        @media (min-width: 1024px) {
            grid-template-columns: repeat(3, 1fr);
            padding: 0 5rem;
        }
    }
}
</style>