const converter = require("json-2-csv");
const axios = require("axios");

const fetchPromethusData = async (request, response) => {
  axios
    .get(
      "http://localhost:9090/api/v1/query?query=container_cpu_cfs_periods_total"
    )
    .then((promethusData) => {
      let documents = [
        {
            Make: 'Nissan',
            Model: 'Murano',
            Year: '2013',
            Specifications: {
                Mileage: '7106',
                Trim: 'S AWD'
            }
        },
        {
            Make: 'BMW',
            Model: 'X5',
            Year: '2014',
            Specifications: {
                Mileage: '3287',
                Trim: 'M'
            }
        }
    ];
      let json2csvCallback = function (err, csv) {
        if (err) throw err;
        console.log(csv);
      };

      converter.json2csv(documents, json2csvCallback);
    });
};

module.exports = {
  fetchPromethusData,
};
