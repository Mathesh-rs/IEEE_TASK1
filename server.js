const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

// Fetch data from GitHub API for each language
app.get('/api/language-data', async (req, res) => {
    const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'];
    const yearlyData = {};
    
    for (const language of languages) {
        const url = `https://api.github.com/search/repositories?q=language:${language}+created:2015-01-01..2024-12-31&per_page=1`;
        try {
            const response = await axios.get(url);
            yearlyData[language] = response.data.total_count;  // Simplified for one year, can be looped for multi-year
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch data from GitHub' });
            return;
        }
    }

    res.json(yearlyData);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
