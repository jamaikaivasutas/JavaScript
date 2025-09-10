function mentes() {
    const nev = document.getElementById("nev").value || "-";
    const telepules = document.getElementById("telepules").value || "-";
    const iranyitoszam = document.getElementById("iranyitoszam").value || "-";
    const kozterulet = document.getElementById("kozterulet").value || "-";
    const hazszam = document.getElementById("hazszam").value || "-";

    const adatok = {
      nev,
      telepules,
      iranyitoszam,
      kozterulet,
      hazszam
    };

    localStorage.setItem("felhasznaloAdatok", JSON.stringify(adatok));
    megjelenites();
  }

  function megjelenites() {
    const adatok = JSON.parse(localStorage.getItem("felhasznaloAdatok"));
    const output = document.getElementById("adatok");

    if (adatok) {
      output.innerHTML = `
        <strong>Név:</strong> ${adatok.nev}<br>
        <strong>Település:</strong> ${adatok.telepules}<br>
        <strong>Irányítószám:</strong> ${adatok.iranyitoszam}<br>
        <strong>Közterület:</strong> ${adatok.kozterulet}<br>
        <strong>Házszám:</strong> ${adatok.hazszam}
      `;
    } else {
      output.innerHTML = "Nincs adat (NA)";
    }
  }

  function torles() {
    localStorage.removeItem("felhasznaloAdatok");
    megjelenites();
  }

  window.onload = megjelenites;