const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) 
{
   res.sendFile(__dirname+"/index.html");

   console.log("file sending....");
    
});


app.post("/", function(req, res){
    

const query = req.body.cityname;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=3e53120f5091636748c8ecdc6825fd05";
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const WeatherData = JSON.parse(data);
            console.log(WeatherData);
            const temp = (WeatherData.main.temp);
            const description = (WeatherData.weather[0].description);
            const icon = WeatherData.weather[0].icon;
            const imageURL = " http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>Temperature of "+query+" is "+ temp+" degree celcius</h1>");
            res.write("<p>Weather is "+description+"</p>");
            res.write("<img src="+imageURL+">");
            res.send();
        })

    });

});








app.listen(3000, function () {
    console.log("server is running on 3000 port.");
});





