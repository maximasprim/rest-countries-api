document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('region-filter');
    const countriesContainer = document.getElementById('countries-container');
    let countriesData = []; // To store the original data

    // Fetch countries data from local JSON file
    async function fetchCountries() {
        try {
            const response = await fetch('data.json'); 
            countriesData = await response.json(); // Store the original data
            displayCountries(countriesData);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }

    // Display countries based on the provided data
    function displayCountries(countries) {
        countriesContainer.innerHTML = '';
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.className = 'country-card';
            countryCard.innerHTML = `
                <img src="${country.flags.svg}" alt="${country.name} flag">
                <div class="details">
                    <h3>${country.name}</h3>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Capital:</strong> ${country.capital ? country.capital : 'N/A'}</p>
                </div>
            `;
            countriesContainer.appendChild(countryCard);
        });
    }

    // Filter countries by region
    regionFilter.addEventListener('change', () => {
        const selectedRegion = regionFilter.value;
        const filteredCountries = countriesData.filter(country => country.region === selectedRegion || selectedRegion === 'all');
        displayCountries(filteredCountries);
    });

    // Search for countries
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCountries = countriesData.filter(country => country.name.toLowerCase().includes(searchTerm));
        displayCountries(filteredCountries);
    });

    // Theme switcher
    themeSwitcher.addEventListener('click', () => {
        
        document.documentElement.classList.toggle('dark');
        const theme = document.documentElement.classList.contains('dark') ? 'Dark Mode' : 'Light Mode';
        themeSwitcher.textContent = theme;

        // Save the current theme to local storage
        localStorage.setItem('theme', theme);
    });

    // Apply the theme from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'Dark Mode') {
        document.documentElement.classList.add('dark');
        themeSwitcher.textContent = savedTheme;
    }

    fetchCountries();
});
