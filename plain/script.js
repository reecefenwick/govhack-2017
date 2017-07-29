$(document).ready(function(){

$("#searchIndustry").click(function(e){
        e.preventDefault();
        $(".search1").css({width:"90vw"});
        $(".search2").css({width:"10vw"});
        $("#industryForm").show();
        $("#searchIndustry").hide();
        $("#back1").show();
        $(".search2").children().hide();


    });

    $("#searchLocation").click(function(e){
        e.preventDefault();
        $(".search2").css({width:"90vw"});
        $(".search1").css({width:"10vw"});
         $("#locationForm").show();
        $("#searchLocation").hide();
        $("#back2").show();
        $(".search1").children().hide();



    });

    $(".back").click(function(e){
        $(".search1").css({width:"50vw"});
        $(".search2").css({width:"50vw"});
        $("#industryForm").hide();
        $("#locationForm").hide();
        $("#searchLocation").show();
        $("#searchIndustry").show();
        $(".back").hide();
        $(".search1").children().show();
        $(".search2").children().show();
        

    });
});