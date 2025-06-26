# Interactive Health Insight Backend

This is a small backend server for the Interactive Health Insight React Native app. It receives health data (mood, sleep
hours, and notes) from the app and returns personalized suggestions.

## Setup

1. Navigate to the backend directory:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Start the server:

```
npm start
```

The server will run on http://localhost:3000.

## API Endpoints

### POST /api/insights

Receives health data and returns personalized suggestions.

#### Request Body

```json
{
  "mood": 3,
  "sleepHours": 7,
  "notes": "Feeling a bit stressed today"
}
```

#### Response

```json
{
  "success": true,
  "suggestions": [
    "Practice gratitude by listing three things you're thankful for",
    "Take a short break to do something you enjoy",
    "Try deep breathing exercises when feeling stressed"
  ],
  "timestamp": "2023-10-25T12:34:56.789Z"
}
```

### GET /health

Health check endpoint to verify the server is running.

#### Response

```json
{
  "status": "ok"
}
```

## Integration with the React Native App

The React Native app sends a POST request to the `/api/insights` endpoint with the user's mood, sleep hours, and notes
data. The backend processes this data and returns personalized suggestions that are displayed in the app.

## Note for Development

For development purposes, the backend is configured to accept requests from any origin. In a production environment, you
should restrict this to only allow requests from your app's domain.
