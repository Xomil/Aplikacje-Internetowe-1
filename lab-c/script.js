
let map = L.map('map').setView([53.44708708324111, 14.49215852568527], 18);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);
let marker = L.marker([53.44708708324111, 14.49215852568527]).addTo(map);
marker.bindPopup("<strong>Hello!</strong><br>This is a popup.").openPopup();
document.addEventListener("DOMContentLoaded", requestNotificationPermission);

document.getElementById("saveButton").addEventListener("click", function() {
    leafletImage(map, function (err, canvas) {
        if (err) {
            console.error("Error generating image: ", err);
            return;
        }
        let mapSize = map.getSize();
        let width = mapSize.x;
        let height = mapSize.y;

        let rasterMap = document.getElementById("canvas");
        rasterMap.width = width;
        rasterMap.height = height;
        let rasterContext = rasterMap.getContext("2d");
        rasterContext.drawImage(canvas, 0, 0, width, height);
        rasterMap.style.display = "block";
        console.log("Map rasterized successfully.");
        createPuzzles(canvas);
    });
});


function requestNotificationPermission() {
    if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
            } else {
                console.log("Notification permission denied.");
            }
        });
    }
}

function showSystemNotification() {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Congratulations!", {
            body: "You successfully completed the puzzle!",
            icon: "path/to/icon.png"
        });
    }
}

function createPuzzles(originalCanvas) {
    const puzzleContainer = document.getElementById("puzzleContainer");
    puzzleContainer.innerHTML = "";
    const pieceWidth = originalCanvas.width / 4;
    const pieceHeight = originalCanvas.height / 4;
    const pieces = [];


    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            let pieceCanvas = document.createElement('canvas');
            pieceCanvas.width = pieceWidth;
            pieceCanvas.height = pieceHeight;
            let context = pieceCanvas.getContext('2d');


            context.drawImage(originalCanvas, col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);

            let puzzlePiece = document.createElement('div');
            puzzlePiece.className = 'puzzle-piece';
            puzzlePiece.draggable = true;
            puzzlePiece.appendChild(pieceCanvas);


            puzzlePiece.dataset.correctPosition = `${col},${row}`;
            puzzlePiece.dataset.isPlaced = 'false';
            puzzlePiece.addEventListener("dragstart", handleDragStart);
            pieces.push(puzzlePiece);
        }
    }


    shuffleArray(pieces);
    pieces.forEach(piece => puzzleContainer.appendChild(piece));


    const dropArea = document.getElementById("dropArea");
    dropArea.innerHTML = "";


    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            let gridCell = document.createElement('div');
            gridCell.className = 'drop-area';
            gridCell.dataset.correctPosition = `${col},${row}`;
            dropArea.appendChild(gridCell);
            gridCell.addEventListener("dragover", (e) => {
                e.preventDefault();
            });
            gridCell.addEventListener("drop", (e) => {
                e.preventDefault();
                const droppedPosition = e.dataTransfer.getData("text/plain");
                placePiece(droppedPosition, gridCell);
            });
            console.log(`Created grid cell at position ${gridCell.dataset.correctPosition}`);
        }
    }
}


function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.correctPosition);
    console.log("Dragging piece:", e.target.dataset.correctPosition);
}

let totalCorrectPieces = 0;

function placePiece(droppedPosition, targetCell) {
    console.log(`Attempt to place a piece in position ${droppedPosition} in the cell with correct position ${targetCell.dataset.correctPosition}.`);

    const puzzlePiece = document.querySelector(`.puzzle-piece[data-correct-position='${droppedPosition}']`);

    if (!puzzlePiece) {
        console.error("Error: No puzzle piece found for position::", droppedPosition);
        return;
    }

    if (targetCell.dataset.correctPosition === droppedPosition && puzzlePiece.dataset.isPlaced === 'false') {
        console.log("Piece fits this position.");
        targetCell.appendChild(puzzlePiece);
        targetCell.classList.add('filled');
        puzzlePiece.dataset.isPlaced = 'true';
        totalCorrectPieces++;

        console.log(`Piece correctly placed. Number of correctly placed pieces: ${totalCorrectPieces}`);
        displayMessage("Great job!", "correct");
        const messageBackground = document.getElementById("footer");
        messageBackground.style.backgroundColor = "rgba(137, 234, 137, 0.62)";
        checkCompletion();
    } else {
        console.warn("Piece does not fit into this position or has already been placed.");
        displayMessage("Try again!", "incorrect");
        const messageBackground = document.getElementById("footer");
        messageBackground.style.backgroundColor = "rgba(234, 77, 77, 0.65)";
    }
}

function displayMessage(msg, status) {
    const messageElement = document.getElementById("footer");
    messageElement.textContent = msg;
    messageElement.className = status;
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.getElementById("getLocation").addEventListener("click", function() {
    if (!navigator.geolocation) {
        console.log("No geolocation support.");
        return;
    }

    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        map.setView([lat, lon], 18);
        L.marker([lat, lon]).addTo(map).bindPopup("You are here!").openPopup();
        console.log(`Location updated: ${lat}, ${lon}`);
    }, positionError => {
        console.error("Error getting location: ", positionError);
    });
});

function checkCompletion() {
    if (totalCorrectPieces === 16) {
        displayWinScreen();
    }
}

function displayWinScreen() {
    const winScreen = document.getElementById("winScreen");
    winScreen.style.visibility = "visible";
    showSystemNotification();
}

document.getElementById("replay").addEventListener("click", () => {
    resetGame();
});

function resetGame() {
    // Ukryj ekran zwycięstwa
    const winScreen = document.getElementById("winScreen");
    winScreen.style.visibility = "hidden";

    totalCorrectPieces = 0;

    const puzzleContainer = document.getElementById("puzzleContainer");
    puzzleContainer.innerHTML = "";


    const dropArea = document.getElementById("dropArea");
    dropArea.innerHTML = "";


    const rasterMap = document.getElementById("canvas");
    const rasterContext = rasterMap.getContext("2d");
    rasterContext.clearRect(0, 0, rasterMap.width, rasterMap.height);
    rasterMap.style.display = "none";


    map.setView([53.44708708324111, 14.49215852568527], 18);


    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });





    const messageElement = document.getElementById("footer");
    messageElement.textContent = "";
    messageElement.className = "";
}


