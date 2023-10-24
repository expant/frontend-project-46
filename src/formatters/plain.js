import _ from 'lodash';

const plain = (diff) => {
  console.log(diff);
  const list = diff.map((node) => {
    const { val } = node;

    if (!Array.isArray(val)) {
      const { sign, key } = node;

      if (sign === '+') {
        return `Property '${key}' was added with value: ${val}`;
      } else if (sign === '-') {
        return `Property '${key}' was removed`;
      } else if (sign === '') {
        return '';
      }
    }

    return plain(val);
 
  });

  return list.filter((line) => line !== '').join('\n');
};

export default plain;