import React, { useEffect } from 'react';
import '../components/styles/JuanJose.css'

const JuanJose = () => {

  useEffect(() => {
    
    const el: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = el.getContext('2d')!;
    const dpr: number = window.devicePixelRatio || 1;
    const pi: number = Math.PI;
    
    function getRandomInt(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const points: number = 5;
    const radius: number = 200 * dpr;
    const h: number = 600 * dpr;
    const w: number = 600 * dpr;
    const center = {
      x: w / 2 * dpr,
      y: h / 2 * dpr
    };
    
    interface SwingPoint {
      x: number;
      y: number;
      radian: number;
      range: number;
      phase: number;
    }
    
    const circles: SwingPoint[][] = [];
    const rangeMin: number = 4;
    const rangeMax: number = 15;
    const showPoints: boolean = false;
    
    let mouseY: number = 0;
    let tick: number = 12;
    
    const gradient1: CanvasGradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient1.addColorStop(0, '#850073');
    gradient1.addColorStop(1, '#f10091');
    
    const gradient3: CanvasGradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient3.addColorStop(0, '#9795f0');
    gradient3.addColorStop(1, '#9be15d');
    
    const gradient4: CanvasGradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient4.addColorStop(0, '#ff7a00');
    gradient4.addColorStop(1, '#f2d163');
    
    const gradient5: CanvasGradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient5.addColorStop(0, '#8d734a');
    gradient5.addColorStop(1, '#f2d163');
    
    const gradients: CanvasGradient[] = [gradient1, gradient3, gradient4, gradient5];
    
    window.addEventListener('mousemove', handleMove, true);
    
    function handleMove(event: MouseEvent): void {
      mouseY = event.clientY;
    }
    
    ctx.scale(dpr, dpr);
    
    el.width = w * dpr;
    el.height = h * dpr;
    el.style.width = w + 'px';
    el.style.height = h + 'px';
    
    // Setup swing circle points
    
    for (let idx = 0; idx <= gradients.length - 1; idx++) {
      let swingpoints: SwingPoint[] = [];
      let radian: number = 0;
    
      for (let i = 0; i < points; i++) {
        radian = pi * 2 / points * i;
        let ptX: number = center.x + radius * Math.cos(radian);
        let ptY: number = center.y + radius * Math.sin(radian);
    
        swingpoints.push({
          x: ptX,
          y: ptY,
          radian: radian,
          range: getRandomInt(rangeMin, rangeMax),
          phase: 0
        });
      }
    
      circles.push(swingpoints);
    }
    
    // --------------------------------------------------------------------------- //
    // swingCircle
    
    function swingCircle(): void {
      ctx.clearRect(0, 0, w * dpr, h * dpr);
    
      ctx.globalAlpha = 1;
      // ctx.globalCompositeOperation = 'source-over';
      ctx.globalCompositeOperation = 'screen';
    
      for (let k = 0; k < circles.length; k++) {
        let swingpoints: SwingPoint[] = circles[k];
    
        for (let i = 0; i < swingpoints.length; i++) {
          swingpoints[i].phase += getRandomInt(1, 10) * -0.01;
    
          let phase: number = 4 * Math.sin(tick / 65);
    
          if (mouseY !== 0) {
            phase = mouseY / 200 + 1;
          }
    
          let r: number = radius + swingpoints[i].range * phase * Math.sin(swingpoints[i].phase) - rangeMax;
    
          swingpoints[i].radian += pi / 360;
    
          let ptX: number = center.x + r * Math.cos(swingpoints[i].radian);
          let ptY: number = center.y + r * Math.sin(swingpoints[i].radian);
    
          if (showPoints === true) {
            ctx.strokeStyle = '#96fbc4';
    
            ctx.beginPath();
            ctx.arc(ptX, ptY, 2 * dpr, 0, pi * 2, true);
            ctx.closePath();
            ctx.stroke();
          }
    
          swingpoints[i] = {
            x: ptX,
            y: ptY,
            radian: swingpoints[i].radian,
            range: swingpoints[i].range,
            phase: swingpoints[i].phase
          };
        }
    
        const fill: CanvasGradient = gradients[k];
    
        drawCurve(swingpoints, fill);
      }
    
      tick++;
    
      requestAnimationFrame(swingCircle);
    }
    
    requestAnimationFrame(swingCircle);
    
    // --------------------------------------------------------------------------- //
    // drawCurve
    
    function drawCurve(pts: SwingPoint[], fillStyle: CanvasGradient): void {
      ctx.fillStyle = fillStyle;
      ctx.beginPath();
      ctx.moveTo(
        (pts[cycle(-1, points)].x + pts[0].x) / 2,
        (pts[cycle(-1, points)].y + pts[0].y) / 2
      );
      for (let i = 0; i < pts.length; i++) {
        ctx.quadraticCurveTo(
          pts[i].x,
          pts[i].y,
          (pts[i].x + pts[cycle(i + 1, points)].x) / 2,
          (pts[i].y + pts[cycle(i + 1, points)].y) / 2
        );
      }
    
      ctx.closePath();
      ctx.fill();
    }
    
    // --------------------------------------------------------------------------- //
    // cycle
    function cycle(num1: number, num2: number): number {
      return (num1 % num2 + num2) % num2;
    }
    
    // --------------------------------------------------------------------------- //
    // random
    function random(num1: number, num2: number): number {
      const max: number = Math.max(num1, num2);
      const min: number = Math.min(num1, num2);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    (() => {
      const myArray: string[] = ['OwO', 'OwO', 'OwO', 'OwO', '—w—', "OwO", 'OwO'];
      let cont: number = 0;
    
      function changeFace(): void {
        setTimeout(() => {
          const nameElement = document.getElementById("name");
          if (nameElement) {
            nameElement.innerText = myArray[cont];
          }
          cont = (cont + 1) % myArray.length;
          changeFace();
        }, random(100, 350));
      }
    
      changeFace();
    })();    


  }, []);

  return (
    <div>
        <canvas id="canvas"></canvas>
            <div className="copy" >
                <h1 id="name">OwO</h1>
            </div>
    </div>
  )
}

export default JuanJose