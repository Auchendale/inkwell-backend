const app = require("./app");

app.listen(5050, (err) => {
  if (err) console.log(err);
  else console.log("listening on 5050...");
});
