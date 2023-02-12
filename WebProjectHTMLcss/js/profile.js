const data = {
    games: 10,
    wins: 6,
    losses: 1,
    ties: 3
}

function calculateWiningPercentage(data) {
    const games = data.games
    const wins = data.wins
    const ties = data.ties
    const percentage = Math.round(((wins + 0.5 * ties) / games) * 100)
    return percentage + "%";
}

setData(data, calculateWiningPercentage(data));

function setData(data, percentage) {
    document.getElementById('games').innerText = data.games;
    document.getElementById('wins').innerText = data.wins;
    document.getElementById('losses').innerText = data.losses;
    document.getElementById('ties').innerText = data.ties;
    document.getElementById('percentage').innerText = percentage;
}