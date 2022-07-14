const express = require('express'),
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid'),
fs = require('fs'),
path = require('path');

let app = express();

app.use(bodyParser.json());

let users = [
  {
    "id": "1",
    "name": "Wlad",
    "favoriteMovies": []
  },
  {
    "id": "2",
    "name": "Sheyla",
    "favoriteMovies": ['Aladdin']
  }
];

let movies = [
  {
    "Title": "Star Wars: The Phantom Menace",
    "Description": "Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their original glory.",
    "Director": {
      "name": "George Lucas",
      "Birth Year": "1944",
      "Bio": "George Walton Lucas Jr. is an American film director, producer, screenwriter, and entrepreneur. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, LucasArts, and Industrial Light & Magic."
    },
    "Genre": {
      "Name": "Sci-Fi",
      "Description": "Obi Wan and Anakin Skywalker first meet in what will become one of the greatest saga in cinema history"
    }
  },
  {
    "Title": "Star Wars: Attack of the Clones",
    "Description": "Ten years after initially meeting, Anakin Skywalker shares a forbidden romance with Padmé Amidala, while Obi-Wan Kenobi investigates an assassination attempt on the senator and discovers a secret clone army crafted for the Jedi.",
    "Director": {
      "name": "George Lucas",
      "Birth Year": "1944",
      "Bio": "George Walton Lucas Jr. is an American film director, producer, screenwriter, and entrepreneur. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, LucasArts, and Industrial Light & Magic."
    },
    "Genre": {
      "Name": "Science Fiction",
      "Description": "10 years later after the events of Episode I, Anakin returns to meet with Padme once again while war brews on the horizon"
    }
  },
  {
    "Title": "Star Wars: Revenge of the Sith",
    "Description": "Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. As Obi-Wan pursues a new threat, Anakin acts as a double agent between the Jedi Council and Palpatine and is lured into a sinister plan to rule the galaxy.",
    "Director": {
      "name": "George Lucas",
      "Birth Year": "1944",
      "Bio": "George Walton Lucas Jr. is an American film director, producer, screenwriter, and entrepreneur. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, LucasArts, and Industrial Light & Magic."
    },
    "Genre": {
      "Name": "Sci-Fi",
      "Description": "Haunted by nightmares of Padme's death, Anakin seeks help from the dark side if it means he can save her."
    },
  },
  {
    "Title": "Star Wars: A New Hope",
    "Description": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
    "Director": {
      "name": "George Lucas",
      "Birth Year": "1944",
      "Bio": "George Walton Lucas Jr. is an American film director, producer, screenwriter, and entrepreneur. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, LucasArts, and Industrial Light & Magic."
    },
    "Genre": {
      "Name": "Sci-Fi",
      "Description": "The film follows Luke Skywalker, a young farmer with dreams of becoming a pilot as he fights the Empire and discovers he is Force sensitive."
    }
  },
  {
    "Title": "Star Wars: The Empire Strikes Back",
    "Description": "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.",
    "Director": {
      "name": "Irvin Kershner",
      "Birth Year": "1923",
      "Bio": "Irvin Kershner was an American director, actor, and producer of film and television. He gained notice early in his career as a filmmaker for directing quirky, independent drama films, while working as an influential lecturer at the University of Southern California."
    },
    "Genre": {
      "Name": "Sci-Fi",
      "Description": "The Empire strikes back in this action packed film with heart stopping revelations"
    }
  },
  {
    "Title": "Star Wars: Return of the Jedi",
    "Decription": "After a daring mission to rescue Han Solo from Jabba the Hutt, the Rebels dispatch to Endor to destroy the second Death Star. Meanwhile, Luke struggles to help Darth Vader back from the dark side without falling into the Emperor's trap.",
    "Director": {
      "name": "Richard Marquand",
      "Birth Year": "1937",
      "Bio": "Richard Marquand was a Welsh film and television director active in both US and UK film productions,[1] best known for directing 1983's Star Wars Episode VI: Return of the Jedi. He also directed the critically acclaimed 1981 drama film Eye of the Needle, the quiet Paris set romance Until September, and the hit 1985 thriller Jagged Edge."
    },
    "Genre": {
      "Name": "Sci-Fi",
      "Description": "The Saga ends in this thrilling movie packed with action and redemption stories."
    }
  },
  {
    "Title": "Harry Potter and the Prisoner of Azkaban",
    "Decription": "Harry Potter, Ron and Hermione return to Hogwarts School of Witchcraft and Wizardry for their third year of study, where they delve into the mystery surrounding an escaped prisoner who poses a dangerous threat to the young wizard.",
    "Director": {
      "name": "Alfonso Cuaron",
      "Birth Year": "1961",
      "Bio": "Alfonso Cuarón Orozco was born on November 28th in Mexico City, Mexico. From an early age, he yearned to be either a film director or an astronaut. However, he did not want to enter the army, so he settled for directing."
    },
    "Genre": {
      "Name": "Fantasy",
      "Description": "Harry Potter, Ron and Hermione discover hidden secrets and save more than one life in this exciting adventure"
    },
  },
  {
    "Title": "The Lord of the Rings: The Fellowship of the Ring",
    "Decription": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron",
    "Director": {
      "name": "Peter Jackson",
      "Birth Year": "1961",
      "Bio": "Sir Peter Jackson made history with The Lord of the Rings trilogy, becoming the first person to direct three major feature films simultaneously."
    },
    "Genre": {
      "Name": "Fantasy",
      "Description": "Frodo joins forces with Gandalf and the newly formed fellowship to destroy the one ring to rule them all"
    }
  },
  {
    "Title": "Aladdin",
    "Description": "A kindhearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true.",
    "Director": {
      "name": "Ron Clements",
      "Birth Year": "1953",
      "Bio": "Ron Clements was born on April 25, 1953 in Sioux City, Iowa, USA. He is a writer and director, known for Hercules, Aladdin and The Princess and the Frog."
    },
    "Genre": {
      "Name": "Adventure",
      "Description": "A street rat falls in love but in the shows to be the true diamond in the rough."
    }
  },
  {
    "Title": "John Wick",
    "Description": "An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.",
    "Director": {
      "name": "Chad Stahelski",
      "Birth Year": "1968",
      "Bio": "He came from a kick-boxing background; he entered the film field as a stunt performer at the age of 24. Before that, he worked as an instructor at the Inosanto Martial Arts Academy in California, teaching Jeet Kune Do/Jun Fan."
    },
    "Genre": {
      "Name": "Action",
      "Description": "Retired hit man is forced into the line of work after his dog is killed during a robbery"
    }
  },
];

//Read all movies
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

//Read movie 
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title)

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send("No such movie");
    }

});

//Read genre
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send("No such genre movie");
    }

});

//Read director details
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const directors = movies.find(movie => movie.Director.name === directorName).Director;

    if (directors) {
        res.status(200).json(directors);
    } else {
        res.status(400).send("No such directors");
    }

});

//add new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  if (newUser.name) {
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(201).json(newUser)
  } else {
      res.status(400).send("users need name");
  }
});


//update user
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);
    if (user) {
        user.name = updatedUser;
        res.status(200).json(user);
    } else {
        res.status(400).send("No such user")
    }
});

//post - add movie to favoriteMovies list
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);
    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
    } else {
        res.status(400).send("No such user");
    }
})

//Delete movie from user's favoriteMovies list
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);
    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
    } else {
        res.status(400).send("No such user");
    }
});

//Delete user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);
    if (user) {
        users = users.filter(user => user.id !== id);
        res.status(200).send(`user email with ${id} is removed`);
    } else {
        res.status(400).send("No such user");
    }
});

//Read
app.get('/', (req, res) => {
    res.send("Welcome to myFlix Movie App!");
});

//serving static files
app.use(express.static('public'));

//Morgan middleware library to log all requests
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }));

//error-handling middleware library
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => console.log("app is listening on port 8080"));