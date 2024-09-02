<template>
  <div class="vdt-pagination-section">
    <p>{{ getTitleString }}</p>
    <select
      @change="$emit('update:recordsPerPage', parseInt($event.target.value))"
      :value="recordsPerPage"
    >
      <option
        v-for="option in getRecordsPerPageOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <div class="vdt-paginate">
      <button
        @click="goToPage('prev')"
        :class="{ disabled: activePage === 1 }"
        :disabled="activePage === 1"
      >
        <HeroIconChevronLeft />
      </button>
      <button
        v-for="(pageNum, i) in getNumberOfPagesList"
        :key="i"
        :class="{ active: activePage === pageNum.number }"
        :disabled="activePage === pageNum.number"
        @click="!pageNum.$isDisabled && goToPage(pageNum.number)"
      >
        {{ pageNum.number }}
      </button>
      <button
        @click="goToPage('next')"
        :class="{ disabled: activePage === getNumberOfPages }"
        :disabled="activePage === getNumberOfPages"
      >
        <HeroIconChevronRight />
      </button>
    </div>
  </div>
</template>

<script>
import { Pagination } from "./../mixins";

import {
  HeroIconChevronLeft,
  HeroIconChevronDoubleLeft,
  HeroIconChevronRight,
  HeroIconChevronDoubleRight,
} from "../icons";

export default {
  name: "VdtPagination",
  components: {
    HeroIconChevronLeft,
    HeroIconChevronDoubleLeft,
    HeroIconChevronRight,
    HeroIconChevronDoubleRight,
  },
  mixins: [Pagination],
};
</script>
