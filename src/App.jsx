import { useState } from 'react'
import './App.css'
import AudioVisualizer from './components/Visualizer2'

const songs = [
  { name: "Ready For It", file: "/music/_Ready For It_.mp3" },
  { name: "22 (Taylor's Version)", file: "/music/22 (Taylor's Version).mp3" },
  { name: "Afterglow", file: "/music/Afterglow.mp3" },  
  { name: "All Of The Girls You Loved Before", file: "/music/All Of The Girls You Loved Before.mp3" },
  { name: "All Too Well (10 Minute Version) (Taylor's Version) (From The Vault)", file: "/music/All Too Well (10 Minute Version) (Taylor's Version) (From The Vault).mp3" },
  { name: "august", file: "/music/august.mp3" },
  { name: "betty", file: "/music/betty.mp3" },
  { name: "cardigan", file: "/music/cardigan.mp3" },
  { name: "champagne problems", file: "/music/champagne problems.mp3" },
  { name: "Cornelia Street", file: "/music/Cornelia Street.mp3" },
  { name: "cowboy like me", file: "/music/cowboy like me.mp3" },
  { name: "Cruel Summer", file: "/music/Cruel Summer.mp3" },
  { name: "Delicate", file: "/music/Delicate.mp3" },
  { name: "Don't Blame Me", file: "/music/Dont Blame Me.mp3" },
  { name: "Enchanted (Taylor's Version)", file: "/music/Enchanted (Taylor's Version).mp3" },
  { name: "evermore", file: "/music/evermore.mp3" },
  { name: "Fearless (Taylor's Version)", file: "/music/Fearless (Taylor's Version).mp3" },
  { name: "happiness", file: "/music/happiness.mp3" },
  { name: "I Knew You Were Trouble (Taylor's Version)", file: "/music/I Knew You Were Trouble (Taylor's Version).mp3" },
  { name: "illicit affairs", file: "/music/illicit affairs.mp3" },
  { name: "ivy", file: "/music/ivy.mp3" },
  { name: "Look What You Made Me Do", file: "/music/Look What You Made Me Do.mp3" },
  { name: "Love Story (Taylor's Version)", file: "/music/Love Story (Taylor's Version).mp3" },
  { name: "Lover", file: "/music/Lover.mp3" },
  { name: "marjorie", file: "/music/marjorie.mp3" },
  { name: "Miss Americana & The Heartbreak Prince", file: "/music/Miss Americana & The Heartbreak Prince.mp3" },
  { name: "my tears ricochet", file: "/music/my tears ricochet.mp3" },
  { name: "no body, no crime", file: "/music/no body, no crime.mp3" },
  { name: "right where you left me (bonus track)", file: "/music/right where you left me (bonus track).mp3" },
  { name: "Shake It Off", file: "/music/Taylor Swift - Shake It Off.mp3" },
  { name: "The Man", file: "/music/The Man.mp3" },
  { name: "tolerate it", file: "/music/tolerate it.mp3" },
  { name: "We Are Never Ever Getting Back Together (Taylor's Version)", file: "/music/We Are Never Ever Getting Back Together (Taylor's Version).mp3" },
  { name: "willow", file: "/music/willow.mp3" },
  { name: "You Belong With Me (Taylor's Version)", file: "/music/You Belong With Me (Taylor's Version).mp3" },
  { name: "You Need To Calm Down", file: "/music/You Need To Calm Down.mp3" },
];

function App() {
  const [currentSong, setCurrentSong] = useState(null);

  const colorSchemes = {
    "Ready For It": ["#000000", "#8b0000", "#1e90ff"], // sötét, intenzív, futurisztikus hangulat
    "22 (Taylor's Version)": ["#ff69b4", "#ffb6c1", "#f4a460"], // vidám, fiatalos
    "Afterglow": ["#ffa07a", "#ff4500", "#8b0000"], // romantikus, érzelmes
    "All Of The Girls You Loved Before": ["#ff9999", "#ffcccc", "#ffe4e1"], // nosztalgikus, lágy
    "All Too Well (10 Minute Version) (Taylor's Version) (From The Vault)": ["#800000", "#ff6347", "#daa520"], // drámai, nosztalgikus
    "august": ["#ffd700", "#ffa500", "#ff6347"], // nyárias, meleg színek
    "betty": ["#ff69b4", "#d8bfd8", "#dda0dd"], // nosztalgikus, ártatlan
    "cardigan": ["#708090", "#778899", "#d3d3d3"], // melankolikus, hideg
    "champagne problems": ["#b0c4de", "#dcdcdc", "#708090"], // érzelmes, letisztult
    "Cornelia Street": ["#4682b4", "#5f9ea0", "#d3d3d3"], // városi, nosztalgikus
    "cowboy like me": ["#8b4513", "#d2691e", "#deb887"], // western, földes színek
    "Cruel Summer": ["#ff4500", "#ff6347", "#ffd700"], // intenzív, nyárias
    "Delicate": ["#f0e68c", "#d3d3d3", "#b0c4de"], // finom, lágy
    "Don't Blame Me": ["#4b0082", "#000080", "#8b0000"], // sötét, erőteljes
    "Enchanted (Taylor's Version)": ["#dda0dd", "#ffb6c1", "#9400d3"], // varázslatos, romantikus
    "evermore": ["#556b2f", "#6b8e23", "#deb887"], // természetközeli, nyugodt
    "Fearless (Taylor's Version)": ["#ffd700", "#ffa500", "#ff6347"], // bátor, meleg színek
    "happiness": ["#98fb98", "#00fa9a", "#3cb371"], // pozitív, friss
    "I Knew You Were Trouble (Taylor's Version)": ["#8b0000", "#ff4500", "#ff6347"], // intenzív, drámai
    "illicit affairs": ["#708090", "#2f4f4f", "#778899"], // titokzatos, sötét
    "ivy": ["#556b2f", "#6b8e23", "#228b22"], // természetes, zöld
    "Look What You Made Me Do": ["#000000", "#8b0000", "#ff4500"], // erőteljes, bosszúálló
    "Love Story (Taylor's Version)": ["#ffb6c1", "#ffd700", "#dda0dd"], // romantikus, klasszikus
    "Lover": ["#ff69b4", "#ffb6c1", "#ffcccb"], // szívhez szóló, lágy
    "marjorie": ["#8fbc8f", "#556b2f", "#deb887"], // emlékezetes, természetközeli
    "Miss Americana & The Heartbreak Prince": ["#ff69b4", "#d3d3d3", "#708090"], // érzelmes, lázadó
    "my tears ricochet": ["#708090", "#778899", "#2f4f4f"], // melankolikus, sötét
    "no body, no crime": ["#8b0000", "#2f4f4f", "#deb887"], // rejtélyes, westernes
    "right where you left me (bonus track)": ["#d3d3d3", "#708090", "#778899"], // nosztalgikus, hideg
    "Shake It Off": ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#0000ff"], // vidám, színes, energikus
    "The Man": ["#4682b4", "#5f9ea0", "#708090"], // erőteljes, modern
    "tolerate it": ["#778899", "#d3d3d3", "#708090"], // melankolikus, visszafogott
    "We Are Never Ever Getting Back Together (Taylor's Version)": ["#ff4500", "#ffa500", "#ff6347"], // élénk, szabad
    "willow": ["#556b2f", "#6b8e23", "#8fbc8f"], // természetes, zöld
    "You Belong With Me (Taylor's Version)": ["#ff69b4", "#ffb6c1", "#f4a460"], // nosztalgikus, vidám
    "You Need To Calm Down": ["#ff4500", "#ff69b4", "#ffd700"], // színes, élénk
  };

  return (
    <div>
      <h1>Zenelejátszó Vizualizációval</h1>
      {currentSong && (
        <div>
          <h2>{currentSong.name}</h2>
          <AudioVisualizer audioSrc={currentSong.file} colors={colorSchemes[currentSong.name]} />
        </div>
      )}
      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <button onClick={() => setCurrentSong(song)}>{song.name}</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default App
