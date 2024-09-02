<template>
  <div class="vdt-table-loader" :class="{ active: loading }">
    <div class="vdt-table-loader-bar"></div>
  </div>
</template>

<script>
export default {
  name: "VdtTableLoader",
  props: {
    loading: Boolean,
  },
};
</script>
