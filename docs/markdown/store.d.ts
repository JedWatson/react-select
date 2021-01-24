export interface Data {
  key: string;
  label: string;
  level: number;
  path: string;
}

interface Store {
  [key: string]: Data;
}

interface Headings {
  [page: string]: Data[];
}

class HeadingStore {
  store: Store;
  headings: Headings;

  add(key: string, data: Data);
  getStore(): Store;
  getPageHeadings(page): Data[];
  getAllHeadings(): Headings;
  getHeadingByKey(key: string): Data;
}

const store: HeadingStore;
export default store;
