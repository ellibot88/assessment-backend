const express = require("express");
const cors = require("cors");

const app = express();
const fortunes = [
  "Fortune favors the brave",
  "You will be met by a pleasant stranger",
  "Don't look behind you",
  "The answer is 42",
  "Confucius is a wise man",
];

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/fortune/all", (req, res) => {
  res.status(200).send(fortunes);
});

app.get("/api/compliment", (req, res) => {
  const compliments = [
    "Gee, you're a smart cookie!",
    "Cool shirt!",
    "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
});

app.get("/api/fortune", (req, res) => {
  // choose random compliment
  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune);
});

app.post("/api/fortune", (req, res) => {
  console.log(req.body);
  fortunes.push(req.body.data);
  res
    .status(200)
    .send(
      `Thanks for you submission! There are now ${fortunes.length} fortunes in the database.`
    );
});

app.put("/api/fortune", (req, res) => {
  console.log(+req.body.number);
  fortunes.splice(+req.body.number - 1, 1, req.body.Text);

  res.status(200).send("test");
});

app.delete("/api/fortune", (req, res) => {
  const deletedFortune = fortunes.splice(fortunes.length - 1, 1);
  if (fortunes.length === 0) {
    res
      .status(200)
      .send("There are no fortunes to delete! Try adding some instead!");
  } else {
    res
      .status(200)
      .send(`You deleted the following fortune: ${deletedFortune}`);
  }
});

app.listen(4000, () => console.log("Server running on 4000"));
