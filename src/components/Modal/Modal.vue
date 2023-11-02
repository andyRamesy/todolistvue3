<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby=""
    aria-hidden="true"
    ref="mod"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body" />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import { Modal } from "bootstrap";

defineProps({
  title: {
    type: String,
    default: "<<Title goes here>>",
  },
});

let mod = ref(null);
let thisModalObj;


onMounted(() => {
  thisModalObj = new Modal(mod.value);
});

onUnmounted(() => {
    thisModalObj = {}
})

function _show() {
  thisModalObj.show();
}

function _hide(){
    thisModalObj.hide();
}

defineExpose({ show: _show, hide: _hide });
</script>