<script setup lang="ts">
import Layout from "./layout/index.vue";
import TaskList from "./views/TaskList/TaskList.vue";
// import TaskForm from "@/views/TaskForm/TaskForm.vue"
</script>

<template>
  <Layout>
    <template v-slot:contentBody>
      <TaskList />
    </template>
  </Layout>
</template>
