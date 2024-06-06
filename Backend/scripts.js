import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

// Function to play the YouTube video and start transcription
async function playAndTranscribe() {
    const youtubeIframe = document.getElementById('youtube-video');
    const transcriptElement = document.getElementById('transcript');

    // Play the YouTube video
    youtubeIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');

    // Mocking the transcription process
    transcriptElement.innerText = "Starting transcription...\n";

    // Simulate downloading the audio file from the YouTube video
    // Replace with the actual path to the downloaded audio file
    const audioFilePath = "/path/to/downloaded/audio/file.mp3";

    try {
        const translation = await openai.audio.translations.create({
            file: fs.createReadStream(audioFilePath),
            model: "whisper-1",
        });

        transcriptElement.innerText = translation.text;
    } catch (error) {
        transcriptElement.innerText = "An error occurred during transcription: " + error.message;
    }
}

// Event listener for the play button
document.getElementById('playButton').addEventListener('click', playAndTranscribe);
