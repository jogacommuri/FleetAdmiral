angular.module('equipService',[])

    .factory('Equip',function($http){
    
    var equipFactory = {};
    
  /*  equipFactory.allEquipments = function(){
        return $http.get('/api/all_equipments')
    }
    equipFactory.all = function(){
        return $http.get('/api/')
    }*/
    
    equipFactory.create = function(equipData){
        return $http.post('/api/',equipData)
    }
    equipFactory.allEquipment = function(){
        return $http.get('/api/');
    }
    
    
    return equipFactory;
})

.factory('socketio', function($rootScope){

		var socket = io.connect();
		return{
			on: function(eventName, callback){
				socket.on(eventName, function(){
					var args = arguments;
					$rootScope.$apply(function(){
						callback.apply(socket,args);
					});
				});
			},
			emit: function(eventName,data, callback){
				socket.emit(eventName,data,function(){
					var args = arguments;
					$rootScope.apply(function(){
						if(callback){
							callback.apply(socket, args);
						}
					});
				});
			}
		};
	});