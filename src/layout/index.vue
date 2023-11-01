<template>
  <div class="container">
    <Header />
    <div class="content">
      <slot name="contentBody"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "./Header.vue";
</script>

<style lang="css" scoped>
.container {
  @apply w-[100vw] h-[100vh];
}
.content {
  @apply mx-[18px];
}
</style>
