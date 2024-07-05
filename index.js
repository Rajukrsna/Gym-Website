const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Dummy data
let userProgress = {
  age: null,
  weight: null,
  height: null,
  maintenanceCalories: 0,
  caloriesTaken: 0,
  exerciseDone: 0
};


// Routes

app.get('/', (req, res) => {
  res.render('homePage.ejs');
});
app.get('/form', (req, res) => {
    res.render('form.ejs');
});
app.post('/submit', (req, res) => {
  userProgress.age = parseInt(req.body.age, 10);
  userProgress.weight = parseInt(req.body.weight, 10);
  userProgress.height = parseInt(req.body.height, 10);
    userProgress.maintenanceCalories = (10 * userProgress.weight) + (6.25 * userProgress.height) - (5 * userProgress.age) + 5;
    res.redirect("/tracking-dashboard");
  });
  app.get('/tracking-dashboard', (req, res) => {
    res.render('dashboard.ejs', { progress: userProgress });
  });

  app.get('/friendsDashboard', (req, res) => {
   
    res.render("friendsDashboard.ejs")
  });
  app.get('/foodTrack', (req, res) => {
   
    res.render("foodtrack.ejs")
  });
  app.get('/register', (req, res) => {
   
    res.render("registration.ejs")
  });
// Define other routes for friends dashboard, etc. as needed.

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});