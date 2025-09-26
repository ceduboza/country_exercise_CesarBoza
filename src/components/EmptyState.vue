<template>
    <div class="empty-state">
        <q-icon :name="icon" size="10rem" />
        <span>{{ title }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss">
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-top: 30%;
}
</style>
