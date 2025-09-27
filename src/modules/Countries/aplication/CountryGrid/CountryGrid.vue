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
                <template v-slot:loading>
                    <div class="row justify-center q-my-md">
                        <q-spinner-dots color="primary" size="40px" />
                    </div>
                </template>
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
import type { Country } from '../../domain/entities/Country';
import GridSkeleton from 'src/components/GridSkeleton.vue';
import { useCountryStore } from 'src/stores/country-store';

const PAGINATION_PAGE_SIZE = 10

const { isMobile } = useCountryStore()

const props = defineProps<{
    countries: Country[],
    isLoading: boolean
}>();

const countriesToShow = ref<Country[]>([])
const lastCountryIndex = ref(PAGINATION_PAGE_SIZE)

const showGrid = computed(() => !isLoading.value && countriesToShow.value.length);
const isLoading = computed(() => props.isLoading);
const countryCardComponent = computed(() => {
    if (isMobile) {
        return CountryCardMobile;
    }
    return CountryCardDesktop;
})

const onLoad = (index: number, done: () => void) => {
    if (lastCountryIndex.value >= props.countries.length) {
        return;
    }

    stepNextPage()
    done()
}

watch(() => props.countries, () => {
    stepNextPage()
})

const stepNextPage = () => {
    lastCountryIndex.value += PAGINATION_PAGE_SIZE
    countriesToShow.value = props.countries.slice(0, lastCountryIndex.value)
}

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