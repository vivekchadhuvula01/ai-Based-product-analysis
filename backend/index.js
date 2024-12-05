import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import { languagemodel } from './ai_model.js';
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`listening on ${port}`)
);
app.get('/product-analysis', (req, res) => {
   try {
       res.send('welcome on board!')
       console.log(req.body)
   } catch (error) {
    console.log(error)
   }
})
app.post('/product-analysis', function (req, res) {
  try {
    languagemodel(req.body.product_name)
    console.log( req.body);
      res.send(req.body);
      

  } catch (error) {
      console.log(error);
  }
});