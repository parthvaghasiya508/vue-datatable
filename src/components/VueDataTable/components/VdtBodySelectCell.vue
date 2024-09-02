<template>
  <td class="vdt-selectable">
    <input
      :value="record"
      v-model="getValue"
      :type="type"
      :id="`selection_${uniqueId}`"
    />
    <label :for="`selection_${uniqueId}`">
      <span class="vdt-selectable-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="4.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </span>
    </label>
  </td>
</template>

<script>
export default {
  name: "VdtBodySelectCell",
  props: {
    type: String,
    uniqueId: Number,
    record: Object,
    modelValue: [Array, Object],
  },
  computed: {
    getValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
