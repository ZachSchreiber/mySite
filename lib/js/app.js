(function() {
  "use strict";
  angular.module('zach-site', ['ui.router', 'LocalStorageModule'])
        .config(function($stateProvider, $urlRouterProvider) {

          $urlRouterProvider.otherwise('about');

          $stateProvider.state('home', {
            url: '/',
            templateUrl: './src/views/home.html',
            controller: 'homeCtrl as home'
          }).state('home.about', {
            url: 'about',
            templateUrl: './src/views/about.html',
            controller: 'aboutCtrl as about'
          }).state('home.projects', {
            url: 'projects',
            templateUrl: './src/views/projects.html',
            controller: 'projectsCtrl as projects'
          }).state('home.spiel', {
            url: 'play',
            templateUrl: './src/views/spiel.html',
            controller: 'spielCtrl as spiel'
          }).state('home.contact', {
            url: 'contact',
            templateUrl: './src/views/contact.html',
            controller: 'contactCtrl as contact'
          })
        });
})();
;angular.module('zach-site').factory('spielFactory', function () {
  function spiel(props) {
    this.name =   props.name || undefined;
    this.body =  props.body || undefined;
  };

  return {
    spiel: spiel
  };
});
;    angular.module('zach-site').service('spielService', function($q, spielFactory, localStorageService) {
      var self = this;

          var formArray =
          [

          "Zach Schreiber is a !Adjective !Noun. If you need a new !Noun, there is no need to !Verb any further. He takes !Noun !Verb-ing very seriously, so you are always number !Number on his list.",

          "A testimonial: 'I needed to update my !Noun , so I gave Zach Schreiber a !Noun . He couln't have been !Adjective! I highly !Verb him. And he doesn't charge a !Bodypart and a !Bodypart.",


          ];


          function getForm(number) {
           var item = formArray[number];
           return item;
          }




          function getSpiels () {
          return localStorageService.get('spiels') || [];
}

function setSpiels (spiel) {
localStorageService.set('spiels', spiel);
}

function findSpielByName (spiels, name) {
var toReturn;
spiels.forEach(function (spiel) {
  if (spiel.name === name) {
    toReturn = spiel;
  }
})
return toReturn;
}



 function fetch() {
return $q.when(getSpiels());
};

function saveLocal(spielName, spielBody) {
var spiels = getSpiels();
 spiels.push(new spielFactory.spiel({
   name: spielName,
   body: spielBody
}));
return setSpiels(spiels);
};

return {
  getForm: getForm,
  saveLocal: saveLocal,
  fetch: fetch,

};

});
;angular.module('zach-site').controller('aboutCtrl', function($state, $scope) {


});
;angular.module('zach-site').controller('contactCtrl', function($state, $scope) {


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
;var app =angular.module('zach-site');
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


//Should be in a service....project array
this.slides = [
       { title: 'Docdish', image: 'images/docdish.png', description: '(Currently under construction) An app that uses multiple databases to access medical provider information. Users are allowed to edit some of the information, which is then compiled and submitted to a FHIR database.', stack: 'AngularJS + Sass + Ajax/jQuery', co: 'Robby Helms', links: [self.Robby], number: '1'},
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
;angular.module('zach-site').controller('projectsCtrl', function($state, $scope) {
var self = this;
  


});
;angular.module('zach-site').controller('spielCtrl', function($scope, $state,  spielService,  $sce) {
  var self = this;

  this.detectmobile = function() {

     if( navigator.userAgent.match(/Android/i)
     || navigator.userAgent.match(/webOS/i)
     || navigator.userAgent.match(/iPhone/i)
     || navigator.userAgent.match(/iPad/i)
     || navigator.userAgent.match(/iPod/i)
     || navigator.userAgent.match(/BlackBerry/i)
     || navigator.userAgent.match(/Windows Phone/i)
     ){

         $('.videoMobile').remove();

     }
 }
 this.detectmobile();



  $scope.buttonText = "Show!";
  $scope.isActive = false;
      $scope.activeForm = function() {
      $scope.isActive = !$scope.isActive;
      if ($scope.isActive) {
        $scope.buttonText = "Hide!";
      } else {
        $scope.buttonText = "Show!";
      }
      };

      $scope.updateView = function(page) {
        $scope.view = page;
        $scope.spielName = null;
        $scope.userLib = null;
      }



  var formNumber = null;
  $scope.form = null;
  $scope.spielBody = null;
  $scope.spielName = null;
  $scope.userLib = null;
  $scope.hiddenLib = null;
  $scope.view = 'intro';

  $scope.getSpiels = function() {
     if (formNumber == null) {
       formNumber = 0;
     } else if (formNumber < 2) {
     formNumber = formNumber + 1;
   } else  {
     formNumber = 0;
   }
     $scope.hiddenLib = spielService.getForm(formNumber);
     $scope.form = $scope.libMaker($scope.hiddenLib);
     $scope.isActive = false;
     $scope.view = 'localView';
    };


    var noun = /!Noun/gi;
    var verb = /!Verb/gi;
    var adj = /!Adjective/gi;
    var plural = /!Plural-Noun/gi;
    var number = /!Number/gi;
    var name = /!Name/gi;
    var exclam = /!Exclamation/gi;
    var body = /!Bodypart/gi;

    $scope.libMaker = function(string) {
      string = string.replace(noun, "<input class='inputs' placeholder='NOUN'>");
      string = string.replace(verb, "<input class='inputs' placeholder='VERB'>");
      string = string.replace(adj, "<input class='inputs' placeholder='ADJECTIVE'>");
      string = string.replace(plural, "<input class='inputs' placeholder='PLURAL-NOUN'>");
      string = string.replace(number, "<input class='inputs' placeholder='NUMBER'>");
      string = string.replace(exclam, "<input class='inputs' placeholder='EXCLAMATION'>");
      string = string.replace(name, "<input class='inputs' placeholder='NAME'>");
      string = string.replace(body, "<input class='inputs' placeholder='BODYPART'>");
      return string;
    };

    $scope.appendInput = function(type) {
      switch (type) {
        case 'makeNoun':
         $scope.userLib = $scope.userLib + " !Noun";
         $scope.body = $scope.userLib.replace(noun, "<input class='inputs' placeholder='NOUN'>");
        break;
        case 'makeVerb':
         $scope.userLib = $scope.userLib + " !Verb";
         $scope.body = $scope.userLib.replace(noun, "<input class='inputs' placeholder='VERB'>");
        break;
        case 'makeAdj':
         $scope.userLib = $scope.userLib + " !Adjective";
         $scope.body = $scope.userLib.replace(noun, "<input class='inputs' placeholder='ADJECTIVE'>");
        break;
        case 'makePlural':
         $scope.userLib = $scope.userLib + " !Plural-Noun";
         $scope.body = $scope.userLib.replace(noun, "<input class='inputs' placeholder='PLURAL-NOUN'>");
        break;
        case 'makeNumber':
         $scope.userLib = $scope.userLib + " !Number";
         $scope.body = $scope.userLib.replace(noun, "<input class='inputs' placeholder='NUMBER'>");
        break;
        case 'makeName':
         $scope.userLib = $scope.userLib + " !Name";
         $scope.body = $scope.userLib.replace(noun, "<input class='inputs' placeholder='NAME'>");
        break;
        case 'makeExclam':
         $scope.userLib = $scope.userLib + " !Exclamation";
         $scope.body = $scope.userLib.replace(noun, "<input class='inputs' placeholder='EXCLAMATION'>");
        break;
        case 'makePart':
         $scope.userLib = $scope.userLib + " !BodyPart";
         $scope.body = $scope.userLib.replace(noun, "<input class='inputs' placeholder='BODYPART'>");
        break;
      }
    }



  $scope.getHtml = function(html) {
      return $sce.trustAsHtml(html);
  };

 $scope.areThereSpiels = false;
  $scope.create = function () {
      spielService.saveLocal($scope.spielName, $scope.userLib);
      $scope.form = $scope.libMaker($scope.userLib);
      $scope.view = "localView";
      $scope.apply();
    };

    spielService.fetch().then(function (response) {
    $scope.localSpiels = response;
    if ($scope.localSpiels.length > 0) {
      $scope.areThereSpiels = true;
    }
  });

  $scope.index = null;

  $scope.displaySpiel = function(index) {
    $scope.hiddenLib = $scope.localSpiels[index].body;
    $scope.form = $scope.libMaker($scope.hiddenLib);
    $scope.isActive = false;
    $scope.view = 'localView';

  };

  $scope.clearStorage = function() {
    localStorage.clear();
    $scope.areThereSpiels = false;
    $scope.apply();
  };

  $scope.goHome = function() {
    spielService.fetch().then(function (response) {
    $scope.localSpiels = response;
    if ($scope.localSpiels.length > 0) {
      $scope.areThereSpiels = true;
    }
  });
  $scope.view = "intro";

  }

});
