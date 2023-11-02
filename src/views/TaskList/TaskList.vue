<template>
  <div class="flex justify-between">
    <button class="btn btn-dark mb-2" @click="showModal">New Task</button>
    <span class=" text-xl">Undone tasks : {{ undoneTasksCount }}</span>
  </div>
  <table class="table table-responsive table-light ">
    <thead class="fix">
      <tr >
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col"><i class="bi bi-check-circle"></i>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="task in tasksRef"
        data-bs-toggle="#modal"
        :key="task.id"
        @click="showModalEdit(task)"
      >
        <td>{{ task.title }}</td>
        <td>{{ task.description }}</td>
        <td>
          <span v-if="task.status">Done</span>
          <span v-else>Undone</span>
        </td>
      </tr>
    </tbody>
  </table>
  <Modal title="Add new task" ref="modalRef">
    <template #body>
      <TaskForm @onAddTask="addTask" />
    </template>
  </Modal>
  <Modal title="Edit your task" ref="modalEditRef">
    <template #body>
      <TaskEditForm
        :taskToEdit="tasksEditRef"
        @onEditTask="validateEdit"
        @onDeleteTask="deleteTask"
        @onCompleteTask="completeTask"
      />
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import Modal from "@/components/Modal/Modal.vue";
import TaskForm from "../TaskForm/TaskForm.vue";
import TaskEditForm from "../TaskEditForm/TaskEditForm.vue";
import { ITask } from "@/types";

let modalRef = ref();
let modalEditRef = ref();
let tasksRef = ref<Array<ITask>>([]);
let tasksEditRef = ref();
let undoneTasksCount = ref<number>(0);

onMounted(() => {
  tasksRef.value = JSON.parse(localStorage.getItem("tasks") as any);
});

const showModalEdit = (task: ITask) => {
  modalEditRef.value.show();
  tasksEditRef.value = { ...task };
};

const showModal = () => {
  modalRef.value.show();
};

const addTask = (taskValue: ITask) => {
  tasksRef.value = [...tasksRef.value, taskValue];
  localStorage.setItem("tasks", JSON.stringify(tasksRef.value));
  let localData = JSON.parse(localStorage.getItem("tasks") as any);
  console.log("local data:", localData);
  modalRef.value.hide();
};

const validateEdit = (taskEdit: ITask) => {
  let index = tasksRef.value.findIndex(
    (element: ITask) => element.id === taskEdit.id
  );
  tasksRef.value[index] = taskEdit;
  localStorage.setItem("tasks", JSON.stringify(tasksRef.value));
  modalEditRef.value.hide();
};

const deleteTask = (task: ITask) => {
  let taskDeleted = tasksRef.value.filter((item) => item.id !== task.id);
  tasksRef.value = taskDeleted;

  localStorage.setItem("tasks", JSON.stringify(tasksRef.value));
  modalEditRef.value.hide();
};

const completeTask = (taskEdit: ITask) => {
  let index = tasksRef.value.findIndex(
    (element: ITask) => element.id === taskEdit.id
  );
  tasksRef.value[index].status = true;
  localStorage.setItem("tasks", JSON.stringify(tasksRef.value));
  modalEditRef.value.hide();
};

watch(
  () => tasksRef.value,
  (newValue) => {
    let undone = newValue.filter((item) => item.status === false);
    undoneTasksCount.value = undone.length;
  },
  { deep: true }
);
</script>
