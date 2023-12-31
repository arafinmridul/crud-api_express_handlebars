const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const { logger } = require("./middleware/logger");

const app = express();

// init middleware
// app.use(logger);

// handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// body parser middleware
app.use(express.json());
// handle form submissions
app.use(express.urlencoded({ extended: false }));

// Members API Routes
app.use("/api/members", require("./routes/api/members"));

// Set static folder
// use method is used to include middleware
// static is a built in middleware
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
// res.sendFile(path.join(__dirname, "public", "index.html"));
// });

const PORT = process.env.PORT || 5000;

// before this routes or endpoints should be created
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
