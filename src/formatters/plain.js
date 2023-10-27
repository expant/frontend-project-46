const getStrOrNo = (val) => (typeof (val) === 'string' ? `'${val}'` : val);
const getComplexValOrSimple = (val) => {
  if (Array.isArray(getStrOrNo(val))) {
    return '[complex value]';
  }
  return getStrOrNo(val);
}

const buildLine = (node, path) => {
  const { state, key, val } = node;
  if (Array.isArray(val) && state === 'noChanged') { // 2
    return plain(val, `${path}${key}.`);
  }
  if (state === 'noChanged') return ''; // 3

  const newVal = getComplexValOrSimple(val); 
  switch (state) {
    case 'added':
      return `Property '${path}${key}' was added with value: ${newVal}`;
    case 'removed':
      return `Property '${path}${key}' was removed`;
    case 'updated': {
      const newVal2 = Array.isArray(node.newVal) ? '[complex value]' : node.newVal;
      return `Property '${path}${key}' was updated. From ${newVal} to ${getStrOrNo(newVal2)}`;
    } 
    default: throw new Error(`Unknown state: ${state}`);
  }
};

const removeEmptyItems = (item) => item !== '';

const plain = (diff, path = '') => {
  return diff
    .map((node) => buildLine(node, path))
    .filter(removeEmptyItems)
    .join('\n');
};

export default plain;
