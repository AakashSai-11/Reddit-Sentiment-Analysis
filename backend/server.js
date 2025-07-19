const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for Reddit sentiment analysis (main endpoint)
app.post('/api/analyze', async (req, res) => {
    const { keyword } = req.body;
    
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    try {
        console.log(`Analyzing Reddit sentiment for keyword: ${keyword}`);
        
        // Spawn Python process for Reddit analysis
        const pythonProcess = spawn('python', [
            path.join(__dirname, 'reddit_sentiment_analysis_real.py'),
            keyword
        ]);

        let dataString = '';
        let errorString = '';

        // Collect data from Python script
        pythonProcess.stdout.on('data', (data) => {
            dataString += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorString += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Python script error: ${errorString}`);
                return res.status(500).json({ 
                    error: 'Failed to analyze sentiment',
                    details: errorString 
                });
            }

            try {
                // Extract JSON from the output by finding the first '{' and last '}'
                const jsonStart = dataString.indexOf('{');
                const jsonEnd = dataString.lastIndexOf('}');
                
                if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
                    const jsonString = dataString.substring(jsonStart, jsonEnd + 1);
                    const result = JSON.parse(jsonString);
                    console.log('Reddit analysis completed successfully');
                    res.json(result);
                } else {
                    throw new Error('No valid JSON found in output');
                }
            } catch (parseError) {
                console.error('Error parsing Python output:', parseError);
                console.error('Raw output:', dataString);
                res.status(500).json({ 
                    error: 'Failed to parse analysis results',
                    details: dataString 
                });
            }
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
});

// Route for Reddit sentiment analysis
app.post('/api/analyze-reddit', async (req, res) => {
    const { keyword } = req.body;
    
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    try {
        console.log(`Analyzing Reddit sentiment for keyword: ${keyword}`);
        
        // Spawn Python process for Reddit analysis
        const pythonProcess = spawn('python', [
            path.join(__dirname, 'reddit_sentiment_analysis_real.py'),
            keyword
        ]);

        let dataString = '';
        let errorString = '';

        // Collect data from Python script
        pythonProcess.stdout.on('data', (data) => {
            dataString += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorString += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Python script error: ${errorString}`);
                return res.status(500).json({ 
                    error: 'Failed to analyze sentiment',
                    details: errorString 
                });
            }

            try {
                // Extract JSON from the output by finding the first '{' and last '}'
                const jsonStart = dataString.indexOf('{');
                const jsonEnd = dataString.lastIndexOf('}');
                
                if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
                    const jsonString = dataString.substring(jsonStart, jsonEnd + 1);
                    const result = JSON.parse(jsonString);
                    console.log('Reddit analysis completed successfully');
                    res.json(result);
                } else {
                    throw new Error('No valid JSON found in output');
                }
            } catch (parseError) {
                console.error('Error parsing Python output:', parseError);
                console.error('Raw output:', dataString);
                res.status(500).json({ 
                    error: 'Failed to parse analysis results',
                    details: dataString 
                });
            }
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'Server is running',
        timestamp: new Date().toISOString(),
        port: PORT
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Reddit analysis API: http://localhost:${PORT}/api/analyze`);
    console.log(`Reddit analysis API (alt): http://localhost:${PORT}/api/analyze-reddit`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
