<template>
    <div class="category-filter-form">
        <q-form class="category-filter-form__form" @submit="onSubmitForm" @reset="onResetForm">
            <div class="q-pa-md">
                <q-input filled v-model="countryName" label="Name *" hint="Country Name" lazy-rules
                    :rules="nameRules" />
            </div>

            <div class="category-filter-form__buttons">
                <q-btn label="Reset" type="reset" color="dark" flat class="q-ml-md" />
                <q-btn label="Submit" type="submit" color="dark" class="q-mr-md" />
            </div>
        </q-form>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useCountryStore } from 'src/stores/country-store';

const store = useCountryStore()
const emit = defineEmits(['onReset', 'onSubmit'])

const countryName = ref('')
const nameRules = [(val: string) => (val && val.length > 0) || 'Please type something'];


const onSubmitForm = () => {
    store.getCountryListByName(countryName.value)
    emit('onSubmit')
}
const onResetForm = () => {
    countryName.value = ''
    store.getCountryList()
    emit('onReset')
}
</script>
<style lang="scss">
.category-filter-form {

    &__form {
        display: flex;
        flex-direction: column;
        position: relative;
    }

    &__buttons {
        position: fixed;
        bottom: 1rem;
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
}
</style>