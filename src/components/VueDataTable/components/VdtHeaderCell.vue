<template>
  <th :data-header-key="item.key">
    <div class="vdt-header-cell" :class="item.align || 'left'">
      <span>{{ item.text }}</span>
      <span v-if="item.sortable" class="vdt-sortable" :class="getSortClass">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="5"
            stroke="currentColor"
            class="vdt-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="5"
            stroke="currentColor"
            class="vdt-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </span>
    </div>
  </th>
</template>

<script>
export default {
  name: "VdtHeaderCell",
  props: {
    item: Object,
    sortKey: String,
    sortType: String,
  },
  computed: {
    getSortClass() {
      return {
        "asc-sorting": this.sortKey === this.item.key && this.sortType === "asc",
        "desc-sorting": this.sortKey === this.item.key && this.sortType === "desc",
      };
    },
  },
};
</script>
