import React, { useEffect, useRef } from "react";

const Visualizer = ({ audioSrc, colors }) => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

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

    audio.play();

    const renderHalfCircle = () => {
      const circlesR = [];
      const circlesL = [];
      const triangles = [];

      analyser.getByteFrequencyData(frequencyData);
    
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Vászon tisztítása
    
      const centerX = canvas.width / 2 - 100; // Vászon közepe X tengelyen
      const centerX2 = canvas.width / 2 + 100; // Vászon közepe X tengelyen
      const centerY = canvas.height / 2; // Vászon közepe Y tengelyen
      const radius = Math.min(centerX, centerY) * 0.5; // Félkör sugara
      const radius2 = Math.min(centerX2, centerY) * 0.5; // Félkör sugara

      const baseRadius = Math.min(centerX, centerY) * 0.5; // Alap sugár
    
      const startAngle = Math.PI; // Kezdő szög: 0 radián
      const endAngle = 0; // Végszög: Pi radián (félkör)
    
      const frequencyIndex = Math.floor(Math.random() * frequencyData.length); // Frekvencia index
      const amplitude = frequencyData[frequencyIndex]; // Aktuális amplitúdó

      // korok meretenek a novelese
      if (amplitude > 50) {
        const dynamicRadius = Math.max(baseRadius, Math.min(centerX, centerY) * (amplitude / 255));
        const colorIndex = Math.floor((amplitude / 255) * (colors.length - 1)); // Szín kiválasztása
        
        circlesL.push({
          x: centerX, // Véletlenszerű eltolás X tengelyen
          y: centerY, // Véletlenszerű eltolás Y tengelyen
          radius: dynamicRadius,
          color: colors[colorIndex],
          life: 1 // Élettartam (1 = teljesen látható)
        });
        circlesR.push({
          x: centerX2, // Véletlenszerű eltolás X tengelyen
          y: centerY, // Véletlenszerű eltolás Y tengelyen
          radius: dynamicRadius,
          color: colors[colorIndex],
          life: 1 // Élettartam (1 = teljesen látható)
        });
      }

      const colorIndex = Math.floor(
        (frequencyData[frequencyIndex] / 255) * (colors.length - 1)
      );

      // Derékszögű háromszög rajzolása
      const triangleSize = 35 * (amplitude / 255); // Növeljük a háromszög méretét az amplitúdóval
      if (amplitude > 130) {
        triangles.push({
          x1: centerX2 + 102 + triangleSize,
          y1: centerY - 2,
          x2: centerX - 102 - triangleSize,
          y2: centerY - 2,
          x3: centerX2 - radius2,
          y3: centerY + 200 + triangleSize,
          size: triangleSize,
          color: colors[colorIndex],
          life: 1 // Élettartam
        });
      }


      // Haromszog kirajzolasa
      ctx.beginPath();
      ctx.moveTo(centerX2 + 102, centerY - 2); // Kiindulópont (derékszög csúcsa)
      ctx.lineTo(centerX - 102, centerY - 2); // Alap vége
      ctx.lineTo(centerX2 - radius2, centerY + 200); // Magasság vége (növekvő méret)
      ctx.closePath(); // Háromszög bezárása
      ctx.fillStyle = colors[colorIndex]; // Háromszög színe
      ctx.fill();
      ctx.stroke();

      // Félkör rajzolása
      //#region 
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle, false); // Félkör ív
      ctx.arc(centerX2, centerY, radius2, startAngle, endAngle, false); // Félkör ív
      ctx.fillStyle = colors[colorIndex]; // Szín a frekvenciához
      ctx.fill(); // Félkör kitöltése
      ctx.stroke(); // Körvonal megrajzolása
      //#endregion


      triangles.forEach((triangle, index) => {
        ctx.beginPath();
        ctx.moveTo(triangle.x1, triangle.y1);
        ctx.lineTo(triangle.x2, triangle.y2);
        ctx.lineTo(triangle.x3, triangle.y3);
        ctx.closePath();
    
        ctx.fillStyle = `rgba(${hexToRgb(triangle.color)}, ${triangle.life})`; // Háromszög színe és átlátszósága
        ctx.fill();
        ctx.stroke();
    
        // Háromszög "öregedése"
        triangle.life -= 0.02; // Élettartam csökkentése
    
        // Ha a háromszög láthatatlan, eltávolítjuk
        if (triangle.life <= 0) {
          triangles.splice(index, 1);
        }
      });

      circlesL.forEach((circle, index) => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, Math.PI, 0, false); // Félkör ív
        ctx.fillStyle = `rgba(${hexToRgb(circle.color)}, ${circle.life})`; // Átlátszóság az életidőtől függ
        ctx.fill();
        ctx.stroke();
    
        // Félkörök "öregedése"
        circle.radius += 2; // Növeljük a sugár méretét
        circle.life -= 0.02; // Csökkentjük az élettartamot
        
        // Ha a kör láthatatlan, eltávolítjuk
        if (circle.life <= 0) {
          circles.splice(index, 1);
        }
      });

      circlesR.forEach((circle, index) => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, Math.PI, 0, false); // Félkör ív
        ctx.fillStyle = `rgba(${hexToRgb(circle.color)}, ${circle.life})`; // Átlátszóság az életidőtől függ
        ctx.fill();
        ctx.stroke();
    
        // Félkörök "öregedése"
        circle.radius += 2; // Növeljük a sugár méretét
        circle.life -= 0.02; // Csökkentjük az élettartamot
        
        // Ha a kör láthatatlan, eltávolítjuk
        if (circle.life <= 0) {
          circles.splice(index, 1);
        }
      });
    
      requestAnimationFrame(renderHalfCircle); // Ismétlés a következő frame-ben
    };

    // Segédfüggvény: Hexadecimális színből RGB
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r}, ${g}, ${b}`;
    };

    renderHalfCircle();

    return () => {
      audio.pause();
      audioContext.close();
    };
  }, [audioSrc, colors]);

  return <canvas ref={canvasRef} width="800" height="400" />;
};

export default Visualizer;
