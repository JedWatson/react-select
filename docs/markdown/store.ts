export interface Data {
  key: string;
  label: string;
  level: number;
  path: string;
}

class HeadingStore {
  store: { [key: string]: Data } = {};
  headings: { [key: string]: Data[] } = {};

  add(key: string, data: Data) {
    console.log('add being called with', data.label);
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
  getPageHeadings(page: string) {
    return this.headings[page];
  }
  getAllHeadings() {
    return this.headings;
  }
  getHeadingByKey(key: string) {
    return this.store[key];
  }
}

// global heading store
const store = new HeadingStore();

export default store;
