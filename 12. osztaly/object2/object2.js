function main() {

    const orarend = [
        { nap: "Hétfő", tantargyak: ["Matematika", "Fizika", "Kémia"] },
        { nap: "Kedd", tantargyak: ["Történelem", "Biológia", "Földrajz"] },
        { nap: "Szerda", tantargyak: ["Irodalom", "Nyelvtan", "Angol"] },
        { nap: "Csütörtök", tantargyak: ["Matematika", "Informatika", "Testnevelés"] },
        { nap: "Péntek", tantargyak: ["Rajz", "Ének", "Osztályfőnöki"] }
    ];


    console.log("Heti órarend:");
    orarend.forEach((napAdat) => {
        console.log(`${napAdat.nap}: ${napAdat.tantargyak.join(", ")}`);
    });
}


main();