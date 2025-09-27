<template>
    <div class="country-grid">
        <template v-if="showGrid">
            <q-infinite-scroll @load="onLoad" :offset="250">
                <ul class="country-grid__container">
                    <li v-for="country in countriesToShow" :key="country.name">
                        <component :is="countryCardComponent" :country="country">
                            <template #actions="{ country }">
                                <slot name="actions" :country="country" />
                            </template>
                        </component>
                    </li>
                </ul>
            </q-infinite-scroll>
        </template>
        <template v-else>
            <GridSkeleton class="country-grid__container" />
        </template>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import CountryCardDesktop from 'src/modules/Countries/aplication/CountryCardDesktop/CountryCardDesktop.vue';
import CountryCardMobile from 'src/modules/Countries/aplication/CountryCardMobile/CountryCardMobile.vue';
import type { ICountryUI } from 'src/modules/Countries/domain/entities/ICountryUI';
import GridSkeleton from 'src/components/GridSkeleton.vue';
import { useCountryStore } from 'src/stores/country-store';

const PAGINATION_PAGE_SIZE = 10

const { isMobile } = useCountryStore()

const props = defineProps<{
    countries: ICountryUI[],
    isLoading: boolean
}>();

const countriesToShow = ref<ICountryUI[]>([])
const lastCountryIndex = ref<number>(PAGINATION_PAGE_SIZE)

const countries = computed(() => props.countries)
const isLoading = computed(() => props.isLoading)
const showGrid = computed(() => !isLoading.value && countriesToShow.value.length);
const countryCardComponent = computed(() => {
    if (isMobile) {
        return CountryCardMobile;
    }
    return CountryCardDesktop;
})

const onLoad = (index: number, done: () => void) => {
    if (lastCountryIndex.value >= countries.value.length) {
        return;
    }

    stepNextPage()
    done()
}
const stepNextPage = () => {
    lastCountryIndex.value += PAGINATION_PAGE_SIZE
    countriesToShow.value = countries.value.slice(0, lastCountryIndex.value)
}

watch(countries, () => {
    stepNextPage()
}, { immediate: true })
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