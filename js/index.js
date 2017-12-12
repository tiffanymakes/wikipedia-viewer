$(document).ready(function(){
  // keyup on #enter wasn't working because input is typed in #search, so moved keyup to #search. accidentally discovered one way to do "incremental search"
  $('#search').on('keyup', wiki);
  $('#enter').on('click', wiki);
  // Function Wiki to do Wikipedia search
  function wiki () {
    $("#search-results").empty();
    var search = $('#search').val();
  // api gives an array rather than object.
  var api = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+search+'&callback=?';
  /*  // api gives an object
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch='+search+'&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=?'; */
      //console.log(api);
  // get Wikipedia API
  $.getJSON(api, function(data) {
    var title;
    var extract;
    var link;
   // (array) nested for loops
    for (i=3;i<data.length;i++){
      for(j=0;j<data[i].length;j++) {
      title = data[1][j];
      extract = data[2][j];
      link = data[3][j];
      $('#search-results').append('<div class="result"><a href="'+link+'" target="_blank"><ul class="list-unstyled"><li><h3>'+title+'</h3><p>'+extract+'</p></li></ul></a></div>');
      }
    }
   /* // (array) .forEach method
    data.forEach(function(value, index) {
      console.log(index);
      title = value[1];
      console.log(title);
      extract = value[2];
      link = value[3];
      $('#search-results').append('<div class="result"><a href="'+link+'" target="_blank"><ul class="list-unstyled"><li><h3>'+title+'</h3><p>'+extract+'</p></li></ul></a></div>');
    });*/
    /* //(object) for method
    for(key in data.query.pages) {
    var grab = data.query.pages[key];
    title = grab.title;
      console.log(grab.title);
    extract = grab.extract;
    link = 'https://en.wikipedia.org/?curid='+grab.pageid;
    var image = 'https://en.wikipedia.org/wiki/File:'+grab.pageimage;
    $('#search-results').append('<div class="result"><a href="'+link+'" target="_blank"><ul class="list-unstyled"><li><h3>'+title+'</h3><img src="'+image+'" alt="'+title+'"><p>'+extract+'</p></li></ul></a></div>');
    } */
  }); // close Wikipedia API
  }; // close wiki function
});