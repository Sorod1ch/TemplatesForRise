document.getElementById("analyze-button").addEventListener("click", function() {
    fetch(`http://localhost:8000/analyze/`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        const analysisResults = document.getElementById("analysis-results");
        analysisResults.innerHTML = ''; // Очищаем старые результаты
        data.results.forEach(result => {
            const listItem = document.createElement("li");
            listItem.textContent = result;
            analysisResults.appendChild(listItem);
        });
        document.getElementById("analyze-block").classList.remove("hidden");
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Не удалось загрузить результаты анализа.");
    });
});
