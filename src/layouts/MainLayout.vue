<template>
  <q-layout class="main-layout">
    <q-header elevated class="main-layout__header">
      <q-toolbar :inset="true" class="main-layout__toolbar">
        <RouterLink to="/">
          <q-toolbar-title> Beyond Exercise </q-toolbar-title>
        </RouterLink>
        <RouterLink class="main-layout__wishlist" to="/wishlist">
            <q-icon name="favorite" size="2rem" :color="wishlistColor" />
        </RouterLink>
      </q-toolbar>
    </q-header>

    <q-page-container class="main-layout__page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWishlist } from 'src/modules/Wishlist/infraestructure/wishlist';

const { wishlist } = useWishlist()

const wishlistColor = computed(() => {
    return wishlist.value.length > 0 ? 'red' : 'white'
})
</script>

<style lang="scss">
.main-layout {
  &__header {
    position: fixed;
    background-color: $dark;
    display: flex;
    align-content: center;
    padding: 1rem 0;
  }

  &__toolbar {
    width: 100%;
    justify-content: space-between;
  }

  &__wishlist {
    padding: 0 1rem;
  }
}
</style>