<template>
    <div class="country-detail-page" v-if="!showEmptyState">
        <div class="country-detail-page__block country-detail-page__block--flag">
            <span class="country-detail-page__flag">{{ countryDetail.flag }}</span>
        </div>
        <div class="country-detail-page__block country-detail-page__block--info">
            <h1>{{ countryDetail.name }}</h1>
            <ul class="country-detail-page__property-list">
                <li class="country-detail-page__property">
                    <p class="country-detail-page__property-name">Capital:</p>
                    <p class="country-detail-page__property-value">{{ countryDetail.capital }}</p>
                </li>
                <li class="country-detail-page__property">
                    <p class="country-detail-page__property-name">Population:</p>
                    <p class="country-detail-page__property-value">{{ countryDetail.population }}</p>
                </li>
                <li class="country-detail-page__property">
                    <p class="country-detail-page__property-name">Region:</p>
                    <p class="country-detail-page__property-value">{{ countryDetail.region }}</p>
                </li>
            </ul>
        </div>
    </div>
    <div v-else>
        <empty-state title="Country not found" icon="error" />
    </div>
</template>
<script setup lang="ts">
import { watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCountryStore } from 'src/stores/country-store'
import EmptyState from 'src/components/EmptyState.vue'

const route = useRoute()
const store = useCountryStore()

const countryDetail = computed(() => store.countryDetail)
const isLoading = computed(() => store.loading)
const showEmptyState = computed(() => !countryDetail.value.name && !isLoading.value)

watch(() => route.params.name, () => {
    if (route.params.name) {
        store.getCountryDetail(route.params.name as string)
    }
}, { immediate: true })

</script>
<style lang="scss" src="./index.scss" />
