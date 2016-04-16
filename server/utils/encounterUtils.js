var db = require('../config/db.js');
var User = require('../models/user');
var Users = require('../collections/users');
var Encounter = require('../models/encounter');
var Encounters = require('../collections/encounters');
var knex = require('knex');
var bookshelf = require('bookshelf');

// dummy file with dummy info
var dummy = require('../../dummies/dummies.js');

module.exports = {

  createEncounter: function(req, res) {
    Encounters.create({
      userid: req.body.userid,
      // forumid: req.body.forumid,
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      encountertime: req.body.encountertime,
      photo: req.body.photo,
      posttime: new Date()
    })
      // send back a status code to signify success and the encounter for the front-end to use (if necessary)
      .then(function(encounter) {
        console.log('encounter created');
        res.status(200).json(encounter);
      })
      .catch(function(error) {
        console.log('error creating encounter');
        res.status(500).send(error.message);
      });
  },

  showAllEncountersFromUser: function(req, res) {
    new User({ username: req.params.userName })
      .fetch({withRelated: ['encounters']})
      .then(function(user) {
        res.status(200).send({username: user.get('username'), encounters: user.related('encounters')});
      })
      // catch will respond with an empty array if the user doesn't have any encounters
      .catch(function(error) {
        res.status(200).send({encounters: []});
      });
  },

  recentEncounters: function(req, res) {
    Encounters.reset()
      .fetch({withRelated: ['user']})
      .then(function(encounters) {
        // return the last five encounters
        res.status(200).send(encounters.slice(encounters.length - 5));
      })
      .catch(function(error) {
        res.status(500).send(error.message);
      });
  }

};
