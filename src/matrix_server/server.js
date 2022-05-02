const express = require("express");
const cors = require("cors");

const app = express();

//Using Cors
app.use(cors());

//Init Middleware( include  bodyparser through express)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Metrics Server Running"));

//Define Routes
app.use("/prometheus", require("./routes/promethus.route"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Metrics Server started on port ${PORT}`));