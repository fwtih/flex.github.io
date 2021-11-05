$(window).on("load",function(){
    $(".loader").fadeOut("slow");
});

setInterval(() => {
    var NewDate = new Date();
    var Hours = NewDate.getHours();
    var Minutes = NewDate.getMinutes();
    var Seconds = NewDate.getSeconds();
    var dateText = Hours + ':' + Minutes + ':' + Seconds;

    $("#date").html(dateText);
})