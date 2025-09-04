async function getAllSellerFunction() {
    try {
        const res = await fetch(`http://localhost:3000/sellers`, {
            method: 'GET',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAllSellerTaxNumberFunction() {
    try {
        const res = await fetch(`http://localhost:3000/sellers/taxNumbers`, {
            method: 'GET',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }
        let taxNumbersAsStringArray = [];
        for (const taxNumber of data) {
            taxNumbersAsStringArray.push(taxNumber.taxNumber);
        }
        return taxNumbersAsStringArray;
    }
    catch (error) {
        console.log(error);
    }
}

async function postSellerFunction(body) {
    try {
        const res = await fetch(`http://localhost:3000/sellers`, {
            method: 'POST',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: body,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function putSellerFunction(body, id) {
    try {
        const res = await fetch(`http://localhost:3000/sellers/${id}`, {
            method: 'PUT',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: body,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteSellerFunction(id) {
    try {
        const res = await fetch(`http://localhost:3000/sellers/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAllBuyerFunction() {
    try {
        const res = await fetch(`http://localhost:3000/buyers`, {
            method: 'GET',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAllBuyersTaxNumberFunction() {
    try {
        const res = await fetch(`http://localhost:3000/buyers/taxNumbers`, {
            method: 'GET',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }
        let taxNumbersAsStringArray = []
        for (const taxNumber of data) {
            taxNumbersAsStringArray.push(taxNumber.taxNumber);
        }
        return taxNumbersAsStringArray;
    }
    catch (error) {
        console.log(error);
    }
}
async function postBuyerFunction(body) {
    try {
        const res = await fetch(`http://localhost:3000/buyers`, {
            method: 'POST',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: body,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function putBuyerFunction(body, id) {
    try {
        const res = await fetch(`http://localhost:3000/buyers/${id}`, {
            method: 'PUT',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: body,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteBuyerFunction(id) {
    try {
        const res = await fetch(`http://localhost:3000/buyers/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAllBillsFunction() {
    try {
        const res = await fetch(`http://localhost:3000/bills`, {
            method: 'GET',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}
async function postBillFunction(body) {
    try {
        const res = await fetch(`http://localhost:3000/bills`, {
            method: 'POST',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: body
        });
        const data = await res.json();
        if (!res.ok) {
            console.log(data);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function putBillFunction(body, id) {
    try {
        const res = await fetch(`http://localhost:3000/bills/${id}`, {
            method: 'PUT',
            headers:
            {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: body,
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteBillFunction(id) {
    try {
        const res = await fetch(`http://localhost:3000/bills/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data;
    }
    catch (error) {
        console.log(error);
    }
}
let bills = [];
let sellers = [];
let buyers = [];
let selectedBillId = 0;
let selectedPerson;
const billNumberRegex = /^[0-9]{8}-[0-9]{8}-[0-9]{8}$/;
const taxNumberRegex = /^[0-9]{8}-[0-9]{1}-[0-9]{2}$/;
const content = document.getElementById("content");


window.onload = async() => {
await listBills();
};

function addPerson() {
    content.innerHTML = "<label for='personType'>Válassz típust:</label> <select name='personType' id='personType'>";
    const menu = document.getElementById("personType");
    menu.innerHTML += `<option value='buyer'>vásárló</option>`;
    menu.innerHTML += `<option value='seller'>eladó</option>`;
    content.innerHTML += "</select>";
    content.innerHTML += "<label for='name'>név:</label> <input type='text' id='name'>";
    content.innerHTML += "<label for='address'>lakcím:</label> <input type='text' id='address'>";
    content.innerHTML += "<label for='taxNumber'>adószám(például:11111111-1-11):</label> <input type='text' id='taxNumber' placeholder='11111111-1-11'>";
    content.innerHTML += "<button id='submit' onclick='savePerson()'>személy mentése</button>";
    content.innerHTML += "<p id='message'></p>";
}

async function savePerson() {
    if (document.getElementById("message").innerHTML != "") {
        document.getElementById("message").innerHTML = "";
    }
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const taxNumber = document.getElementById("taxNumber").value.trim();

    buyerTaxNumbers = await getAllBuyersTaxNumberFunction();
    sellerTaxNumbers = await getAllSellerTaxNumberFunction();
    if (name != undefined && name.length > 0 && address != undefined && address.length > 0 && taxNumber != undefined && taxNumber.length > 0) {
        if (taxNumber.length != 13 || !taxNumberRegex.test(taxNumber)) {
            document.getElementById("message").innerHTML = "Adjon helyes adószámot!";
            return;
        }
        if (buyerTaxNumbers.includes(taxNumber) || sellerTaxNumbers.includes(taxNumber)) {
            document.getElementById("message").innerHTML = "ilyen adószám már létezik!";
            return;
        }

        let body = {
            "name": `${name}`,
            "address": `${address}`,
            "taxNumber": `${taxNumber}`
        };
        const listOfSelects = document.getElementsByTagName("option");
        let type;
        for (let i = 0; i < listOfSelects.length; i++) {
            if (listOfSelects[i].selected) {
                type = listOfSelects[i].value;
            }
        }
        if (type == "buyer") {
            await postBuyerFunction(JSON.stringify(body));
        }
        else {
            await postSellerFunction(JSON.stringify(body));
        }
        content.innerHTML = "";
        await listBills();
    }
    else {
        document.getElementById("message").innerHTML = "Adjon meg minden adatot!";
    }
}

async function updateUser() {
    buyers = await getAllBuyerFunction();
    sellers = await getAllSellerFunction();
    if (buyers.length == 0 && sellers.length == 0) {
        content.innerHTML = "<p id='message'> Nincs személy!</p>";
        return;
    }
    content.innerHTML = "<label for='person'>Válassz módosítandó személyt:</label> <select name='person' id='person' onchange='loadPersonSelect()'>";
    const menu = document.getElementById("person");
    menu.innerHTML += " <option value='' selected disabled hidden>Válaszz</option>";

    for (const buyer of buyers) {
        menu.innerHTML += `<option value='${buyer.taxNumber}'>${buyer.name}</option>`;
    }
    for (const seller of sellers) {
        menu.innerHTML += `<option value='${seller.taxNumber}'>${seller.name}</option>`;
    }
    content.innerHTML += "</select>";
    content.innerHTML += "<div id='loadPersonData'>";
    content.innerHTML += "</div'>";
    content.innerHTML += "<p id='message'></p>";

}
async function loadPersonSelect() {
    const loadPerson = document.getElementById("loadPersonData");
    const options = document.getElementsByTagName("option");
    let person;
    for (const option of options) {

        if (option.selected) {
            person = await findPerson(option.value);
        }
    }
    if (loadPerson.innerHTML != "") {
        loadPerson.innerHTML = "";
    }
    loadPerson.innerHTML += `<label for='name'>név:</label> <input type='text' id='name' value='${person.name}'>`;
    loadPerson.innerHTML += `<label for='address'>lakcím:</label> <input type='text' id='address' value='${person.address}'>`;
    loadPerson.innerHTML += `<label for='taxNumber'>adószám(például:11111111-1-11):</label> <input type='text' id='taxNumber' placeholder='11111111-1-11' value='${person.taxNumber}'>`;
    loadPerson.innerHTML += "<button id='submit' onclick='saveUpdatedPerson()'>személy mentése</button>";
    selectedPerson = person;
}

async function saveUpdatedPerson() {
    if (document.getElementById("message").innerHTML != "") {
        document.getElementById("message").innerHTML = "";
    }
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const taxNumber = document.getElementById("taxNumber").value.trim();

    buyerTaxNumbers = await getAllBuyersTaxNumberFunction();
    sellerTaxNumbers = await getAllSellerTaxNumberFunction();
    if (name != undefined && name.length > 0 && address != undefined && address.length > 0) {

        if (taxNumber.length != 13 || !taxNumberRegex.test(taxNumber)) {
            document.getElementById("message").innerHTML = "Adjon helyes adószámot!";
            return;
        }
        let type;

        if (buyerTaxNumbers.includes(selectedPerson.taxNumber)) {

            type = "buyer";
        }

        else if (sellerTaxNumbers.includes(selectedPerson.taxNumber)) {
            type = "seller";
        }

        if (buyerTaxNumbers.includes(taxNumber) || sellerTaxNumbers.includes(taxNumber)) {
            document.getElementById("message").innerHTML = "ilyen adószám már létezik!";
            return;
        }

        let body = {
            "name": `${name}`,
            "address": `${address}`,
            "taxNumber": `${taxNumber}`
        };

        if (type == "buyer") {
            await putBuyerFunction(JSON.stringify(body), selectedPerson.id);
        }
        else {
            await putSellerFunction(JSON.stringify(body), selectedPerson.id);
        }
        content.innerHTML = "";
await listBills()
    }
    else {
        document.getElementById("message").innerHTML = "Adjon meg minden adatot!";
    }
}

async function findPerson(taxNumber) {
    sellers = await getAllSellerFunction();
    buyers = await getAllBuyerFunction();
    for (const seller of sellers) {
        if (seller.taxNumber == taxNumber) {
            return seller;
        }
    }
    for (const buyer of buyers) {
        if (buyer.taxNumber == taxNumber) {
            return buyer;
        }
    }
}

async function deletePerson() {
    buyers = await getAllBuyerFunction();
    sellers = await getAllSellerFunction();
    if (buyers.length > 0 || sellers.length > 0) {
        content.innerHTML = "<label for='person'>Válassz törlendő személyt:</label> <select name='person' id='person'>";
        const menu = document.getElementById("person");
        menu.innerHTML += " <option value='' selected disabled hidden>Válaszz</option>";
        for (const buyer of buyers) {
            menu.innerHTML += `<option value='${buyer.taxNumber}'>${buyer.name}</option>`;
        }
        for (const seller of sellers) {
            menu.innerHTML += `<option value='${seller.taxNumber}'>${seller.name}</option>`;
        }
        content.innerHTML += "</select>";
        content.innerHTML += "<button id='submit' onclick='deleteSelectedPerson()'>személy törlése</button>";
        content.innerHTML += "<p id='message'></p>";
    }
    else {
        content.innerHTML = "<p id='message'> Nincs személy!</p>";
    }
}

async function deleteSelectedPerson() {
    if(confirm("Biztos törli a felhasználót?") == false)
    {
        return;
    }
    buyers = await getAllBuyerFunction();
    sellers = await getAllSellerFunction();
    buyerTaxNumbers = await getAllBuyersTaxNumberFunction();
    sellerTaxNumbers = await getAllSellerTaxNumberFunction();
    const listOfSelects = document.getElementsByTagName("option");
    for (let i = 0; i < listOfSelects.length; i++) {
        if (listOfSelects[i].selected) {
            selectedPerson = await findPerson(listOfSelects[i].value);
        }
    }
    let type;
    if (buyerTaxNumbers.includes(selectedPerson.taxNumber)) {

        type = "buyer";
    }

    else if (sellerTaxNumbers.includes(selectedPerson.taxNumber)) {
        type = "seller";
    }
    if (type == "buyer") {
        await deleteBuyerFunction(selectedPerson.id);
    }
    else {
        await deleteSellerFunction(selectedPerson.id);
    }
    content.innerHTML = "";
await listBills();

}

async function addBill() {
    buyers = await getAllBuyerFunction();
    sellers = await getAllSellerFunction();
    if (buyers.length == 0) {
        content.innerHTML = "<p id='message'> Nincs vevő!</p>";
        return;
    }
    if (sellers.length == 0) {
        content.innerHTML = "<p id='message'> Nincs eladó!</p>";
        return;
    }
    content.innerHTML = "<label for='buyer'>Válassz vevőt:</label> <select name='buyer' id='buyer'>";
    const buyerMenu = document.getElementById("buyer");
    for (let i = 0; i < buyers.length; i++) {
        buyerMenu.innerHTML += `<option value='${buyers[i].id}' class='buyers'>${buyers[i].name}</option>`;
    }
    content.innerHTML += "</select>";

    content.innerHTML += "<label for='seller'>Válassz eladót:</label> <select name='seller' id='seller'>";
    const sellerMenu = document.getElementById("seller");
    for (let i = 0; i < sellers.length; i++) {
        sellerMenu.innerHTML += `<option value='${sellers[i].id}' class='sellers'>${sellers[i].name}</option>`;
    }
    content.innerHTML += "</select>";
    content.innerHTML += "<label for='billNumber'>Számlaszám(például:11111111-11111111-11111111):</label> <input type='text' id='billNumber'  placeholder='11111111-11111111-11111111'>";
    content.innerHTML += "<label for='total' >Összeg(Ft):</label> <input type='number' id='total' min='0'>";
    content.innerHTML += "<label for='afa'>Áfa(%):</label> <input type='number' id='afa' min='0'>";

    content.innerHTML += "<div id='createdP'>";
    const createdBekezdes = document.getElementById("createdP");
    createdBekezdes.innerHTML = "<label for='created'>Számla kelte:</label> <input type='date' id='created'>";
    content.innerHTML += "</div>";

    content.innerHTML += "<div id='deadLineP'>";
    const deadLineBekezdes = document.getElementById("deadLineP");
    deadLineBekezdes.innerHTML = "<label for='deadline'>Fizetési határidő:</label> <input type='date' id='deadline'>";
    content.innerHTML += "</div>";

    content.innerHTML += "<div id='payDayP'>";
    const payDayBekezdes = document.getElementById("payDayP");
    payDayBekezdes.innerHTML = "<label for='payDay'>Befizetés napja:</label> <input type='date' id='payDay'>";
    content.innerHTML += "</div>";

    content.innerHTML += "<button id='submit' onclick='saveBill()'>számla mentése</button>";
    content.innerHTML += "<p id='message'></p>";

}

async function saveBill() {
    if (document.getElementById("message").innerHTML != "") {
        document.getElementById("message").innerHTML = "";
    }
    let sellerId = 0;
    let buyerId = 0;
    const billNumber = document.getElementById("billNumber").value.trim();
    let total = document.getElementById("total").value.trim();
    let afa = document.getElementById("afa").value.trim();
    let created = document.getElementById("created").value;
    let payDay = document.getElementById("payDay").value.trim();
    let deadline = document.getElementById("deadline").value;

    if (billNumber != undefined && billNumber.length > 0 && total != undefined && total.length > 0 && afa != undefined && afa.length > 0 && created != undefined && created.length > 0 && payDay != undefined && payDay.length > 0 && deadline != undefined && deadline.length > 0) {
        const selllerList = document.getElementsByClassName('sellers');
        const buyerList = document.getElementsByClassName('buyers');
        for (const seller of selllerList) {
            if (seller.selected) {
                sellerId = parseInt(seller.value);
                break;
            }
        }
        for (const buyer of buyerList) {
            if (buyer.selected) {
                buyerId = parseInt(buyer.value);
                break;
            }
        }
        if (billNumber.length != 26 || !billNumberRegex.test(billNumber)) {
            document.getElementById("message").innerHTML = "Adjon meg helyes számlaszámot!";
            return;
        }
        bills = await getAllBillsFunction()
        for (const bill of bills) {
            if (bill.billNumber == billNumber) {
                document.getElementById("message").innerHTML = "Ilyen számlaszám már létezik!";
                return;
            }
        }
        total = Math.round(parseFloat(total))
        if (total < 0) {
            document.getElementById("message").innerHTML = "az összeg nem lehet negatív!";
            return;
        }
        afa = Math.round(parseFloat(afa))
        if (afa < 0) {
            document.getElementById("message").innerHTML = "az ÁFA nem lehet negatív!";
            return;
        }
        created = new Date(created);
        deadline = new Date(deadline);
        payDay = new Date(payDay);
        if (created >= deadline) {
            document.getElementById("message").innerHTML = "A határidő nem lehet a keltezés napja vagy előtte!";
            return;
        }
        if (created > payDay) {
            document.getElementById("message").innerHTML = "Nem lehet a keltezés napja előtt befizetni!";
            return;
        }
        if (deadline < payDay) {
            document.getElementById("message").innerHTML = "Nem lehet a határidő után befizetni!";
            return;
        }
        const dateStringCreated = `${created.getFullYear()}-${created.getMonth()+1 > 9 ? created.getMonth()+1 : "0" + (created.getMonth()+1)}-${created.getDate() > 9 ? created.getDate() : "0" + created.getDate()}`;
        const dateStringDeadline = `${deadline.getFullYear()}-${deadline.getMonth()+1 > 9 ? deadline.getMonth()+1 : "0" + (deadline.getMonth()+1)}-${deadline.getDate() > 9 ? deadline.getDate() : "0" + deadline.getDate()}`;
        const dateStringPayDay = `${payDay.getFullYear()}-${payDay.getMonth()+1 > 9 ? payDay.getMonth()+1 : "0" + (payDay.getMonth()+1)}-${payDay.getDate() > 9 ? payDay.getDate() : "0" + payDay.getDate()}`;
        let body = {
            sellerId: sellerId,
            buyerId: buyerId,
            billNumber: `${billNumber}`,
            created: `${dateStringCreated}`,
            payDay: `${dateStringPayDay}`,
            deadline: `${dateStringDeadline}`,
            total: total,
            afa: afa
        };
        await postBillFunction(JSON.stringify(body));
        content.innerHTML = "";
await listBills()
    }
    else {
        document.getElementById("message").innerHTML = "Adjon meg minden adatot!";
    }
}

async function listBills() {
    content.innerHTML = "";
    buyers = await getAllBuyerFunction();
    sellers = await getAllSellerFunction();
    bills = await getAllBillsFunction();
    let selectedBuyer;
    let selectedSeller;
    if (bills.length == 0) {
        content.innerHTML = "<p id='message'> Nincs számmla!</p>";
        return;
    }
    for (const bill of bills) {

        for (const buyer of buyers) {
            if (buyer.id == bill.buyerId) {
                selectedBuyer = buyer;
                break;
            }
        }
        for (const seller of sellers) {
            if (seller.id == bill.sellerId) {
                selectedSeller = seller;
                break;
            }
        }

        content.innerHTML += `<div class='lista' >`;
        let elemSzam = document.getElementsByClassName('lista').length;
        const elem = document.getElementsByClassName('lista')[elemSzam - 1];
        elem.innerHTML += `<p> Eladó: ${selectedSeller.name} <br>Lakcím: ${selectedSeller.address}<br>Adószám: ${selectedSeller.taxNumber}</p>`;
        elem.innerHTML += `<p> Vevő: ${selectedBuyer.name} <br>Lakcím: ${selectedBuyer.address}<br>Adószám: ${selectedBuyer.taxNumber}</p>`;
        elem.innerHTML += `<p> Számlaszám: ${bill.billNumber}</p>`;
        elem.innerHTML += `<p> Kelt: ${bill.created}</p>`;
        elem.innerHTML += `<p> Befizetve: ${bill.payDay}</p>`;
        elem.innerHTML += `<p> Határidő: ${bill.deadline}</p>`;
        elem.innerHTML += `<p> Összeg: ${bill.total} Forint</p>`;
        elem.innerHTML += `<p> Áfa: ${bill.afa} %</p>`;
        elem.innerHTML += `<button class='modify' onclick='updateBill()' value='${bill.id}'>számla módosítása</button>`;
        elem.innerHTML += `<button class='deleteButton' onclick='deleteBill()' value='${bill.id}'>számla törlése</button>`;
        content.innerHTML += `</div>`;
    }

    const modifyButtons = document.getElementsByClassName('modify');
    const deleteButtons = document.getElementsByClassName('deleteButton');
    for (let i = 0; i < modifyButtons.length; i++) {
        modifyButtons[i].addEventListener("click", (event) => { selectedBillId = event.target.value });
    }
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", (event) => { selectedBillId = event.target.value });
    }

}

async function updateBill() {
    content.innerHTML = "";
    bills = await getAllBillsFunction();
    let bill;
    for (const temp of bills) {
        if (selectedBillId == temp.id) {
            bill = temp;
            break;
        }
    }
    content.innerHTML += `<label for='billNumber'>Számlaszám(például:11111111-11111111-11111111):</label> <input type='text' id='billNumber'  placeholder='11111111-11111111-11111111' value='${bill.billNumber}'> `;
    content.innerHTML += `<label for='total' >Összeg:</label> <input type='number' id='total' min='0' value='${bill.total}'>`;
    content.innerHTML += `<label for='afa'>Áfa:</label> <input type='number' id='afa' min='0' value='${bill.afa}'>`;

    content.innerHTML += `<div id='createdP'>`;
    const createdBekezdes = document.getElementById("createdP");
    createdBekezdes.innerHTML = `<label for='created'>Számla kelte:</label> <input type='date' id='created' value='${bill.created}'>`;
    content.innerHTML += `</div>`;

    content.innerHTML += `<div id='deadLineP'>`;
    const deadLineBekezdes = document.getElementById("deadLineP");
    deadLineBekezdes.innerHTML = `<label for='deadline'>Fizetési határidő:</label> <input type='date' id='deadline' value='${bill.deadline}'>`;
    content.innerHTML += `</div>`;

    content.innerHTML += `<div id='payDayP'>`;
    const payDayBekezdes = document.getElementById("payDayP");
    payDayBekezdes.innerHTML = `<label for='payDay'>Befizetés napja:</label> <input type='date' id='payDay' value='${bill.payDay}'>`;
    content.innerHTML += `</div>`;

    content.innerHTML += "<button id='submit' onclick='saveUpdatedBill()'>számla mentése</button>";
    content.innerHTML += "<p id='message'></p>";


}

async function saveUpdatedBill() {
    bills = await getAllBillsFunction();
    let bill;
    for (const temp of bills) {

        if (selectedBillId == temp.id) {
            bill = temp;
            break;
        }
    }
    if (document.getElementById("message").innerHTML != "") {
        document.getElementById("message").innerHTML = "";
    }
    const billNumber = document.getElementById("billNumber").value.trim();
    let total = document.getElementById("total").value.trim();
    let afa = document.getElementById("afa").value.trim();
    let created = document.getElementById("created").value;
    let payDay = document.getElementById("payDay").value.trim();
    let deadline = document.getElementById("deadline").value;

    if (billNumber != undefined && billNumber.length > 0 && total != undefined && total.length > 0 && afa != undefined && afa.length > 0 && created != undefined && created.length > 0 && payDay != undefined && payDay.length > 0 && deadline != undefined && deadline.length > 0) {

        if (billNumber.length != 26 || !billNumberRegex.test(billNumber)) {
            document.getElementById("message").innerHTML = "Adjon meg helyes számlaszámot!";
            return;
        }
        for (const bill of bills) {
            if (bill.billNumber == billNumber && bill.id != selectedBillId) {
                document.getElementById("message").innerHTML = "Ilyen számlaszám már létezik!";
                return;
            }
        }
        total = Math.round(parseFloat(total))
        if (total < 0) {
            document.getElementById("message").innerHTML = "az összeg nem lehet negatív!";
            return;
        }
        afa = Math.round(parseFloat(afa))
        if (afa < 0) {
            document.getElementById("message").innerHTML = "az ÁFA nem lehet negatív!";
            return;
        }
        created = new Date(created);
        deadline = new Date(deadline);
        payDay = new Date(payDay);
        if (created >= deadline) {
            document.getElementById("message").innerHTML = "A határidő nem lehet a keltezés napja vagy előtte!";
            return;
        }
        if (created > payDay) {
            document.getElementById("message").innerHTML = "Nem lehet a keltezés napja előtt befizetni!";
            return;
        }
        if (deadline < payDay) {
            document.getElementById("message").innerHTML = "Nem lehet a határidő után befizetni!";
            return;
        }
        const dateStringCreated = `${created.getFullYear()}-${created.getMonth()+1 > 9 ? created.getMonth()+1 : "0" + (created.getMonth()+1)}-${created.getDate() > 9 ? created.getDate() : "0" + created.getDate()}`;
        const dateStringDeadline = `${deadline.getFullYear()}-${deadline.getMonth()+1 > 9 ? deadline.getMonth()+1 : "0" + (deadline.getMonth()+1)}-${deadline.getDate() > 9 ? deadline.getDate() : "0" + deadline.getDate()}`;
        const dateStringPayDay = `${payDay.getFullYear()}-${payDay.getMonth()+1 > 9 ? payDay.getMonth()+1 : "0" + (payDay.getMonth()+1)}-${payDay.getDate() > 9 ? payDay.getDate() : "0" + payDay.getDate()}`;
        let body = {
            sellerId: `${bill.sellerId}`,
            buyerId: `${bill.buyerId}`,
            billNumber: `${billNumber}`,
            created: `${dateStringCreated}`,
            payDay: `${dateStringDeadline}`,
            deadline: `${dateStringPayDay}`,
            total: total,
            afa: afa
        };
        await putBillFunction(JSON.stringify(body), bill.id);
        content.innerHTML = "";
await listBills()
    }
    else {
        document.getElementById("message").innerHTML += "Adjon meg minden adatot";
    }
}

async function deleteBill() {
    if(confirm("Biztos törli a számlát?") == false)
    {
        return;
    }
    bills = await getAllBillsFunction();
    await deleteBillFunction(selectedBillId);
    content.innerHTML = "";
    listBills();

}