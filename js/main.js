function getName(year, gender) {
  var filename = "data/yob" + year + "-" + gender + "-top-100";

  /*$.get( filename, function( data ) {
    return data;
  }, {
    async: false
  });*/

  var rawNames;

  $.ajax({
    url: filename,
    async: false,
    success: function(data) {
      rawNames = data;
    }
  });

  var names = rawNames.split('\n');

  //If there are more than 100 lines, they're blank
  var index = Math.floor(Math.random() * 100);

  return names[index];
}

$(document).ready(function() {
  var thisYear = new Date().getFullYear();

  if(Math.random() > 0.5) {
    $('input[name=gender]').prop('checked', true);
  }

  $('form').submit(function(e) {
    e.preventDefault();
    var age = $('input[name=age]').val();

    var maxYear = 2013;
    var range = 70;

    var year;

    if(age)
      year = thisYear - age;
    else
      year = maxYear - Math.floor(Math.random()*range);

    var gender = $('input[name=gender]').is(':checked') ? 'f' : 'm';

    if(year < 1848)
      $('#name').html('Too old!');
    else if(year > 2013) {
      $('#name').html('Too young!');
    } else
      $('#name').html(getName(year, gender));
  });

  $('.navigate').click(function() {
    $('#info').toggleClass('animated');
    $('#main').toggleClass('animated');
  });

  $('.this-year').html(thisYear);
});

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
