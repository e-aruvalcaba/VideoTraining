var menu_open = false;
var bussy = false;
var barraLateralOpen = false;
var barraLateralBussy = false;

// Set dinamyc height
// -----------------------------------------------------------------------------------------
// #REGION DECLARACIONES GLOBALES
var playpause = document.getElementById("playpause");

var temas = [{
    name: "Botana Parrillera Sabatina",
    url: "videos/botana.mp4"
}, {
    name: "Segundo video de la lista",
    url: "videos/botana.mp4"
},
{
    name: "Tercer video de la lista",
    url: "videos/botana.mp4"
},
{
    name: "cuarto video de la lista",
    url: "videos/botana.mp4"
}];
// #REGION FIN DECLARACIONES GLOBALES
// -----------------------------------------------------------------------------------------
// var video = $("#video");
var video = document.getElementById("video");
// Grab a handle to the video
// Turn off the default controls
this.video.controls = false;
$("#playpause").click(function () {
    // var playpause = document.getElementById("playpause");

    if (video.paused || video.ended) {
        // playpause.innerHTML = "pause_circle_outline";
        $("#playpause").removeClass("fa-play-circle").addClass("fa-pause-circle");
        video.play();
    }
    else {
        $("#playpause").removeClass("fa-pause-circle").addClass("fa-play-circle");
        // playpause.innerHTML = "play_circle_outline"; pause-circle
        video.pause();
    }
});
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
function addListener() { video.addEventListener("timeupdate", updateProgress, false) }
video.addEventListener("timeupdate", updateProgress, false);
video.addEventListener("ended", terminado, false);


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
            TweenLite.from($("#barraLateral"), 0.5, { right: '-400px' });
            this.barraLateralOpen = true;
        } else {
            TweenLite.to($("#barraLateral"), 0.5, { right: '-400px' });
            bussy = false;// Deshabilitar el boton menu
            setTimeout(function () {
                this.barraLateralOpen = false;
                $("#barraLateral").removeClass("barraLateral-open").addClass("oculto");
                $("#btnBarraLateral").css("pointer-events", "all");
                TweenLite.to($("#barraLateral"), 0.01, { right: "0px" });
                barraLateralBussy = false;
                $("#video").removeClass("col-md-9 col-lg-9 col-xl-9").addClass("col-md-12 col-lg-12 col-xl-12");

            }, 500);
        }
    }
}
