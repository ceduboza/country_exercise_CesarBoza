<template>
    <RouterLink class="country-card_desktop" :key="`${country.name}`" :to="`/country/${country.name}`">
        <q-card class="country-card" dark bordered>
            <q-card-section class="country-card__main-info">
                <div class="country-card__title">{{ country.name }}</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section class="country-card__info-section">
                <div class="country-card__block">
                    <span class="country-card__info">- Capital:</span>
                    <span class="country-card__info--value">{{ country.capital }}</span>
                </div>
                <div class="country-card__block">
                    <span class="country-card__info">- Population:</span>
                    <span class="country-card__info--value">{{ country.population }}</span>
                </div>
                <div class="country-card__block">
                    <span class="country-card__info">- Region:</span>
                    <span class="country-card__info--value">{{ country.region }}</span>
                </div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section class="country-card__actions">
                <slot name="actions" :country="country" />
            </q-card-section>
        </q-card>
        <q-card class="country-card country-card--flag" dark bordered>
            <q-card-section class="country-card__actions">
                <span v-if="country.flag" class="country-card__flag">{{ country.flag }}</span>
                <slot name="actions" :country="country" />
            </q-card-section>

            <q-separator inset />

            <q-card-section class="country-card__main-info">
                <div class="country-card__title">{{ country.name }}</div>
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

<style lang="scss" src="./country-card-desktop.scss" />
