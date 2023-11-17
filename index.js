const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jobRouter = require("./routes/jobs.routes");
const jobApplicationRouter = require("./routes/jobapplications.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", jobRouter);
app.use("/api", jobApplicationRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
