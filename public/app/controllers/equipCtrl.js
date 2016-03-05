
angular.module('equipCtrl',['equipService'])
    .controller('equipController', function($scope,$window,$location,Equip,socketio,$http){
    $scope.load = function(){
        initMap();
    }
    var vm =this;
    
    vm.mac ={};
    vm.getEquipment = function(each) {
		$http.post('/api/getEquipment/'+each._id)
			.success(function(data) {
            $window.localStorage.removeItem('macData');
				vm.mac = data;
               // console.log(vm.mac._id);
            $window.localStorage.setItem('macData',JSON.stringify(vm.mac));
            $location.path('/editEquipment');
           // console.log($window.localStorage.getItem('macData'));
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
    vm.machine= JSON.parse($window.localStorage.getItem('macData'));
    //console.log(vm.machine);
    vm.upData={};
    vm.updateEquipment=function(machine,upData){
    vm.upData = vm.machine;
        
    }
    $scope.machine_type = [
       {img: '/app/img/Articulated Truck.jpg', name: 'Articulated Truck'},
       {img: '/app/img/Bulldozer-Truck.jpg', name: 'Bulldozer-Truck'},
       {img: '/app/img/bulldozer_truck-rubber_tire.jpg', name: 'Bulldozer-Rubber Tire'},
       {img: '/app/img/Cable Tractor.jpg', name: 'Cable Tractor'},
       {img: '/app/img/HAMMER-TRACTOR.jpg', name: 'Hammer Tractor'},
       {img: '/app/img/Dragline.jpg', name: 'Dragline'},
       {img: '/app/img/Dragline-Giant.jpg', name: 'Dragline-Giant'},
       {img: '/app/img/Drills(Blasthole).jpg', name: 'Drills(Blasthole)'},
       {img: '/app/img/Haul Truck-End Dump.jpg', name: 'Haul Truck-End Dump'},
       {img: '/app/img/Haul Truck-Center Dump Haul Unit.jpg', name: 'Haul Truck-Center Dump Haul Unit'},
       {img: '/app/img/Loader-Track.jpg', name: 'Loader-Track'},
       {img: '/app/img/Loader-Wheel.jpg', name: 'Loader-Wheel'},
       {img: '/app/img/Motor Grader.jpg', name: 'Motor Grader'},
       {img: '/app/img/Mass Excavator- Hydraulic.jpg', name: 'Mass Excavator- Hydraulic'},
       {img: '/app/img/Scraper-Single Engined.jpg', name: 'Scraper-Single Engined'},
       {img: '/app/img/Scraper-Dual Engine.jpg', name: 'Scraper-Dual Engine'},
       {img: '/app/img/Shovel-Electric.jpg', name: 'Shovel-Electric'},
       {img: '/app/img/Shovel-Hydraulic.jpg', name: 'Shovel-Hydraulic'},
       {img: '/app/img/Underground Continuous Miner.jpg', name: 'Underground Continuous Miner'},
       {img: '/app/img/Underground Haul Truck.jpg', name: 'Underground Haul Truck'},
       {img: '/app/img/Underground Scaler.jpg', name: 'Underground Scaler'},
       {img: '/app/img/Underground Scissor Lift.jpg', name: 'Underground Scissor Lift'},
       {img: '/app/img/Underground Scooptram.jpg', name: 'Underground Scooptram'},
       {img: '/app/img/Underground Shotcreter.jpg', name: 'Underground Shotcreter'},
       {img: '/app/img/Underground Shuttle Car.jpg', name: 'Underground Shuttle Car'},
       {img: '/app/img/Underground Water Truck.jpg', name: 'Underground Water Truck'},
       {img: '/app/img/Rigid Dump Truck.jpg', name: 'Rigid Dump Truck'},
       {img: '/app/img/Asphalt Pavers.jpg', name: 'Asphalt Pavers'},
       {img: '/app/img/Backhoe Loaders.jpg', name: 'Backhoe Loaders'},
       {img: '/app/img/Cold Planers.jpg', name: 'Cold Planers'},
       {img: '/app/img/Skid Steer Loaders.jpg', name: 'Skid Steer Loaders'}];
    
     $scope.manufacturer=[
       {name: 'Caterpillar'},
       {name: 'Komatsu'},
       {name: 'Terex'},
       {name: 'Volvo'},
       {name: 'Liebherr'},
       {name: 'Hitachi'},
       {name: 'John Deere'},
       {name: 'CNH'},
       {name: 'Sandvik'},
       {name: 'JCB'},
       {name: 'Atlas Copco'},
       {name: 'Metso'},
       {name: 'Manitowoc'},
       {name: 'Hyundai'},
       {name: 'Doosan'},
       {name: 'Kobelco'},
       {name: 'Writgen'},
       {name: 'Xuzhou'},
       {name: 'Manitou'},
       {name: 'Ammann'},
       {name: 'Putzmeister'},
       {name: 'Hiab'},
       {name: 'Tadano'},
       {name: 'Sany'},
       {name: 'Fayat'},
       {name: 'Changsha Zoomlion'},
       {name: 'Guangxi'},
       {name: 'Wacker Neuson'},
       {name: 'Palfinger'},
       {name: 'Haulotte'},
       {name: 'Kubota'},
       {name: 'Altec Industries'},
       {name: 'Xiamen Xiagong'},
       {name: 'Bell Equipment'},
       {name: 'BEML'},
       {name: 'Takeuchi'},
       {name: 'Boart Longyear'},
       {name: 'Furukawa'},
       {name: 'Aichi'},
       {name: 'Shantui'},
       {name: 'Merlo'},
       {name: 'Skyjack'},
       {name: 'Gehl'},
       {name: 'Kato Works'},
       {name: 'P &H'},
       {name: 'Bauer'},
       {name: 'Bauer'}];
    
    
        vm.tab = 1;
    
        vm.test = "test";

        vm.setTab = function (tabId) {
            vm.tab = tabId;
        };

        vm.isSet = function (tabId) {
            return vm.tab === tabId;
        };
        
    
    Equip.allEquipment()
        .success(function(data){
        vm.equipments =  data;
    });
    
    vm.CreateEquipment = function(){
        vm.processing = true;
        vm.message = '';
         vm.equipData.address = JSON.stringify($window.localStorage.getItem('address'));
           // console.log(vm.equipData.address);
           // console.log(vm.equipData);
        Equip.create(vm.equipData)
            .success(function(data){
            vm.processing = false;
            vm.equipData = {};
            vm.message = data.message;
           
            $location.path('/');
        });
    };
   
    vm.updateEquipment = function(machine) {
        machine.address = JSON.stringify($window.localStorage.getItem('address'));
        console.log(machine.address);
		$http.post('/api/update',machine)
        .success(function(){
             console.log("update successful");
            $location.path('/');
        }
           
        );
	};
    //google maps
    /*$scope.address_data='';
    
    $scope.address_data=JSON.stringify($window.localStorage.getItem('address'));
    console.log($scope.address_data);*/
   
    
   
    socketio.on('equip',function(data){
			vm.equipments.push(data);
		});
});