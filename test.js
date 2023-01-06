const axios = require("axios");

axios
  .get(
    "http://prod.danawa.com/info/?pcode=10261191&keyword=MU613&cate=10224476"
  )
  .then((d) => console.log(d));
