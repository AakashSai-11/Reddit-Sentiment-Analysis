import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Reddit API Configuration
# Get these credentials from https://www.reddit.com/prefs/apps
REDDIT_CONFIG = {
    "client_id": os.getenv("REDDIT_CLIENT_ID"),
    "client_secret": os.getenv("REDDIT_CLIENT_SECRET"),
    "user_agent": os.getenv("REDDIT_USER_AGENT")
}

# Validate that all required environment variables are set
if not all(REDDIT_CONFIG.values()):
    missing_vars = [key for key, value in REDDIT_CONFIG.items() if not value]
    raise ValueError(f"Missing required environment variables: {missing_vars}. Please check your .env file.")
