# SpeedtestSender

SpeedtestSender is a Node.js script for automatically testing internet speed and posting the results to a specified API.

## Setup

1. Install Node.js and npm.
2. Clone the repo and run `npm install`.

## Configuration

Create a `config.json` with the API endpoint and key:
```json
{
    "API_URL": "your_api_endpoint",
    "API_KEY": "your_api_key",
    "INTERVAL": interval_in_minutes
}
```

## Running

Execute node index.js to start the speed test.
Data Sent
 - Ping (ms)
 - Download Speed (bps)
 - Upload Speed (bps)
 - Result ID
 - Server ID
