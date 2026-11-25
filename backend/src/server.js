const app = require("./app");
const { PORT } = require("./config/config");

app.listen(PORT, () => {
  console.log(`RushHour server running on port ${PORT}`);
});