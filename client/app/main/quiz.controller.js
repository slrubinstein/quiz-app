'use strict';

angular.module('quizApp')
  .controller('QuizCtrl', function($http, $interval, $scope, scoreFactory, timerFactory, tallyScore) {   
    var self = this;
    this.quiz = false;
    this.quizOver = false;
    this.loadQuiz = function() {
      this.quiz = true;
      this.startTimer();
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

    $scope.timer = 60;

    this.startTimer = function() {
      timerFactory.startTimer($scope);
    };
    this.stopTimer = function() {
      timerFactory.stopTimer($scope);
    };
    $scope.$watch('timer', function(newval, oldval) {
      if (newval === 0) {
        self.stopTimer();
      }
    })

    this.finished = function() {
      this.quizOver = true;
      this.stopTimer();
      tallyScore.checkAnswers(this);
    }
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
      controller: 'ChoicesCtrl',
      controllerAs: 'choices'
    }
  })
  .directive('quizAnswers', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/templates/quiz-answers.html'
    }
  })

  .factory('scoreFactory', function() {
    return { score: 0 }
  })
  .factory('timerFactory', function($interval) {
    return {
      startTimer: function($scope) {      
        $scope.countDown = $interval(function() {
          $scope.timer--;
        }, 1000);
      },
      stopTimer: function($scope) {
        $interval.cancel($scope.countDown);
      }
    }
  })
  .factory('tallyScore', function() {
    return {
      total: 0,
      checkAnswers: function(quiz) {
        var answers = $('.selected');
        for (var i = 0; i < quiz.questions.length; i++) {
          var a = $(answers[i]);
          if (a.text() === quiz.questions[i].answer) {
            quiz.increaseScore(10);
            a.addClass('correct');
          } else {
            a.addClass('incorrect')
          }
        }
      }
    }
  });



