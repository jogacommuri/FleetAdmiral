var map;
     function initMap() {
        var mapOptions = {
        center: new google.maps.LatLng(	37.000, -120.000),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        
        var infoWindow = new google.maps.InfoWindow();
        var latlngbounds = new google.maps.LatLngBounds();
        
        google.maps.event.addListener(map,'click', function (e) {
        
        var latlng = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
                var geocoder = geocoder = new google.maps.Geocoder();
            var address ='';
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            alert("Location: " + results[1].formatted_address + "\r\nLatitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
                            var address = results[1].formatted_address;
                             console.log(address);
                           /* vm.data = document.getElementById("address");*/
                            
                           /* document.getElementById('addressdiv').innerHTML = '';*/
                          window.localStorage.setItem('address',address);
                            
                            document.getElementById('address').value = JSON.stringify(window.localStorage.getItem('address'));
                        }
                    }
                });
        
        });
                    
    }