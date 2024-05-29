document.addEventListener("DOMContentLoaded", function() {
    // Получение категорий с бэка
    fetch("http://localhost:8000/get_categories/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        const categorySelect = document.getElementById("category");
        data.categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching categories:', error);
    });

    // Обработка формы записи трат
    document.getElementById("recordForm").addEventListener("submit", function(event) {
        event.preventDefault();

        var date = document.getElementById("date").value;
        var amount = document.getElementById("amount").value;
        var description = document.getElementById("description").value;
        var category = document.getElementById("category").value;

        fetch("http://localhost:8000/record_spending/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                date: date,
                amount: amount,
                description: description,
                category: category,
                user_id: localStorage.getItem('user_id')
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Запись не удалась. Пожалуйста, попробуйте снова.");
        });
    });
});
