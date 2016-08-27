"use strict";

$(document).ready(function () {
  //set focus in search input field
  $("input:text:visible:first").focus();

  //if search button clicked
  $("#search").click(function () {
    if ($("#searchTerm").val().length === 0) {
      //shake search box if empty
      $("#searchTerm").addClass("animated shake");
      $('#searchTerm').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $("#searchTerm").removeClass("animated shake");
      });
    } else {
      doSearch();
    }
  });
  //Enter key already covered by 'keyup' test below
  $("#searchTerm").keyup(function (k) {
    doSearch();
  });
});

//search function
function doSearch() {
  var searchTerm = $("#searchTerm").val();
  //console.log(searchTerm);
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&prop=text&limit=20&format=json&callback=?";
  $.ajax({
    url: url,
    type: "GET",
    //async: false,
    dataType: "json",
    success: function success(data, status, jqXHR) {
      //console.log(data);
      for (var i = data[2].length; i >= 0; i--) {
        $("#output").prepend("<div><div class='well well-sm animated flipInX'><a href=" + data[3][i] + "><h2>" + data[1][i] + "</h2><p class='details'>" + data[2][i] + "</p></a></div></div>");
      } //end for loop
    } //end success function
  }); //end ajax call
} // end doSearch function