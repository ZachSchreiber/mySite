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
