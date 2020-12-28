import './db';
import session from 'express-session';
import passport from './authenticate';
import {loadUsers} from './seedData'
import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import bodyParser from 'body-parser';
import usersRouter from './api/users';


//use body-parser in it's middleware stack. 
dotenv.config();

const app = express();

// eslint-disable-next-line no-undef
const port = process.env.PORT;
//Add the bodyparser.json() and bodypsrser.urlencoded() 
//to the app's middleware stack. 
//The parsers must be put into the code before the moviesRouter. 
//Remember Express executes the middleware stack in the order that is appears in the code.
//configure body-parser
// eslint-disable-next-line no-undef
const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};

if (process.env.SEED_DB) {
  loadUsers();
}
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));
// initialise passport​
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());//step to add post(Add movies)_

app.use(express.static('public'));
app.use('/api/movies', moviesRouter);
//Users router
app.use('/api/users', usersRouter);

// Add passport.authenticate(..)  to middleware stack for protected routes​
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);

app.use(errHandler);


app.listen(port, () => {
  console.info(`Server running at ${port}`);
});