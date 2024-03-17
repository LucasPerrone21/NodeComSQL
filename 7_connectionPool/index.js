const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn.js");

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/books/insert", (req, res) => {
    const title = req.body.nomeLivro;
    const author = req.body.nomeAutor;
    const qtdPages = req.body.qtdPaginas;

    const query = `INSERT INTO books (title, pages, author) VALUES ('${title}' , '${qtdPages}' , '${author}')`;

    conn.query(query, (err) => {
        if (err) {
            console.log(err);
        }

        res.redirect("/");
    });
});

app.get("/books", (req, res) => {
    const query = "SELECT * FROM books";

    conn.query(query, (err, data) => {
        if (err) {
            console.log(err);
        }

        const books = data;
        console.log(books);
        res.render("books", { books });
    });
});

app.get("/books/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = `SELECT * FROM books WHERE idbooks=${id}`;
    conn.query(query, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const book = data[0];
        console.log(book);
        res.render("book", { book });
    });
});

app.get("/books/edit/:id", (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM books WHERE idbooks=${id}`;
    conn.query(query, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const book = data[0];
        console.log(book);
        res.render("editbook", { book });
    });
});

app.post("/books/update/:id", (req, res) => {
    const id = req.params.id;
    const title = req.body.nomeLivro;
    const author = req.body.nomeAutor;
    const qtdPages = req.body.qtdPaginas;

    const query = `UPDATE books SET title = '${title}', pages='${qtdPages}', author='${author}' WHERE idbooks = ${id}`;

    conn.query(query, (err) => {
        if (err) {
            console.log(err);
            return;
        }

        res.redirect("/books");
    });
});

app.post("/books/remove/:id", (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM books WHERE idbooks = ${id}`;
    conn.query(query, (err) => {
        if (err) {
            console.log(err);
            res.redirect("/books");
            return;
        }
        res.redirect("/books");
    });
});

app.listen(3000);
