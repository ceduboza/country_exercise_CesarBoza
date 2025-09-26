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

<style lang="scss">
.country-card {
    &__main-info {
        display: flex;
        justify-content: space-between;
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

    $self: &;

    &--flag {
        display: flex;
        flex-direction: column;

        #{$self}__actions {
            width: 100%;
            justify-content: center;
            align-items: center;
            gap: 10%;
        }
    }
}

a.country-card_desktop {
    display: block;
    position: relative;
    overflow: hidden;
}

a.country-card_desktop div.q-card:last-child {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-100%);
}

a.country-card_desktop div.q-card {
    transition: transform 0.2s ease-out;
}

a.country-card_desktop:hover div.q-card:first-child {
    transform: translate/(100%);
}

a.country-card_desktop:hover div.q-card:last-child {
    transform: none;
}
</style>
