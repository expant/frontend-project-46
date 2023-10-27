const getStrOrAnyOtherType = (val) => (typeof (val) === 'string' ? `'${val}'` : val);
const getComplexValOrSimple = (val) => (Array.isArray(val) ? '[complex value]' : val);

const buildLine = (node, path) => {
  const { state, key, val } = node;
  if (Array.isArray(val) && state === 'noChanged') {
    return plain(val, `${path}${key}.`);
  }

  const strOrAnyOtherType = getStrOrAnyOtherType(val);
  const newVal = getComplexValOrSimple(strOrAnyOtherType);
  switch (state) {
    case 'added':
      return `Property '${path}${key}' was added with value: ${newVal}`;
    case 'removed':
      return `Property '${path}${key}' was removed`;
    case 'updated': {
      const strOrAnyOtherTypeUpdated = getStrOrAnyOtherType(node.newVal);
      const newValUpdated = getComplexValOrSimple(strOrAnyOtherTypeUpdated);
      return `Property '${path}${key}' was updated. From ${newVal} to ${newValUpdated}`;
    }
    case 'noChanged': return '';
    default: throw new Error(`Unknown state: ${state}`);
  }
};

const removeEmptyItems = (item) => item !== '';

const plain = (diff, path = '') => diff
  .map((node) => buildLine(node, path))
  .filter(removeEmptyItems)
  .join('\n');

export default plain;
