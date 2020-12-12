 //*** Create 5 day forecast cards ***//



                const dealCards = () => {
                    //Create the card clone

                    const $clone = $('.card-template').clone();
                    //For loop to create all 5 cards for forecast

                    
                    for (let i = 1; i < 6; i++) {
                        //create the clone for the loop
                        const $copy = $clone.clone();
                        //set the id for all the cards
                        $copy.attr('id', `card-${i}`);
                        //Append the clones to the container
                        $($copy).appendTo('#card-deck');
                        //Adds h5 element for date
                        $('<h5>').attr('id', `card-date-${i}`).appendTo(`#card-${i}`);
                        //Adds h6 element for icon
                        $('<h6>').attr('id', `card-icon-${i}`).appendTo(`#card-${i}`);
                        //Add p elements for temp & humidity
                        $('<p>').attr('id', `card-temp-${i}`).appendTo(`#card-${i}`);
                        $('<p>').attr('id', `card-humidity-${i}`).appendTo(`#card-${i}`);
                        //Makes cards and heading visible
                        $copy.css('display', 'block');
                        $('#five-day-heading').css('display', 'block');
                    }
                }

                //*** Writes the weather info to the cards ***/
                const writeCards = () => {
                    for (let i = 1; i < 6; i++) {
                        //Writes date
                        $(`#card-date-${i}`).text(new Date(res.daily[i].dt * 1000).toLocaleDateString("en-US"));
                        //Writes weather icon
                        $(`#card-icon-${i}`).html(`<img src=http://openweathermap.org/img/wn/${res.current.weather[0].icon}.png>`);
                        //Writes temp
                        $(`#card-temp-${i}`).text(`Temp: ${res.daily[i].temp.day} \u00B0F`);
                        //Writes humidity
                        $(`#card-humidity-${i}`).text(`Humidity: ${res.daily[i].humidity}\u0025`);
                    }
                }
                //If statement to control the card-cloning  
                if ($('#card-deck').children().length === 1) {
                    dealCards();
                    writeCards();
                } else {
                    writeCards();