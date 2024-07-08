require("dotenv").config();
const app = require("../src/api");


console.log(process.env.API_PORT);
let port = process.env.API_PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);