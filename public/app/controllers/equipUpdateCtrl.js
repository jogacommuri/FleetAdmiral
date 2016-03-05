angular.module('macCtrl',['equipService'])
    .controller('machineController', function($location,Equip,socketio,$http){
     var vm = this;
    console.log(Equip.mac);
});
                