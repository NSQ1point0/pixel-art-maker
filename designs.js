// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()
//declaring for ease
let rows = $(".inputHeight");
let cols = $(".inputWeight");
const board = $(".pixelCanvas");
let color = $(".colorPicker");
let range=$("range");

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
    //color change function
    board.on("click", "td", function() {
      $(this).css("background-color", color.val());
    });
    //eraser function
    $("td").mousedown(function(e) {
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
  }
  //light turn on/off button function
  $(".button").click(function() {
    $("body").toggleClass("night");
  });

  //calling grid function
  $(".button-submit").click(function(e) {
    e.preventDefault();
    makeGrid();
  });
});
