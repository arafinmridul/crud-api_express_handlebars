const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const { engine } = require("express-handlebars");
const { logger } = require("./middleware/logger");
const { members } = require("./Members");

const app = express();

// init middleware
// app.use(logger);

// handlebars middleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// use method is used to include middleware

// body parser middleware
app.use(express.json());
// handle form submissions
app.use(express.urlencoded({ extended: false }));

// view engine and static folder, one or the other is needed

// Homepage Route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Member App",
    members: members,
  });
});

// Set static folder
// static is a built in middleware
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use("/api/members", require("./routes/api/members"));

// app.get("/", (req, res) => {
// res.sendFile(path.join(__dirname, "public", "index.html"));
// });

const PORT = process.env.PORT || 5000;

// before this routes or endpoints should be created
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
