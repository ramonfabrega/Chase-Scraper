const DESCRIPTION_WORDS = 3;

const test = () => {
  const newArr = filterData(arr);
  const objArr = buildObjects(newArr);
  // console.log(newArr);
  // console.log(objArr);
};

const filterData = arr =>
  arr.filter(
    e =>
      !(e.includes('See details about this transaction') || /^\(\.\.\./.test(e))
  );

const filterDescription = desc => {
  let description = '';

  // console.log(desc);
  const descArr = desc.split(' ').filter(w => w !== '');
  for (let i = 0; i < DESCRIPTION_WORDS; i++) {
    if (!descArr[i].includes('.') && !/\d/.test(descArr[i])) {
      description += `${descArr[i]} `;
    }
  }

  return description.trim();
};

const buildObjects = arr => {
  const res = [];

  for (let i = 0; i < arr.length; i += 5) {
    const date = new Date(arr[i]);
    const description = filterDescription(arr[i + 1]);
    const type = arr[i + 2];
    const amount = Number(arr[i + 3].replace('$', '').replace('−', '-'));

    const obj = { date, description, type, amount };
    res.push(obj);
  }

  return res;
};

// test();

module.exports.parseData = d => buildObjects(filterData(d));
