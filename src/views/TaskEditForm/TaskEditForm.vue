<template>
  <form ref="formRef">
    <div class="col-lg flex flex-col gap-[20px]">
      <div class="col-lg-6 fv-row">
        <label for="title" class="form-label">Title</label>
        <input
          v-model="taskToEdit.title"
          required
          type="text"
          class="form-control"
          id="title"
          name="title"
          placeholder="Enter the title"
          @input="handleInputEdit"
        />
      </div>
      <div class="col-lg-6 fv-row">
        <label for="comment" class="form-label">Description:</label>
        <textarea
          v-model="taskToEdit.description"
          class="form-control"
          rows="5"
          id="description"
          name="description"
          placeholder="Enter description"
          @input="handleTextArea"
        ></textarea>
      </div>
    </div>
    <div class="form-check form-switch mt-[20px]">
      <label class="form-check-label" for="status">Status</label>
      <input
        v-model="taskToEdit.status"
        name="status"
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="status"
      />
    </div>
    <div class="flex justify-center mt-5 gap-[10px]">
      <button type="submit" class="btn btn-primary" @click="onEdit">
        Edit
      </button>
      <button type="submit" class="btn btn-danger" @click="onDelete">
        Delete
      </button>
      <button type="submit" class="btn btn-light" @click="onComplete">
        Complete task
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const emit = defineEmits<{
  (e: "onDeleteTask", payload: any): void;
  (e: "onEditTask", payload: any): void;
  (e: "onCompleteTask", payload: any): void;
}>();

const props = defineProps({
  taskToEdit: {
    type: Object,
    default: {},
  },
});

const status = ref<boolean>(false);
const editedTask = ref<any>({});

const handleInputEdit = (val: Event) => {
  const { value } = val.target as HTMLInputElement;
  editedTask.value.title = value;
};

const handleTextArea = (val: Event) => {
  const { value } = val.target as HTMLInputElement;
  editedTask.value.description = value;
};

const onDelete = (e: Event) => {
  let deleteTask = { ...props.taskToEdit };
  emit("onDeleteTask", deleteTask);
  e.preventDefault();
};

const onEdit = (e: Event) => {
  let taskEdit = { ...props.taskToEdit };
  emit("onEditTask", taskEdit);
  e.preventDefault();
};

const onComplete = (e: Event) => {
  let taskComplete = { ...props.taskToEdit };
  emit("onCompleteTask", taskComplete)
  e.preventDefault();
};

watch(
  () => status.value,
  (newValue) => {
    editedTask.value.status = newValue;
  },
  { immediate: true }
);
</script>
