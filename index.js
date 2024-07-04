import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let posts= [];
app.get("/", (req, res) => {
    res.render("index.ejs", {
        allPosts: posts
    });
});

app.get("/index", (req, res) => {
    res.redirect('/');
});

app.get("/postCreator", (req, res) => {
    res.render("postCreator.ejs");
});

app.post("/submit", (req, res) => {
    let singlePost = {
        topic: req.body['TopicOfPost'],
        content: req.body['TextContentPost'],
        date: getCurrentDate()
    }
    posts.unshift(singlePost);
    res.redirect('/');
});

app.get('/edit/:index', (req, res) => {
    const postIndex = req.params.index;
    const postToEdit = posts[Number(postIndex)];
    res.render("postEditor.ejs", {
        index: postIndex,
        post: postToEdit
    })
});

app.post('/edit/:index', (req, res) => {
    const postIndex = req.params.index;
    const updatedTopic = req.body['TopicOfPost'];
    const updatedContent = req.body['TextContentPost'];
    posts[Number(postIndex)].topic = updatedTopic;
    posts[Number(postIndex)].content = updatedContent;
    posts[Number(postIndex)].date = getCurrentDate();
    res.redirect('/');
});

app.delete('/delete/:index', (req, res) => {
    const postIndex = req.params.index;
    posts.splice(Number(postIndex), 1);
});

app.listen(port, ()=> {
    console.log(`Server is working on port: ${port}`);
})

function getCurrentDate(){
    let currentDate = new Date();

    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1; 
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

     return hours + ":" + minutes + ", " + day + "." + month + "." + year;
}
