// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()
//declaring for ease

let rows = $(".inputHeight");
let cols = $(".inputWeight");
const board = $("#pixelCanvas");
let color = $(".colorPicker");
let range = $(".range");
//only loads when all DOM elements are available
$(document).ready(function() {
  //main grid function includes color changing, eraser and brush functions nested
  function makeGrid() {
    //clearing table
    board.children().remove();
    //using if else so user does not enter too large number and crash tab
    if (rows.val() <= 200 && cols.val() <= 200) {
      //forloop for taking values and creating grid
      for (let i = 0; i < rows.val(); i++) {
        board.append("<tr></tr>");
      }
      for (let j = 0; j < cols.val(); j++) {
        $("tr").append("<td></td>");
      }
    } else {
      window.alert("size too large!! Enter height and width less than 200");
    }
  }
  //color change function
  board.on("click", "td", function() {
    $(this).css("background-color", color.val());
  });
  //eraser function
  board.on("mousedown", "td", function(e) {
    if (e.which === 3) {
      $(this).css("background-color", "transparent");
    }
  });
  board.on("contextmenu", function() {
    return false;
  });
  $(board)
    .mousedown(function(e) {
      if (e.which === 3) {
        $("td").bind("mouseover", function() {
          $(this).css("background-color", "transparent");
        });
      }
    })
    .mouseup(function() {
      $("td").unbind("mouseover");
    });
  $("td").mousedown(function(e) {
    if (e.which === 3) {
      $(this).css("background-color", "transparent");
    }
  });
  //brush functions
  $(board)
    .mousedown(function(e) {
      if (e.which === 1) {
        $("td").bind("mouseover", function() {
          $(this).css("background-color", color.val());
        });
      }
    })
    .mouseup(function() {
      $("td").unbind("mouseover");
    });
  $("td").mousedown(function(e) {
    if (e.which === 1) {
      $(this).css("background-color", color.val());
    }
  });
  //light turn on/off button function
  $(".button").click(function() {
    $("body").toggleClass("night");
  });

  //pixel size range function
  range.on("change", function() {
    $("tr").css("height", $(this).val() + "px");
    $("td").css("width", $(this).val() - 2 + "px");
  });
  //buttons function for dynamically adding and removing rows and columns
  $(".btn-row-top").click(function() {
    $("tr").css("height", range.val() + "px");
    $("td").css("width", range.val() - 2 + "px");
    board.prepend("<tr></tr>");
    for (let i = 0; i < $("tr:nth-child(2) td").length; i++) {
      board.children("tr:first").append("<td></td>");
    }
  });
  $(".btn-row-bottom").click(function() {
    $("tr").css("height", range.val() + "px");
    $("td").css("width", range.val() - 2 + "px");
    board.append("<tr></tr>");
    for (let i = 0; i < $("tr:nth-child(1) td").length; i++) {
      board
        .find("tr")
        .last()
        .append("<td></td>");
    }
  });
  $(".btn-row-dlt-top").click(function() {
    board.children("tr:first").remove();
  });
  $(".btn-row-dlt-bottom").click(function() {
    board.children("tr:last").remove();
  });
  $(".btn-col-right").click(function() {
    $("td").css("width", range.val() - 2 + "px");
    $("tr").append("<td></td>");
  });
  $(".btn-col-left").click(function() {
    $("td").css("width", range.val() - 2 + "px");
    $("tr").prepend("<td></td>");
  });
  $(".btn-col-dlt-left").click(function() {
    $("td:last-child").remove();
  });
  $(".btn-col-dlt-right").click(function() {
    $("td:first-child").remove();
  });

  //preview button function
  $("#preview").on("click", function() {
    html2canvas($("#pixelCanvas")[0]).then(function(canvas) {
      $("#previewBox")
        .children()
        .remove();
      $("#previewBox").append(canvas);
    });
  });
  //download button function
  $("#download").on("click", function(e) {
    html2canvas($("#pixelCanvas")[0]).then(function(canvas) {
      if (
        navigator.userAgent.indexOf("MSIE ") > 0 ||
        navigator.userAgent.match(/Trident.*rv\:11\./)
      ) {
        var blob = canvas.msToBlob();
        window.navigator.msSaveBlob(blob, "Test file.png");
      } else {
        $("#link").attr("href", canvas.toDataURL("image/png"));
        $("#link").attr("download", "pixelCanvas.png");
        $("#link")[0].click();
      }
    });
  });
/*$(document).ready(function(e){
  $("#btn-export").click(function(e){
    $("table").tableExport({
      bootstrap: false,
      formats: ["txt"],
      fileName: "table"
    });
  });
});*/

  //calling grid function
  $(".button-submit").click(function(e) {
    e.preventDefault();
    makeGrid();
  });
});
//reset board function
$(".button-reset").click(function() {
  board.children().remove();
});
