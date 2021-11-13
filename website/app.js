/* Global Variables */
const APIkey = "d4603ce86eee4f4db7ed499e876a7863";
const botton = document.querySelector('#generate');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+(d.getMonth()+1)+'.'+ d.getFullYear();

botton.addEventListener("click", async() => {
  const zipcode =document.querySelector('#zip').value;
  const url =`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${APIkey}`;
  const feelings= document.querySelector('#feelings').value;
 
try {
   const temperature =await getTemperture(url);//gettemperature function call
   await fetch('/send',{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: newDate,
            temperature: temperature,
            feeling: feelings
       })
     });
  const respond=  await fetch('/display');
  const Fdata = await respond.json()
  console.log(Fdata);
  updateEntry(temperature,newDate,feelings); //update entry function call

}
catch (error) {
     console.log(error)
}
});

/**
* @description this function gets the temperature from the openweatherapi 
* @param  url
* its takes the url and basses it to fetch to get the temperature. 
*/
async function getTemperture(url) {
    
   const res= await fetch(url);    
   const weatherData = await res.json();
   const temp= weatherData.main.temp; 
   return temp;
}
/**
* @description this function updates the Most Recent Entry section with the data accuired 
* @param temperature
* @param date
* @param feelings
*/
async function updateEntry(temp,date,fellings){
const dateW = document.getElementById("date");
dateW.textContent=`Date: ${date}`;
const tempW = document.getElementById("temp");
tempW.textContent=`Temperature: ${temp}`;
const feelingW = document.getElementById("content");
feelingW.textContent=`you are feeling: ${fellings}`;
}