from flask import Flask, request, jsonify
from uagents import Agent, Context, Model 
import openai
import requests

# Flask app initialization
app = Flask(__name__)

# OpenAI API Key
openai.api_key = "your_api_key"

# Spotify API Details
SPOTIFY_ACCESS_TOKEN = "your_spotify_access_token"  # Replace with your access token
SPOTIFY_PLAYLIST_ID = "3lYGng9XBpuGrWBI0SPPH1"  # Your provided playlist ID

# Define models for Fetch.ai agents
class PartyDetails(Model):
    guest_size: int
    party_type: str
    under_21: bool
    location: str


class PartyPlanResponse(Model):
    plan: str
    spotify_link: str


# Initialize Fetch.ai agent
party_agent = Agent(
    name="VibeSyncPartyAgent",
    port=4200,
    seed="vibesync_secret_seed",
    endpoint=["http://127.0.0.1:4200/submit"],
)


# OpenAI GPT Integration for Party Planning
def generate_party_plan(guest_size, party_type, under_21, location):
    prompt = f"""
    Plan the most unpredictable and chaotic party possible for {guest_size} guests in {location}. 
    The theme of the party is '{party_type}', but deliberately suggest everything that clashes with this theme:
    - For food and drinks, pick items that completely oppose the theme (e.g., suggest hot soup for a summer beach party).
    - Suggest games that would be hilariously inappropriate for the theme (e.g., Twister at a formal dinner party).
    - Curate a playlist of 20 songs that are the exact opposite of what people at this kind of party would expect to hear. 
      Include overly popular meme songs, classical music for a rave, or heavy metal for a peaceful gathering.
    Focus on making the suggestions hilariously unexpected to ensure maximum comedic value and confusion!
    """
    try:
        # Generate recommendations from ChatGPT
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=500,
            n=1,
            stop=None,
            temperature=0.7,
        )
        chatgpt_output = response.choices[0].text.strip()
        print(f"ChatGPT Output: {chatgpt_output}")

        # Extract 20 songs from ChatGPT Output
        songs = extract_songs_from_output(chatgpt_output)

        # Add songs to Spotify playlist
        spotify_link = add_songs_to_spotify(songs)

        return {
            "party_plan": chatgpt_output,
            "spotify_link": spotify_link
        }
    except Exception as e:
        print(f"Failed to generate a party plan: {e}")
        return f"Failed to generate a party plan: {e}"


def extract_songs_from_output(chatgpt_output):
    # Example function to parse songs from ChatGPT output
    if "Playlist:" in chatgpt_output:
        playlist_text = chatgpt_output.split("Playlist:")[1]
        return [song.strip() for song in playlist_text.split(",") if song.strip()]
    return []


def add_songs_to_spotify(songs):
    # Convert song names into Spotify URIs
    spotify_uris = []
    for song in songs:
        uri = search_spotify_track(song)
        if uri:
            spotify_uris.append(uri)

    if not spotify_uris:
        return "Failed to find songs on Spotify."

    # Add tracks to Spotify playlist
    url = f"https://api.spotify.com/v1/playlists/{SPOTIFY_PLAYLIST_ID}/tracks"
    headers = {
        "Authorization": f"Bearer {SPOTIFY_ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }
    body = {
        "uris": spotify_uris
    }
    response = requests.post(url, headers=headers, json=body)

    if response.status_code == 201:
        return f"https://open.spotify.com/playlist/{SPOTIFY_PLAYLIST_ID}"
    else:
        print(f"Failed to add songs to Spotify: {response.json()}")
        return "Failed to add songs to Spotify."


def search_spotify_track(song_name):
    # Search for a track on Spotify
    url = f"https://api.spotify.com/v1/search"
    headers = {
        "Authorization": f"Bearer {SPOTIFY_ACCESS_TOKEN}"
    }
    params = {
        "q": song_name,
        "type": "track",
        "limit": 1
    }
    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        if data["tracks"]["items"]:
            return data["tracks"]["items"][0]["uri"]  # Spotify URI
    print(f"Failed to find track: {song_name}")
    return None


# Flask endpoint for party planning
@app.route("/party-plan", methods=["POST"])
def party_plan():
    data = request.json
    guest_size = data.get("guest_size")
    party_type = data.get("party_type")
    under_21 = data.get("under_21")
    location = data.get("location")

    plan = generate_party_plan(guest_size, party_type, under_21, location)
    return jsonify(plan)


# Register Fetch.ai agent
@party_agent.handle(PartyDetails)
def handle_party_details(context: Context, details: PartyDetails):
    plan = generate_party_plan(details.guest_size, details.party_type, details.under_21, details.location)
    response = PartyPlanResponse(
        plan=plan["party_plan"],
        spotify_link=plan["spotify_link"]
    )
    context.send(response)


if __name__ == "__main__":
    # Run Fetch.ai agent
    party_agent.run()

    # Run Flask server
    app.run(host="0.0.0.0", port=5000)
