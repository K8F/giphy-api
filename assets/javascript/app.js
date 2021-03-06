console.log("is this working?")
$(document).ready(function () {

    //initial array of celebrities
    var topics = ["Beyonce", "Kim Kardashian", "Tom Cruise", "Dwayne Johnson", "Britney Spears"];

    //write function for HTML to display current content
    function renderButtons() {
        $("#celeb-buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var btn = `<button class="celeb" info=${i}>${topics[i]}</button>`
            $("#celeb-buttons").append(btn)
        }

        //event listener to show gifs for clicked on celebrity
        $('.celeb').on('click', function () {
            var index = $(this).attr("info");
            search(topics[index])

        })

    }


    //function to show gifs for the celebrity button the user clicks on. 
    function search(celebrity) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celebrity + "&api_key=GbRihUv0Hb08GrTIBghIXh1vFSkQWBxt&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "Get"
        }).done(function (response) {
            $("#gif-output").empty();

            var results = response.data;
            for (var i=0; i<results.length; i++){
                var gifContain = $('<div>');
                gifContain.addClass('gif-container');
                //var showDiv = $("<div class='col-4'>")
                var rating = results[i].rating;
                var p = $("<p>");
                p.addClass('gif-rating');
                p.text("Rating: " + rating);
                //img has two sources: one for still photo (src) and one for moving gif (alt-src)
                var img = '<img class="celeb-gif" alt-src=' + results[i].images.downsized.url  + ' src=' + results[i].images.downsized_still.url + '>'
                gifContain.prepend(img);
                gifContain.append(p);

                $('#gif-output').append(gifContain);
               

            }

            //event listener for starting and stopping gi
            $('.celeb-gif').on('click', function(){
                //swaps src and alt-src
                var src = $(this).attr("src")
                var altSrc= $(this).attr("alt-src")
                $(this).attr("src", altSrc)
                $(this).attr("alt-src", src) 
            })            

            console.log(response);//console log to see giphy object
        })

   
    }



    //event listenr to add new celebrity buttons
    $('#add').on('click', function(){
        event.preventDefault()
        console.log("click add")
        var input = $('#add-celeb').val();
        console.log(input)
        search(input);
        topics.push(input);
        renderButtons();
        $("#add-celeb").val("");
    })
    renderButtons()

});

//reder set of default buttons (var=celebrities)
//build a form to gather information that user wants
//