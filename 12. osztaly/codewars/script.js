let theme;

window.onload = function () {
    if (localStorage.getItem("theme") == null) {
        localStorage.setItem("theme", "light");
        theme = "light";
    }
    else {
        theme = localStorage.getItem("theme");
    }

    if(theme == "light")
    {
        document.getElementById("test").className = "lightTheme";
        document.getElementById("inputField").className = "lightTheme";
        let gombok = document.getElementsByTagName("input")
        for(let i = 1; i < gombok.length; i++)
        {
            gombok[i].className ="lightTheme"
        }
    }
    else
    {
        document.getElementById("test").className = "darkTheme";
        document.getElementById("inputField").className = "darkTheme";
        let gombok = document.getElementsByTagName("input")
        for(let i = 1; i < gombok.length; i++)
        {
            gombok[i].className ="darkTheme"
        }
    }

    if (localStorage.getItem("userNames") == null) {
        localStorage.setItem("userNames", JSON.stringify([]))
    }
    else {
        let loadedUsers = JSON.parse(localStorage.getItem("userNames"));
        for (let i = 0; i < loadedUsers.length; i++) {
            getUserName(`${loadedUsers[i]}`)
        }
    }
}

function getUserName(userName) {
    if (userName != null) {
        getData(userName)
    }
    else {
        userName = document.getElementById("userName").value
        if (!JSON.parse(localStorage.getItem("userNames")).includes(userName)) {
            getData(userName)

           const newUrl = `${window.location.pathname}?${userName}`;
            history.pushState(null, "", newUrl);

            let temp = JSON.parse(localStorage.getItem("userNames"));
            temp.push(`${userName}`)
            localStorage.setItem("userNames", JSON.stringify(temp))
        }
        else {
            alert("Ez a felhasználó név már lekérésre került!")
        }
    }
}

function getData(userName) {
    let url = `https://www.codewars.com/api/v1/users/${userName}`
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(user => {
            addUserData(user);
            
        })
        .catch(error => {
            let temp = JSON.parse(localStorage.getItem("userNames"));
           if(temp[temp.length-1] == userName)
           {
            temp = temp.slice(0,temp.length-1)
            localStorage.setItem("userNames", JSON.stringify(temp))
           }
            
            alert('Hiba volt az adatok lekérésével vagy hibás felhasználónév');
            
        });
}


function addUserData(user) {
    if (theme == "light")
        document.getElementById("userDatas").innerHTML += "<div class = 'card lightTheme'>" +
            `<p> username : ${(user["username"] != null ? user["username"] : "Nincs adat")}</p>` +
            `<p>name : ${(user["name"] != null ? user["name"] : "Nincs adat")}</p>` +
            `<p>clan  : ${(user["clan"] != null ? user["clan"] : "Nincs adat")}</p>` +
            `<p> honor : ${(user["honor"]) != null ? user["honor"] : "Nincs adat"} </p>` +
            `<h4>languages</h4>` +
            `<ul> ${createList(user["ranks"])}</ul> ` +
            "</div>"
    else
    {
        document.getElementById("userDatas").innerHTML += "<div class = 'card darkTheme'>" +
            `<p> username : ${(user["username"] != null ? user["username"] : "Nincs adat")}</p>` +
            `<p>name : ${(user["name"] != null ? user["name"] : "Nincs adat")}</p>` +
            `<p>clan  : ${(user["clan"] != null ? user["clan"] : "Nincs adat")}</p>` +
            `<p> honor : ${(user["honor"]) != null ? user["honor"] : "Nincs adat"} </p>` +
            `<h4>languages</h4>` +
            `<ul> ${createList(user["ranks"])}</ul> ` +
            "</div>"
    }

}

function createList(languages) {
    let langueagesAndPoints = languages["languages"];
    let result = "";

    for (let key in langueagesAndPoints) {
        result += `<li>${key}, rank: ${langueagesAndPoints[key]["rank"]}</li>`
    }
    return result
}

function userDataDelete() {
    document.getElementById("userDatas").innerHTML = "";
    localStorage.setItem("userNames", JSON.stringify([]))
}

function switchTheme() {
    let items;
    if(theme == "light")
    {
        document.getElementById("colorChanger").innerText = "világos mód"
        theme = "dark"
        localStorage.setItem("theme", "dark")
        items = Array.from(document.getElementsByClassName("lightTheme"));
        console.log(items)
        for(let i = 0; i < items.length; i++)
         {
            items[i].className =items[i].className.replace("lightTheme", "darkTheme")
        };
    }
    else
    {
         document.getElementById("colorChanger").innerText = "sötét mód"
        theme = "light"
        localStorage.setItem("theme", "light")
        items =Array.from(document.getElementsByClassName("darkTheme"));
        for(let i = 0; i < items.length; i++)
            {
                items[i].className =items[i].className.replace("darkTheme", "lightTheme");
        };
    }
}