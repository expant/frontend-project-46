const getStrOrNo = (val) => (typeof (val) === 'string' ? `'${val}'` : val);

const buildLine = (node, path) => {
  const { state, key, val } = node;
  if (Array.isArray(val) && state === 'noChanged') {
    return plain(val, `${path}${key}.`);
  }

  const newVal = Array.isArray(getStrOrNo(val)) ? '[complex value]' : getStrOrNo(val);
  switch (state) {
    case 'added':
      return `Property '${path}${key}' was added with value: ${newVal}`;
    case 'removed':
      return `Property '${path}${key}' was removed`;
    case 'updated': {
      const newVal2 = Array.isArray(node.newVal) ? '[complex value]' : node.newVal;
      return `Property '${path}${key}' was updated. From ${newVal} to ${getStrOrNo(newVal2)}`;
    }
    case 'noChanged': return '';
    default: throw new Error(`Unknown state: ${state}`);
  }
};

const plain = (diff, path = '') => {
  const lines = diff
    .map((node) => buildLine(node, path))
    .filter((line) => line !== '')
    .join('\n');

  return lines;
};

export default plain;
