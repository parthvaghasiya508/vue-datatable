# vue-datatable

A `Datatable` component for `Vue` with powerful features like `searching`, `sorting`, `pagination`, and `customization`.

This component is easy to integrate into both ongoing and new projects. Simply import the **component** and **CSS** from the package, pass the **required props**, and the datatable will render in your view.

---
## Installation

To install the component, clone or download the repository:

```bash
git clone https://github.com/parthvaghasiya508/vue-datatable.git
```

Navigate to the following folder within the project:

```bash
/src/components
```

Copy the `VueDataTable` folder and paste it into your project directory where you can easily import the `VueDataTable/VueDataTable.vue` file

---
## Getting Started

To begin, import the CSS in `main.js`:
```js
// main.js

import "path-to-VueDataTable-components/assets/style.css";
```

You can either register the component globally or import it directly in the file where you intend to use it:

```js
// Register globally (main.js)
import DataTable from "path-to-VueDataTable-components/VueDataTable.vue";

app.component("DataTable", DataTable);

// Or

// Import in a specific file
import DataTable from "path-to-VueDataTable-components/VueDataTable.vue";

export default {
  components: {
    DataTable,
  },
};
```

---
## Usage

There are 3 required props needed to render the datatable:
- ```unique-key``` - The key name of the object that is unique across all records. Example: `id`. **(Duplicate keys will cause render errors.)**
- ```headers``` -  An array of objects that define the headers and records.
- ```Records``` - An array of objects containing the data to display in the datatable.

Check [Props Reference](#props-reference) section for more info with the other ```props``` 

```html
<template>
  <Datatable
    unique-key="id"
    :headers="headers"
    :records="records"
    :loading="loading"
  >
  </Datatable>
</template>
```

```js
import DataTable from "v3-datatable";

export default {
  components: {
    DataTable
  },
  created() {
    this.getDummyJSONData()
  },
  data() {
    return {
      headers: [
        { text: 'Title', key: 'title', searchable: true, sortable: false },
        { text: 'Price', key: 'price', searchable: true, sortable: true },
        { text: 'Discount (%)', key: 'discountPercentage' },
        { text: 'Rating', key: 'rating', searchable: false, sortable: true },
        { text: 'Stock', key: 'stock', searchable: false, sortable: false},
        { text: 'Action', key: 'action' }
      ],
      records: [],
      loading: false
    }
  },
  methods: {
    getDummyJSONData() {
      this.loading = true;

      fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((res) => {
        this.records = res.products
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        this.loading = false
      })
    } 
  }
}
```


---
## Props Reference

| Props                                  | Description                                                                                                                                  | Required    | Default                        |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------ |
| ```unique-key```                       | This will be **key name** of the object which are unique in all records. ex.: id (Duplicate keys will cause render errors                    | ```true```  | -                              |
| ```headers```                          | An array of objects which has definition of headers and records                                                                              | ```true```  | -                              |
| ```records```                          | An array of object with the set of values to be show on datatable                                                                            | ```true```  | -                              |
| ```table-class```                      | Give class name if you want to apply custom css. check [css](#css) section.                                                                  | ```false``` | ```""```                       |
| ```v-model:search```                   | Get or Pass search string                                                                                                                    | ```false``` | ```false```                    |
| ```hide-default-search```              | Hide default search component                                                                                                                | ```false``` | ```false```                    |
| ```loading```                          | Show loading indicate while loading data                                                                                                     | ```false``` | ```false```                    |
| ```selectable```                       | For selection of rows, it will render checkbox on particular rows. check [selectable](#selectable) section.                                  | ```false``` | ```false```                    |
| ```v-model```                          | To get selected rows. if ```multiple``` set to ```true``` then it's value must be an empty array. (```[]```) else an empty object (```{}```) | ```false``` | ```{}```                       |
| ```multiple```                         | for **multiple** selection of rows                                                                                                           | ```false``` | ```false```                    |
| ```show-pagination```                  | To show default pagination of component                                                                                                      | ```false``` | ```true```                     |
| ```v-model:records-per-page```         | To get or set records per page value of pagination                                                                                           | ```false``` | ```10```                       |
| ```v-model:records-per-page-options``` | To set records per page options of pagination. (**-1** will show **All** records in one page.)                                               | ```false``` | ```[10, 20, 30, 40, 50, -1]``` |
| ```v-model:active-page```              | To get or set current active page of pagination                                                                                              | ```false``` | ```1```                        |
