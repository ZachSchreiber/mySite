angular.module('zach-site').controller('contactCtrl', function($state, $scope) {


  //input "placeholder animations"
    $scope.emailActive = false;
    $scope.bodyActive = false;
  $scope.labelClass = function(input) {
    if (input === 'email') {
      $scope.emailActive = true;
     $('#email-container > input').focus();
    } if (input === 'body') {
        $scope.bodyActive = true;
        $('#body-container > textarea').focus();
    }
  }


});
