var app =angular.module('zach-site');
app.controller('homeCtrl', function($state, $scope) {
  var self = this;

  //project view controller
  this.viewNum = 0;
  this.activeItem = 2;


//animates navbar border bottom. resets project views
$scope.moveLi = function(amount) {
  //$('#moveMe').css('left', amount + '%');
  self.viewNum = 0;
  self.activeItem = 2;
  self.slide = self.slides[self.viewNum];

}
//I know there's a better way to write this. On location change, checks href, animates the underline accordingly
$scope.$on('$locationChangeSuccess', function(next, current) {
   $scope.URL = window.location.href;
   if ($scope.URL.includes("/about")) {
    $('#moveMe').css('left', '0%');
  } else if ($scope.URL.includes("/projects")) {
    $('#moveMe').css('left', '25%');
  } else if ($scope.URL.includes("/play")) {
    $('#moveMe').css('left', '50%');
  } else {
    $('#moveMe').css('left', '75%');
  }
 });


// $scope.projectView = function(num1, num2) {
//   self.viewNum = num1;
//   self.activeItem = num2;
// }

//Links to open in new tab

    this.github = 'https://github.com/ZachSchreiber';
    this.resume = 'https://www.visualcv.com/zachary-schreiber-';
    this.Leigh = 'https://github.com/leighebryant';
    this.Robby =    'https://github.com/rdhelms/rdhelms.github.io';
    this.MPN =    'http://transparenthealth.org/mpngen/#/';
    this.Petpals =  'https://pet-pals.firebaseapp.com/';
    this.docdishGithub = 'https://github.com/TransparentHealth/fhir-editor';


//Should be in a service....project array
this.slides = [
       { title: 'Docdish', image: 'images/docdish.png', description: '(Currently under construction) An app that uses multiple databases to access medical provider information. Users are allowed to edit some of the information, which is then compiled and submitted to a FHIR database.', stack: 'AngularJS + Sass + Ajax', co: 'Robby Helms', links: [self.Robby, self.docdishGithub], number: '1'},
       { title: 'Privacy Policy Generator', image: 'images/mpn.png', description: 'A submission to the "Privacy Policy Snapshot Challenge". Designed for health app developers. A form is filled out, JSON object is created, then our javascript and css libaries are imported. Their privacy disclosure is then rendered in our format.', stack: 'AngularJS + jQuery to render', co: 'Robby Helms', links: [self.Robby, self.MPN], number: '2'},
       { title: 'Petpals',   image: 'images/petpals.png', description: 'Final project for the Iron Yard.  A website rebuild for PetPalsNc, a local non-profit.', stack: 'EmberJS + Sass + Firebase', co: 'Leigh Bryant', links: [self.Leigh, self.Petpals], number: '3'}
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


this.playIntro = true;
this.hideIntro = function() {
  self.playIntro = false;
};

$('.pageContainer').on('click', '.localSpiel', function() {
   var idName = $(this).attr('id');
   alert(idName);
});



//hack to make animation work on mobile
$scope.donothing = function() {

}

//scrolls pages back to top onload
  this.scrollTo = function() {
    $('body, html, #pageContainer').scrollTop(0);
    console.log(self.Robby);

  }

//   var touch = 'ontouchstart' in document.documentElement
//             || navigator.maxTouchPoints > 0
//             || navigator.msMaxTouchPoints > 0;
//
// if (touch) { // remove all :hover stylesheets
//     try { // prevent exception on browsers not supporting DOM styleSheets properly
//         for (var si in document.styleSheets) {
//             var styleSheet = document.styleSheets[si];
//             if (!styleSheet.rules) continue;
//
//             for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
//                 if (!styleSheet.rules[ri].selectorText) continue;
//
//                 if (styleSheet.rules[ri].selectorText.match(':hover')) {
//                     styleSheet.deleteRule(ri);
//                 }
//             }
//         }
//     } catch (ex) {}
// }




});
