class HeadingStore {
  store = {};
  headings = {};

  add(key, data) {
    if (!this.headings[location.pathname]) {
      this.headings[location.pathname] = [];
    }

    if (!this.store[key]) {
      this.store[key] = data;
      this.headings[location.pathname].push(data);
    }
  }
  getStore() {
    return this.store;
  }
  getPageHeadings(page) {
    return this.headings[page];
  }
  getAllHeadings() {
    return this.headings;
  }
  getHeadingByKey(key) {
    return this.store[key];
  }
}

// global heading store
const store = new HeadingStore();

export default store;
