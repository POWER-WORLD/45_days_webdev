const express = require("express");
const ConnectToMongoDB = require("./db/connecttodb");
const cors = require("cors");


//initialize express app
const app = express();
app.use(express.json());
app.use(cors());

//connect to database
ConnectToMongoDB();

//routes
app.use("/api/work-experience", require("./routes/post_work_experience"));
app.use("/api/work-experience", require("./routes/get_all_work_experience"));
app.use("/api/work-experience", require("./routes/get_byid_work_experience"));
app.use("/api/work-search", require("./routes/get_bystates_work_experience"));
app.use("/api/work-experience", require("./routes/delete_byid_work_experience"));
app.use("/api/work-experience", require("./routes/put_byid_work_experience"));


//start server
// app.listen(mongo_port, () => {
//   console.log(`🚀 Server running on http://localhost:${mongo_port}`);
  
// });
module.exports = app;
