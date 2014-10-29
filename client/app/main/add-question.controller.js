'use strict';

angular.module('quizApp')
  .controller('AddCtrl', function($http) {   
    this.addOption = function() {
      console.log('add function');
    }
  })
  .directive('addOptions', function() {
    return {
      restrict: 'A',
      link: function($scope, el) {
        console.log(el)
        el.bind('click', function() {
          $(this).closest('.choice').clone().append();
        })
      }
    }
  });