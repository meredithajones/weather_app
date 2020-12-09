


//Putting in the function so that our javascript will not load
//until after the html finished loading(wrap everything in it)
$(document).ready(function(){
   
    var Cities = [];

    //Create function for users to search for weather in a specific city

    function GetInput(event) {
        event.preventDefault();

        //create a variable to store the input
        var userCity = $(".SearchCity").val(); 

        //Create the array of cities that have been searched for
        Cities.push(userCity);

        //use JSON to make a string from the cities in the Cities Array

        localStorage.setItem("CitiesNames", JSON.stringify(Cities));

        //Display the cities that have been searched below the search bar

        var SearchedCities = $("<div>").text(userCity).addClass("Clickable");
        $("#CityList").append(SearchedCities);

        
        //userCity, local variable. Feed parameter 
        // userCity to function WeatherApi so it can use it
        WeatherApi(userCity);
        $(".SearchCity").val("");
    }
    //Create function to list the cities already searched 
    // and stored in the localStorage
    function CitiesList() {
        //Convert the String into a JSON object
        Cities = JSON.parse(localStorage.getItem("CitiesNames"));
        //If CitiesNames doesn't exist in localstorage, Cities will be null. 
        // If Cities is null, Cities.length will throw an error. 
        // If Cities = null, initialize Cities anyway.
        if (Cities == null) {
        Cities = [];
        }
        console.log(Cities);

        //Loop through the array of Cities
        for (var i = 0; i < Cities.length; i++) {
            var CitiesToDisplay = Cities[i];
            // I want to call them individually and then display in the list
            // print the information in a list, print every name we have in local storage
            var List = $("<div>").text(CitiesToDisplay).addClass("Clickable"); 
            //add class to add clickable function later
            $("#CityList").append(List);

            //Create an if function so that 
        }
    }
    // API key to use with openweathermap
    var APIKey = "43150bac67a6b6bc9ffc3d398fb24e60";

    //Generates current weather and 5 days weather
    function WeatherApi (userCity) {
        console.log(userCity)
        //Build the URL we need to get the current weather information
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + APIKey;
        console.log(queryURL);
        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // We store all of the data inside of an object called "response"
            .then(function(response) {
                console.log ("the response" + response);

                //Adding weather icons 
                //create URLs to get icons from weather API
                var CurrentIcon = "http://openweathermap.org/img/wn/"+response.list[0].weather[0].icon+"@2x.png";
                var FirstDay = "http://openweathermap.org/img/wn/"+response.list[6].weather[0].icon+"@2x.png";
                var SecondDay = "http://openweathermap.org/img/wn/"+response.list[14].weather[0].icon+"@2x.png";
                var ThirdDay = "http://openweathermap.org/img/wn/"+response.list[22].weather[0].icon+"@2x.png";
                var FourthDay = "http://openweathermap.org/img/wn/"+response.list[30].weather[0].icon+"@2x.png";
                var FithDay = "http://openweathermap.org/img/wn/"+response.list[38].weather[0].icon+"@2x.png";
        
                //Store the image in a variable to use below
                var IconMain = $('<img src=" '+ CurrentIcon +' "/>');
                var IconOne = $('<img src=" '+ FirstDay +' "/>');
                var IconTwo = $('<img src=" '+ SecondDay +' "/>');
                var IconThree = $('<img src=" '+ ThirdDay +' "/>');
                var IconFour = $('<img src=" '+ FourthDay +' "/>');
                var IconFive = $('<img src=" '+ FithDay +' "/>');

                //Current weather
                //Data for adding to the html 
                $("#TitleCity").text(response.city.name + "  (" + response.list[0].dt_txt.substr(0, 10) + ")").append(IconMain); // Use substr(0, 10 to only retrieve date and not time from the WeatherAPI)
                
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
                console.log(new Date().toLocaleDateString())
                //response.list[6].dt_txt.substr(0, 10)
                $("#Date1").text(new Date().toLocaleDateString());
                $("#icon1").empty().append(IconOne);
                $("#Temp1").text("Temp: " + ((response.list[6].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity1").text("Humidity: " + response.list[6].main.humidity + " %");

                //Second day after current weather. Info display from mid-day information
                $("#Date2").text(response.list[14].dt_txt.substr(0, 10));
                $("#icon2").empty().append(IconTwo);
                $("#Temp2").text("Temp: " + ((response.list[14].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity2").text("Humidity: " + response.list[14].main.humidity + " %");

                //3nd day after current weather. Info display from mid-day information
                $("#Date3").text(response.list[22].dt_txt.substr(0, 10));
                $("#icon3").empty().append(IconThree);
                $("#Temp3").text("Temp: " + ((response.list[22].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity3").text("Humidity: " + response.list[22].main.humidity + " %");

                //4nd day after current weather. Info display from mid-day information
                $("#Date4").text(response.list[30].dt_txt.substr(0, 10));
                $("#icon4").empty().append(IconFour);
                $("#Temp4").text("Temp: " + ((response.list[30].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity4").text("Humidity: " + response.list[30].main.humidity + " %");

                //5nd day after current weather. Info display from mid-day information
                $("#Date5").text(response.list[38].dt_txt.substr(0, 10));
                $("#icon5").empty().append(IconFive);
                $("#Temp5").text("Temp: " + ((response.list[38].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " F");
                $("#Humidity5").text("Humidity: " + response.list[38].main.humidity + " %");
                
            });
    } // }closes WeatherAPI ()

    //Using latitude and longitude with get UVindex and display on Currentweather 
    function WeatherUVI(latitude,longitude) {  
                 
        //Build the URL we need to get the UVI information
        var accessURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,daily&appid=" + APIKey;

        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: accessURL,
            method: "GET"
        })
            .then(function(response1) {
                console.log(typeof response1.current.uvi)
                var UVI = response1.current.uvi;

                
                
                //Print UVIndex
                $("#UVIndex").text("UV Index: " + UVI);
                
                if (UVI <= 1.99) {                  
                    UVI = $("#UVIndex").css({"background-color": "lightgreen", "display": "inline", "padding": "1%", "border-radius": "10px"});
                } else if (UVI >= 2 & UVI <= 5.99) {
                    UVI = $("#UVIndex").css({"background-color": "yellow", "display": "inline", "padding": "1%", "border-radius": "10px"});
                } else if (UVI >= 4 & UVI <= 7.99) {
                    UVI = $("#UVIndex").css({"background-color": "orange", "display": "inline", "padding": "1%", "border-radius": "10px"});
                } else if (UVI >= 6) {
                    UVI = $("#UVIndex").css({"background-color": "red", "display": "inline", "padding": "1%", "border-radius": "10px"});
                };

            });
    } // Closes WeatherUVI()

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

    //function to activate click search on stored cities
    function clickOnCities() {
        //Store the name value of the city within $(this) to the var userCity.
        var userCity = $(this)[0].innerHTML;
        //When we click the searched cities on the list, 
        //they transfer the name to the function below through userCity 
        //and function is executed.
        WeatherApi(userCity);
    }
    WeatherApi("Philadelphia"); 

    //Call|Execute the function
    $(".fa").on("click", GetInput);
    $(document).on("click", ".Clickable", clickOnCities);

    //Call Function whe the page loads.
    CitiesList();


}); // End of ready(function())
