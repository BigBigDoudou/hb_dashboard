export const sortByProperty = (objects, property, direction = 'asc') =>
  objects.sort(function(a, b) {
    if (a[property] > b[property]) {
      return direction === 'asc' ? 1 : -1;
    } else if (a[property] < b[property]) {
      return direction === 'asc' ? -1 : 1;
    } else {
      return 0;
    }
  });

export const maxByProperty = (objects, property) =>
  sortByProperty(objects, property, 'desc')[0];

export const color = i =>
  '#' +
  [...Array(6).keys()]
    .map(x => x + 2)
    .map(x => (i % x) * Math.trunc(16 / x))
    .map(x => x.toString(16))
    .join('');
