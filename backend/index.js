const express = require('express');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const { languagemodel } = require('./ai_model.js');
const path = require('path');
const ejs = require('ejs');

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`listening on http://localhost:${port}/product-analysis`)
);

// app.get('/product-analysis', (req, res) => {
//   try {
//     res.render('index')
//     console.log(req.body)
//   } catch (error) {
//     console.log(error)
//   }
// })
app.post('/product-analysis',async function (req, res) {
  try {
    // res.render('index');
    const productName = req.body.product_name;
    // res.json({ message: `successfully fetched the product! ${req.body.product_name}` });
    const result = await languagemodel(productName);
    res.render('index', { result });
    console.log(result);
    // res.redirect('/product-analysis')
    // Render 'index.ejs' with the result data as a variable

  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred during product analysis.');
  }
});
app.get('/product-analysis/', (req, res) => {
  // Fetch analysis data based on the product name (optional)
  // ...
  // res.json({message: 'product succesfully fetched'})
  res.render('index')
});
