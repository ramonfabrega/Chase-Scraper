const DESCRIPTION_WORDS = 3;

const KEYWORDS = ['VENMO', 'CHIPOTLE', 'CHICK-FIL-A', 'PLUCKERS', 'DOORDASH'];

const filterJunk = arr =>
  arr.filter(
    e =>
      !(
        e.includes('See details about this transaction') ||
        e.includes('information dialog') ||
        /^\(\.\.\./.test(e)
      )
  );

const filterDescription = desc => {
  let description = '';

  desc = desc.replace('*', ' ');

  const descArr = desc.split(' ').filter(w => w !== '');

  if (descArr.length > DESCRIPTION_WORDS) {
    for (let i = 0; i < DESCRIPTION_WORDS; i++) {
      if (
        !descArr[i].includes('.') &&
        !/\d/.test(descArr[i]) &&
        descArr !== '-'
      ) {
        description += `${descArr[i]} `;
      }
    }
  } else {
    return desc;
  }

  return streamlineDescription(description.trim());
};

const streamlineDescription = desc => {
  KEYWORDS.forEach(w => {
    if (desc.includes(w)) desc = w;
  });

  return desc.toUpperCase();
};

const buildObjects = arr => {
  const objs = [];

  for (let i = 0; i < arr.length; i += 5) {
    const date = arr[i];
    const description = filterDescription(arr[i + 1]);
    const type = arr[i + 2];
    const amount = Number(arr[i + 3].replace('$', '').replace('−', '-'));

    const obj = { date, description, type, amount };
    objs.push(obj);
  }

  return {
    byDate: groupBy('date')(objs),
    byDesc: groupBy('description')(objs),
    byType: groupBy('type')(objs)
  };
};

const groupBy = key => array =>
  array.reduce(
    (objectsByKeyValue, obj) => ({
      ...objectsByKeyValue,
      [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
    }),
    {}
  );

module.exports.filter = d => buildObjects(filterJunk(d));
