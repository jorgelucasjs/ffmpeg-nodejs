const express = require("express");
const path = require('path');
const app = express();
const corsHandler = require('cors')({ origin: true });

const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

app.get("/stream", async (req, res) => {
	corsHandler(req, res, async () => {
		const audio = 'https://d2dpaowuivcmaz.cloudfront.net/halison-paix-o/musicas/lps/x-ddt/02.-tudo-mentira.mp3';

		//var stream = fs.createWriteStream('./audio/output.mp4');
		//const audio = './audio/music.mp3';
		const output = './audio/file%d.ts';
		const playlist = './audio/playlist.m3u8'

		ffmpeg('./audio/playlist.m3u8')
		.inputFormat("mp3")
		.outputFormat("mp3")
		.withNoVideo()
		.audioBitrate(96)
		.audioChannels(2)
		.audioFrequency(44100)
		.audioFilters([
			{
				filter: 'volume',
				options: ['0.5']
			},
			{
				filter: 'silencedetect',
				options: { n: '-50dB', d: 5 }
			}
		])
		.on('end', function(err) {
			return true;
		})
		.on('error', function(err) {
			console.log('an error: ' + err);
		})
		.stream().pipe(res, { end: true });


	});
});

app.listen('5000', () => console.log('Server is running'));