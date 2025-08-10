const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: "Book One", author: "Author One" },
  { id: 2, title: "Book Two", author: "Author Two" }
];

app.get("/books", (req, res) => res.json(books));

app.post("/books", (req, res) => {
  const newBook = { id: books.length + 1, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id === +req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  Object.assign(book, req.body);
  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  books = books.filter(b => b.id !== +req.params.id);
  res.json({ message: "Book deleted" });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));