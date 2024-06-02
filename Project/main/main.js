function toggleDifficultyButtons() {
    let difficultyButtons = document.getElementById('difficultyButtons');
    if (difficultyButtons.style.display === "none") {
        difficultyButtons.style.display = "block";
    } else {
        difficultyButtons.style.display = "none";
    }
}