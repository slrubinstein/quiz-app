'use strict';

angular.module('quizApp')
  .controller('ChoicesCtrl', function() {   

  })
  .directive('choiceSelection', function() {
    return {
      restrict: 'A',
      link: function($scope, el) {        
        el.bind('click', function() {
          $(this).parent().parent().find('.selected').removeClass('selected');
          $(this).addClass('selected');
        });
      }
    };
  });