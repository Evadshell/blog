import express from "express";
import bodyParser from "body-parser";
// Load the full build.
import _ from "lodash";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
const title =["hello","hehe"];
const text = ["tejas here","namaste"];
const low = ["hello","hehe"];

app.get("/compose",(req,res)=>{
    res.render("compose.ejs")
})
app.post("/", (req, res) => {
  const t = req.body["f"];
  const k = req.body["l"];
  title.push(t);
  text.push(k);
  low.push(_.lowerCase(t));
  console.log(title);
  console.log(text);
  console.log(low);

  res.render("index.ejs", { title: title, text: text ,low:low });
});
app.get(`/`,(req,res)=>{
    res.render("index.ejs",{title:title,text:text,low:low});
})
app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
app.get("/post/:name",(req,res)=>{
    console.log(req.params.name);
    const m = _.lowerCase(req.params.name);
    if(low.includes(m)){
        console.log("match found")
        const i = title.indexOf(m);
        res.render("post.ejs",{title:title[i],text:text[i]});
    }
})
app.listen(port,()=>{
    console.log(`port is running at ${port}`);
});
