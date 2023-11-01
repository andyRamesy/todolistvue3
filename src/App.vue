<script setup lang="ts">
import Layout from "./layout/index.vue";
import NewTask from "@/views/TaskForm/TaskForm.vue"
</script>

<template>
  <Layout>
    <template v-slot:contentBody>
      <NewTask />
    </template>
  </Layout>
</template>
