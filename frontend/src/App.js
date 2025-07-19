import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import {
  Search,
  TrendingUp,
  BarChart3,
  Cloud,
  Users,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import WordCloud from 'react-wordcloud'; // Removed due to dependency conflicts

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const API = `${BACKEND_URL}/api`;

// Mock data for demonstration - replace with real API calls
const mockSentimentData = [
  { name: "Positive", value: 45, color: "#10B981" },
  { name: "Neutral", value: 35, color: "#6B7280" },
  { name: "Negative", value: 20, color: "#EF4444" },
];

const mockTimelineData = [
  { time: "00:00", positive: 12, negative: 8, neutral: 15 },
  { time: "04:00", positive: 18, negative: 5, neutral: 12 },
  { time: "08:00", positive: 25, negative: 12, neutral: 18 },
  { time: "12:00", positive: 32, negative: 15, neutral: 22 },
  { time: "16:00", positive: 28, negative: 10, neutral: 20 },
  { time: "20:00", positive: 35, negative: 8, neutral: 25 },
];

const mockWordCloudData = [
  { text: "amazing", value: 64 },
  { text: "great", value: 58 },
  { text: "excellent", value: 52 },
  { text: "love", value: 48 },
  { text: "awesome", value: 44 },
  { text: "fantastic", value: 38 },
  { text: "wonderful", value: 35 },
  { text: "perfect", value: 32 },
  { text: "incredible", value: 28 },
  { text: "outstanding", value: 25 },
  { text: "brilliant", value: 22 },
  { text: "superb", value: 18 },
  { text: "magnificent", value: 15 },
  { text: "terrific", value: 12 },
];

const mockTopHashtags = [
  { name: "#AI", mentions: 1250 },
  { name: "#Technology", mentions: 980 },
  { name: "#Innovation", mentions: 750 },
  { name: "#Future", mentions: 640 },
  { name: "#Tech", mentions: 580 },
];

const mockEngagementData = [
  { metric: "Tweets", value: 1247, icon: MessageCircle },
  { metric: "Likes", value: 3582, icon: Heart },
  { metric: "Retweets", value: 892, icon: Share },
  { metric: "Users", value: 567, icon: Users },
];

function App() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  const handleAnalysis = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnalysisData(null); // Clear previous results
    setProgress(0);
    setCurrentStep("Initializing...");

    try {
      // Step 1: Initialize
      setProgress(10);
      setCurrentStep("Fetching Reddit posts...");
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 2: Start API call
      setProgress(25);
      setCurrentStep("Searching subreddits...");
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Step 3: Make actual API call to backend
      setProgress(40);
      setCurrentStep("Processing posts...");
      const response = await axios.post(`${API}/analyze`, { keyword });
      
      // Step 4: Process the response data
      setProgress(70);
      setCurrentStep("Analyzing sentiment...");
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const data = response.data;

      // Update engagement data with real backend values and Reddit terminology
      data.engagement = [
        { metric: "Posts", value: data.total_posts || 0, icon: MessageCircle },
        {
          metric: "Upvotes",
          value: data.upvotes || 0,
          icon: Heart,
        },
        {
          metric: "Comments",
          value: data.comments || 0,
          icon: Share,
        },
        {
          metric: "Users",
          value: data.users || 0,
          icon: Users,
        },
      ];

      // Step 5: Generate insights
      setProgress(90);
      setCurrentStep("Generating insights...");
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Step 6: Complete
      setProgress(100);
      setCurrentStep("Complete!");
      await new Promise(resolve => setTimeout(resolve, 200));
      
      setAnalysisData(data);
    } catch (err) {
      setError("Failed to analyze sentiment. Please try again.");
      console.error("Analysis error:", err);
    } finally {
      setIsLoading(false);
      setProgress(0);
      setCurrentStep("");
    }
  };

  const wordCloudOptions = {
    colors: ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444"],
    fontFamily: "Inter, sans-serif",
    fontSizes: [16, 60],
    rotations: 2,
    rotationAngles: [0, 90],
    padding: 5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1B] to-[#2E2E33] relative">
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg"
            alt="Analytics Dashboard"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1B]/95 to-[#2E2E33]/95"></div>
        </div>

        <div className="relative px-4 py-12 sm:px-6 sm:py-20 lg:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 bg-[#FF4500]/15 rounded-full text-[#FF4500] text-xs sm:text-sm font-semibold backdrop-blur-sm border border-[#FF4500]/30 shadow-lg transition-all duration-200 hover:bg-[#FF4500]/20 hover:shadow-xl hover:scale-105">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
                <span className="hidden xs:inline">Reddit Sentiment Analysis</span>
                <span className="xs:hidden">Reddit Analysis</span>
              </div>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-7xl font-bold text-[#FFFFFF] mb-6 sm:mb-8 leading-tight">
              Analyze Reddit{" "}
              <span className="text-transparent bg-gradient-to-r from-[#FF4500] to-[#FF6B35] bg-clip-text block xs:inline">
                Sentiment
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#D7DADC] mb-10 sm:mb-16 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Discover what people are really saying about any topic on Reddit.
              Get instant insights with sentiment analysis, word clouds, and
              trending data.
            </p>

            {/* Search Form */}
            <form onSubmit={handleAnalysis} className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#D7DADC]" />
                </div>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Enter keyword to analyze (e.g., AI, Tesla, Bitcoin)"
                  className="w-full pl-12 pr-32 py-4 text-lg bg-[#2E2E33]/50 backdrop-blur-sm border border-[#D7DADC]/20 rounded-2xl text-[#FFFFFF] placeholder-[#D7DADC]/60 focus:outline-none focus:ring-2 focus:ring-[#FF4500] focus:border-transparent transition-all duration-200 hover:bg-[#2E2E33]/70"
                />
                <button
                  type="submit"
                  disabled={isLoading || !keyword.trim()}
                  className="absolute inset-y-0 right-0 px-6 py-2 m-2 bg-gradient-to-r from-[#FF4500] to-[#FF6B35] text-white font-semibold rounded-xl hover:from-[#E63E00] hover:to-[#FF4500] focus:outline-none focus:ring-2 focus:ring-[#FF4500] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Analyzing...
                    </div>
                  ) : (
                    "Analyze"
                  )}
                </button>
              </div>
              
              {/* Progress Bar */}
              {isLoading && (
                <div className="mt-6 px-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#D7DADC]">{currentStep}</span>
                    <span className="text-sm font-medium text-[#FF4500]">{progress}%</span>
                  </div>
                  <div className="w-full bg-[#2E2E33] rounded-full h-2 overflow-hidden shadow-inner">
                    <div 
                      className="h-2 bg-gradient-to-r from-[#FF4500] to-[#FF6B35] rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-[#D7DADC]/70">
                    <span className={progress >= 10 ? 'text-[#FF4500] font-medium' : ''}>Fetching posts</span>
                    <span className={progress >= 40 ? 'text-[#FF4500] font-medium' : ''}>Analyzing sentiment</span>
                    <span className={progress >= 90 ? 'text-[#FF4500] font-medium' : ''}>Generating insights</span>
                  </div>
                </div>
              )}
            </form>

            {error && (
              <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {analysisData && (
        <div className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Analysis Results for "{keyword}"
              </h2>
              <p className="text-gray-300">
                Found {analysisData.totalTweets.toLocaleString()} posts with{" "}
                {(analysisData.averageSentiment * 100).toFixed(1)}% positive
                sentiment
              </p>
            </div>

            {/* Engagement Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {analysisData.engagement.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-orange-500/20 rounded-lg">
                        <Icon className="w-5 h-5 text-orange-400" />
                      </div>
                      <span className="text-gray-300 font-medium">
                        {item.metric}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {item.value.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Sentiment Distribution */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-bold text-white">
                    Sentiment Distribution
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analysisData.sentiment}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {analysisData.sentiment.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Timeline */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-bold text-white">
                    Sentiment Timeline
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analysisData.timeline}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#F9FAFB",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="positive"
                      stroke="#10B981"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="neutral"
                      stroke="#6B7280"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="negative"
                      stroke="#EF4444"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Word Cloud */}
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Cloud className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-bold text-white">
                    Popular Words
                  </h3>
                </div>
                <div className="h-80 overflow-hidden">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {analysisData.wordCloud.slice(0, 12).map((word, index) => {
                      const colors = [
                        "from-orange-400 to-red-500",
                        "from-yellow-400 to-orange-500",
                        "from-red-400 to-pink-500",
                        "from-orange-500 to-red-600",
                        "from-amber-400 to-orange-500",
                        "from-red-500 to-orange-600",
                        "from-yellow-500 to-red-500",
                        "from-orange-300 to-red-400",
                        "from-red-400 to-orange-500",
                      ];
                      const colorClass = colors[index % colors.length];
                      const fontSize = Math.max(
                        18,
                        Math.min(32, word.value / 2)
                      );
                      return (
                        <div
                          key={index}
                          className="text-center group cursor-pointer transform transition-all duration-300 hover:scale-105 p-2"
                        >
                          <div
                            className={`bg-gradient-to-r ${colorClass} bg-clip-text text-transparent font-bold mb-2 drop-shadow-lg leading-tight`}
                            style={{ fontSize: `${fontSize}px` }}
                          >
                            {word.text}
                          </div>
                          <div className="text-gray-300 text-xs font-medium bg-white/10 px-2 py-1 rounded-full inline-block">
                            {word.value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Top Subreddits */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-bold text-white">
                    Top Subreddits
                  </h3>
                </div>
                <div className="space-y-4">
                  {analysisData.hashtags.map((hashtag, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-orange-400 font-medium">
                        {hashtag.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (hashtag.mentions /
                                  Math.max(
                                    ...analysisData.hashtags.map(
                                      (h) => h.mentions
                                    )
                                  )) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-gray-300 text-sm font-medium min-w-[40px]">
                          {hashtag.mentions}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/20 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>Reddit Sentiment Analysis Dashboard</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
