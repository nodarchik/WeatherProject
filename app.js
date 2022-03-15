const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req,res){

    const city = req.body.sityName;
    const apikey = "7163b0c558423d7725182e6b65edad10";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){

        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageurl= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>The temperature in "+city+" is "+ temp + " degrees Celsius.</h1>");
        res.write("<p>The weather is currently " + description + "</p>"); 
        res.write("<img src="+imageurl+">");
        res.send();
    })
})
})



app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})