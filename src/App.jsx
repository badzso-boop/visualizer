import { useState } from 'react'
import './App.css'
import Visualizer from './components/Visualizer';

const songs = [
  { name: "Shake It Off", file: "/music/Taylor Swift - Shake It Off.mp3" }
];

function App() {
  const [currentSong, setCurrentSong] = useState(null);

  const colorSchemes = {
    // "Shake It Off": ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#0000ff"]
    "Shake It Off": ["#ff0000"]
  };

  return (
    <div>
      <h1>Zenelejátszó Vizualizációval</h1>
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <button onClick={() => setCurrentSong(song)}>{song.name}</button>
          </li>
        ))}
      </ul>
      {currentSong && (
        <div>
          <h2>{currentSong.name}</h2>
          <Visualizer
            audioSrc={currentSong.file}
            colors={colorSchemes[currentSong.name]}
          />
        </div>
      )}
    </div>
  );
}

export default App
