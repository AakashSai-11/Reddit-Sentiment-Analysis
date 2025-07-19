# Reddit Sentiment Analysis - Backend

This backend uses Node.js to serve as an API bridge between the React frontend and Python sentiment analysis script using RoBERTa model.

## 🏗️ Architecture

```
Frontend (React) → Node.js API → Reddit Analysis Script → RoBERTa Model → Results
```

## 🐍 Python Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Test Python script:**
   ```bash
   python reddit_sentiment_analysis_real.py "AI"
   ```

## 🟢 Node.js Setup

1. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **For development (with auto-reload):**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

- **Default Port:** 5000
- **Python Script:** `reddit_sentiment_analysis_real.py`
- **API Endpoint:** `POST /api/analyze`
- **Health Check:** `GET /api/health`

## 📊 API Usage

### Analyze Sentiment
```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"keyword": "AI"}'
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

## 🤖 RoBERTa Model Features

- **Model:** `cardiffnlp/twitter-roberta-base-sentiment-latest`
- **Dataset:** Tweet evaluation dataset from Kaggle
- **Fallback:** Sentiment140 dataset
- **Output:** Sentiment scores, word clouds, hashtags, engagement metrics

## 🚀 Running the Full Stack

1. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm start
   ```

3. **Open:** `http://localhost:3000`

## 📁 File Structure

```
backend/
├── reddit_sentiment_analysis_real.py  # Python Reddit analysis
├── server.js                          # Node.js API server
├── package.json                       # Node.js dependencies
├── requirements.txt                   # Python dependencies
└── README.md                         # This file
```

## 🔍 Troubleshooting

- **Python not found:** Ensure Python is in PATH
- **Module not found:** Run `pip install -r requirements.txt`
- **Port 5000 in use:** Change PORT in server.js
- **CORS issues:** Check frontend API URL configuration

---

**Ready to analyze sentiment with AI!** 🎯
