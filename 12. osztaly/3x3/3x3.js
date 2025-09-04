const originalOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function shuffleNumbers() {
    const grid = document.getElementById("numberGrid");
    const shuffledOrder = [...originalOrder].sort(() => Math.random() - 0.5);
    
    grid.innerHTML = '';
    shuffledOrder.forEach(number => {
        const cell = document.createElement("div");
        cell.textContent = number;
        grid.appendChild(cell);
    });
}
