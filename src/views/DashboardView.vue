<template>
  <VuejsDataTable
    v-model="selectedData"
    :headers="headers"
    :records="records"
    v-model:search="search"
    unique-key="id"
    :loading="loading"
    :multiple="true"
    :selectable="true"
    :show-pagination="true"
    :records-per-page-options="[5, 10, 15, 20, 50, -1]"
    v-model:active-page="activePage"
    v-model:records-per-page="recordsPerPage"
  >
  </VuejsDataTable>
</template>

<script>
import VuejsDataTable from "../components/VueDataTable/VueDataTable.vue";

export default {
  name: "DashboardView",
  components: {
    VuejsDataTable,
  },
  created() {
    this.getDummyJSONData();
  },
  data() {
    return {
      search: "",
      selectedData: [],
      recordsPerPage: 10,
      activePage: 1,
      headers: [
        { text: "Title", key: "title", searchable: true },
        { text: "Price", key: "price", searchable: true },
        { text: "Discount Per.", key: "discountPercentage", sortable: true },
        { text: "Rating", key: "rating", sortable: true },
        { text: "Stock", key: "stock", sortable: true },
        {
          text: "Brand",
          key: "brand",
          searchable: true,
          sortable: true,
        },
        { text: "Category", key: "category", searchable: true, sortable: true },
      ],
      records: [],
      loading: false,
    };
  },
  methods: {
    async getDummyJSONData() {
      this.loading = true;
      await fetch("https://dummyjson.com/products?limit=100")
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.records = response.products;
        })
        .catch((error) => {
          console.error(error);
        });
      this.loading = false;
    },
  },
  computed: {
    vue() {
      return `<DataTable
  v-model="selectedData"
  :headers="headers"
  :records="records"
  v-model:search="search"
  unique-key="id"
  :loading="loading"
  :multiple="true"
  :selectable="true"
  :show-pagination="true"
  :records-per-page-options="[5, 10, 15, 20, 50, -1]"
  v-model:active-page="activePage"
  v-model:records-per-page="recordsPerPage"
>
</DataTable>`;
    },
    script() {
      return `import "v3-datatable/css";
import DataTable from "v3-datatable";

export default {
  name: "DashboardView",
  components: {
    DataTable,
  },
  created() {
    this.getDummyJSONData();
  },
  data() {
    return {
      search: "",
      selectedData: [],
      recordsPerPage: 10,
      activePage: 1,
      headers: [
        { text: "Title", key: "title", searchable: true },
        { text: "Price", key: "price", searchable: true },
        { text: "Discount Per.", key: "discountPercentage", sortable: true },
        { text: "Rating", key: "rating", sortable: true },
        { text: "Stock", key: "stock", sortable: true },
        { text: "Brand", key: "brand", searchable: true, sortable: true },
        { text: "Category", key: "category", searchable: true, sortable: true },
      ],
      records: [],
      loading: false,
    };
  },
  methods: {
    async getDummyJSONData() {
      this.loading = true;
      await fetch("https://dummyjson.com/products?limit=100")
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          this.records = response.products;
        })
        .catch((error) => {
          console.error(error);
        });
      this.loading = false;
    },
  },
};
`;
    },
  },
};
</script>
