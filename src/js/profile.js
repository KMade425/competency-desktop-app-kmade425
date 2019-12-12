var user_name = window.localStorage.getItem("name")
var user_role = window.localStorage.getItem("role")
var user_fb = window.localStorage.getItem("fb")
var user_twitter = window.localStorage.getItem("twitter")
var user_insta = window.localStorage.getItem("insta")
var user_locate = window.localStorage.getItem("location")

document.getElementById('user_name').innerHTML = user_name
document.getElementById('user_role').innerHTML = user_role
document.getElementById('profileImg').setAttribute('src', "https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg")