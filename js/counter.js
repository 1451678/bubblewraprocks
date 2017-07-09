var POP = POP || {};

POP.counter = (function() {
  var countNumber = (function () {
    var countNumber = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': 'http://maniyar.de/pop-bubbles/counter.json',
      'dataType': "json",
      'success': function (data) {
        countNumber = data.counter;
      }
    });
	return countNumber;
  })();
  $('.counter-numbers').html(countNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  $.post("http://maniyar.de/pop-bubbles/counter.php", {ajax: true});
});