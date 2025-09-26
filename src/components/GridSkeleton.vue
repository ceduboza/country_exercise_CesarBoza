<template>
    <ul>
        <li v-for="(_, idx) in Array(9)" :key="idx">
            <CountryCardSkeleton />
        </li>
    </ul>
</template>

<script setup lang="ts">
import CountryCardSkeleton from 'src/modules/Countries/aplication/CountryCardSkeleton/CountryCardSkeleton.vue';
</script>