
$('button.save').on('click', function(e){
  e.preventDefault();
  submit("Mike", "Brown");
  // console.log(jst);
});

$('button.get').on('click', function(e){
  e.preventDefault();
  // $.get("http://localhost:3000/data/", function(data, status){
  $.get("/data", function(data, status){
    // alert("Data: " + data + "\nStatus: " + status);
    console.log("Firstname, Last Name");
    data.forEach(function(obj) {
      console.log(obj.firstname + " " + obj.lastname);
    });
  });
  // console.log('Get pushed!');
});


function submit(firstname, lastname) {
  var obj = {
    firstname: firstname,
    lastname: lastname
  };
  $.ajax({
    // url: 'http://localhost:3000',
    url: '/data',
    type: 'POST',
    data: JSON.stringify(obj), // "['a']"
    contentType: 'application/json',
    success: function () {
      // console.log('post sent');
    },
    error: function () {
      // console.error('post failed');
    }
  });
}
