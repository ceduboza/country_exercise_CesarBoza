<template>
    <RouterLink :key="`${country.name}`" :to="`/country/${country.name}`">
        <q-card class="country-card-mobile" dark bordered>
            <q-card-section class="country-card-mobile__main-info">
                <div class="country-card-mobile__title">{{ country.name }}</div>
                <span v-if="country.flag" class="country-card-mobile__flag">{{ country.flag }}</span>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section class="country-card-mobile__info-section">
                <div class="country-card-mobile__block">
                    <span class="country-card-mobile__info">- Capital:</span>
                    <span class="country-card-mobile__info--value">{{ country.capital }}</span>
                </div>
                <div class="country-card-mobile__block">
                    <span class="country-card-mobile__info">- Population:</span>
                    <span class="country-card-mobile__info--value">{{ country.population }}</span>
                </div>
                <div class="country-card-mobile__block">
                    <span class="country-card-mobile__info">- Region:</span>
                    <span class="country-card-mobile__info--value">{{ country.region }}</span>
                </div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section class="country-card__actions">
                <slot name="actions" :country="country" />
            </q-card-section>
        </q-card>
    </RouterLink>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Country } from 'src/modules/Countries/domain/entities/Country';

defineProps<{
    country: Country
}>();
</script>

<style lang="scss">
.country-card-mobile {
    &__main-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__title {
        font-size: 1.5rem;
    }

    &__flag {
        font-size: 4rem;
    }

    &__info-section {
        display: flex;
        flex-direction: column;
    }

    &__block {
        display: flex;
        justify-content: space-between;
    }

    &__info {
        font-style: italic;
        font-size: 1rem;
    }

    &__actions {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
