# Reddit Sentiment Analysis Project

This repository contains a full-fledged sentiment analysis application with separate frontend and backend components.

## 🗂️ Project Structure

- **frontend/**: The complete React.js frontend of the application.
- **backend/**: Ready to be added for API and data processing.
---

The detailed frontend setup is provided below:

# Reddit Sentiment Analysis - React App

A beautiful, modern React.js application for analyzing Reddit sentiment with interactive charts and visualizations.

## 🌟 Features

- **Modern UI**: Dark theme with glassmorphism effects
- **Interactive Charts**: Sentiment distribution pie charts and timeline visualizations
- **Colorful Word Cloud**: Popular words with gradient colors and hover effects
- **Real-time Analytics**: Engagement statistics and trending hashtags
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Pure React**: No Next.js dependencies, lightweight and fast

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download this project**
2. **Navigate to the project directory**
   ```bash
   cd Reddit-Sentiment-Analysis-final
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Local: `http://localhost:3000`
   - Your app will automatically reload when you make changes

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Removes Create React App abstraction (one-way operation)

## 📦 Production Build

To create a production build:

```bash
npm run build
```

This creates a `build/` folder with optimized files ready for deployment.

## 🌐 Deployment Options

### Static Hosting (Recommended)
1. Run `npm run build`
2. Upload the `build/` folder to:
   - Netlify
   - Vercel
   - GitHub Pages
   - Any static hosting service

## 🎯 How to Use

1. **Enter a keyword** in the search box (e.g., "AI", "Tesla", "Bitcoin")
2. **Click "Analyze"** to start the sentiment analysis
3. **View the results** including:
   - Engagement statistics
   - Sentiment distribution charts
   - Timeline visualization
   - Popular words with colorful gradients
   - Top hashtags with progress bars

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_BACKEND_URL=http://localhost:5000
```

### API Integration
To connect to a real backend, update the `handleAnalysis` function in `src/App.js`:

```javascript
// Replace the mock implementation with:
const response = await axios.post(`${API}/analyze`, { keyword });
setAnalysisData(response.data);
```

## 📁 Project Structure

```
Reddit-Sentiment-Analysis-final/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js          # Main component
│   ├── App.css         # Styling
│   ├── index.js        # Entry point
│   └── index.css       # Global styles
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind CSS config
├── postcss.config.js   # PostCSS config
└── README.md           # This file
```

## 🎨 Technologies Used

- **React 18** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library for React
- **Lucide React** - Beautiful & consistent icons
- **Axios** - Promise-based HTTP client


