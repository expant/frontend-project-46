import _ from 'lodash';

const compare = (obj1, obj2) => {
  const newObj = { ...obj1, obj2 };
  const entries = Object.entries(newObj);

  console.log(newObj);

  const result = entries.reduce((acc, [key,]) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      const prop1 = `${key}: ${obj1[key]}`;
      const prop2 = `${key}: ${obj2[key]}`;

      if (obj1[key] === obj2[key]) {
        acc.push(prop1);
        return acc;
      }
      acc.push(`- ${prop1}`);
      acc.push(`+ ${prop2}`);
      return acc;
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      const prop = `${key}: ${obj1[key]}`;
      acc.push(`- ${prop}`);
      return acc;
    }
    const prop = `${key}: ${obj2[key]}`;
    acc.push(`+ ${prop}`);
    return acc;
  }, []);


  console.log(result);
  return result;
};

export default compare;


// const entries = Object.entries(obj1);


//     if (_.has(obj2, key)) {
//       if (obj1[key] === obj2[key]) {
//         return `${acc}\n  ${key}: ${obj1[key]}`;
//       }
//       return `${acc}\n- ${key}: ${obj1[key]}\n+ ${key}: ${obj2[key]}`;
//     }
//     return `${acc}\n- ${key}: ${obj1[key]}`;
//   }, '');


//   console.log(result);
//   return `{\n${result}\n}`;