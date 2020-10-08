const express = require('express');
// var bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);


  const options = {
    url: "https://us2.api.mailchimp.com/3.0/lists/80b7d3129f",
    method: "POST",
    headers: {
      "Authorization": "ajeet 13355db2fac9a421cb3329e407b57a26-us2",

    },
    body: jsonData
  }
  request(options, (error, response, body) => {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
      } else {
        res.sendFile(__dirname + "/failure.html")
      }
    }
  });

});
app.post("/failure", (req, res) => {
  res.redirect("/");
});



app.listen(process.env.PORT || 3000, () => console.log('server stated on port 3001'));

