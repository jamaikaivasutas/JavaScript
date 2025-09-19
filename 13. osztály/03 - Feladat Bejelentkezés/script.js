document.addEventListener("DOMContentLoaded", () => {
    var emailValidator = "^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$";

    document.getElementById("loginButton").addEventListener("click", () => {
        let emailInput = document.getElementById("emailInput").value;
        var isEmailValid = emailValidator.test(emailInput);
    
        if(isEmailValid){
            alert("Sikeresen bejelentkezett!");
        } else {
            alert("ezt beszoptad pajtas");
        }
    })
});
