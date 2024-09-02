export default {
  props: {
    uniqueKey: {
      Type: String,
      required: true,
    },
    headers: {
      Type: Array,
      required: true,
    },
    records: {
      Type: Array,
      required: true,
    },
    tableClass: {
      Type: String,
      default: "",
    },
    search: {
      default: false
    },
    hideDefaultSearch: {
      Type: Boolean,
      default: false
    },
    loading: {
      Type: Boolean,
      default: false,
    },
    selectable: {
      Type: Boolean,
      default: false,
    },
    modelValue: {
      Type: [Array, Object],
      default: () => {
        return {}
      }
    },
    multiple: {
      Type: Boolean,
      default: false,
    },
    showPagination: {
      Type: Boolean,
      default: true
    },
    recordsPerPage: {
      Type: Number,
      default: 10
    },
    recordsPerPageOptions: {
      Type: Array,
      default() {
        return [10, 20, 30, 40, 50, -1];
      },
    },
    activePage: {
      Type: Number,
      default: 1,
    }
  },
  created() {
    if(!this.showPagination) this.nestRecordsPerPage = -1
  },
  data() {
    return {
      multipleSelection: false,
      sortKey: null,
      sortType: null,
      totalRecords: 0,
      pageNumberList: [],
      nestRecordsPerPage: this.recordsPerPage,
      nestActivePage: this.activePage,
      editedKey: null,
      editedRow: {},
      isIntermidate: false,
    };
  },
  methods: {
    filterRecords(records, searchString) {
      if (searchString !== false) {
        return records.filter((item) => {
          return this.headers.some((header) => {
            if (header.searchable) {
              const value =
                typeof item[header.key] === "object"
                  ? item[header.key].value
                  : item[header.key];
              const regex = new RegExp(searchString, "ig");
              return value.toString().match(regex);
            }
            return false;
          });
        });
      }
      return records;
    },
    applySorting(record) {
      if (record.sortable) {
        if (this.sortKey === record.key) {
          if (this.sortType === "asc") {
            this.sortType = "desc";
          } else if (this.sortType === "desc") {
            this.sortType = null;
          } else {
            this.sortType = "asc";
          }
        } else {
          this.sortKey = record.key;
          this.sortType = "asc";
        }
      }
    },
    paginate(records, nestRecordsPerPage, nestActivePage) {
      return records.slice(
        nestRecordsPerPage * (nestActivePage - 1),
        nestRecordsPerPage * nestActivePage
      );
    },
    sortingRecords(records, key, type) {
      return records.sort((a, b) => {
        const aValue = (typeof a[key] === 'string') ? a[key].toLowerCase() : a[key];
        const bValue = (typeof b[key] === 'string') ? b[key].toLowerCase() : b[key];
        if ((type === "asc" && aValue < bValue) || (type === "desc" && aValue > bValue))
          return -1;
        if ((type === "asc" && aValue > bValue) || (type === "desc" && aValue < bValue))
          return 1;
        return 0;
      });
    },
    isRowSelected(record) {
      if (this.multiple) {
        return this.getModelValue.find(
          (item) => item[this.uniqueKey] === record[this.uniqueKey]
        );
      } else {
        return this.getModelValue[this.uniqueKey] === record[this.uniqueKey];
      }
    },
    updateNestRecordsPerPage(value) {
      this.updateInitialValueNestActivePage();
      this.$emit("update:recordsPerPage", value);
    },
    updateNestActivePage(value) {
      this.$emit("update:activePage", value);
    },
    updateInitialValueNestActivePage() {
      this.nestActivePage = 1;
      this.updateNestActivePage(1)
      this.getModelValue = this.getModelValue
    },
    setMultipleSelection(value) {
      const records = this.filterRecords(this.records, this.searchString);
      this.getModelValue = value ? records : [];
    }
  },
  computed: {
    searchString: {
      get() {
        return this.search;
      },
      set(value) {
        this.$emit('update:search', value);
      }
    },
    getRecords() {
      let records = this.filterRecords(this.records, this.searchString);
      this.totalRecords = records.length;
      if (this.sortKey) {
        records = this.sortingRecords(records, this.sortKey, this.sortType);
      }
      if (this.nestRecordsPerPage > -1) {
        records = this.paginate(records, this.nestRecordsPerPage, this.nestActivePage);
      }
      return records;
    },
    getTableClass() {
      return ["vdt-table-hover", this.tableClass];
    },
    getModelValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        const records = this.filterRecords(this.records, this.searchString);
        if (value.length > 0) {
          if (value.length === records.length) {
            this.isIntermidate = false;
          } else {
            this.isIntermidate = true;
          }
          this.multipleSelection = true;
        } else {
          this.multipleSelection = false;
        }
        this.$emit("update:modelValue", value);
      },
    },
    getSelectionType() {
      return this.multiple ? "checkbox" : "radio";
    }
  },
  watch: {
    searchString() {
      this.updateInitialValueNestActivePage();
    },
  },
};
