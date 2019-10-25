var datos = $.parseJSON('{"Modulos":[{"Num":1,"Nombre":"Nombre de Modulo 1","Temas":["Tema 1","Tema 2","Tema 3","Tema 2","Tema 3","Tema 2","Tema 3","Tema 2","Tema 3","Tema 2","Tema 3","Tema 2","Tema 3","Tema 2","Tema 3","Tema 2","Tema 3","Tema 2","Tema 3","Tema 2","Tema 3","Tema 2","Tema 3"],"Rutas":["video/video1","video/video2","video/video3"]},{"Num":2,"Nombre":"Nombre de Modulo 2","Temas":["Tema 4","Tema 5","Tema 6"],"Rutas":["video/video4","video/video5","video/video6"]},{"Num":3,"Nombre":"Nombre de Modulo 3","Temas":["Tema 7","Tema 8","Tema 9"],"Rutas":["video/video7","video/video8","video/video9"]}],"NombreCurso":"Video Training Development","Trak":[],"Ultimo":0,"Libre":false}');
var playpause = document.getElementById("playpause");
var menu_open = false;
var NombreCurso = datos.NombreCurso;
var bussy = false;
var barraLateralOpen = false;
var barraLateralBussy = false;
var Rutas = new Array();
var TRAK = new Array();
var debug = false;
var video = document.getElementById("video");
// #REGION FIN DECLARACIONES GLOBALES
// -----------------------------------------------------------------------------------------
this.video.controls = false;
$("#playpause").click(function () {
    if (video.paused || video.ended) {
        // playpause.innerHTML = "pause_circle_outline";
        $("#playpause").removeClass("fa-play-circle").addClass("fa-pause-circle");
        video.play();
    }
    else {
        $("#playpause").removeClass("fa-pause-circle").addClass("fa-play-circle");
        video.pause();
    }
});

function initialize_track() {
    if (localStorage.getItem(NombreCurso).Trak.length <= 0) {
        let suma = 0;
        for (let i = 0; i < datos.Modulos.length; i++) {
            for (let j = 0; j < datos.Modulos[i]["Temas"].length; j++) {
                suma++
            }
        }
        for (let t = 0; t < suma; t++) {
            TRAK[t] = "0";
        }
    }else{
        TRAK = localStorage.getItem(NombreCurso).Trak;
    }
}

function updateProgress() {
    let progress = $("#progress");
    let value = 0;
    if (video.currentTime > 0) {
        value = Math.floor((100 / video.duration) * video.currentTime);
    }
    progress.val(value);
    console.log(value)
}

function progressChange(cambio) {
    video.removeEventListener("timeupdate", updateProgress, false);
    var value = 0;
    if (video.currentTime > 0) {
        value = Math.floor((cambio * video.duration) / 100);
    }
    video.currentTime = value;
    setTimeout(addListener, 1000);
}
function terminado() {
    $("#playpause").removeClass("fa-pause-circle").addClass("fa-play-circle");
};
function addListener() { video.addEventListener("timeupdate", updateProgress, false) } video.addEventListener("timeupdate", updateProgress, false); video.addEventListener("ended", terminado, false);
function llamarMenu() {
    if (!bussy) {
        if (!menu_open) {
            $("#menu").addClass("menu-open");
            TweenLite.from($("#menu"), 0.5, { opacity: 0, left: '-400px' });
            this.menu_open = true;
        } else {
            TweenLite.to($("#menu"), 0.5, { opacity: 0, left: '-400px' });
            bussy = false;// Deshabilitar el boton menu
            setTimeout(function () {
                this.menu_open = false;
                $("#menu").removeClass("menu-open");
                $("#btnMenu").css("pointer-events", "all");
                TweenLite.to($("#menu"), 0.01, { opacity: 1, left: "0px" });
                bussy = false;
            }, 500);
        }
    }
    // actualizar_menuHTML(TRAK); // actualizar el menu
    // limpiarSim(); // se limpia la 
}

function llamarBarraLateral() {
    if (!barraLateralBussy) {
        if (!barraLateralOpen) {
            $("#video").removeClass("col-md-12 col-lg-12 col-xl-12").addClass("col-md-9 col-lg-9 col-xl-9");
            $("#barraLateral").removeClass("oculto").addClass("barraLateral-open");
            $("#video").css("display", "inline-block!important");
            TweenLite.from($("#barraLateral"), 0.5, { right: '-400px' });
            this.barraLateralOpen = true;
        } else {
            TweenLite.to($("#barraLateral"), 0.5, { right: '-400px' });
            bussy = false;// Deshabilitar el boton menu
            setTimeout(function () {
                this.barraLateralOpen = false;
                $("#barraLateral").removeClass("barraLateral-open").addClass("oculto");
                $("#btnBarraLateral").css("pointer-events", "all");
                $("#video").css("display", "inline-block");
                TweenLite.to($("#barraLateral"), 0.01, { right: "-15px" });
                barraLateralBussy = false;
                $("#video").removeClass("col-md-9 col-lg-9 col-xl-9").addClass("col-md-12 col-lg-12 col-xl-12");

            }, 500);
        }
    }
}

function populateMenu() {
    // Agregar Nombre del Curso
    // $("#menuContainer").append("<div id='menuTitle' class='col-xs-12 menuTitle'>Menú del curso </div>");
    let consecutivo = 0;
    for (let index = 0; index < datos.Modulos.length; index++) {
        for (let j = 0; j < datos.Modulos[index]["Temas"].length; j++) {
            id = consecutivo;
            $("#temasContainer").append("<div id='" + (consecutivo + 1) + "' class='row d-flex justify-content-center temaMenu' onclick='llamarTema(" + (consecutivo+1) + ")'>"+
            "<div class='col-1 reset' style=''>"+
                "<a style='float: right;'>"+
                    "<i class='fas fa-circle menuIconStyle'></i>"+
                "</a>"+
            "</div>"+
            "<div class='col-10' style='color:white;margin: 0px;'>"+
                "<p class='reset textoTema' style='float: left; padding-top: 3px; padding-left: 0px; pointer-events:none'>"+ datos.Modulos[index]["Temas"][j] + "</p>"+
            "</div>"+
            "</div>")
                consecutivo++;
                Rutas.push(datos.Modulos[index]["Rutas"][j]);
            if (debug) {
                console.log(jsonob.Modulos[index]['Mod' + (index + 1)][j]);
            }
        }// end for Temas
    }//End Main For
}// end PopulateMenu function

function llamarTema(id){
    let valorReal= id - 1;
    alert("Funcionalidad no implementada. ID: "+id + " y valor real: "+valorReal)
}// end llamarTema

populateMenu();