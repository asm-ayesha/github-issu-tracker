document.getElementById("login-btn").addEventListener("click", function(){ 
    const userName = document.getElementById("user-name")
    const name = userName.value ;

    const userPass = document.getElementById("password")
    const pass = userPass.value ;

    if(name === "admin" && pass === "admin123"){
        window.location.replace("/index.html")
    }
    else{
        alert("Sign in is failed, check your username and password")
    }
    
})