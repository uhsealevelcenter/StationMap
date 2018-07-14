// ------------------------------------------------------------
// describe each tab
// ------------------------------------------------------------

function updateDetails( tb, tab ) {
  
  $("#map-details").empty();
  // $("<div>").attr("id", "map-instructions").appendTo("#map-details");
  // $("<span>")
  //   .addClass("detail-title")
  //   .html("What to do:&nbsp;&nbsp;")
  //   .appendTo("#map-instructions");
  // $("<span>")
  //   .text("Choose a tab to view different subsets of stations in the UHSLC database. Click a station to see more information.")
  //   .appendTo("#map-instructions");
  $("<div>").attr("id", "map-description").appendTo("#map-details");
  $("<span>")
    .text("Map details: ")
    .addClass("detail-title")
    .appendTo("#map-description");
        
  switch(tb) {
    
// --------------------------------------------------------------------------
    
    case "sta_all":
      var totSta = 0; tab.count.forEach( function(ele){ totSta += ele } );
      var dscr = "This map shows the locations of all " + totSta + " tide gauge stations for which there is data in the University of Hawaii Sea Level Center (UHSLC) database.";
      $("<span>")
        .text(dscr)
        .addClass("details")
        .appendTo("#map-description");
      var dtl = [];
      dtl[0] = "The UHSLC operates and/or maintains " + tab.count[0] + " of these stations (orange markers).";
      dtl[1] = "The database contains tide gauge sea levels from " + tab.tabCountGCN + ' stations in the GLOSS Core Network (GCN). Go <a href="http://uhslc.soest.hawaii.edu/gloss/">here</a> for more information about GLOSS and the GCN.';
      $("<ul>").addClass("detail-bullets fa-ul").appendTo("#map-description");
      dtl.forEach( function(b, idx) {
        var item = $("<li>").appendTo(".detail-bullets");
        $("<i>").addClass("fa-li fa fa-arrow-right").appendTo(item);
        $("<span>").html(b).appendTo(item);
      })
      break;
      
// --------------------------------------------------------------------------
        
    case "sta_gloss":
      var totSta = 0; tab.count.forEach( function(ele){ totSta += ele } );
      var dscr = "This map shows the locations of all " + totSta + " tide gauge stations in the UHSLC data base that have a GLOSS identification number.";
      $("<span>")
        .html(dscr)
        .addClass("details")
        .appendTo("#map-description");
      var dtl = [];
      dtl[0] = '<a href="http://www.gloss-sealevel.org">GLOSS</a> (or the Global Sea Level Observing System) oversees the global tide gauge network and facilitates cooperation between international agencies to collect, process, and distribute tide gauge data.';
      dtl[1] = 'The backbone of the global tide gauge network is the GLOSS Core Network (<a href"http://www.gloss-sealevel.org/network_status/glosscorenetwork10.html">GCN</a>). The triangles show the ' + tab.tabCountGCN + ' stations with data in the UHSLC database that are in the GLOSS Core Network (GCN)';
      dtl[2] = "The UHSLC operates and/or maintains " + tab.count[0] + " out of 289 (or " + Math.round(100*tab.count[0]/289) + "\%) of the stations in the GCN (orange markers).";
      $("<ul>").addClass("detail-bullets fa-ul").appendTo("#map-description");
      dtl.forEach( function(b, idx) {
        var item = $("<li>").appendTo(".detail-bullets");
        $("<i>").addClass("fa-li fa fa-arrow-right").appendTo(item);
        $("<span>").html(b).appendTo(item);
      })
      break;
      
// --------------------------------------------------------------------------
        
    case "sta_uhslc":
      var totSta = 0; var cumSta = [];
      tab.count.forEach( function(ele, idx){
        totSta += ele; cumSta[idx] = totSta;
      } );
      var dscr = "This map shows the locations of the " + totSta + " tide gauge stations operated and/or maintained by the University of Hawaii Sea Level Center (UHSLC).";
      $("<span>")
        .text(dscr)
        .addClass("detail-description")
        .appendTo("#map-description");
      var dtl = [];
      dtl[0] = "The triangles show locations of the " + tab.tabCountGCN + " UHSLC gauges in the GLOSS Core Network (GCN). These gauges comprise approximately " + Math.round(100*tab.tabCountGCN/289) + "\% of the full GCN and " + Math.round(100*tab.special[0]/tab.special[1]) + "\% of the GCN at low latitudes (20" + String.fromCharCode(176) + "S-20" + String.fromCharCode(176) + "N).";
      dtl[1] = "Many of the remaining UHSLC gauges are part of tsunami warning systems in the Indian Ocean and Caribbean.";
      dtl[2] = Math.round(100*cumSta[0]/totSta) + "\% of the records from UHSLC stations have been updated in the last 6 months, while " + Math.round(100*cumSta[1]/totSta) + "\% have been updated in the last 18 months.";
      $("<ul>").addClass("detail-bullets fa-ul").appendTo("#map-description");
      dtl.forEach( function(b, idx) {
        var item = $("<li>").appendTo(".detail-bullets");
        $("<i>").addClass("fa-li fa fa-arrow-right").appendTo(item);
        $("<span>").text(b).appendTo(item);
      })
      break;
      
// --------------------------------------------------------------------------
        
    case "sta_fd":
      var totSta = 0; var cumSta = [];
      tab.count.forEach( function(ele, idx){
        totSta += ele; cumSta[idx] = totSta;
      } );
      var dscr = "This map shows locations of the " + totSta + " tide gauge stations in the UHSLC database providing Fast Delivery data.";
      $("<span>")
        .text(dscr)
        .addClass("details")
        .appendTo("#map-description");
      var dtl = [];
      dtl[0] = 'Updates to Fast Delivery (FD) data are released within 1-2 months of data collection and receive only basic quality control focused on large level shifts and obvious outliers. Read more <a href="http://uhslc.soest.hawaii.edu/datainfo/">here</a>.';
      dtl[1] = Math.round(100*cumSta[0]/totSta) + "\% of the Fast Delivery records have been updated in the last 6 months, while " + Math.round(100*cumSta[1]/totSta) + "\% have been updated in the last 18 months.";
      dtl[2] = "The triangles show the locations of the " + tab.tabCountGCN + " Fast Delivery records that correspond to stations in the GLOSS Core Network (GCN)."
      $("<ul>").addClass("detail-bullets fa-ul").appendTo("#map-description");
      dtl.forEach( function(b, idx) {
        var item = $("<li>").appendTo(".detail-bullets");
        $("<i>").addClass("fa-li fa fa-arrow-right").appendTo(item);
        $("<span>").html(b).appendTo(item);
      })
      break;
      
// --------------------------------------------------------------------------
      
    case "sta_rq":
      var totSta = 0; var cumSta = [];
      tab.count.forEach( function(ele, idx){
        totSta += ele; cumSta[idx] = totSta;
      } );
      var dscr = "This map shows locations of the " + totSta + " tide gauge stations in the UHSLC database providing Research Quality data.";
      $("<span>")
        .text(dscr)
        .addClass("details")
        .appendTo("#map-description");
      var dtl = [];
      dtl[0] = 'Research Quality (RQ) Data receive thorough quality control and are considered to be the final, science-ready data set. This process is time-consuming, and RQ data are released 1-2 years after data is received from the data originators. Read more <a href="http://uhslc.soest.hawaii.edu/datainfo/">here</a>.';
      dtl[1] = Math.round(100*cumSta[0]/totSta) + "\% of the Research Quality records have been updated in the last 3 years, while " + Math.round(100*cumSta[1]/totSta) + "\% have been updated in the last 7 years. It is important to note that many RQ data are from stations that are no longer operating; such stations are not expected to receive updates.";
      dtl[2] = "The triangles show the locations of the " + tab.tabCountGCN + " Research Quality records that correspond to stations in the GLOSS Core Network (GCN)."
      $("<ul>").addClass("detail-bullets fa-ul").appendTo("#map-description");
      dtl.forEach( function(b, idx) {
        var item = $("<li>").appendTo(".detail-bullets");
        $("<i>").addClass("fa-li fa fa-arrow-right").appendTo(item);
        $("<span>").html(b).appendTo(item);
      })
        
// --------------------------------------------------------------------------
      
  } // end switch
  
} // end function updateDetails