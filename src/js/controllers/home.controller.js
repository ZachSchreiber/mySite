var app =angular.module('zach-site');
app.controller('homeCtrl', function($state, $scope) {
  var self = this;

  //project view controller
  this.viewNum = 0;
  this.activeItem = 2;


//animates navbar border bottom. resets project views
$scope.moveLi = function(amount) {
  $('#moveMe').css('left', amount + '%')
  self.viewNum = 0;
  self.activeItem = 2;
  self.slide = self.slides[self.viewNum];

}




$scope.projectView = function(num1, num2) {
  self.viewNum = num1;
  self.activeItem = num2;
}

//Should be in a service....project array
this.slides = [
       { title: 'Docdish', image: 'images/docdish.png', description: 'An app that uses multiple databases to access medical provider information. Users are allowed to edit some of the information, which is then compiled and submitted to a FHIR database.', stack: 'AngularJS + Sass + Ajax/jQuery', co: 'Robby Helms', links: 'https://github.com/rdhelms/rdhelms.github.io' , number: '1'},
       { title: 'Privacy Policy Generator', image: 'images/mpn.png', description: 'A submission to the "Privacy Policy Snapshot Challenge". Designed for health app developers. A form is filled out, JSON object is created, then our javascript and css libaries are imported. Their privacy disclosure is then rendered in our format.', stack: 'AngularJS + jQuery to render', co: 'Robby Helms', links:'https://github.com/rdhelms/rdhelms.github.io', number: '2'},
       { title: 'Petpals',   image: 'images/petpals.png', description: 'Final project for the Iron Yard.  A website rebuild for PetPalsNc, a local non-profit.', stack: 'EmberJS + Sass + Firebase', co: 'Leigh Bryant', links:'https://github.com/leighebryant', number: '3'}
   ];

   this.slide = self.slides[self.viewNum];

$scope.updateView = function(integer) {
  if (integer == 'plus') {
    if (self.viewNum < 2) {
      self.viewNum++;
      self.activeItem++;
      self.slide = self.slides[self.viewNum];
      $('#subNav li').removeClass("active");
      $("#subNav li:nth-of-type(" + self.activeItem + ")").addClass("active");
    }
  }
  if (integer == 'minus') {
    if (self.viewNum > 0) {
      self.viewNum--;
      self.activeItem--;
      self.slide = self.slides[self.viewNum];
      $('#subNav li').removeClass("active");
      $("#subNav li:nth-of-type(" + self.activeItem + ")").addClass("active");
    }
  }

}

//Links to open in new tab
this.openTab = function() {
    this.github = 'https://github.com/ZachSchreiber';
    this.resume = 'https://www.visualcv.com/zachary-schreiber-';
    this.Leigh =  'https://github.com/leighebryant';
    this.Robby =   'https://github.com/rdhelms/rdhelms.github.io';
}


this.playIntro = true;
this.hideIntro = function() {
  self.playIntro = false;
};

$('.pageContainer').on('click', '.localSpiel', function() {
   var idName = $(this).attr('id');
   alert(idName);
});

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

//hack to make animation work on mobile
$scope.donothing = function() {

}

//scrolls pages back to top onload
  this.scrollTo = function() {
    $('body, html, #pageContainer').scrollTop(0);

  }


});
