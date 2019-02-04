var POP = POP || {};

POP.counter = (function() {
  var countNumber = (function () {
    var countNumber = null;
    $.ajax({
      async: false,
      global: false,
      url: "/counter/counter.json",
      dataType: "json",
      success: function (data) {
        countNumber = data.counter;
      }
    });
	return countNumber;
  })();
  $(".counter-numbers").html(countNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  $.post("/counter/counter.php", {ajax: true});
});
