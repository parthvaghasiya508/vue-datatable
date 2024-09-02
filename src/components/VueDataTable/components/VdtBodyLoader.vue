<template>
  <tr class="vdt-cell-loader">
    <td class="vdt-selectable" v-show="selectable"><span></span></td>
    <td v-for="column in columnsLength" :key="column"><span></span></td>
    <td class="vdt-editable" v-show="editable"><span></span></td>
  </tr>
</template>

<script>
export default {
  name: "VdtBodyLoader",
  props: {
    columnsLength: Number,
    selectable: Boolean,
    editable: Boolean,
  },
};
</script>
