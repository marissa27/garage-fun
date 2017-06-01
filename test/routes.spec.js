process.env.NODE_ENV = 'test';

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp)

describe('Everything', () => {

  beforeEach((done) => {
   database.migrate.latest()
   .then(() => {
     return database.seed.run()
   })
   .then(() => {
     done()
   })
 })

 afterEach((done) => {
   database.migrate.rollback()
   .then(() => {
     done()
   })
 })

  describe('Client Routes', () => {

    it('should return the homepage', (done) => {
      chai.request(server)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200)
        response.should.be.html
        done()
      })
    })

    it('should return a 404 for a non existent route', (done) => {
      chai.request(server)
      .get('/sad')
      .end((err, response) => {
        response.should.have.status(404)
        done()
      })
    })
  })

  describe('API Routes', () => {
    it('should return all of the items', (done) => {
      chai.request(server)
      .get('/api/v1/items')
      .end((error, response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('array')
        response.body.length.should.equal(3)
        response.body[0].should.have.property('name')
        response.body[0].name.should.equal('ring')
        done()
      });
    });

    it('should return 404 for non existent route', (done) => {
      chai.request(server)
      .get('/api/v1/itemsad')
      .end((error, response) => {
        response.should.have.status(404)
        done()
      });
    })

    it('should create a new item', (done) => {
      chai.request(server)
      .post('/api/v1/items')
      .send(
        {
          name: 'test',
          reason: 'to test',
          cleanliness: 'rancid',
          id: 4,
        }
      )
      .end((error, response) => {
        response.should.have.status(201)
        response.body.should.be.a('object')
        response.body.should.have.property('name')
        response.body.name.should.equal('test')
        chai.request(server)
        .get('/api/v1/items')
        .end((error, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(4)
          response.body[3].should.have.property('name')
          response.body[3].name.should.equal('test')
          done()
        })
      })
    })


    it('should not create an item with missing data', (done) => {
      chai.request(server)
      .post('/api/v1/items')
      .send({
        reason: 'testing',
        cleanliness: 'sparkling',
        id: 5
      })
      .end((err, response) => {
        response.should.have.status(422)
        response.body.error.should.equal('You are missing the name')
      })

      chai.request(server)
      .post('/api/v1/items')
      .send({
        name: 'testing',
        cleanliness: 'sparkling',
        id: 5
      })
      .end((err, response) => {
        response.should.have.status(422)
        response.body.error.should.equal('You are missing the reason for the item')
      })

      chai.request(server)
      .post('/api/v1/items')
      .send({
        name: 'testing',
        reason: 'to test stuff',
        id: 5
      })
      .end((err, response) => {
        response.should.have.status(422)
        response.body.error.should.equal('Please tell me if it is sparkling, dusty, or rancid')
        done()
      })
    })

    


  })
})
