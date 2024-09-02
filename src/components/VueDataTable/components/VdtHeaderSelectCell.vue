<template>
  <th class="vdt-selectable">
    <input v-if="multiple" type="checkbox" v-model="getValue" id="multiple_selection" />
    <label v-if="multiple" for="multiple_selection">
      <span class="vdt-selectable-icon">
        <svg
          v-if="intermidate"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="4.5"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
        </svg>
        <svg
          v-else
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
  </th>
</template>

<script>
export default {
  name: "VdtHeaderSelectCell",
  props: {
    multiple: {
      Type: Boolean,
    },
    modelValue: {
      Type: Boolean,
    },
    intermidate: {
      Type: Boolean,
    },
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
