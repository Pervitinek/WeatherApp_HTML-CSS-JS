let x = "";

const input = document.getElementById("inputWeather");
const findWeather = document.getElementById("findWeather");
const weatherContainer = document.getElementById("weatherContainer");
const errorContainer = document.getElementById("errorContainer");
const refresh = document.getElementById("refresh");
const timerDiv = document.getElementById("timer");
let time = 120; // 2 minuty

refresh.addEventListener("click", async () =>{
    await logWeather();
    time = 120;
});

findWeather.addEventListener("click", () => {
    volejLogWeather();
});

input.addEventListener("keyup", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
        volejLogWeather();
    }
});

input.addEventListener("blur", () => {
    volejLogWeather();
});

async function volejLogWeather(){
    x = input.value;
    await logWeather();
    time = 120;
}

input.addEventListener("input", () => {
    if (input.value.length > 0) {
        findWeather.disabled = false;
    } else {
        findWeather.disabled = true;
    }
});

async function logWeather() {
    try{
        if(input.value.length > 0) {
            const response = await fetch("http://api.weatherapi.com/v1/current.json?key=1a298c41b39641489d7104603242805&q=" + x + "&aqi=yes");
            const info = await response.json();

            errorContainer.innerHTML = "";
            weatherContainer.innerHTML = "";

            const temperature = "Current temperature: " + info.current.temp_c + " C";
            const condition = info.current.condition.text;
            const iconUrl = info.current.condition.icon;

            const img = document.createElement("img");
            const imgCondition = document.createElement("p");
            const divHolder = document.createElement("div");
            const tempP = document.createElement("p");
            const weatherContainerr = document.createElement("div")
            divHolder.appendChild(img);
            divHolder.appendChild(imgCondition);
            tempP.innerText = temperature;
            imgCondition.innerText = condition;

            img.src = iconUrl;
            img.alt = condition;

            weatherContainerr.appendChild(tempP);
            weatherContainerr.appendChild(divHolder);
            weatherContainer.appendChild(weatherContainerr);
            weatherContainerr.classList.add("weatherContainerr");
            divHolder.classList.add("divHolder");
            tempP.classList.add("tempP")
        }else{
            errorContainer.innerHTML = "";
            weatherContainer.innerHTML = "";
            errorContainer.innerText = "You can´t submit an empty city";
        }
    }catch{
        errorContainer.innerHTML = "";
        weatherContainer.innerHTML = "";
        errorContainer.innerText = "The city is not on the list";
    }
}

setInterval(async function() {
    time--;
    timerDiv.innerText = time;
    if (time === 0) {
        time = 120;
        await logWeather();
    }
}, 1000);