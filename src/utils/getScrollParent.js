export default (element, includeHidden) => {
  const overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

  for (let parent = element; (parent = parent.parentElement);) {
    const style = window.getComputedStyle(parent);
    if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }

  return null;
};
