module.exports = (array, name) => {
  if (!Array.isArray(array)) return '';
  const item = array.find(entry => entry.name === name);
  return item ? item.value : '';
}
