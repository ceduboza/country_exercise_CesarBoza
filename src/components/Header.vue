<template>
    <div class="header">
        <h1>{{ title }}</h1>
        <slot />
    </div>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
    title: String
})

const title = computed(() => props.title)
</script>
<style lang="scss">
.header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5vh 5vw;
}
</style>