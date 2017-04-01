angular.module('zach-site').controller('spielCtrl', function($scope, $state,  spielService,  $sce) {
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
