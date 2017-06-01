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
    it('should return all items', (done) => {
      chai.request(server)
      .get((error, response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('array')
        response.body.length.should.equal(3)
        response.body[0].should.have.property('name', 'reason', 'cleanliness')
        response.body[0].name.should.equal('ring')
        done()
      });
    });

    it('should return 404 for non existent route', (done) => {
      chai.request(server)
      .get('/api/v1/sad')
      .end((error, response) => {
        response.should.have.status(404)
        done()
      });
    })

    

  })
})
