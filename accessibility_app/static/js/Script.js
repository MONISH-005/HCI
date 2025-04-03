/* VARS */

let userData = [];
let userDataControl = [];
let isTyping = false;

const areaMessages = document.getElementById('area-messages');

const inputMessage = document.getElementById('message');
const sendMessage = document.getElementById('send');

/* TYPING BOT CONTROL */
function typingControl() {
  if (isTyping) {
    document.getElementById('typing').classList.remove('no-typing');
    document.getElementById('typing').classList.add('is-typing');
  } else {
    document.getElementById('typing').classList.remove('is-typing');
    document.getElementById('typing').classList.add('no-typing');
  }
}

/* WRITE */

inputMessage.addEventListener("input", _ => {
  if (inputMessage.value.length > 0) {
    sendMessage.style.background = '#63E2DB'
  } else {
    sendMessage.style.background = '#181E2A'
  }
});

inputMessage.addEventListener("keyup", event => {
  if (event.code === 'Enter') {
    event.preventDefault();
    getData();
  }
});

/* SCROLL */

function autoScroll() {
  const heightPage = document.body.scrollHeight;
  window.scrollTo(0, heightPage);
}

function scrollDiv() {
  areaMessages.scrollTo(0, 10000);
}

/* GET USER DATA */

function getData() {

  if (inputMessage.value != '' && inputMessage.value != undefined && inputMessage.value != null) {
    userData.push(inputMessage.value);
    userDataControl.push(inputMessage.value);
    inputMessage.value = '';
    sendMessage.style.background = '#181E2A'
    controlInteraction();
  }
}

/* CONFIG USER DATA */

function configData() {
  let levelAc = userData[5];
  let compare = levelAc.toUpperCase();
  switch (compare) {
    case 'None':
      userData[5] = 1.2;
      break;
    case 'low':
      userData[5] = 1.375;
      break;
    case 'Moderate':
      userData[5] = 1.55;
      break;
    case 'Intense':
      userData[5] = 1.725;
      break;
  }
}

function loadData() {
  userName = userData[0];
  userGender = userData[1];
  userWeight = parseInt(userData[2]);
  userHeight = parseInt(userData[3]);
  userAge = parseInt(userData[4]);
  userActivity = userData[5];
  calcAll();
}

/* START INTERACTION */
function startInteraction() {
    setTimeout(function () {
      areaMessages.innerHTML += `<p class="bot-message">Hello, I am Healthbot, and I am here to help you calculate your BMI, ideal weight, and calorie expenditure! &#128170&#128526</p><br>`;
      isTyping = true;
      typingControl();
    }, 1000);
  
    setTimeout(function () {
      areaMessages.innerHTML += `<p class="bot-message">How can I call you?</p>`;
      isTyping = false;
      typingControl();
      autoScroll();
    }, 2000);
  }
  
  startInteraction();
  
  /* CONTROL INTERACTION */
  function controlInteraction() {
    /* USER NAME */
    if (userDataControl[0] != null) {
      areaMessages.innerHTML += `<p class="user-message">You can call me ${userData[0]}</p>`;
      userDataControl[0] = null;
      isTyping = true;
      typingControl();
      scrollDiv();
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">Alright, ${userData[0]}, I will need some information to perform the calculations.</p><br>`;
        scrollDiv();
      }, 3000);
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">What is your gender? To be more accurate in the calculations, I need this information. Please type "<span class="info">Male</span>" or "<span class="info">Female</span>".</p>`;
        isTyping = false;
        typingControl();
        scrollDiv();
      }, 6000);
    }
  
    /* USER GENDER */
    if (userDataControl[1] != null) {
      areaMessages.innerHTML += `<p class="user-message">${userData[1]}</p>`;
      userDataControl[1] = null;
      isTyping = true;
      typingControl();
      scrollDiv();
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">Great! How much do you weigh? <span class="example">Example: 65</span></p>`;
        isTyping = false;
        typingControl();
        scrollDiv();
      }, 3000);
    }
  
    /* USER WEIGHT */
    if (userDataControl[2] != null) {
      areaMessages.innerHTML += `<p class="user-message">${userData[2]} Kg</p>`;
      userDataControl[2] = null;
      isTyping = true;
      typingControl();
      scrollDiv();
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">And what is your height in centimeters? <span class="example">Example: 170</span></p>`;
        isTyping = false;
        typingControl();
        scrollDiv();
      }, 3000);
    }
  
    /* USER HEIGHT */
    if (userDataControl[3] != null) {
      areaMessages.innerHTML += `<p class="user-message">${userData[3]} cm</p>`;
      userDataControl[3] = null;
      isTyping = true;
      typingControl();
      scrollDiv();
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">Alright, we're almost done. How old are you? <span class="example">Example: 25</span></p>`;
        isTyping = false;
        typingControl();
        scrollDiv();
      }, 3000);
    }
  
    /* USER AGE */
    if (userDataControl[4] != null) {
      areaMessages.innerHTML += `<p class="user-message">${userData[4]} years</p>`;
      userDataControl[4] = null;
      isTyping = true;
      typingControl();
      scrollDiv();
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">Great! Lastly, I need to know your level of physical activity. Please type one of the following options:</p><br>`;
        scrollDiv();
      }, 4000);
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message"><span class="info">None, Light, Moderate, Intense</span></p>`;
        isTyping = false;
        typingControl();
        scrollDiv();
      }, 6000);
    }
  
    /* USER ACTIVITY */
    if (userDataControl[5] != null) {
      areaMessages.innerHTML += `<p class="user-message">${userData[5]}</p>`;
      configData();
      userDataControl[5] = null;
      isTyping = true;
      typingControl();
      scrollDiv();
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">Perfect, I now have everything I need to calculate.</p><br>`;
        loadData();
        scrollDiv();
      }, 3000);
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">But first, an important note, ${userName}:</p><br>`;
        scrollDiv();
      }, 5000);
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">The results I will show you <span class="info">are only averages obtained through formulas</span>, so you should not take them as absolute truth.</p><br>`;
        scrollDiv();
      }, 10000);
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">Therefore, it is essential that you consult a nutritionist to get more precise guidance!</p><br>`;
        scrollDiv();
      }, 16000);
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">But let's go ahead! While I was talking to you, I already did the calculations... &#128540</p><br>`;
        scrollDiv();
      }, 19000);
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">Your BMI is <span class="info">${userIMC} kg/m² - ${resultIMC}</span></p><br>`;
        scrollDiv();
      }, 22000);
  
      setTimeout(function () {
        switch (resultIMC) {
          case 'Underweight':
            areaMessages.innerHTML += `<p class="bot-message">Unfortunately, you are below your ideal weight, which averages around <span class="info">${idealWeight} Kg &#128533</span></p><br>`;
            break;
          case 'Normal weight':
            areaMessages.innerHTML += `<p class="bot-message">Congratulations, you are within the ideal weight range, which averages around <span class="info">${idealWeight} Kg &#128516</span></p><br>`;
            break;
          case 'Overweight':
          case 'Obesity Grade 1':
          case 'Obesity Grade 2':
          case 'Obesity Grade 3':
            areaMessages.innerHTML += `<p class="bot-message">Unfortunately, you are above your ideal weight, which averages around <span class="info">${idealWeight} Kg &#128533</span></p><br>`;
            break;
        }
        scrollDiv();
      }, 24000);
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">If you consume an estimated <span class="info">${resultMetabolic} calories</span> daily, you will maintain your current weight of <span class="info">${userWeight} Kg</span> (assuming the same level of physical activity).</p><br>`;
        scrollDiv();
      }, 33000);
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">If you want to change your current weight, consult a nutritionist to create a suitable dietary plan for you.</p><br>`;
        scrollDiv();
      }, 41000);
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message">That's all the information I can provide at the moment. I hope I was able to help you, ${userName}! &#128521</p><br>`;
        scrollDiv();
      }, 46000);
  
      setTimeout(function () {
        areaMessages.innerHTML += `<p class="bot-message"><span class="info">Thank you for using Healthbot!</span></p>`;
        isTyping = false;
        typingControl();
        scrollDiv();
    }, 49000);
    
    setTimeout(function () {
        document.getElementById('area-interaction').innerHTML = '<p class="example">Chat ended.</p>';
    }, 50000);
    
     
  
    
  }
}
