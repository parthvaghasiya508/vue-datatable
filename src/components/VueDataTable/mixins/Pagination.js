export default {
	data() {
		return {
			maxPageBox: 7,
			maxIndexMatch: 5,
			allItemValue: -1,
		}
	},
	props: {
		recordsPerPageOptions: Array,
		recordsPerPage: Number,
		activePage: Number,
		totalRecords: Number,
	},
	methods: {
		goToPage(page) {
			let currentPage = page;
			if (page === "prev") currentPage = this.activePage - 1;
			if (page === "next") currentPage = this.activePage + 1;
			this.$emit("update:activePage", currentPage);
		},
	},
	computed: {
		getRecordsPerPageOptions() {
			return this.recordsPerPageOptions.map((item) => {
				return { text: item > this.allItemValue ? item : "All", value: item };
			});
		},
		getNumberOfPages() {
			if (this.recordsPerPage > this.allItemValue) {
				return Math.ceil(this.totalRecords / this.recordsPerPage);
			}
			return 1;
		},
		getStartIndexOfRecord() {
			return this.recordsPerPage * (this.activePage - 1) + 1;
		},
		getEndIndexOfRecord() {
			if (this.recordsPerPage > this.allItemValue) {
				if (this.getStartIndexOfRecord + this.recordsPerPage < this.totalRecords) {
					return this.recordsPerPage * this.activePage;
				}
				return (
					this.getStartIndexOfRecord + (this.totalRecords - this.getStartIndexOfRecord)
				);
			}
			return this.totalRecords;
		},
		getTitleString() {
			return `${this.getStartIndexOfRecord} - ${this.getEndIndexOfRecord} of  ${this.totalRecords}`;
		},
		getNumberOfPagesList() {
			if (this.getNumberOfPages <= this.maxPageBox) {
				const numbers = Array.from({ length: this.getNumberOfPages }, (_, i) => i + 1)
				return numbers.map((num) => {
					return { number: num }
				})
			} else {
				let numbers = [];
				if (this.activePage < this.maxIndexMatch) {
					numbers = Array.from({ length: this.maxIndexMatch }, (_, i) => i + 1).map((num) => {
						return { number: num }
					})
					numbers.push({
						number: "...",
						$isDisabled: true
					}, { number: this.getNumberOfPages })
				} else if (this.activePage > (this.getNumberOfPages - this.maxIndexMatch) + 1) {
					numbers = [{ number: 1 }, {
						number: "...",
						$isDisabled: true
					}];
					for (let i = (this.getNumberOfPages - this.maxIndexMatch) + 1; i <= this.getNumberOfPages; i++) {
						numbers.push({ number: i })
					}
				} else {
					numbers = [{ number: 1 }, {
						number: "...",
						$isDisabled: true
					}, {
						number: this.activePage - 1
					}, {
						number: this.activePage
					}, {
						number: this.activePage + 1
					}, {
						number: "...",
						$isDisabled: true
					}, { number: this.getNumberOfPages }];
				}
				return numbers;
			}
		},
	}
}