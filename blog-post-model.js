const uuid = require('uuid/v4');

let blogDB = [{
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

const blogPosts = {
    get: function() {
        return blogDB;
    },
    getSportWithID: function(id) {
        for (let index = 0; index < blogDB.length; index++) {
            if (blogDB[index].id == id) {
                return blogDB[index];
            }
        }
    },
    getAuthorBlogPost: function(author) {
        let arrBlogPosts = [];

        blogDB.forEach(blog => {
            if (blog.author == author) {
                arrBlogPosts.push(blog);
            }
        })

        return arrBlogPosts;

    },
    addBlogPost: function(title, content, author) {
        let post = {
            id: uuid(),
            title: title,
            content: content,
            author: author,
            publishDate: Date.now()
        }

        blogDB.push(post);

        return post;

    },
    deletePostWithID: function(id) {
        for (let index = 0; index < blogDB.length; index++) {
            if (blogDB[index].id == id) {
                blogDB.splice(index, 1);
                return true;
            }
        }
        return false;
    },
    updateBlogWithID: function(id, blogPost) {
        for (let index = 0; index < blogDB.length; index++) {
            if (blogDB[index].id == id) {
                blogDB[index] = Object.assign(blogDB[index], blogPost);
                return true;
            }
        }
        return false;
    }
}


module.exports = { blogPosts };