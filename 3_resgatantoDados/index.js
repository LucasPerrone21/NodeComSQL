const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

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

app.get("/books/get", (req, res) => {
    const query = "SELECT * FROM books";

    const resposta = conn.query(query, (err, data) => {
        if (err) {
            console.log(err);
        }

        const books = data;
        console.log(books);
        res.render("books", { books });
    });
});

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sqlnodejs",
});

conn.connect((err) => {
    if (err) {
        console.log(err);
    }

    console.log("conectou ao MySQL");

    app.listen(3000);
});
