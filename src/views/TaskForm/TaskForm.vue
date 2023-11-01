<template>
  <form>
    <h2>New Task</h2>
    <InputLabel labelTitle="Title" placeholderTitle="Enter the title" labelDescr="Description" placeholderDesc="Enter the description" @onInput="inputHandler" @onTextArea="textAreaHandler"/>
  </form>
</template>

<script lang="ts" setup>
  import InputLabel from '@/components/InputLabeled/InputLabel.vue';


  const inputHandler = (value:Event) => {
    console.log("value in views on input", value);
  }

  const textAreaHandler = (value:Event) => {
    console.log("value in text area in views:", value);
    
  }
</script>