    angular.module('zach-site').service('spielService', function($q, spielFactory, localStorageService) {
      var self = this;

          var formArray =
          [

          "Zach Schreiber is a !Adjective !Noun. If you need a new !Noun, there is no need to !Verb any further. He takes !Noun !Verb-ing very seriously, so you are always number !Number on his list.",

          "A testimonial: 'I needed to update my !Noun , so I gave Zach Schreiber a !Noun . He couln't have been !Adjective! I highly !Verb him. And he doesn't charge a !Bodypart and a !Bodypart.",

          "Farts",

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
