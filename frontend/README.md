# Reddit Sentiment Analysis - Frontend

A beautiful, modern React.js frontend for analyzing Reddit sentiment with interactive charts and visualizations.

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

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
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

## 🎯 How to Use

1. **Enter a keyword** in the search box (e.g., "AI", "Tesla", "Bitcoin")
2. **Click "Analyze"** to start the sentiment analysis
3. **View the results** including:
   - Engagement statistics
   - Sentiment distribution charts
   - Timeline visualization
   - Popular words with colorful gradients
   - Top hashtags with progress bars

## 🔧 Backend Integration

To connect to the backend API, update the `handleAnalysis` function in `src/App.js`:

```javascript
// Replace the mock implementation with:
const response = await axios.post(`${API}/analyze`, { keyword });
setAnalysisData(response.data);
```

### Environment Variables
Create a `.env` file in the frontend directory:
```
REACT_APP_BACKEND_URL=http://localhost:5000
```

## 📁 Project Structure

```
frontend/
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

## 🌈 UI Features

- **Gradient Backgrounds**: Beautiful dark theme with blue gradients
- **Glassmorphism Effects**: Translucent cards with backdrop blur
- **Interactive Elements**: Hover effects and smooth transitions
- **Responsive Grid**: Adapts to different screen sizes
- **Custom Animations**: Loading spinners and progress bars

## 📊 Mock Data

The frontend currently uses mock data for demonstration. When connected to the backend, it will display real sentiment analysis results.

## 🎉 Ready for Backend!

This frontend is designed to work seamlessly with a backend API. Simply update the API endpoints and the frontend will display real-time sentiment analysis data.

---

**Happy Coding!** 🚀✨
