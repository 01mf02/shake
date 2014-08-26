/*jsl:option explicit*/
/*jsl:import shake-util.js*/
"use strict";

// Data
//     {name :: String
//     ,values :: [Progress]
//     }
//
// Progress
//     {idealSecs :: Double
//     ,idealPerc :: Double
//     ,actualSecs :: Double
//     ,actualPerc :: Double
//     }

$(function(){
    $(".version").html("Generated by <a href='https://github.com/ndmitchell/shake#readme'>Shake " + version + "</a>.");
    $("#output").html("");
    for (var i = 0; i < shake.length; i++)
    {
        var x = shake[i];
        var actual = [];
        var ideal = [];
        // Start at t = 5 seconds, since the early progress jumps a lot
        for (var t = 5; t < x.values.length; t++)
        {
            var y = x.values[t];
            actual.push([y.idealSecs, y.actualSecs]);
            ideal.push([y.idealSecs, y.idealSecs]);
        }
        var ys = [{data:ideal, color:"gray"}, {label:x.name, data:actual, color:"red"}];
        var div = $("<div class='plot'>");
        $("#output").append(div);
        $.plot(div, ys, {
            xaxis: {
                transform: function (v) { return -v; },
                inverseTransform: function (v) { return -v; }
            }
        });
    }
})
