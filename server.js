const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Garage Items';

app.use(express.static('public'));

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
});

app.get('/api/v1/items', (request, response) => {
  database('items').select()
  .then(item => response.status(200).json(item))
  .catch(error => response.status(404).send({ error }))
});


app.get('/api/v1/items/:id', (request, response) => {
  database('items').where('id', request.params.id).select()
    .then(item => response.status(200).json(item))
    .catch((error) => {
      response.status(404).send('This item does not exist', error);
    });
});

app.post('/api/v1/items', (request, response) => {
  const item = request.body;

  const { name, reason, cleanliness } = request.body;

  if (!name) {
    response.status(422).send({
      error: 'You are missing the name'
    })
  } else if (!reason) {
    response.status(422).send({
      error: 'You are missing the reason for the item'
    })
  } else if (!cleanliness) {
    response.status(422).send({
      error: 'Please tell me if it is sparkling, dusty, or rancid'
    })
  } else {
    database('items').insert(item)
    .then(junk => {
      response.status(201).json({ name: name, reason: reason, cleanliness: cleanliness })
    })
    .catch(error => {
      response.status(500).send({ error });
    })
  }
});

app.patch('/api/v1/items/:id/edit', (request, response) => {
  database('items').where('id', request.params.id)
    .update({
      cleanliness: request.body.cleanliness
    })
    .then(() => {
      database('items').select()
      .then((items) => {
        response.status(200).json(items);
      })
      .catch(error => {
        response.status(400).send({
          error: 'Can only change cleanliness.'
        });
      });
    });
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  });
}

module.exports = app;
