var today = new Date();
var helpt = { weekday: "short" };
var day = new Intl.DateTimeFormat("en-US", helpt).format(today);
var now = new Date();
var helpn = { hour12: false, hour: "numeric", minute: "numeric" };
var current_time = now.toLocaleTimeString("en-US", helpn);
document.getElementById("today_name_hour").innerHTML =
  day + ", " + current_time;
for (var i = 1; i < 7; i++) {
  var today = new Date();
  today = today.setDate(today.getDate() + i);
  var help = { weekday: "long" };
  var day = new Intl.DateTimeFormat("en-US", help).format(today);
  var divId = `today_${i}`;
  document.getElementById(divId).innerHTML = day;
}
var xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://api.open-meteo.com/v1/forecast?latitude=34.68&longitude=-1.91&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&current_weather=true&timezone=auto"
);
// var d = new Date();
xhr.onload = () => {
  
  var data = JSON.parse(xhr.response);

  document.getElementById("current_temp").innerHTML =
    parseInt(data.current_weather.temperature) + "°C";
  document.getElementById("today_temp").innerHTML =
    parseInt(data.daily.temperature_2m_max[0]) +
    "°C" +
    "/" +
    parseInt(data.daily.temperature_2m_min[0]) +
    "°C";
    var img_weather_daily_day= document.getElementsByClassName("img_weather_daily_day");
    var img_weather_daily_night= document.getElementsByClassName("img_weather_daily_night");
  for (var i = 0; i < 7; i++) {
    var divIdper = `per_${i}`;
    var divIdmx = `max_${i}`;
    var divIdmn = `min_${i}`;
    document.getElementById(divIdper).innerHTML =
      parseInt(data.daily.precipitation_probability_max[i]) + "%";
      switch(parseInt(data.daily.weathercode[i])) {
        case 0:
          img_weather_daily_day[i].innerHTML = '<img src="resized_images/clear.png" alt="" />';
          img_weather_daily_night[i].innerHTML = '<img src="images_night/clear.png" alt="" />';
          break;
        case 1:
        case 2:
        case 3:
          img_weather_daily_day[i].innerHTML = '<img src="resized_images/partly cloudy.png" alt="" />';
          img_weather_daily_night[i].innerHTML = '<img src="images_night/partly cloudy.png" alt="" />';
          break;
        case 45:
        case 48:
          img_weather_daily_day[i].innerHTML = '<img src="resized_images/fog.png" alt="" />';
          img_weather_daily_night[i].innerHTML = '<img src="images_night/fog.png" alt="" />';
          break;
        case 51:
        case 53:
        case 55:
          img_weather_daily_day[i].innerHTML = '<img src="resized_images/drizzle.png" alt="" />';
          img_weather_daily_night[i].innerHTML = '<img src="images_night/drizzle.png" alt="" />';
          break;
        case 56:
        case 57:
          img_weather_daily_day[i].innerHTML = '<img src="resized_images/freezing drizzle.png" alt="" />';
          img_weather_daily_night[i].innerHTML = '<img src="images_night/drizzle.png" alt="" />';
          break;
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
          img_weather_daily_day[i].innerHTML = '<img src="resized_images/rain.png" alt="" />';
          img_weather_daily_night[i].innerHTML = '<img src="images_night/rain.png" alt="" />';
          break;
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
          img_weather_daily_day[i].innerHTML = '<img src="resized_images/snowfall.png" alt="" />';
          img_weather_daily_night[i].innerHTML = '<img src="images_night/snowfall.png" alt="" />';
          break;
        case 95:
          img_weather_daily_day[i].innerHTML = '<img src="resized_images/light thunderstorm.png" alt="" />';
          img_weather_daily_night[i].innerHTML = '<img src="images_night/light thunderstorm.png" alt="" />';
          break;
        case 96:
        case 99:
          img_weather_daily_day[i].innerHTML = '<img src="resized_images/heavy thunderstorm.png" alt="" />';
          img_weather_daily_night[i].innerHTML = '<img src="images_night/light thunderstorm.png" alt="" />';
          break;
      } 
    document.getElementById(divIdmx).innerHTML =
      parseInt(data.daily.temperature_2m_max[i]) + "°C";
    document.getElementById(divIdmn).innerHTML =
      parseInt(data.daily.temperature_2m_min[i]) + "°C";
  }
  document.getElementById("sunrise").innerHTML =
    data.daily.sunrise[0].substr(-5);
  document.getElementById("sunset").innerHTML = data.daily.sunset[0].substr(-5);
  var temp_a = document.getElementsByClassName("temp_a");
  for(var i = 0; i<temp_a.length;i++){
    temp_a[i].innerHTML = parseInt(data.hourly.temperature_2m[i]) + "°C";
  }
  var time_hourly= document.getElementsByClassName("time_hourly")
  var img_weather= document.getElementsByClassName("img_weather");
  var now = new Date();
  var helpn = { hour12: false, hour: "numeric", minute: "numeric" };
  var current_time = now.toLocaleTimeString("en-US", helpn);
  // console.log(current_time);
  for(var i = 0; i<data.hourly.time.length;i++){
   if(parseInt(data.hourly.time[i].substr(-5))==parseInt(current_time)){
      for(var j=0;j<time_hourly.length;j++){
        time_hourly[j].innerHTML = data.hourly.time[i].substr(-5);
        switch(parseInt(data.hourly.weathercode[i])) {
          case 0:
            img_weather[j].innerHTML = '<img src="images/clear.png" alt="" />';
            break;
          case 1:
          case 2:
          case 3:
            img_weather[j].innerHTML = '<img src="images/partly cloudy.png" alt="" />';
            break;
          case 45:
          case 48:
            img_weather[j].innerHTML = '<img src="images/fog.png" alt="" />';
            break;
          case 51:
          case 53:
          case 55:
            img_weather[j].innerHTML = '<img src="images/drizzle.png" alt="" />';
            break;
          case 56:
          case 57:
            img_weather[j].innerHTML = '<img src="images/freezing drizzle.png" alt="" />';
            break;
          case 61:
          case 63:
          case 65:
          case 66:
          case 67:
          case 80:
          case 81:
          case 82:
            img_weather[j].innerHTML = '<img src="images/rain.png" alt="" />';
            break;
          case 71:
          case 73:
          case 75:
          case 77:
          case 85:
          case 86:
            img_weather[j].innerHTML = '<img src="images/snowfall.png" alt="" />';
            break;
          case 95:
            img_weather[j].innerHTML = '<img src="images/light thunderstorm.png" alt="" />';
            break;
          case 96:
          case 99:
            img_weather[j].innerHTML = '<img src="images/heavy thunderstorm.png" alt="" />';
            break;
        }     
        i++;
      }
      break;
    }
  }
  var perc_a = document.getElementsByClassName("perc_a");
  for(var i=0;i<perc_a.length;i++){
    perc_a[i].innerHTML = data.hourly.precipitation_probability[i] + "%";
  }
};
xhr.onerror = () => {
  alert("ko");
};
xhr.send();

