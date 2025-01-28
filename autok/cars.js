const baseURL = 'https://surveys-5jvt.onrender.com/api/cars';

async function getCars() {
    try {
        const response = await fetch(`${baseURL}`);
        const data = await response.json();
        console.log('Összes autó:', data);
        return data;
    } catch (error) {
        console.error('Hiba az autók lekérdezésekor:', error);
    }
}

async function getCarById(id) {
    try {
        const response = await fetch(`${baseURL}/${id}`);
        const data = await response.json();
        console.log(`Autó ID alapján (${id}):`, data);
        return data;
    } catch (error) {
        console.error(`Hiba az autó lekérdezésekor ID alapján (${id}):`, error);
    }
}

async function createCar(carData) {
    try {
        const response = await fetch(`${baseURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
        });
        const data = await response.json();
        console.log('Létrehozott autó:', data);
        return data;
    } catch (error) {
        console.error('Hiba az autó létrehozásakor:', error);
    }
}

async function updateCar(id, carData) {
    try {
        const response = await fetch(`${baseURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
        });
        const data = await response.json();
        console.log(`Módosított autó ID alapján (${id}):`, data);
        return data;
    } catch (error) {
        console.error(`Hiba az autó módosításakor ID alapján (${id}):`, error);
    }
}

async function deleteCar(id) {
    try {
        const response = await fetch(`${baseURL}/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            console.log(`Törölt autó ID alapján (${id})`);
        } else {
            console.error(`Sikertelen törlés ID alapján (${id})`);
        }
    } catch (error) {
        console.error(`Hiba az autó törlésekor ID alapján (${id}):`, error);
    }
}

(async () => {
    await getCars();
    await getCarById(1);
    await createCar({ model: 'Model S', brand: 'Tesla', year: 2024 });
    await updateCar(1, { model: 'Módosított modell', brand: 'Módosított márka', year: 2024 });
    await deleteCar(1);
})();
