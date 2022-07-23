/* La funcionalidad accede a la api del servicio meteorológico nacional para traer la información del clima actual
Agregué un botón porque el script consulta la geolocalización del navegador para obtener la info meteorológica 
de la localidad mas cercana */


//Traigo boton de elemento HTML
let botonClima = document.getElementById('botonClima')
botonClima && botonClima.addEventListener("click", () => { 

    //junto info de geolocalizacion del navegador
    navigator.geolocation.getCurrentPosition((location) => {
        let lat = location.coords.latitude
        sessionStorage.setItem('latitud',JSON.stringify(lat))
    })            
    navigator.geolocation.getCurrentPosition((location) => {
        let long = location.coords.longitude
        sessionStorage.setItem('longitud',JSON.stringify(long))
    })

    //Consulto API del SMN
    fetch("https://ws.smn.gob.ar/map_items/weather")
        .then( (resp) => resp.json() )
        .then( data => {

            //Calculo distancia a la localizacion  del navegador
            data.forEach(element => {
                element.distancia = ((parseFloat(element.lat)-parseFloat(JSON.parse(sessionStorage.getItem('latitud'))))**2+(parseFloat(element.lon)-parseFloat(JSON.parse(sessionStorage.getItem('longitud'))))**2)**(1/2)
            })

            let min = Math.min(...data.map(item => item.distancia))
            let tiempo = data.filter(item => (item.distancia == min)) 

            //Creo elementos HTML
            let ver = tiempo[0].weather.description 
            
            let imagen = ''
            if (ver == 'Despejado con neblina'|| ver == 'Algo nublado'|| ver == 'Algo nublado con bruma'||ver == 'Algo nublado con polvo levantado por viento') {
                imagen = './assets/iconosClima/algoNublado.png'
            } else if (ver ==  'Parcialmente nublado con precipitación a la vista'){
                imagen = './assets/iconosClima/algoDeLluvia.png'
            } else if (ver ==  'Despejado'||ver == 'Despejado con humo'){
                imagen = './assets/iconosClima/despejado.png'
            } else if (ver == 'Cubierto con lluvia en la hora anterior'||ver == 'Nublado con precipitación a la vista' ||ver == 'Cubierto con llovizna'){
                imagen = './assets/iconosClima/lluvia.png'
            } else if (ver == 'Cubierto con nevada'||ver == 'Cielo invisible con nevada'){
                imagen = './assets/iconosClima/nieve.png'
            } else if (ver == 'Nublado'||ver == 'Cubierto con niebla'||ver == 'Cubierto'){
                imagen = './assets/iconosClima/nublado.png'
            } else if (ver == 'Parcialmente nublado'||ver == 'Parcialmente nublado con humo'){
                imagen = './assets/iconosClima/parcialmenteNublado.png'
            } else if (ver == 'Cubierto con lluvia'){
                imagen = './assets/iconosClima/tormenta.png'
            } else {
                imagen = './assets/iconosClima/parcialmenteNublado.png'
            }
            
            document.getElementById("localidad").textContent = tiempo[0].name

            document.getElementById("clima").innerHTML = (
                `<p class="clock">${tiempo[0].weather.tempDesc}<img src="${imagen}" ></p> 
                <p class="date">${tiempo[0].weather.description}</p> 
                <p class="date">Humedad: ${tiempo[0].weather.humidity}%</p> 
                <p class="date">Presión: ${tiempo[0].weather.pressure}hPa</p> 
                <p class="date">Viento: ${tiempo[0].weather.wind_speed} km/hr desde el ${tiempo[0].weather.wing_deg}</p> 
                <p class="date">Visibilidad: ${tiempo[0].weather.visibility }km </p>`)
        ;
        })

    // Reloj (me base en codigo obtenido de codepen)
    function startTime() {
        var today = new Date();
        var hr = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();
        let ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
        hr = (hr == 0) ? 12 : hr;
        hr = (hr > 12) ? hr - 12 : hr;
        //Add a zero in front of numbers<10
        hr = checkTime(hr);
        min = checkTime(min);
        sec = checkTime(sec);
        document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ap;
        
        var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        var days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
        var curWeekDay = days[today.getDay()];
        var curDay = today.getDate();
        var curMonth = months[today.getMonth()];
        var curYear = today.getFullYear();
        var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
        document.getElementById("date").innerHTML = date;
        
        var time = setTimeout(function(){ startTime() }, 500);
    }
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    window.onload = startTime();
})