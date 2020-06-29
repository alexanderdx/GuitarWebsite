
function changeBurgerMenu(x) {
    x.classList.toggle("burger-menu-transition");
    menu = document.getElementsByClassName("nav-area")[0];
    menu.classList.toggle("pull-down-menu");
}

function openLoginForm() {
    document.getElementById("login").classList.toggle("open-form");
    console.log(document.getElementById("login").classList);
}

function closeLoginForm() {
    document.getElementById("login").classList.toggle("open-form");
}


function retineUser(email) {
    localStorage.setItem('user', email);
}

function forgetUser() {
    localStorage.removeItem('user');
    window.location.replace('/'); // refresh
}


function Count() {
    console.log('counter started!');
    let end = 500000;
    let duration = 1000;
    let step_time = duration / end;
    let counter = 0

    let timer = setInterval(function () {
        counter += 100;
        if (counter < end)
            document.getElementById('counter').innerHTML = counter.toLocaleString();
        else {
            document.getElementById('counter').innerHTML = end.toLocaleString();
            clearInterval(timer);
        }
    }, step_time);
}

timer = setTimeout(function () {
    btn = document.getElementsByClassName('btn-login')[1];
    if (btn.innerText == 'LOGIN')
        window.onscroll = Count();
}, 2000);



function promptUser() {
    let name = prompt("Salut! Cum te numesti?");
    let initialTitle = document.title;
    console.log(initialTitle);
    document.title = "Salut, " + name;
    setTimeout(function () {
        document.title = initialTitle;
    }, 2000);
}

function reverseList() {
    var list = document.getElementById('reverse-list');
    var entries = list.getElementsByTagName('li');
    console.log(entries);
    for (var i = entries.length - 1; i >= 0; i--)
        list.appendChild(entries[i]);
}

function hideImages() {
    let btn = document.getElementById('btn-hide-imgs');
    if (btn.innerHTML == "Hide Images") {
        btn.innerHTML = "Show Images";
        var images = document.getElementsByTagName('img');
        for (i = 0; i < images.length; i++) {
            images[i].style.display = "none";
        }
        let headerImg = document.getElementById('header-bg');
        headerImg.style.display = "none";
    }
    else if (btn.innerHTML == "Show Images") {
        btn.innerHTML = "Hide Images";
        var images = document.getElementsByTagName('img');
        for (i = 0; i < images.length; i++) {
            images[i].style.display = "block";
        }
        let headerImg = document.getElementById('header-bg');
        headerImg.style.display = "block";
    }
}
// FORTUNE COOKIES

var quotes = [
    "Today it's up to you to create the peacefulness you long for.",
    "A friend asks only for your time not your money.",
    "If you refuse to accept anything but the best, you very often get it.",
    "A smile is your passport into the hearts of others.",
    "A good way to keep healthy is to eat more Chinese food.",
    "Your high-minded principles spell success.",
    "Hard work pays off in the future, laziness pays off now.",
    "Change can hurt, but it leads a path to something better.",
    "Enjoy the good luck a companion brings you.",
    "People are naturally attracted to you.",
    "Hidden in a valley beside an open stream- This will be the type of place where you will find your dream.",
    "A chance meeting opens new doors to success and friendship.",
    "You learn from your mistakes... You will learn a lot today.",
    "If you have something good in your life, don't let it go!",
    "What ever you're goal is in life, embrace it visualize it, and for it will be yours.",
    "Your shoes will make you happy today.",
    "You cannot love life until you live the life you love.",
    "Be on the lookout for coming events; They cast their shadows beforehand.",
    "Land is always on the mind of a flying bird.",
    "The man or woman you desire feels the same about you.",
    "Meeting adversity well is the source of your strength.",
    "A dream you have will come true.",
    "Our deeds determine us, as much as we determine our deeds.",
    "Never give up. You're not a failure if you don't give up.",
    "You will become great if you believe in yourself.",
    "There is no greater pleasure than seeing your loved ones prosper.",
    "You will marry your lover.",
    "A very attractive person has a message for you.",
    "You already know the answer to the questions lingering inside your head.",
    "It is now, and in this world, that we must live.",
    "You must try, or hate yourself for not trying.",
    "You can make your own happiness."
]

function newQuote() {
    var index = Math.floor(Math.random() * quotes.length);
    textContainer = document.getElementById('fortune-cookie');
    console.log(textContainer);
    textContainer.innerText = '"' + quotes[index] + '"';
}

// CHANGE HEADER TEXT SIZE


function changeTextSize(size) {
    console.log(size.innerHTML);
    let textArea = document.getElementById('heading-text');

    if (size.innerHTML == "SMALL") {
        textArea.style.fontSize = "16px";
        localStorage.setItem('headerTextSize', "16px");
    }
    else if (size.innerHTML == "MEDIUM") {
        textArea.style.fontSize = "28px";
        localStorage.setItem('headerTextSize', "28px");
    }
    else if (size.innerHTML == "LARGE") {
        textArea.style.fontSize = "60px";
        localStorage.setItem('headerTextSize', "60px");
    }
    else if (size.innerHTML == "RESET") {
        textArea.style.removeProperty('font-size');
        localStorage.removeItem('headerTextSize');
    }
}

function setHeaderTextSize() {
    let textArea = document.getElementById('heading-text');
    size = localStorage.getItem('headerTextSize');
    console.log("localStorage headerTextSize: ", size);
    if (size != null) {
        if (textArea)
            textArea.style.fontSize = size;
    }
}



// TIME SPENT ON SITE

var timer;
var timerStart;
var timeSpentOnSite = getTimeSpentOnSite();

function fancyTimeFormat(duration) {
    // Hours, minutes and seconds  ~~ = Math.floor
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function getTimeSpentOnSite() {
    timeSpentOnSite = parseInt(localStorage.getItem('timeSpentOnSite'));
    timeSpentOnSite = isNaN(timeSpentOnSite) ? 0 : timeSpentOnSite;
    return timeSpentOnSite;
}

function startCounting() {
    timerStart = Date.now();
    timer = setInterval(function () {
        timeSpentOnSite = getTimeSpentOnSite() + (Date.now() - timerStart);
        localStorage.setItem('timeSpentOnSite', timeSpentOnSite);
        timerStart = parseInt(Date.now());
        document.getElementById('timer').innerHTML = fancyTimeFormat(timeSpentOnSite / 1000);
    }, 1000);
}
startCounting();

