import React, { useEffect, useRef, useState } from "react";

const AudioVisualizer = ({ audioSrc, colors }) => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // Kezdetben lejátszás van

  useEffect(() => {
    if (!audioSrc) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const audio = new Audio(audioSrc);
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    const frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // Automatikusan elindul
    if (isPlaying) {
      audio.play();
    }

    const renderBars = () => {
      analyser.getByteFrequencyData(frequencyData);
    
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Vászon tisztítása

      const centerX = canvas.width / 2 - 100; // Vászon közepe X tengelyen
      const centerX2 = canvas.width / 2 + 100; // Vászon közepe X tengelyen
      const centerYShape = canvas.height / 2; // Vászon közepe Y tengelyen
      const radius = Math.min(centerX, centerYShape) * 0.5; // Félkör sugara
      const radius2 = Math.min(centerX2, centerYShape) * 0.5; // Félkör sugara
      const startAngle = Math.PI;
      const endAngle = 0;
    
      const halfDataLength = Math.floor(frequencyData.length / 2);
      const barWidth = canvas.width / halfDataLength;
      const centerY = canvas.height; // Vászon alja (oszlopok az aljától növekszenek)
    
      // Háromszög kirajzolasa
      ctx.beginPath();
      ctx.moveTo(centerX2 + 101, centerYShape - 82); // Kiindulópont (derékszög csúcsa)
      ctx.lineTo(centerX - 101, centerYShape - 82); // Alap vége
      ctx.lineTo(centerX2 - radius2, centerYShape + 100); // Magasság vége (növekvő méret)
      ctx.closePath(); // Háromszög bezárása
      ctx.fillStyle = colors[0]; // Háromszög színe
      ctx.fill();
      ctx.stroke();

      // Félkörök rajzolása
      ctx.beginPath();
      ctx.arc(centerX, centerYShape-80, radius, startAngle, endAngle, false); // Félkör ív
      ctx.arc(centerX2, centerYShape-80, radius2, startAngle, endAngle, false); // Félkör ív
      ctx.fillStyle = colors[0]; // Szín a frekvenciához
      ctx.fill(); // Félkör kitöltése
      ctx.stroke(); // Körvonal megrajzolása


      frequencyData.forEach((value, index) => {
        const barHeight = (value / 255) * 200; // Oszlop magasságának kiszámítása az amplitúdó alapján
        const x = index * barWidth;
        const y = centerY - barHeight; // Oszlop alsó pontja
        
        const colorIndex = Math.floor((value / 255) * (colors.length - 1)); // Szín kiválasztása az amplitúdó alapján
        const color = colors[colorIndex];

        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth, barHeight); // Oszlop kirajzolása
      });

      if (isPlaying) {
        requestAnimationFrame(renderBars); // Ismétlés a következő frame-ben
      }
    };

    renderBars();

    return () => {
      audio.pause();
      audioContext.close();
    };
  }, [audioSrc, colors, isPlaying]);

  const handleStop = () => {
    setIsPlaying(false);
  };

  const handleResume = () => {
    setIsPlaying(true);
  };

  return (
    <div>
      <canvas ref={canvasRef} width="800" height="400" />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <button onClick={handleStop} style={{ margin: "0 10px", padding: "10px 20px", fontSize: "16px" }}>
          Stop
        </button>
        <button onClick={handleResume} style={{ margin: "0 10px", padding: "10px 20px", fontSize: "16px" }}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default AudioVisualizer;
