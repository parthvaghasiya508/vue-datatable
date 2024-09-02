<template>
  <div class="vdt-search-section">
    <div class="vdt-search-form-group">
      <HeroIconSearch />
      <input
        type="search"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="search..."
      />
    </div>
  </div>
</template>

<script>
import { HeroIconSearch } from "../icons";

export default {
  name: "VdtSearchComponent",
  components: {
    HeroIconSearch,
  },
  props: {
    modelValue: String,
  },
};
</script>
