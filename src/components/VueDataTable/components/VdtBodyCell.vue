<template>
  <td :data-header-key="header.key" :class="header.align || 'left'">
    <slot :name="`row.${header.key}`">{{ item }}</slot>
  </td>
</template>

<script>
export default {
  name: "VdtBodyCell",
  props: ["header", "item"],
};
</script>
