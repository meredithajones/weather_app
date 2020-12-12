


//Putting in the function so that our javascript will not load
//until after the html finished loading(wrap everything in it)
$(document).ready(function(){
   
    var Cities = [];

    //Create function for users to search for weather in a specific city

    function GetInput(event) {
        event.preventDefault();

        //create a variable to store the input from user searches
        var userCity = $(".SearchCity").val(); 

        //Create the array of cities that have been searched for
        Cities.push(userCity);

        //use JSON to make a string from the cities in the Cities Array
        localStorage.setItem("CityNames", JSON.stringify(Cities));

        //Display the cities that have been searched below the search bar

        var SearchedCities = $("<div>").text(userCity).addClass("Clickable");
        $("#CityList").append(SearchedCities);

         // userCity to function WeatherApi so it can use it
         WeatherApi(userCity);

        //If "CityNames" doesn't exist in localstorage, 
        //Cities will be null. 
        //If Cities is null, Cities.length will create an error. 
        //Setting up an if statement so that If Cities = null, initialize Cities anyway.
        if (Cities == null) {
            Cities = [];
            }
            console.log(Cities);
        

    }

    //Create function to list the cities already searched 
    // and stored in localStorage
    function CitiesList() {
        //Convert the String into a JSON object
        Cities = JSON.parse(localStorage.getItem("CityNames"));

    //If "CityNames" doesn't exist in localstorage, then Cities will be null. 
    // If Cities is null, (Cities.length) will give an error. If Cities = null, we need to finitialize Cities anyway.
    if (Cities == null) {
        Cities = [];
        }
        console.log(Cities);
    

        //Loop to populate the list of cities. 
        for (var i = 0; i < Cities.length; i++) {
            var CitiesToDisplay = Cities[i];

            // Call them individually and then display in the list from local storage
            
            var List = $("<div>").text(CitiesToDisplay).addClass("Clickable"); 
            //add class to be able to add clickable function later on
            $("#CityList").append(List);

            
        }
    }
    // API key to use with openweathermap
    // Saving the key to a variable to that I don't have to paste it in every time it's used.
    var APIKey = "43150bac67a6b6bc9ffc3d398fb24e60";

    //Generating current weather and 5 day forecast
    function WeatherApi (userCity) {
        console.log(userCity)

        // URL we need to get the current weather information
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + APIKey;
        console.log(queryURL);

        // AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // Store all of the data from the API inside of an object called "response"
            .then(function(response) {
                console.log ("the response" + response);

                //Adding weather icons
                //Need variables for each day 
                //create URLs to get icons from Openweather API
                var CurrentDay = "http://openweathermap.org/img/wn/"+response.list[0].weather[0].icon+"@2x.png";
                var DayOne = "http://openweathermap.org/img/wn/"+response.list[6].weather[0].icon+"@2x.png";
                var DayTwo = "http://openweathermap.org/img/wn/"+response.list[14].weather[0].icon+"@2x.png";
                var DayThree = "http://openweathermap.org/img/wn/"+response.list[22].weather[0].icon+"@2x.png";
                var DayFour = "http://openweathermap.org/img/wn/"+response.list[30].weather[0].icon+"@2x.png";
                var DayFive = "http://openweathermap.org/img/wn/"+response.list[38].weather[0].icon+"@2x.png";
        

                //Store the weather icons in variables below, need one variable for each day.
                //Add self closing tags at the end of each
                var IconMain = $('<img src=" '+ CurrentDay +' "/>');
                var IconFirst = $('<img src=" '+ DayOne +' "/>');
                var IconSecond = $('<img src=" '+ DayTwo +' "/>');
                var IconThird = $('<img src=" '+ DayThree +' "/>');
                var IconFourth = $('<img src=" '+ DayFour +' "/>');
                var IconFifth = $('<img src=" '+ DayFive +' "/>');

                //Current weather
                //Data for adding to the html 
                $("#MainCity").text(response.city.name + "  (" + response.list[0].dt_txt.substr(0, 10) + ")").append(IconMain);
                // "Using  substr(0, 10)" to only retrieve a date and not time from the WeatherAPI)
                
                //Make sure that the tempurature displays in farenheight 
                $("#Temp").text("Temperature: " + ((response.list[6].main.temp- 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity").text("Humidity: " + response.list[6].main.humidity + " %");
                $("#Wind").text("Wind Speed: " + response.list[6].wind.speed + " mph");
                
                //For the  UVI index, create a variable that store the coordinates. 
                //Use them with the UVindexAPI to retrieve on currentWeather class HTML.
                var latitude = response.city.coord.lat;
                var longitude = response.city.coord.lon;

                //Transfer the local variables to weatherUVI()
                WeatherUVI(latitude, longitude)

                //First day current weather.
                // Trying to reformat the date displays
                // console.log(new Date().toLocaleDateString())

                //response.list[6].dt_txt.substr(0, 10)
                $("#Date1").text(new Date().toLocaleDateString());
                $("#icon1").empty().append(IconFirst);
                $("#Temp1").text("Temp: " + ((response.list[6].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity1").text("Humidity: " + response.list[6].main.humidity + " %");

                //Second day forecast
                $("#Date2").text(response.list[14].dt_txt.substr(0, 10));
                $("#icon2").empty().append(IconSecond);
                $("#Temp2").text("Temp: " + ((response.list[14].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity2").text("Humidity: " + response.list[14].main.humidity + " %");

                //3rd day forecast
                $("#Date3").text(response.list[22].dt_txt.substr(0, 10));
                $("#icon3").empty().append(IconThird);
                $("#Temp3").text("Temp: " + ((response.list[22].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity3").text("Humidity: " + response.list[22].main.humidity + " %");

                //4th day forecast
                $("#Date4").text(response.list[30].dt_txt.substr(0, 10));
                $("#icon4").empty().append(IconFourth);
                $("#Temp4").text("Temp: " + ((response.list[30].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity4").text("Humidity: " + response.list[30].main.humidity + " %");

                //5th day forecast 
                $("#Date5").text(response.list[38].dt_txt.substr(0, 10));
                $("#icon5").empty().append(IconFifth);
                $("#Temp5").text("Temp: " + ((response.list[38].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity5").text("Humidity: " + response.list[38].main.humidity + " %");
                
            });
    } 

    //Using latitude and longitude with get UVindex and display on Currentweather 
    function WeatherUVI(latitude,longitude) {  
                 
        //Build the URL we need to get the UVindex information
        var accessURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + 
        latitude + "&lon=" + longitude + "&exclude=hourly,daily&appid=" + APIKey;

        
        // Running the AJAX call to the OpenWeatherMap API to get the UV index
        $.ajax({
            url: accessURL,
            method: "GET"
        })
            .then(function(response1) {
                console.log(typeof response1.current.uvi)
                var UVI = response1.current.uvi;

                
                
                //Showing the UVIndex
                $("#UVIndex").text("UV Index: " + UVI);

            //Setting up an if statement to style the background color 
            //of our main weather display so that it changes depending on the UV index. 
            //low index:lightgreen, higher: yellow, higher: orange, highest: red
                if (UVI <= 1.99) {                  
                    UVI = $(".card-body").css({"background-color": "lightgreen", "display": "inline", "padding": "1%", "border-radius": "15px"});
                } else if (UVI >= 2 & UVI <= 5.99) {
                    UVI = $(".card-body").css({"background-color": "yellow", "display": "inline", "padding": "1%", "border-radius": "15px"});
                } else if (UVI >= 4 & UVI <= 7.99) {
                    UVI = $(".card-body").css({"background-color": "orange", "display": "inline", "padding": "1%", "border-radius": "15px"});
                } else if (UVI >= 6) {
                    UVI = $(".card-body").css({"background-color": "red", "display": "inline", "padding": "1%", "border-radius": "15px"});
                };

            });
    } 

    //Example: Viewing the results of API call:
    //  var "" = $(this).attr("data-name");
    // var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    // Creating an AJAX call for the specific content button being clicked
    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // }).then(function(response) {
    //   console.log(response);
    //  }

    //function to activate on click search on stored cities
    function clickOnCities() {
        //Store the name value of the city within $(this) to the var userCity.
        var userCity = $(this)[0].innerHTML;
        //When we click the searched cities on the list, 
        //they transfer the name to the function below through userCity 
        //and function is executed.
        WeatherApi(userCity);
    }
    WeatherApi("Philadelphia"); 

    //Calling the function
    $(".fa").on("click", GetInput);
    $(document).on("click", ".Clickable", clickOnCities);

    // Tryng to set up the search to function with both a click and enter key
    // $(".fa").keypress(function(event) { 
    //     if (event.keyCode === 13) { 
    //         $(".fa").on("click", GetInput);
    //         $(document).on("click", ".Clickable", clickOnCities); 
    //     } 
    // }); 

    // $(document).ready(function() {
    //     $("fa").keyup(function(event) {
    //       if (event.which === 13) {
    //         $("#submit").click();
    //       }
    //     });

    //Call Function when the page loads.
    CitiesList();

    // userCity to function WeatherApi so it can use it
        // WeatherApi(userCity);
        // $(".SearchCity").val("");


});
