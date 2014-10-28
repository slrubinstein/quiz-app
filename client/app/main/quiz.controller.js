'use strict';

angular.module('quizApp')
  .controller('QuizCtrl', function($http, $interval, $scope, scoreFactory, timerFactory) {   
    var self = this;
    this.quiz = false;
    this.loadQuiz = function() {
      this.quiz = true;
    }
    this.questions = [];
    $http.get('/api/questions').success(function(questions) {
      self.questions = questions;
    });
    
    this.scoreFactory = scoreFactory;
    this.increaseScore = function(points) {
      self.scoreFactory.score += points;
    };
    
    this.timerFactory = timerFactory;

    this.timer = 3;
    this.startTimer = function() {
      timerFactory.startTimer(this);
    };
    this.stopTimer = function() {
      timerFactory.stopTimer(this);
    };

  })

  .directive('quizQuestions', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/templates/quiz-questions.html',
      controller: 'QuizCtrl'
    }
  })
  .directive('quizChoices', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/templates/quiz-choices.html',
      controller: 'QuizCtrl'
    }
  })

  .factory('scoreFactory', function() {
    return { score: 0 }
  })
  .factory('timerFactory', function($interval) {
    return {
      startTimer: function(quiz) {      
        quiz.countDown = $interval(function() {
          if (quiz.timer > 0) {
            quiz.timer--;
          }
        }, 1000);
      },
      stopTimer: function(quiz) {
        $interval.cancel(quiz.countDown);
      }
    }
  });



