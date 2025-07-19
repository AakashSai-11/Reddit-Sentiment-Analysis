import sys
import json
import warnings
from contextlib import redirect_stdout, redirect_stderr
import os
import io
import re
from collections import Counter
import random
from datetime import datetime

# Suppress all warnings
warnings.filterwarnings('ignore')

# Set environment variables to suppress transformers warnings
os.environ['TRANSFORMERS_VERBOSITY'] = 'error'
os.environ['TOKENIZERS_PARALLELISM'] = 'false'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

class RedditSentimentAnalyzer:
    def __init__(self):
        # Load the RoBERTa model for sentiment analysis
        from transformers import pipeline
        self.sentiment_pipeline = pipeline(
            'sentiment-analysis', 
            model='cardiffnlp/twitter-roberta-base-sentiment-latest',
            return_all_scores=True
        )
        
        # Initialize Reddit API
        try:
            import praw
            from reddit_config import REDDIT_CONFIG
            
            self.reddit = praw.Reddit(
                client_id=REDDIT_CONFIG["client_id"],
                client_secret=REDDIT_CONFIG["client_secret"],
                user_agent=REDDIT_CONFIG["user_agent"]
            )
            print("Reddit API initialized successfully", file=sys.stderr)
        except Exception as e:
            print(f"Reddit API initialization failed: {e}", file=sys.stderr)
            raise Exception("Reddit API is required. Please check your credentials.")
    
    def clean_text(self, text):
        """Clean Reddit text for better analysis"""
        # Remove URLs
        text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
        # Remove user mentions and subreddit links
        text = re.sub(r'u/\w+|r/\w+', '', text)
        # Remove extra whitespace
        text = ' '.join(text.split())
        return text.strip()
    
    def analyze_sentiment(self, text):
        """Analyze sentiment of a single text"""
        cleaned_text = self.clean_text(text)
        if not cleaned_text:
            return {'label': 'neutral', 'score': 0.5}
        
        try:
            results = self.sentiment_pipeline(cleaned_text)
            # Get the highest scoring sentiment
            best_result = max(results[0], key=lambda x: x['score'])
            return best_result
        except:
            return {'label': 'neutral', 'score': 0.5}
    
    def get_reddit_posts(self, keyword, max_posts=150):
        """Get Reddit posts for a keyword using real Reddit API"""
        print(f"Searching Reddit for posts about: '{keyword}'", file=sys.stderr)
        
        reddit_posts = []
        
        try:
            # Search Reddit for posts - sort by relevance, no time filter (like mobile Reddit)
            print(f"Searching Reddit posts (all time)...", file=sys.stderr)
            search_results = self.reddit.subreddit("all").search(keyword, limit=max_posts, sort="relevance")
            
            for submission in search_results:
                # Get the title and selftext (if available)
                post_text = submission.title
                if submission.selftext and len(submission.selftext.strip()) > 0:
                    post_text += " " + submission.selftext
                
                # Clean and add the post with engagement metrics
                if post_text and len(post_text.strip()) > 10:  # Minimum length check
                    reddit_posts.append({
                        'id': submission.id,
                        'content': post_text.strip(),
                        'upvotes': submission.score,
                        'comments': submission.num_comments,
                        'author': str(submission.author) if submission.author else 'deleted',
                        'subreddit': submission.subreddit.display_name,
                        'created_at': submission.created_utc
                    })
                    
                    if len(reddit_posts) >= max_posts:
                        break
            
            print(f"Found {len(reddit_posts)} real Reddit posts", file=sys.stderr)
            
            # If we don't have enough posts, try popular subreddits with broader search
            if len(reddit_posts) < max_posts:
                print(f"Searching specific subreddits for more posts...", file=sys.stderr)
                # Include more diverse subreddits
                popular_subreddits = ['technology', 'news', 'worldnews', 'stocks', 'investing', 'business', 'askreddit', 
                                    'movies', 'television', 'entertainment', 'celebrity', 'bollywood', 'india', 'pics', 'videos']
                
                for subreddit_name in popular_subreddits:
                    if len(reddit_posts) >= max_posts:
                        break
                    try:
                        # Search specific subreddits with relevance (no time filter)
                        subreddit_results = self.reddit.subreddit(subreddit_name).search(keyword, limit=30, sort="relevance")
                        for submission in subreddit_results:
                            # Skip duplicates
                            post_id = submission.id
                            if any(post.get('id') == post_id for post in reddit_posts):
                                continue
                            
                            post_text = submission.title
                            if submission.selftext and len(submission.selftext.strip()) > 0:
                                post_text += " " + submission.selftext
                            
                            if post_text and len(post_text.strip()) > 10:
                                reddit_posts.append({
                                    'id': post_id,
                                    'content': post_text.strip(),
                                    'upvotes': submission.score,
                                    'comments': submission.num_comments,
                                    'author': str(submission.author) if submission.author else 'deleted',
                                    'subreddit': submission.subreddit.display_name,
                                    'created_at': submission.created_utc
                                })
                                
                                if len(reddit_posts) >= max_posts:
                                    break
                    except Exception as e:
                        print(f"Error searching {subreddit_name}: {e}", file=sys.stderr)
                        continue
                
                print(f"Total posts found: {len(reddit_posts)}", file=sys.stderr)
            
        except Exception as e:
            print(f"Error fetching Reddit posts: {e}", file=sys.stderr)
            raise Exception(f"Failed to fetch Reddit posts: {e}")
        
        return reddit_posts
    
    def generate_word_cloud_data(self, posts):
        """Generate word cloud data from Reddit posts"""
        all_words = []
        for post in posts:
            post_text = post['content'] if isinstance(post, dict) else post
            words = re.findall(r'\b\w+\b', post_text.lower())
            # Filter out common stopwords and Reddit-specific terms
            stopwords = {'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for', 'of', 'as', 'by', 'that', 'this', 'it', 'from', 'they', 'we', 'you', 'i', 'me', 'my', 'your', 'our', 'their', 'here', 'why', 'how', 'what', 'about', 'just', 'really', 'so', 'much', 'more', 'been', 'have', 'has', 'would', 'should', 'could', 'will', 'can', 'get', 'got', 'make', 'made', 'take', 'give', 'go', 'come', 'know', 'think', 'see', 'look', 'want', 'need', 'way', 'time', 'reddit', 'post', 'comment', 'upvote', 'downvote'}
            filtered_words = [word for word in words if word not in stopwords and len(word) > 2]
            all_words.extend(filtered_words)
        
        word_counts = Counter(all_words)
        word_cloud_data = []
        for word, count in word_counts.most_common(15):
            word_cloud_data.append({'text': word, 'value': count})
        
        return word_cloud_data
    
    def generate_hashtags(self, posts):
        """Generate popular subreddits from Reddit posts"""
        subreddit_counts = Counter()
        for post in posts:
            if isinstance(post, dict):
                subreddit_counts[f"r/{post['subreddit']}"] += 1
        
        hashtag_data = []
        for subreddit, count in subreddit_counts.most_common(5):
            hashtag_data.append({'name': subreddit, 'mentions': count})
        
        return hashtag_data
    
    def analyze_keyword(self, keyword):
        """Main function to analyze sentiment for a keyword using Reddit data"""
        # Get relevant Reddit posts
        posts = self.get_reddit_posts(keyword, max_posts=150)
        
        # Analyze sentiment for each post
        sentiments = []
        positive_count = 0
        negative_count = 0
        neutral_count = 0
        
        # Calculate engagement metrics
        total_upvotes = 0
        total_comments = 0
        unique_users = set()
        
        for post in posts:
            post_text = post['content']
            total_upvotes += post['upvotes']
            total_comments += post['comments']
            unique_users.add(post['author'])
            
            sentiment = self.analyze_sentiment(post_text)
            sentiments.append(sentiment)
            
            # Handle different label formats from the model
            label = sentiment['label'].lower()
            if label in ['positive', 'label_2']:
                positive_count += 1
            elif label in ['negative', 'label_0']:
                negative_count += 1
            else:
                neutral_count += 1
        
        total_posts = len(posts)
        
        # Calculate percentages
        positive_pct = (positive_count / total_posts) * 100 if total_posts > 0 else 0
        negative_pct = (negative_count / total_posts) * 100 if total_posts > 0 else 0
        neutral_pct = (neutral_count / total_posts) * 100 if total_posts > 0 else 0
        
        # Calculate total engagement metrics (not averages)
        unique_user_count = len(unique_users)
        
        # Use total engagement instead of averages for more realistic numbers
        total_engagement_upvotes = total_upvotes
        total_engagement_comments = total_comments
        
        # Generate timeline data (simulated based on actual data)
        timeline_data = [
            {'time': '00:00', 'positive': positive_count//4, 'negative': negative_count//4, 'neutral': neutral_count//4},
            {'time': '06:00', 'positive': positive_count//3, 'negative': negative_count//3, 'neutral': neutral_count//3},
            {'time': '12:00', 'positive': positive_count//2, 'negative': negative_count//2, 'neutral': neutral_count//2},
            {'time': '18:00', 'positive': positive_count, 'negative': negative_count, 'neutral': neutral_count}
        ]
        
        # Generate engagement data
        engagement_data = [
            {'metric': 'Posts', 'value': total_posts},
            {'metric': 'Total Upvotes', 'value': total_engagement_upvotes},
            {'metric': 'Total Comments', 'value': total_engagement_comments},
            {'metric': 'Unique Users', 'value': unique_user_count}
        ]
        
        # Compile results
        results = {
            'sentiment': [
                {'name': 'Positive', 'value': round(positive_pct, 1), 'color': '#10B981'},
                {'name': 'Neutral', 'value': round(neutral_pct, 1), 'color': '#6B7280'},
                {'name': 'Negative', 'value': round(negative_pct, 1), 'color': '#EF4444'}
            ],
            'timeline': timeline_data,
            'wordCloud': self.generate_word_cloud_data(posts),
            'hashtags': self.generate_hashtags(posts),
            'engagement': engagement_data,
            'totalTweets': total_posts,  # Keep same field name for frontend compatibility
            'total_posts': total_posts,  # Reddit terminology
            'averageSentiment': positive_pct / 100,
            'upvotes': total_engagement_upvotes,  # Total upvotes across all posts
            'comments': total_engagement_comments,  # Total comments across all posts
            'users': unique_user_count  # Unique users
        }
        
        return results

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Please provide a keyword to analyze"}))
        sys.exit(1)
    
    keyword = sys.argv[1]
    
    # Suppress all output during initialization
    with open(os.devnull, 'w') as devnull:
        with redirect_stdout(devnull), redirect_stderr(devnull):
            analyzer = RedditSentimentAnalyzer()
    
    try:
        results = analyzer.analyze_keyword(keyword)
        print(json.dumps(results, indent=2))
    except Exception as e:
        print(json.dumps({"error": f"Analysis failed: {str(e)}"}))
        sys.exit(1)
