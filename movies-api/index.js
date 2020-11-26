import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import bodyParser from 'body-parser';
//use body-parser in it's middleware stack. 
dotenv.config();

const app = express();

const port = process.env.PORT;
//Add the bodyparser.json() and bodypsrser.urlencoded() 
//to the app's middleware stack. 
//The parsers must be put into the code before the moviesRouter. 
//Remember Express executes the middleware stack in the order that is appears in the code.
//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());//step to add post(Add movies)_

app.use(express.static('public'));
app.use('/api/movies', moviesRouter);



app.listen(port, () => {
  console.info(`Server running at ${port}`);
});