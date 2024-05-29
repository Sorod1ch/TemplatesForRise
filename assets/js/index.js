
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.getElementById("analyze-button").addEventListener("click", function () {
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

document.addEventListener("DOMContentLoaded", function () {
    checkAuthStatus();
});

function checkAuthStatus() {
    fetch('http://127.0.0.1:8000/api/check_auth_status/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'  // Ensure cookies are sent with the request
    })
        .then(response => response.json())
        .then(data => {
            const authButtons = document.getElementById('auth-buttons');
            const profileButton = document.getElementById('profile-button');

            if (data.isAuthenticated) {
                authButtons.classList.add('hidden');
                profileButton.classList.remove('hidden');
            } else {
                authButtons.classList.remove('hidden');
                profileButton.classList.add('hidden');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

function login() {
    localStorage.setItem('isAuthenticated', 'true');
    checkAuthStatus();
}

function logout() {
    const csrfToken = getCookie('csrftoken');
    fetch('http://127.0.0.1:8000/api/logout/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log('Logout successful');
                window.location.href = 'index.html';  // Redirect to the main page after successful logout
            } else {
                console.error('Logout failed:', data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
};