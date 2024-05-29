document.addEventListener("DOMContentLoaded", function() {
    // Получение категорий с бэка
    fetch("http://localhost:8000/api/get_expense_types/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        const categorySelect = document.getElementById("category");
        data.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
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
        var amount = parseFloat(document.getElementById("amount").value);
        var description = document.getElementById("description").value;
        var category = parseInt(document.getElementById("category").value);

        fetch("http://localhost:8000/api/create_expenses/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                date: date,
                amount: amount,
                description: description,
                typeID: category,
                userID: localStorage.getItem('user_id')
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.Success) {
                alert(data.Success);
            } else {
                throw "";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Запись не удалась. Пожалуйста, попробуйте снова.");
        });
    });
});
