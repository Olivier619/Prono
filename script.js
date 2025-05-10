document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('nav ul li a');
    const loadingIndicator = document.getElementById('loading-indicator');
    const matchResultsContainer = document.getElementById('match-results');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Dummy match data (replace with actual API calls)
    const dummyData = {
        aujourdhui: [
            { id: 1, team1: "Paris SG", team2: "Olympique Marseille", time: "21:00", league: "Ligue 1", prediction: "Paris SG Gagne (2-1)" },
            { id: 2, team1: "Real Madrid", team2: "FC Barcelona", time: "20:00", league: "La Liga", prediction: "Match Nul (1-1)" },
            { id: 3, team1: "Manchester City", team2: "Liverpool FC", time: "17:30", league: "Premier League", prediction: "Plus de 2.5 buts" }
        ],
        demain: [
            { id: 4, team1: "Juventus", team2: "Inter Milan", time: "20:45", league: "Serie A", prediction: "Juventus Gagne ou Nul" },
            { id: 5, team1: "Bayern Munich", team2: "Borussia Dortmund", time: "18:30", league: "Bundesliga", prediction: "Bayern Munich Gagne (3-1)" }
        ],
        "apres-demain": [
            { id: 6, team1: "Ajax Amsterdam", team2: "PSV Eindhoven", time: "16:45", league: "Eredivisie", prediction: "Les deux équipes marquent" }
        ],
        "derniers-matchs": [
            { id: 7, team1: "Chelsea FC", team2: "Arsenal FC", time: "Terminé", league: "Premier League", prediction: "Résultat: Chelsea 0 - 1 Arsenal" },
            { id: 8, team1: "AC Milan", team2: "Napoli", time: "Terminé", league: "Serie A", prediction: "Résultat: AC Milan 2 - 2 Napoli" }
        ]
    };

    function displayMatches(matches) {
        matchResultsContainer.innerHTML = ''; // Clear previous results
        if (!matches || matches.length === 0) {
            matchResultsContainer.innerHTML = '<p class="no-matches">Aucun match trouvé pour cette sélection.</p>';
            return;
        }

        matches.forEach(match => {
            const matchCard = document.createElement('div');
            matchCard.classList.add('match-card');
            matchCard.innerHTML = `
                <h3>${match.team1} vs ${match.team2}</h3>
                <p><strong>Ligue:</strong> ${match.league}</p>
                <p><strong>Heure / Statut:</strong> ${match.time}</p>
                <p class="prediction"><strong>Prédiction:</strong> ${match.prediction}</p>
            `;
            matchResultsContainer.appendChild(matchCard);
        });
    }

    function loadTabData(tabId) {
        loadingIndicator.style.display = 'flex';
        matchResultsContainer.style.display = 'none'; // Hide results while loading

        // Simulate API call
        setTimeout(() => {
            const matches = dummyData[tabId] || [];
            displayMatches(matches);
            loadingIndicator.style.display = 'none';
            matchResultsContainer.style.display = 'block';
        }, 1000); // Simulate 1 second loading time
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            const tabId = tab.dataset.tab;
            loadTabData(tabId);
        });
    });

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (!searchTerm) {
            // If search is empty, load the active tab's data again or show all today's matches
            const activeTab = document.querySelector('nav ul li a.active');
            loadTabData(activeTab ? activeTab.dataset.tab : 'aujourdhui');
            return;
        }

        loadingIndicator.style.display = 'flex';
        matchResultsContainer.style.display = 'none';

        setTimeout(() => {
            let allMatches = [];
            Object.values(dummyData).forEach(dayMatches => allMatches = allMatches.concat(dayMatches));

            const filteredMatches = allMatches.filter(match =>
                match.team1.toLowerCase().includes(searchTerm) ||
                match.team2.toLowerCase().includes(searchTerm) ||
                match.league.toLowerCase().includes(searchTerm)
            );
            displayMatches(filteredMatches);
            loadingIndicator.style.display = 'none';
            matchResultsContainer.style.display = 'block';
        }, 800);
    });

    // Also trigger search on Enter key in input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });


    // Initial load (Aujourd'hui tab)
    loadTabData('aujourdhui');
});
