angular.module('zach-site').factory('spielFactory', function () {
  function spiel(props) {
    this.name =   props.name || undefined;
    this.body =  props.body || undefined;
  };

  return {
    spiel: spiel
  };
});
