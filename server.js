const express = require('express');
const app = express();
const uuid = require('uuid/v4');
const port = process.env.PORT || 8080;
const www = process.env.WWW || './';
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

let blogArray = [{
        id: uuid(),
        title: "Mi primer blog",
        content: "Ludum nae krystha sreh",
        author: "No one",
        publishDate: Date.now()
    },
    {
        id: uuid(),
        title: "Mi segundo blog",
        content: "A blog always pays its debts",
        author: "Noiryt",
        publishDate: Date.now()
    },
    {
        id: uuid(),
        title: "Mi tercer blog",
        content: "A blog always pays its debts",
        author: "martin",
        publishDate: Date.now()
    }
]

app.use(express.static(www));
console.log(`serving ${www}`);

app.get('/blog-posts', jsonParser, (req, res) => {
    res.status(200).json({
        message: "Succesfully sent the list of blogs",
        status: 200,
        posts: blogArray
    });
})

app.get('/blog-posts/:author', jsonParser, (req, res) => {
    let author = req.params.author;

    let authorPosts = [];

    if (author == "" || author == undefined) {
        res.status(406).json({
            message: "Author not specified",
            status: 406
        });
    }

    blogArray.forEach(element => {
        if (element.author == author) {
            authorPosts.push(element);
        }
    });

    if (authorPosts.length > 0) {
        res.status(200).json({
            message: "Succesfully sent the list of blogs",
            status: 200,
            posts: authorPosts
        });
    } else {
        res.status(404).json({
            message: "Author doesn't exist",
            status: 404
        });
    }


})

app.post('/blog-post', jsonParser, (req, res) => {

    let title = req.body.title;
    let content = req.body.content;
    let author = req.body.author;
    let date = Date.now();

    if (title == undefined || title == "" || content == undefined || author == undefined) {
        res.status(406).json({
            message: "A value is missing",
            status: 400
        })
    }

    let post = {
        id: uuid(),
        title: title,
        content: content,
        author: author,
        publishDate: date
    }

    blogArray.push(post);

    res.status(201).json({
        message: "Succesfully added new post",
        status: 201,
        blogs: post
    })

})

app.delete('/blog-posts/:id', jsonParser, (req, res) => {
    let idP = req.params.id;
    let idB = req.body.id;


    if (idP != idB) {
        res.status(406).send('Not matching values in body and params!');
    } else {
        for (let index = 0; index < blogArray.length; index++) {
            if (blogArray[index].id == idP) {
                blogArray.splice(index, 1);
                res.status(204).send('Deleted successfully');
            } else if (index == blogArray.length) {
                res.status(404).send('Blog doesnt exist!');
            }

        }
    }

})

app.put('/blog-posts/:id', jsonParser, (req, res) => {
    let idP = req.params.id;
    let idB = req.body.post.id;
    let post = req.body.post;

    if (idP != idB) {
        res.status(406).send('Not matching values in body and params!');
    } else {
        for (let index = 0; index < blogArray.length; index++) {
            if (blogArray[index].id == idP) {
                blogArray[index] = Object.assign(blogArray[index], post);
                res.status(200).send('Updated Sucessfully');
            } else if (index == blogArray.length) {
                res.status(404).send('Blog doesnt exist!');
            }

        }
    }

})


app.listen(port, () => console.log(`listening on http://localhost:${port}`));