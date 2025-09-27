const app = require("./server");
const { mongo_port } = require("./db/config");

const PORT = mongo_port || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
