$( document ).ready(function() {

// ------------------------------------------------------------
// load the station metadata and convert it to geoJSON
// ------------------------------------------------------------

var staGeoJSON = getStaGeoJSON(); // function in stationInfo.js

// ------------------------------------------------------------
// initialize information for each tab
// ------------------------------------------------------------

// color matrix
var clr = [ "rgba(55, 145, 166, 0.85)", 
            "rgba(255, 96, 54, 0.85)",
            "rgba(242, 187, 5, 0.85)",
            "rgba(41, 191, 18, 0.85)",
            "rgba(84, 13, 110, 0.75)"];  

// initialize for tabs 
var tabID = [];
var tabs = {};
var Tab = function() {
  this.name = "";
  this.tabSelect = function(){};
  this.tabCountGCN = [];
  this.group = [];
  this.groupColor = [];
  this.groupSelect = [];
  this.count = [];
  this.special = [];
}

// ------------------------------------------------------------
// * define parameters and station selectors for the groupings in each menu tab.
// * I used arrays instead of key/value for group/color/etc., b/c it was easier to bind the information to the legend elements.
// ------------------------------------------------------------

// ------------------------------------------------------------
// all stations tab
var tabNum = 0;
tabID.push("sta_all");
tabs[tabID[tabNum]] = new Tab();
tabs[tabID[tabNum]].name = "All";
tabs[tabID[tabNum]].tabSelect = function(sta) {
                        return true;
                      };
tabs[tabID[tabNum]].group[0] = "UHSLC stations";
tabs[tabID[tabNum]].groupColor[0] = clr[1];
tabs[tabID[tabNum]].groupSelect[0] = function (sta) {
                             return sta.properties.uh_station;
                           };
tabs[tabID[tabNum]].group[1] = "Other station operators";
tabs[tabID[tabNum]].groupColor[1] = clr[0];
tabs[tabID[tabNum]].groupSelect[1] = function (sta) {
                            return true;
                          };
// ------------------------------------------------------------
// gloss stations tab
var tabNum = 1;
tabID.push("sta_gloss");
tabs[tabID[tabNum]] = new Tab();
tabs[tabID[tabNum]].name = "GLOSS";
tabs[tabID[tabNum]].tabSelect = function(sta) {
                          return sta.properties.gloss_id !== null;
                        };
tabs[tabID[tabNum]].group[0] = "USHLC stations";
tabs[tabID[tabNum]].groupColor[0] = clr[1];
tabs[tabID[tabNum]].groupSelect[0] = function (sta) {
                               return sta.properties.uh_station;
                             };
tabs[tabID[tabNum]].group[1] = "Other station operators";
tabs[tabID[tabNum]].groupColor[1] = clr[0];
tabs[tabID[tabNum]].groupSelect[1] = function (sta) {
                               return true;
                             };
// ------------------------------------------------------------
// uhslc stations tab
var tabNum = 2;
tabID.push("sta_uhslc");                            
tabs[tabID[tabNum]] = new Tab();
tabs[tabID[tabNum]].name = "UHSLC";
tabs[tabID[tabNum]].tabSelect = function(sta) {
                          return sta.properties.uh_station;
                        };
tabs[tabID[tabNum]].group[0] = "Updated last 6 months";
tabs[tabID[tabNum]].groupColor[0] = clr[0];
tabs[tabID[tabNum]].groupSelect[0] = function (sta) {
                var latest = Date.parse(sta.properties.fast_delivery.latest);
                var sixMoAgo = Date.now() - 6*31*24*60*60*1000;
                return latest > sixMoAgo;
                };
tabs[tabID[tabNum]].group[1] = "Updated last 18 months";
tabs[tabID[tabNum]].groupColor[1] = clr[1];
tabs[tabID[tabNum]].groupSelect[1] = function (sta) {
                var latest = Date.parse(sta.properties.fast_delivery.latest);
                var etnMoAgo = Date.now() - 18*31*24*60*60*1000;
                return latest > etnMoAgo;
                };
tabs[tabID[tabNum]].group[2] = "Not recently updated";
tabs[tabID[tabNum]].groupColor[2] = clr[2];
tabs[tabID[tabNum]].groupSelect[2] = function (sta) {
                return true;
                }; 
// ------------------------------------------------------------
// fast delivery tab
var tabNum = 3;
tabID.push("sta_fd");
tabs[tabID[tabNum]] = new Tab();
tabs[tabID[tabNum]].name = "Fast Delivery";
tabs[tabID[tabNum]].tabSelect = function(sta) {
                       return sta.properties.fast_delivery.has;
                     };
tabs[tabID[tabNum]].group[0] = "Updated last 6 months";
tabs[tabID[tabNum]].groupColor[0] = clr[0];
tabs[tabID[tabNum]].groupSelect[0] = function (sta) {
                var latest = Date.parse(sta.properties.fast_delivery.latest);
                var sixMoAgo = Date.now() - 6*31*24*60*60*1000;
                return latest > sixMoAgo;
                };
tabs[tabID[tabNum]].group[1] = "Updated last 18 months";
tabs[tabID[tabNum]].groupColor[1] = clr[1];
tabs[tabID[tabNum]].groupSelect[1] = function (sta) {
                var latest = Date.parse(sta.properties.fast_delivery.latest);
                var etnMoAgo = Date.now() - 18*31*24*60*60*1000;
                return latest > etnMoAgo;
                };
tabs[tabID[tabNum]].group[2] = "Not recently updated";
tabs[tabID[tabNum]].groupColor[2] = clr[2];
tabs[tabID[tabNum]].groupSelect[2] = function (sta) {
                return true;
                }; 
// ------------------------------------------------------------
// research quality tab
var tabNum = 4;
tabID.push("sta_rq");
tabs[tabID[tabNum]] = new Tab();
tabs[tabID[tabNum]].name = "Research Quality (JASL)";
tabs[tabID[tabNum]].tabSelect = function(sta) {
                       return sta.properties.research_quality.has;
                     };
tabs[tabID[tabNum]].group[0] = "Updated last 3 years";
tabs[tabID[tabNum]].groupColor[0] = clr[0];
tabs[tabID[tabNum]].groupSelect[0] = function (sta) {
                var latest = Date.parse(sta.properties.research_quality.latest);
                var threeYrAgo = Date.now() - 36*30*24*60*60*1000;
                return latest > threeYrAgo;
                };
tabs[tabID[tabNum]].group[1] = "Updated last 7 years";
tabs[tabID[tabNum]].groupColor[1] = clr[1];
tabs[tabID[tabNum]].groupSelect[1] = function (sta) {
                var latest = Date.parse(sta.properties.research_quality.latest);
                var sevenYrAgo = Date.now() - 84*30*24*60*60*1000;
                return latest > sevenYrAgo;
                };
tabs[tabID[tabNum]].group[2] = "Not recently updated";
tabs[tabID[tabNum]].groupColor[2] = clr[2];
tabs[tabID[tabNum]].groupSelect[2] = function (sta) {
                return true;
                };                          
// end tab set-up
                
// ------------------------------------------------------------
                
// get counts of the stations for each group in each tab
function getStationCounts(thisTab) {
    
    staTab = staGeoJSON.features.filter( tabs[thisTab].tabSelect );
    
    tabs[thisTab].tabCountGCN = staTab.filter( 
      function(sta) { return sta.properties.gloss_core }
    ).length;
    
    if (thisTab === "sta_uhslc") {
      tabs[thisTab].special[0] = staTab.filter( 
        function(sta) { 
          return sta.properties.gloss_core &&
            Math.abs(sta.geometry.coordinates[1]) < 20;
        }
      ).length;
      tabs[thisTab].special[1] = staGeoJSON.features.filter( 
        function(sta) { 
          return sta.properties.gloss_core &&
            Math.abs(sta.geometry.coordinates[1]) < 20;
        }
      ).length;
    }
    
    var total = 0;
    tabs[thisTab].group.forEach( function(thisGroup, idx) {
        tabs[thisTab].count[idx] = staTab.filter(
                                     tabs[thisTab].groupSelect[idx]
                                   ).length;
        tabs[thisTab].count[idx] -= total; 
        tabs[thisTab].group[idx] += " (" + tabs[thisTab].count[idx] + ")";
        total += tabs[thisTab].count[idx];
    });
    
}

Object.keys(tabs).forEach( getStationCounts );

// ------------------------------------------------------------
// create the tabs
// ------------------------------------------------------------

tabID.forEach( function(thisID, idx) {
  
  $("<li>", {"id": thisID}).appendTo("#map-tabs");
  if (idx === 0) { $("#" + thisID).addClass("active"); }
  $("<a>").text(tabs[thisID].name).appendTo("#" + thisID);
  
});

// when a tab is clicked ...
$("#map-tabs li").click( function() {
  
  //  ... change the button appearance ... 
  $("#map-tabs li").removeClass("active");
  $(this).addClass("active");
    
  // ... and filter the stations, change the map, change description
  var tb = $(this).attr("id");
  showStations( staGeoJSON.features, tabs[tb] );
  updateDetails( tb, tabs[tb] ); // function in mapDescription.js
  
});

// ------------------------------------------------------------
// initialize for map
// ------------------------------------------------------------

// url for map data
//var worldMap = 'https://raw.githubusercontent.com/mbostock/topojson/master/examples/world-110m.json';
var worldMap = 'js/world-110m.json';

// map dimensions
var mapWidth = 800,
    mapHeight = 0.57*mapWidth,
    legHeight = 80;
    legOffset = 20;

var scale = mapWidth*111.5/700;
var mapCenter = [mapWidth/2, mapHeight/2];

// projection-settings
var projection = d3.geoPatterson()
    .scale(scale)
    .translate(mapCenter)
    .precision(.1)
    .rotate([-180,0]);

// define paths in terms of the projection
var path = d3.geoPath()
    .projection(projection);
    
// use different symbols to differentiate GCN stations
var sym = [];
sym[0] = { 
  "symbol": d3.symbolTriangle, 
  "initSize": 45, 
  "currentSize": 45,
  "text": "GLOSS Core Network stations"
};
sym[1] = { 
  "symbol": d3.symbolCircle, 
  "initSize": 55, 
  "currentSize": 55, 
  "text": "Other stations" 
};

// zoom parameters
var zoom = d3.zoom()
    .scaleExtent([1, 25])
    .on("zoom", zoomed);
    
// store current transform
var transform = d3.zoomIdentity;
    
// what happens on zoom
function zoomed() {
    
  closeInfo();
  
  transform = d3.event.transform;
  
  // bound the zoom and pan so user cannot move outside map limits
  tx = Math.min(0, Math.max(transform.x, mapWidth - mapWidth*transform.k));
  ty = Math.min(0, Math.max(transform.y, mapHeight - mapHeight*transform.k));
  transform.x = tx;
  transform.y = ty;
    
  gBasemap.attr("transform", transform);
  gBasemap.selectAll(".land").attr("stroke-width", 1/transform.k);
  
  gTG.attr("transform", transform).attr("stroke-width", 1/transform.k);
    
  sym[0].currentSize = sym[0].initSize/(1 + 3*(transform.k - 1));
  var zmTri = d3.symbol().size( sym[0].currentSize ).type( sym[0].symbol );
  gTG.selectAll(".tgTriangle").attr("d", zmTri);
  
  sym[1].currentSize = sym[1].initSize/(1 + 3*(transform.k - 1));
  var zmCirc = d3.symbol().size( sym[1].currentSize ).type( sym[1].symbol );
  gTG.selectAll(".tgCircle").attr("d", zmCirc);
  
} // end zoomed
    
// create the SVG container for map
var svg = d3.select("#map-container")
  .append("svg")
	.classed("mainSVG", true)
    .attr("width", mapWidth)
	.attr("height", mapHeight + legHeight);

// add zoom behavior to map container
svg.call(zoom);
    
// * create layers to be added to the SVG container
// * "g" is an element (like <div>) that groups graphic components
// * the order in which the <g> elements are appended determines the z-stacking of layers
var gBasemap = svg.append("g");
var gTG = svg.append("g"); // TGs
var gLegend = svg.append("g"); // legend

// ------------------------------------------------------------
// set-up legend
// ------------------------------------------------------------

// create a background for the legend
gLegend.append("rect")
  .attrs({
    x: 0,
    y: mapHeight,
    width: mapWidth,
    height: legHeight,
    fill: "rgba(255, 255, 255, 0.85)"
  });
  
// legend text showing zoom/pan instructions
var instrctA = [];
instrctA[0] = "Zoom in:";
instrctA[1] = "Zoom out:";
instrctA[2] = "Pan:";
instrctA[3] = "Reset:";
gLegend.selectAll(".instrctTextA").data(instrctA)
  .enter().append("text")
  .text( function(d) {return d; console.log(d);} )
  .attr("class", "instrctTextA")
  .attrs({
    x: mapWidth - 140,
    y: function (d, i){ return mapHeight + legOffset + i*15 - 3; },
    "alignment-baseline": "middle",
    "text-anchor": "end"
  })
  .styles({
    "font-size": "11px",
    "font-weight": "bold",
    "font-style": "italic"
  });
var instrctB = [];
instrctB[0] = "double click or scroll up";
instrctB[1] = "scroll down";
instrctB[2] = "click-and-drag";
instrctB[3] = "click reset button";
gLegend.selectAll(".instrctTextB").data(instrctB)
  .enter().append("text")
  .text( function(d) {return d; console.log(d);} )
  .attr("class", "instrctTextB")
  .attrs({
    x: mapWidth - 135,
    y: function (d, i){ return mapHeight + legOffset + i*15 - 3; },
    "alignment-baseline": "middle",
  })
  .styles({ "font-size": "11px", "font-style": "italic"});

// reset button  
gLegend.append("rect")
    .attr("rx", 6).attr("ry", 6)
    .attr("x", mapWidth - 45).attr("y", mapHeight - 45)
    .attr("width", 35).attr("height", 35)
    .style("fill", "#222").style("opacity", 0.85);
gLegend.append("text")
    .classed("refresh", true)
    .text(function(d) { return '\uf0e2' })
    .attr("x", mapWidth - 45 + 17.5).attr("y", mapHeight - 45 + 18.5)
    .attr("alignment-baseline", "middle").attr("text-anchor", "middle")
    .style("font-family", "FontAwesome").style("font-size", "22px")
    .style("fill", "#FFF");
gLegend.append("rect") // transparent overlay to receive input
    .attr("rx", 6).attr("ry", 6)
    .attr("x", mapWidth - 45).attr("y", mapHeight - 45)
    .attr("width", 35).attr("height", 35)
    .style("fill", "#FFF").style("opacity", 0)
    .on("mouseover", function(d) {
      d3.selectAll(".refresh").style("fill", "#58A4B0")
    })
    .on("mouseout", function(d) {
      d3.selectAll(".refresh").style("fill", "#FFF")
    })
    .on("click", resetZoom);
    
// reset the zoom 
function resetZoom() {
    
  closeInfo();
  
  var iTransform = d3.zoomIdentity;
  
  var resetTransition = d3.transition()
    .duration(500);  
  
  svg.transition(resetTransition)
    .call(zoom.transform, iTransform);
  
}
  
// ------------------------------------------------------------
// create map
// ------------------------------------------------------------

// create backgound element to receive zoom over ocean
gBasemap.append("rect")
  .attrs({
    x: 0,
    y: 0,
    width: mapWidth,
    height: mapHeight,
    fill: "rgba(255, 255, 255, 0)"
  });

// create the basemap
d3.json(worldMap, function(err, mapData) {

  // * extract the countries features from the mapdata
  // * use topojson to reduce border redundancy
  var countries = topojson.feature(mapData, mapData.objects.countries).features;
      
  // add countries to the geo path
  gBasemap.selectAll(".land").data(countries)
    .enter()
    .append("path")
      .attr("class", "land")
      .attrs({
        "fill": "#444",
        "stroke": "#666",
        "stroke-width": "0.5px",
        "d": path
      });
      
});

// show the tide gauge stations
var tb = "sta_all";
showStations( staGeoJSON.features, tabs[tb] ); // function below
updateDetails( tb, tabs[tb] ); // function in mapDetails.js

// ------------------------------------------------------------
// show and/or update the station locations
// ------------------------------------------------------------

function showStations(sta, tab) {
    
  // filter stations
  var staSelect = sta.filter( tab.tabSelect );
  
  // initially sort the stations for UH stations on top, then GLOSS core, then others
  staSelect.sort( function(a, b) {
    var va = ( a.properties.uh_station && a.properties.gloss_core ) ? 3 : ( a.properties.uh_station ) ? 2 : ( a.properties.gloss_core ) ? 1 : 0;
    var vb = ( b.properties.uh_station && b.properties.gloss_core ) ? 3 : ( b.properties.uh_station ) ? 2 : ( b.properties.gloss_core ) ? 1 : 0;
    return ( va < vb ) ? -1 : ( va > vb ) ? 1 : 0;
  });
  
  // assign colors based on groups in this tab
  function assignColors(sta) {
    for (var k = 0; k < tab.group.length; k++) {
      if (tab.groupSelect[k](sta)) { return tab.groupColor[k]; }
    }
  }
  
  // * note use of the projection in converting the lat/lon coords  
  // * show GCN stations as triangles and non-GCN stations as circles
  var tgMarkers = gTG.selectAll(".tgMarkers")
    .data(staSelect, function(d) { 
      return d.properties.uhslc_id; 
    });
  tgMarkers.exit() // exit
      .remove(); 
  tgMarkers.enter() // enter
    .append("path")
      .classed("tgMarkers", true)
      .classed("tgCircle", function(d) {
        return (d.properties.gloss_core) ? false : true;
      })
      .classed("tgTriangle", function(d) {
        return (d.properties.gloss_core) ? true : false;
      })
      .attr("transform", function(d) { 
        var x = projection(d.geometry.coordinates)[0];
        var y = projection(d.geometry.coordinates)[1];
        return "translate(" + x + "," + y + ")"; 
      })
      .on("mouseover", stationMouseover)
      .on("mouseout", stationMouseout)
      .on("click", stationClick)
    .merge(tgMarkers) // enter + update 
      .attr("fill", assignColors)
      .attr("d", d3.symbol()
        .size( function(d) {
          return (d.properties.gloss_core) ? sym[0].currentSize :
            sym[1].currentSize;
        })
        .type( function(d) {
          return (d.properties.gloss_core) ? sym[0].symbol : sym[1].symbol;
        })
      );
      
  // legend
  var legColor = gLegend.selectAll(".colorBlock").data(tab.groupColor);
  legColor.exit().remove();
  legColor.enter().append("rect")
    .attr("class", "colorBlock")
    .attrs({
      x: 20,
      y: function (d, i){return mapHeight + legOffset - 5 + i*20;},
      width: 15,
      height: 10,
    })
    .merge(legColor).attr("fill", function(d){return d;} );
  
  var legColorText = gLegend.selectAll(".colorText").data(tab.group);
  legColorText.exit().remove();
  legColorText.enter().append("text")
    .attr("class", "colorText")
    .attrs({
      x: 45,
      y: function (d, i){return mapHeight + legOffset + i*20;},
      "alignment-baseline": "middle"
    })
    .merge(legColorText).text( function(d) {return d;} );
  
  var legSymbol = gLegend.selectAll(".symType").data(sym);
  legSymbol.exit().remove();
  legSymbol.enter().append("path")
    .attr("class", "symType")
    .attr("transform", function(d, i) { 
      return "translate( " + (mapWidth/3 + 20) + "," + (mapHeight + legOffset + i*20) + ")"; 
    })
    .attr("fill", "rgb(0, 0, 0, 0.75)")
    .merge(legSymbol).attr("d", d3.symbol()
                         .size( function(d) { return d.initSize; } )
                         .type( function(d) { return d.symbol; } ) 
               );
  
  var legSymbolText = gLegend.selectAll(".symText").data(sym);
  legSymbolText.exit().remove();
  legSymbolText.enter().append("text")
    .attr("class", "symText")
    .attrs({
      x: mapWidth/3 + 40,
      y: function (d, i){ return mapHeight + legOffset + i*20; },
      "alignment-baseline": "middle"
    })
    .merge(legSymbolText).text( function(d, i) {
        return (i === 0) ? d.text + " (" + tab.tabCountGCN + ")" : d.text;
      } );
  
} // end showStations

// ------------------------------------------------------------
// station marker interactions
// ------------------------------------------------------------

function stationMouseover(d) {
  if (d3.select("#tooltip").classed("clicked")) { 
    return; 
  }
  d3.select(this).raise().attr("stroke", "#000");
  d3.select("#tooltip").html("");
  d3.select("#tooltip").append("p")
    .text(d.properties.name)
    .classed("tooltip-name", true);
  d3.select("#tooltip").append("p")
    .text(d.properties.country)
    .classed("tooltip-country", true);
  d3.select("#tooltip").classed("hidden", false);
    
  var mapCenter = $("#map-container").position().left + mapWidth/2;
  var evX = d3.event.pageX;
  var evY = d3.event.pageY;
  if (evX <= mapCenter) {
    var x = (evX + 15) + "px";
    var y = (evY - 15) + "px";
  } else {
    var w = d3.select("#tooltip").node().getBoundingClientRect().width;
    var x = (evX - w - 15) + "px";
    var y = (evY - 15) + "px";
  }
  d3.select("#tooltip")
    .styles({ left: x, top: y })
}

function stationMouseout(d) {         
  if (!d3.select("#tooltip").classed("clicked")) {
    d3.select(this).attr("stroke", "none");  
    d3.select("#tooltip").classed("hidden", true)
  }
}

function stationClick(d) {
  
  d3.select(".clickedSta")
    .classed("clickedSta", false)
    .attr("stroke", "none");  
  d3.select(this).raise()
    .classed("clickedSta", true)
    .attr("stroke", "#000");
  
  // empty tooltip, show it, class it, and add station name/country    
  d3.select("#tooltip")
    .html("")
    .classed("hidden", false).classed("clicked", true)
  d3.select("#tooltip")
    .append("p")
      .text(d.properties.name)
      .classed("tooltip-name", true);
  d3.select("#tooltip")
    .append("p")
      .text(d.properties.country)
      .classed("tooltip-country", true);
  
  // lat/lon info
  var ttipSec1 = d3.select("#tooltip")
    .append("div").classed("tooltip-section", true);
      var left = ttipSec1.append("div");
        left.append("p").text("Latitude:");
        left.append("p").html("Longitude:&nbsp;&nbsp;");
      var right = ttipSec1.append("div");
        right.append("p").html(d.properties.latitude_str);
        right.append("p").html(d.properties.longitude_str);

  // UHSLC info and data links
  var ttipSec2 = d3.select("#tooltip")
    .append("div").classed("tooltip-section", true);
      ttipSec2.append("p").text("UHSLC ID: " + ('000' + d.properties.uhslc_id).slice(-3));
      if (d.properties.uh_station) { 
          ttipSec2.append("p").append("a")
          .attr("href", "http://uhslc.soest.hawaii.edu/stations/?stn=" + ("00" + d.properties.uhslc_id).slice(-3))
          .attr("target", "_blank")
          .text("UH Station Page")
          .append("p");
      } 
      var left = ttipSec2.append("div");
        left.append("p").html("Data:&nbsp;&nbsp;<br>")
      var right = ttipSec2.append("div");
        right.append("p").append("a").classed("tooltip-link", true)
          .attr("href", "http://uhslc.soest.hawaii.edu/data/?fd#uh" + ("00" + d.properties.uhslc_id).slice(-3))
          .attr("target", "_blank")
          .text("Fast Delivery");
        right.append("p").append("a").classed("tooltip-link", true)
          .attr("href", "http://uhslc.soest.hawaii.edu/data/?rq#uh" + ("00" + d.properties.uhslc_id).slice(-3))
          .attr("target", "_blank")
          .text("Research Quality");
  
  // GLOSS info
  if (d.properties.gloss_id !== null) {
     var ttipSec3 = d3.select("#tooltip")
      .append("div").classed("tooltip-section", true);
        // ttipSec3.append("p").text("GLOSS ID: " + d.properties.gloss_id);
        ttipSec3.append("p").text("GLOSS ID: " + ('000' + d.properties.gloss_id).slice(-3));
        ttipSec3.append("p").append("a").classed("tooltip-link", true)
          .attr("href", "http://www.gloss-sealevel.org/station_handbook/stations/" + + d.properties.gloss_id + "/")
          .attr("target", "_blank")
          .text("Station Handbook");
  } // end if has gloss id
  
  // close station info
  var ttipClose = d3.select("#tooltip")
    .append("div").classed("tooltip-close", true)
      .append("a")
        .html('<i class="fa fa-times-circle" aria-hidden="true"></i>')
        .on("click", closeInfo);
        
  // position tooltip
  var mapCenter = $("#map-container").position().left + mapWidth/2;
  var evX = d3.event.pageX;
  var evY = d3.event.pageY;
  if (evX <= mapCenter) {
    var x = (evX + 15) + "px";
    var y = (evY - 15) + "px";
  } else {
    var w = d3.select("#tooltip").node().getBoundingClientRect().width;
    var x = (evX - w - 15) + "px";
    var y = (evY - 15) + "px";
  }
  d3.select("#tooltip")
    .styles({ left: x, top: y , opacity: 0.95})

} // end stationClick

function closeInfo(d) {
  
  d3.select(".clickedSta")
    .attr("stroke", "none")
    .classed("clickedSta", false);
  
  d3.select("#tooltip")
    .classed("clicked", false)
    .classed("hidden", true)
    .styles({opacity: 0.9});

} // end closeInfo

// ------------------------------------------------------------

}); // end $(document).ready()







