(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            if(h>=13) {
                h-=12;
            }
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });

    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
        } 
        else if (linn.value ==="tln") {
            e.innerHTML = "0,00 &euro;";
        }
        else if (linn.value === "trt") {
            e.innerHTML = "2,50 &euro;";
        }
        else if (linn.value === "nrv") {
            e.innerHTML = "2,50 &euro;";
        }
        else if (linn.value === "prn") {
            e.innerHTML = "3,00 &euro;";
        }
        else {
            
            e.innerHTML = "x,xx &euro;";
            
        }        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";


    let delta = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let centerPoint = new Microsoft.Maps.Location(
        58.810551, 25.651427
    );

    let rand = new Microsoft.Maps.Location(
        58.374766, 24.495782
        );
    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 8,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
  
    let pushpin = new Microsoft.Maps.Pushpin(delta, {
            title: 'Tartu Ülikool',
        });


    let pushpin1 = new Microsoft.Maps.Pushpin(rand, {
        title: 'Pärnu rand',

    });
    let infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });
    infobox.setMap(map);


    pushpin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Siin on Delta maja'
    };
    pushpin1.metadata = {
        title: 'Pärnu rand',
        description: 'Tere tulemast Eesti suvepealinna!'
    };
    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpinClicked);
    map.entities.push(pushpin);
    map.entities.push(pushpin1);


    

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

