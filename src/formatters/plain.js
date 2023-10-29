const defineTheValTypeAndReturn = (val) => {
  if (Array.isArray(val)) {
    return '[complex value]';
  }
  if (typeof (val) === 'string') {
    return `'${val}'`;
  }
  return val;
};

const buildLine = (node, path) => {
  const { state, key, val } = node;
  if (Array.isArray(val) && state === 'noChanged') {
    return plain(val, `${path}${key}.`);
  }

  const newVal = defineTheValTypeAndReturn(val);
  switch (state) {
    case 'added':
      return `Property '${path}${key}' was added with value: ${newVal}`;
    case 'removed':
      return `Property '${path}${key}' was removed`;
    case 'updated': {
      const newValUpdated = defineTheValTypeAndReturn(node.newVal);
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
