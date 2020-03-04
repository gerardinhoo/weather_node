const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


// POST REQUEST TO GET A WEATHER FROM A CITY
app.post("/", (req, res) => {
    let query = req.body.city;
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=c025da23c3fa730bd5a60314d393f61b&units=imperial"
    axios.get(url)
        .then(response => {
            const temp = response.data.main.temp;
            const nature = response.data.weather[0].description;
            const base = response.data.base;
            const country = response.data.sys.country;
            const icon = response.data.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            // Output to web page
            res.write("<p>Temperature:</p> " + temp);
            res.write("<p>Nature:</p> " + nature);
            res.write("<p>Visibility:</p> " + base);
            res.write("<p>Country:</p> " + country);
            res.write("<img src=" + imageUrl + ">");
            res.send()
        })
        .catch((error) => {
            console.log(error)
        })
})



// app.get("/", (req, res) => {
//     const url = "http://api.openweathermap.org/data/2.5/weather?q=London&APPID=c025da23c3fa730bd5a60314d393f61b&units=imperial"
//     axios.get(url)
//         .then(response => {
//             const temp = response.data.main.temp;
//             console.log(temp)
//             const nature = response.data.weather[0].description;
//             const base = response.data.base;
//             const country = response.data.sys.country;
//             const icon = response.data.weather[0].icon;
//             const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

//             // Output to web page
//             res.write("<p>Temperature:</p> " + temp);
//             res.write("<p>Nature:</p> " + nature);
//             res.write("<p>Visibility:</p> " + base);
//             res.write("<p>Country:</p> " + country);
//             res.write("<img src=" + imageUrl + ">");
//             res.send()
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })



app.listen("3000", () => {
    console.log("Listenning to App on 3000")
})