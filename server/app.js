
const ffmpeg = require("fluent-ffmpeg");
const audio = './audio/files/music.mp3';
const output = './audio/files/file%d.ts';
const playlist = './audio/files/output.m3u8';

ffmpeg(audio)
	.outputOptions(["-y", "-i", audio, "-c:a",
		"libmp3lame", "-b:a", "96k", "-muxdelay", "0", "-f", "segment",
		"-sc_threshold", "0", "-hls_time", "10", "-segment_list", playlist,
		"-segment_format", "-hls_segment_filename"])
	.output(output)
	.on('end', function () {
		console.log('file has been converted succesfully');
	})
	.on('end', function () {
		console.log('file has been converted succesfully');
	})
	.run();

