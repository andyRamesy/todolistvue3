<template>
  <div class="col-lg">
    <div class="col-lg-6 fv-row">
      <label for="title" class="form-label">{{ props.labelTitle }}</label>
      <input
        type="text"
        class="form-control"
        id="title"
        name="title"
        :placeholder="props.placeholderTitle"
        @input="handleInput"
      />
    </div>
    <div class="col-lg-6 fv-row mt-[10px]">
      <label for="comment" class="form-label">{{ props.labelDescr }}:</label>
      <textarea
        class="form-control"
        rows="5"
        id="comment"
        name="text"
        :placeholder="props.placeholderDesc"
        @input="handleTextArea"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  labelTitle: String,
  placeholderTitle: String,
  labelDescr: String,
  placeholderDesc: String,
});

const emit = defineEmits<{
  (e: "onInput", payload: any): void;
  (e: "onTextArea", payload: any): void;
}>();

const handleInput = (val: Event) => {
  const { value } = val.target as HTMLInputElement;
  emit("onInput", value);
};

const handleTextArea = (val: Event) => {
  const { value } = val.target as HTMLInputElement;
  emit("onTextArea", value);
};
</script>
