'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  q: String,
  choices: Array,
  answer: String
});

module.exports = mongoose.model('Question', QuestionSchema);