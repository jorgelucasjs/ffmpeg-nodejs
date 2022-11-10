import React from 'react';
import './App.css';
import ReactPlayer from 'react-player'

function App() {
	

	return (
		<div className="App">
			 <h1>IP Camera Streaming</h1>
      		URL : http://localhost:4000/output.m3u8
			<div>
			<ReactPlayer 
				url='http://localhost:4000/output.m3u8' 
				playing={false} 
				controls={true}
				light={true}
				/* width='600px'
				height='300px' */
				pip={true}
				
			/>
			</div>
		</div>
	);
}

export default App;
