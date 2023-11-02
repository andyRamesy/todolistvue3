<template>
  <form ref="formRef">
    <div class="col-lg flex flex-col gap-[20px]">
      <div class="col-lg-6 fv-row">
        <label for="title" class="form-label">Title</label>
        <input
          required
          v-model="newTask.title"
          type="text"
          class="form-control"
          id="title"
          name="title"
          placeholder="Enter the title"
        />
      </div>
      <div class="col-lg-6 fv-row">
        <label for="comment" class="form-label">Description:</label>
        <textarea
          v-model="newTask.description"
          class="form-control"
          rows="5"
          id="description"
          name="description"
          placeholder="Enter description"
        ></textarea>
      </div>
    </div>
    <div class="form-check form-switch mt-[20px]">
      <label class="form-check-label" for="status">Status</label>
      <input
        v-model="newTask.status"
        name="status"
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="status"
      />
    </div>
    <div class="flex justify-center mt-5">
      <button
        :disabled="disabledBtn"
        @click="onValidate"
        type="submit"
        class="btn btn-light"
      >
        Validate
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { ITask } from "@/types";

const disabledBtn = ref<boolean>(true);
const status = ref<boolean>(false);
const newTask = ref<ITask>({
  id: "",
  title: "",
  description: "",
  status: status.value,
});

const emit = defineEmits<{
  (e: "onAddTask", payload: any): void;
}>();

// const handleInput = (val: Event) => {
//   const { value } = val.target as HTMLInputElement;
//   newTask.value.title = value;
// };

// const handleTextArea = (val: Event) => {
//   const { value } = val.target as HTMLInputElement;
//   newTask.value.description = value;
// };

const onValidate = (e: Event) => {
  newTask.value.id = uuidv4();
  newTask.value.status = status.value
  emit("onAddTask", newTask.value);
  newTask.value = {} as ITask;
  e.preventDefault();
};

watch(
  () => status.value,
  (newValue) => {
    newTask.value.status = newValue;
    console.log("status for", newTask.value.status);
    
  },
  { immediate: true, deep: true }
);

watch(
  () => newTask.value.title,
  (newValue) => {
    newValue === "" ? (disabledBtn.value = true) : (disabledBtn.value = false);
  },
  { immediate: true, deep: true }
);
</script>
