from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import requests
import google.auth.transport.requests
import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
from http.server import BaseHTTPRequestHandler, HTTPServer
import threading
from urllib.parse import parse_qs, urlparse
import webbrowser
import feedparser
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)


# Define the API credentials and scopes
SCOPES = [
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.force-ssl",
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtubepartner"
]

# .env 파일 활성화
load_dotenv()

# Path to the client_secret.json file
CLIENT_SECRETS_FILE = os.getenv('API_KEY')
PORT = 3031

class OAuthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        query_components = parse_qs(urlparse(self.path).query)
        if "code" in query_components:
            self.server.code = query_components["code"][0]
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(b"<h1>Authentication successful! You can close this window and return to the console.</h1>")
        else:
            self.send_response(400)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(b"<h1>Authentication failed!</h1>")

def authenticate():
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=SCOPES)
    flow.redirect_uri = f"http://localhost:{PORT}/api/oauth2callback"

    authorization_url, _ = flow.authorization_url(
        access_type='offline', include_granted_scopes='true')

    # Start a simple HTTP server to handle the callback
    server = HTTPServer(('localhost', PORT), OAuthHandler)
    threading.Thread(target=server.serve_forever).start()

    webbrowser.open(authorization_url)

    # Wait for the OAuth2 callback to set the code
    while not hasattr(server, 'code'):
        pass

    flow.fetch_token(code=server.code)
    credentials = flow.credentials

    # Shutdown the HTTP server
    server.shutdown()
    return credentials

def get_subscriptions():
    credentials = authenticate()

    youtube = googleapiclient.discovery.build("youtube", "v3", credentials=credentials)

    result = []
    params = {
        'part': 'snippet',
        'mine': True,
        'order': 'unread',
        'maxResults': 50
    }

    while True:
        response = youtube.subscriptions().list(**params).execute()

        result.extend([{
            'channelId': item['snippet']['resourceId']['channelId'],
            'channelTitle': item['snippet']['title'],
            'thumbnail': item['snippet']['thumbnails']['default']['url']
        } for item in response['items']])

        if 'nextPageToken' not in response:
            break
        else:
            params['pageToken'] = response['nextPageToken']

    with open('./data/subscriptions.json', 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2)

    return result


def get_channel_videos(channel_id):
    feed_url = f"https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}"
    feed = feedparser.parse(feed_url)

    videos = []
    for entry in feed.entries:
        video = {
            'video_id': entry.yt_videoid,
            'channel_id': entry.yt_channelid,
            'title': entry.title,
            'link': entry.link,
            'ChannelTitle': entry.author,
            'published': entry.published,
            'description': entry.description,
            'thumbnail': entry.media_thumbnail,
            'views': entry.media_statistics['views'] if 'media_statistics' in entry else 'N/A'
        }
        videos.append(video)
    return videos


def get_video_info(channels, channel_icons):
    result = []
    for channel in zip(channels, channel_icons):
        channel_id = channel[0]
        videos = get_channel_videos(channel_id)
        for video in videos:
            video['channel_icon'] = channel[1]
            result.append(video)
    return result


with open('./data/subscriptions.json') as file:
    data = json.load(file)
    channels = map(lambda channel: channel['channelId'], data)
    channel_icons = map(lambda channel: channel['thumbnail'], data)
    videos = get_video_info(channels, channel_icons)
    with open('videos.json', 'w', encoding='utf-8') as file:
        json.dump(videos, file, ensure_ascii=False, indent=4)



@app.route('/')
def home():  # put application's code here
    return 'YourTubeAPI_Subscription_Flask'


@app.route('/subscriptions', methods=['GET'])
def subscriptions():
    try:
        subscriptions = get_subscriptions()
        channels = list(map(lambda channel: channel['channelId'], subscriptions))
        channel_icons = list(map(lambda channel: channel['thumbnail'], subscriptions))
        videos = get_video_info(channels, channel_icons)

        # JSON 데이터를 파일로 저장
        file_path = os.path.expanduser('~/Desktop/YourTube_Extension/24-1_YourTube/build/data/subscriptionVideos.json')
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(videos, f, ensure_ascii=False, indent=4)

            # JSON 데이터를 두 번째 경로에 저장
            file_path2 = os.path.expanduser(
                '~/Desktop/YourTube_Extension/24-1_YourTube/public/data/subscriptionVideos.json')
            os.makedirs(os.path.dirname(file_path2), exist_ok=True)
            with open(file_path2, 'w', encoding='utf-8') as f:
                json.dump(videos, f, ensure_ascii=False, indent=4)

        return jsonify({
            "message": "result from flask",
            "subscriptions": subscriptions,
            "videos": videos
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)


# 기존 가상 환경 삭제
# rm -rf venv
#가상환경 생성
# python3 -m venv venv
#가상환경 활성화
# source venv/bin/activate
#필요한 패키지 설치 명령어 (선택)
# pip install -r requirements.txt
# 서버 실행 명령어
# python app.py


# pip 문제 있을때
# python3 -m ensurepip --upgrade
# pip install --upgrade pip
