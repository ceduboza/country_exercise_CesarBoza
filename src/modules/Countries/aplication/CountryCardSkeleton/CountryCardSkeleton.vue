<template>
    <q-card class="country-card-skeleton" dark bordered>
        <q-card-section>
            <div class="country-card-skeleton__section country-card-skeleton__section--title" />
        </q-card-section>

        <q-separator dark inset />

        <q-card-section>
            <span class="country-card-skeleton__section country-card-skeleton__section--info" />
        </q-card-section>

        <q-separator dark inset />

        <q-card-section>
            <span class="country-card-skeleton__section country-card-skeleton__section--info" />
        </q-card-section>
    </q-card>
</template>

<style lang="scss">
.country-card-skeleton {
    &__section {
        width: 100%;
        background-color: $dark-page;
        background-image: linear-gradient(45deg, $dark-page 0%, $dark-page 20%, $dark-page 50%, $grey 80%, $grey 100%);
        background-size: 300%;
        background-repeat: no-repeat;
        animation: 1.5s loading-placeholder linear infinite;
        animation-fill-mode: forwards;

        &--title {
            height: 2rem;
        }

        &--info {
            display: block;
            height: 4rem;
        }
    }
}
</style>