//$ jquery land
$(document).ready(function(){
  console.log("Top: " + $("img").position().top + " Left: " + $("img").position().left);
  
  $("p").position();
 
  //make image draggable
  
  $("#dogememe").draggable({
    stop: function () {
      console.log("stopping???");


      // if( img is far right side  then ) user wins.

      let dogeLeft = $("img").position().left;

      if (dogeLeft > 1000) {
        console.log("we above 1000!", dogeLeft);

        $("h1").text("Am full now, much happy!");

      } else {
        console.log("we NOT above 1000");
      }
    },
  });
});