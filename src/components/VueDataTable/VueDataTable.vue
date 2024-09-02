<template>
  <div class="vdt-container">
    <VdtSearchComponent
      v-model="searchString"
      v-if="searchString !== false && !hideDefaultSearch"
    />

    <div class="vdt-table-responsive" :class="{ 'loader-active': loading }">
      <VdtTableLoader :loading="loading" />
      <table class="vdt-table" :class="getTableClass">
        <thead>
          <tr>
            <VdtHeaderSelectCell
              :multiple="multiple"
              :modelValue="multipleSelection"
              @update:modelValue="setMultipleSelection"
              :intermidate="isIntermidate"
              v-if="selectable"
            />
            <VdtHeaderCell
              v-for="item in headers"
              :key="item.key"
              :item="item"
              @click="applySorting(item)"
              :sort-key="sortKey"
              :sort-type="sortType"
            />
          </tr>
        </thead>
        <tbody v-if="getRecords.length > 0">
          <tr
            v-for="record in getRecords"
            :key="record[uniqueKey]"
            :class="{ 'vdt-selected': isRowSelected(record) }"
          >
            <VdtBodySelectCell
              v-model="getModelValue"
              :unique-id="record[uniqueKey]"
              :record="record"
              v-if="selectable"
              :type="getSelectionType"
            />
            <VdtBodyCell
              v-for="header in headers"
              :key="`${header.key}_${record[uniqueKey]}`"
              :header="header"
              :item="record[header.key]"
            >
              <template v-slot:[`row.${header.key}`]>
                <slot :name="`row.${header.key}`" :item="record" />
              </template>
            </VdtBodyCell>
          </tr>
        </tbody>
        <tbody v-else>
          <VdtTableNoRecord />
        </tbody>
      </table>
    </div>

    <VdtPagination
      v-if="showPagination"
      v-show="getRecords.length !== 0"
      v-model:recordsPerPage="nestRecordsPerPage"
      :records-per-page-options="recordsPerPageOptions"
      v-model:activePage="nestActivePage"
      @update:recordsPerPage="updateNestRecordsPerPage"
      @update:activePage="updateNestActivePage"
      :total-records="totalRecords"
    />
  </div>
</template>

<script>
import "./assets/style.css";
import { DataTable } from "./mixins";
import {
  VdtSearchComponent,
  VdtTableLoader,
  VdtPagination,
  VdtHeaderSelectCell,
  VdtBodySelectCell,
  VdtBodyLoader,
  VdtHeaderCell,
  VdtBodyCell,
  VdtTableNoRecord,
} from "./components";

export default {
  name: "VueDataTable",
  components: {
    VdtSearchComponent,
    VdtTableLoader,
    VdtPagination,
    VdtHeaderSelectCell,
    VdtBodySelectCell,
    VdtBodyLoader,
    VdtHeaderCell,
    VdtBodyCell,
    VdtTableNoRecord,
  },
  mixins: [DataTable],
};
</script>
