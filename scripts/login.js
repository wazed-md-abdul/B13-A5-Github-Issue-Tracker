const loginFunction = () => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    if (username === "admin" && password === "admin123") {
        alert("Login successful!");
        window.location.assign("./home.html");
    }
     else {
        alert("Invalid username or password. Please try again.");
    }

}