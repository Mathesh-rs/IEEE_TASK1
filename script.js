async function fetchLanguageData() {
    const response = await fetch('/api/language-data');
    const data = await response.json();
    
    const languages = Object.keys(data);
    const repoCounts = Object.values(data);
    
    createChart(languages, repoCounts);
}

function createChart(languages, repoCounts) {
    const ctx = document.getElementById('popularityChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: languages,
            datasets: [{
                label: 'Repositories Created (2015-2024)',
                data: repoCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

fetchLanguageData();
