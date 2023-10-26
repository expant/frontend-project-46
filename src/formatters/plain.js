const getStrOrNo = (val) => (typeof (val) === 'string' ? `'${val}'` : val);

const buildLine = (node, path) => {
  const { state, key, val } = node;
  if (Array.isArray(val) && state === 'noChanged') {
    return plain(val, `${path}${key}.`);
  }
  const newVal = getStrOrNo(val);
  const newVal2 = Array.isArray(newVal) ? '[complex value]' : newVal;

  switch (state) {
    case 'added':
      return `Property '${path}${key}' was added with value: ${newVal2}`;
    case 'removed':
      return `Property '${path}${key}' was removed`;
    case 'updated':
      const newVal3 = Array.isArray(node.newVal) ? '[complex value]' : node.newVal;
      return `Property '${path}${key}' was updated. From ${newVal2} to ${getStrOrNo(newVal3)}`;
    default:
  }
};

const plain = (diff, path = '') => {
  const lines = diff
    .map((node) => buildLine(node, path))
    .filter((line) => line !== undefined)
    .join('\n');

  return lines;
};

export default plain;
