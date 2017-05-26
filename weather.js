$(document).ready(function()
{


//get longitude and lat via ipinfo api (due to chrome recent //constraints) call getWeather when completed
    $.getJSON('http://ipinfo.io', function(data){
  
        getWeather(data.loc.split(","));
    });

    function getWeather(location)
    {
    
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + location[0] + "&lon=" + location[1] +   "&units=imperial&appid=0b4573127677799a6a116ed3a751f2bc",function(json)
        {
            $("#temp").html(Math.round(json.main.temp, 1)); 
            $("#description").html(json.weather[0].description); 
            $("#wind").html("Wind Speed:  " +json.wind.speed + " mph");
            $("#city-country").html(json.name + ", " + json.sys.country);
            $("#humidity").html("Humidity:  " + json.main.humidity + " %");
            $("#pressure").html("Pressure:  " + json.main.pressure + " hPa");
  
            //check third letter of icon for day or night
            //then change corresponding weather image
            if (json.weather[0].icon[2] == "d")
            {
                $(".image").addClass("wi-owm-day-" + json.weather[0].id);     
            }
      
            else
            {
                $(".image").addClass("wi-owm-night-" +json.weather[0].id);
            }
   
    
      
        }); //close getJSON
  } //close getWeather     
     
  
  //get date and time
    function getDateAndTime()
    {
    
      var day;
      var date;
    
      date = new Date();
      
      
      switch (date.getDay())
      {
        case 0: 
          day = "Sunday";
          break;
          
        case 1: 
          day = "Monday";
          break;
          
        case 2: 
          day = "Tuesday";
          break;
          
        case 3: 
          day = "Wednesday";
          break;
          
        case 4: 
          day = "Thursday";
          break;
          
        case 5: 
          day = "Friday";
          break;
          
        case 6: 
          day = "Saturday";
          break;
      }
    
    //grab date object

      //display day (ie: Monday)
    $("#day").html(day);
      //Only use Month, date, and year from date
    $("#date").html((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
    
    
  }
  
  
  
  
  
    // Fahrenheit to C converter and vice-versa
    var x =1;
  
    $("#temp").click(function()
    {
        var farenheit;
        var celsius;
    
        if (x % 2 !== 0)
        {
            farenheit = this.innerHTML;
            celsius = Math.round((farenheit -32) / 1.8);
            this.innerHTML = celsius;
            $(".wi-fahrenheit").addClass('wi-celsius');
            $('.wi-fahrenheit').removeClass('wi-fahrenheit');
        }
        else
        {
            celsius = this.innerHTML;
            farenheit = Math.round((celsius * 1.8) +32);
            this.innerHTML = farenheit;
            $(".wi-celsius").addClass('wi-fahrenheit');
            $('.wi-celsius').removeClass('wi-celsius');
         }
         
         x++; //iterate for if statement
    });
  
  
 
  getDateAndTime();
  
});