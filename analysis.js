const sample = require('./sample');

(() => {
  Object.entries(sample).forEach(([k1, v1]) => {
    Object.entries(v1).forEach(([k2, v2]) => {
      let total = 0.0;
      let count = 0;

      v2.forEach(e => {
        total += e.amount;
        count++;
      });

      v1[k2] = {
        total: Number(total.toFixed(2)),
        count,
        average: Number((total / count).toFixed(2)),
        data: v2
      };
    });
  });

  console.log(JSON.stringify(sample));
})();
