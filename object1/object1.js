import input from '../input.mjs'
2
async function main() {
    
    const studentAmount = parseInt(await input("Hány adatot szeretnél megadni?"), 10);
    
    const students = [];
 
    for (let i = 0; i < studentAmount; i++) {
        const name = await input("Név:");
        const email = await input("E-mail:");
        students.push({ name: name, email });
    }

    console.log("A tanulók adatai:");
    students.forEach(student => {
        console.log(`Név: ${student.name} E-mail: ${student.email}`);
    });
}


main();
