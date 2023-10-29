const speedTest = require('speedtest-net');
const axios = require('axios');
const fs = require('fs');

const configFile = fs.readFileSync('./config.json');
const config = JSON.parse(configFile);

const API_URL = config.API_URL;
const API_KEY = config.API_KEY;;
const INTERVAL_MS = config.INTERVAL * 60 * 1000;

async function runSpeedTest() {
    try {
        console.log('Running Speedtest...');
        const result = await speedTest({ acceptLicense: true, acceptGdpr: true });

        const dataToSend = {
            ping: result.ping.latency,
            download: result.download.bandwidth * 8, // Convert from Bytes to bits
            upload: result.upload.bandwidth * 8, // Convert from Bytes to bits
            server_id: result.server.id,
            api_token: API_KEY,
        };

        console.info('Speedtest Completed! Download Speed: ' + dataToSend.download / 1000000 + ' Mbps, Upload Speed: ' + dataToSend.upload / 1000000 + ' Mbps, Ping: ' + dataToSend.ping + ' ms');

        // Send the result to your API
        await sendToApi(dataToSend);
    } catch (error) {
        console.error('Error running speed test:', error);
    }
}

async function sendToApi(data) {
    try {
        const response = await axios.post(API_URL, data);
        console.log('Data sent to API. Response:', response.data);
    } catch (error) {
        console.error('Error sending data to API:', error.message);
    }
}

// Start the loop
setInterval(runSpeedTest, INTERVAL_MS);

// Optionally, you can run the speed test once immediately when the program starts
runSpeedTest();
