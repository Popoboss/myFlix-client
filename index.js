const express = require('express'),
morgan = require('morgan'),
fs = require('fs'), // import built in node modules fs and path
path = require('path');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

let topMovies =[
  {
    title: 'Star Wars Episode I',
    author: 'George Lucas'
  },
  {
    title: 'Star Wars Episode II',
    author: 'George Lucas'
  },
  {
    title: 'Star Wars Episode III',
    author: 'George Lucas'
  },
  {
    title: 'Star Wars Episode IV',
    author: 'George Lucas'
  },
  {
    title: 'Star Wars Episode V',
    author: 'George Lucas'
  },
  {
    title: 'Star Wars Episode VI',
    author: 'George Lucas'
  },
  {
    title: 'Harry Potter and the Prisoner of Azkaban',
    author: 'J.K Rowling'
  },
  {
    title: 'Lord of the Rings: Fellowship of the Ring',
    author: 'J.R.R Tolkien'
  },
  {
    title: 'Aladdin',
    author: 'Disney'
  },
  {
    title: 'John Wick',
    author: 'Derek Kolstad'
  }

];

app.use(morgan('combined', {stream: accessLogStream}));


  app.get('/', (req, res) => {
    res.send('Welcome to my favorite movie list!');
  });

  app.get('/movies', (req, res) => {
    res.json(topMovies)
});

 app.use(express.static('public'));

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oops, something broke!');
  });

  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
