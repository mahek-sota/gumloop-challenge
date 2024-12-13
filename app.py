from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import requests
from functools import lru_cache

app = Flask(__name__)
CORS(app)

# Pretrained summarization model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

NEWS_API_KEY = "2126e540f92e47da9fc47ed16872dfee"

# Caching function to store summarized results
@lru_cache(maxsize=10)  
def fetch_and_summarize_news(category):
    url = f"https://newsapi.org/v2/top-headlines?country=us&category={category}&apiKey={NEWS_API_KEY}"
    response = requests.get(url)
    
    if response.status_code != 200:
        return {"error": "Failed to fetch news from NewsAPI"}

    data = response.json()
    articles = data.get('articles', [])
    news_content = []
    titles = []

    # Prepare batch content for summarization
    for article in articles[:5]:  
        title = article.get('title', '')
        description = article.get('description', '')
        titles.append(title)
        
        if description:
            content = f"{title}. {description}"
            news_content.append(content)
        else:
            news_content.append("")

    # Batch summarization
    summaries = summarizer(news_content, max_length=200, min_length=30, do_sample=False)

    # Combine titles with summaries
    summarized_news = [
        {"title": titles[i], "summary": summaries[i]['summary_text']}
        for i in range(len(titles))
    ]

    return summarized_news


@app.route('/fetch-news', methods=['GET'])
def fetch_news():
    category = request.args.get('category', 'general')  
    try:
        summarized_news = fetch_and_summarize_news(category)
        return jsonify({"summarized_news": summarized_news})  
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
