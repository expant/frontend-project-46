import _ from 'lodash';

export default (diff, replacer = ' ', indentsCount = 2) => {
  console.log('---------------------- FORMATTER -----------------------')
  const leftShift = 2;
  const iter = (current, depth) => {
    // console.log(current);
    const formattedDiff = current.map((node) => {
      // console.log(`--------------- ${JSON.stringify(node)}`);
      const { key, val } = node;
      const indentSize = _.has(node, 'sign') 
        ? depth * indentsCount - leftShift : depth * indentsCount;
      const indent = replacer.repeat(indentSize);

      if (_.isObject(val) || Array.isArray(val)) {
        const nextNode = iter(val, depth + 1, indentsCount);
        return [
          '{', 
          '\n', 
          indent,
          `${key}: ${nextNode}`,
          '\n',
          indent - leftShift,
          '}',
        ].join('');
      }

      return [
        indent, 
        _.has(node, 'sign') ? node.sign : ' ',
        ` ${key}: ${val}`,
        '\n',
      ].join('');
    });

    return formattedDiff;
  };

  return iter(diff, 1);
};
