const electron = require('electron');
const path = require('path');
const fs = require('fs');

const { BrowserWindow } = require('electron').remote;
// window.localStorage.setItem("videosWatched", "1")

let menuList = '<ul class="sidebar-menu list-unstyled">\
<li class="sidebar-list-item"> \
    <a href="dashboard.html" class="sidebar-link text-muted" id="dashboard"> \
        <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="mr-2"> \
            <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /> \
        </svg> \
        <span>Home</span> \
    </a> \
</li>\
<li class="sidebar-list-item bg-white" >\
    <a href="profile.html" class="sidebar-link text-muted" id="profile">\
        <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="mr-2">\
            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />\
        </svg>\
        <span>Profile</span>\
    </a>\
</li>\
<li class="sidebar-list-item bg-danger">\
    <a href="#" class="sidebar-link text-white logout" id="logout">\
        <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="mr-2 text-white">\
                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />\
            </svg>\
        <span>Logout</span>\
    </a>\
</li> </ul>';

if (menuList != '') {
    var menubar = document.getElementById('menuList')
    menubar.innerHTML = menuList

    var page = menubar.getAttribute('page')
    console.log(page);
    if (page == null) {
        page = 'dashboard'
    }
    console.log(page);
    var page2 = document.getElementById(page)
    page2.className += ' active'
    page2.setAttribute("href", "#")


    const logout = document.getElementById('logout');
    logout.addEventListener('click', function(event) {
        window.localStorage.removeItem("userdetails");
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("password");
        window.localStorage.removeItem("age");
        window.localStorage.removeItem("sn");
        window.localStorage.removeItem("loggedin");
        window.location.replace("index.html");
    });
} else {
    console.log("no menu in the list");
}



const startExamBtn = document.getElementById('startExam');
const videotag = document.getElementById('videotag')
var videosWatched = window.localStorage.getItem("videosWatched");
const overlayBox = document.getElementById("overlayBox");
const startExamNow = document.getElementById("startExamNow");
const nextVideoNow = document.getElementById("nextVideoNow");

video1 = window.localStorage.getItem("video1");
video2 = window.localStorage.getItem("video2");
video3 = window.localStorage.getItem("video3");

videoNum = 3;
startExam = "";
var nextVideo = "";
videoToWatchNow = videosWatched + 1;
if (videosWatched == 0) {
    console.log('watched none');
    videotag.setAttribute("src", video1);
    videotag.setAttribute("videoNum", "1");
} else if (videosWatched == 1) {
    console.log('watched one');
    videotag.setAttribute("src", video2);
    videotag.setAttribute("videoNum", "2");
} else if (videosWatched == 2) {
    console.log('watched two');
    videotag.setAttribute("src", video3);
    videotag.setAttribute("videoNum", "3");
}



nextVideoNow.addEventListener('click', function() {
    overlayBox.classList.remove("show");
    overlayBox.className += " hidden";

    // hide video
    videotag.classList.remove("hidden");
    videotag.className += " show";

});




videoNow = videotag.getAttribute("videoNum");
videotag.addEventListener('ended', function() {
    if (videoNow <= 3) {
        openLightBox(videoNow);
    }
    videoNow++;
    console.log(videoNow);
});



// listen for the play event for the video tag to change it for full sscreen
videotag.addEventListener('play', function() {
    console.log("started playing");
    fullScreenVideos();
});


videotag.addEventListener('resize', function() {
    console.log('change size');
});

startExamBtn.addEventListener('click', function(event) {
    if (videosWatched < 3) {
        if (videosWatched == 0) {
            videotag.setAttribute("src", video1);
            videotag.setAttribute("videoNum", "1");
        } else if (videosWatched == 1) {
            console.log('watched one');
            videotag.setAttribute("src", video2);
            videotag.setAttribute("videoNum", "2");
        } else if (videosWatched == 2) {
            console.log('watched two');
            videotag.setAttribute("src", video3);
            videotag.setAttribute("videoNum", "3");
        }

        // call the function to send the video to full screen
        fullScreenVideos();
    } else if (videosWatched == 3) {
        openExamWindow()
    }
});



function openExamWindow() {
    let modalPath = path.join('file://', __dirname, 'exam.html');

    let win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 800,
        height: 600,
        fullscreen: true,
        minimizable: false,
        maximizable: false,
        closable: false
    });
    win.on('closed', () => {
        win = null;
    });

    // Load a remote URL
    win.loadURL(modalPath);
}

function openLightBox(vnow) {
    if (vnow == 3) {
        // open overlay box
        overlayBox.classList.remove("hidden");
        overlayBox.className += " show";
        window.localStorage.setItem("videosWatched", "3")


        // show start exam button
        startExamNow.classList.remove("hidden");
        startExamNow.className += " show";

        // show next video button
        nextVideoNow.classList.remove("show");
        nextVideoNow.className += " hidden";

        // hide video
        videotag.className += " hidden";
    } else {

        if (vnow == 1) {
            videotag.setAttribute("src", video2);
            videotag.setAttribute("videoNum", "2");
            window.localStorage.setItem("videosWatched", "1");
        } else if (vnow == 2) {
            videotag.setAttribute("src", video3);
            videotag.setAttribute("videoNum", "3");
            window.localStorage.setItem("videosWatched", "2");
        }
        // open overlay box
        overlayBox.classList.remove("hidden");
        overlayBox.className += " show";

        // hide start exam button
        startExamNow.classList.remove("show");
        startExamNow.className += " hidden";

        // show next video button
        nextVideoNow.classList.remove("hidden");
        nextVideoNow.className += " show";

        // hide video
        videotag.className += " hidden";
    }
}



// put video in fullscreen
function fullScreenVideos() {
    if (videotag.requestFullscreen) {
        videotag.requestFullscreen();
    } else if (videotag.mozRequestFullScreen) {
        videotag.mozRequestFullScreen();
    } else if (videotag.webkitRequestFullscreen) {
        videotag.webkitRequestFullscreen();
    } else if (videotag.msRequestFullscreen) {
        videotag.msRequestFullscreen();
    }
}