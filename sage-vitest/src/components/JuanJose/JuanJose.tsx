import { useCallback, useEffect, useMemo, useState, useRef} from 'react';
import "../styles/JuanJose.css";
import { SwingPoint } from '../interfaces/SwingPoint';

interface Props {
  startPoints: number;
}

const JuanJose: React.FC<Props> = ({startPoints}) => {
  let points = startPoints;
  let aumentoDeLados = 1;
  const [el,setEl] = useState<HTMLCanvasElement | null>(null);
  const [ctx,setCtx]  = useState<CanvasRenderingContext2D | null>(null);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const circles: SwingPoint[][] = [];
  const pi: number = Math.PI;
  const dpr: number = window.devicePixelRatio || 1;
  const radius: number = 200 * dpr;
  const h: number = 600 * dpr;
  const w: number = 600 * dpr;
  const center = useMemo(() => {return {x: w / 2 * dpr,y: h / 2 * dpr};}, [w, h, dpr]);
  const rangeMin: number = 4;
  const rangeMax: number = 15;
    
  const gradients = useRef<CanvasGradient[]>([]);
  function random(num1: number, num2: number): number {
      const max: number = Math.max(num1, num2);
      const min: number = Math.min(num1, num2);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function cambioDeLados(){
    if (points === 3) {
      aumentoDeLados = 1;
    } else if (points === 5) {
      aumentoDeLados = -1;
    }
    points += aumentoDeLados;
    updateNumber(true);
  }
  const updateNumber = useCallback((reset:boolean) => {
    if(reset)
      circles.length = 0;
    const contador = document.getElementById('counter');
    if (contador){
        contador.textContent = points.toString();
      }
    for (let idx = 0; idx <= gradients.current.length - 1; idx++) {
      const swingpoints = [];
      let radian = 0;
      for (let i = 0; i < points; i++) {
        radian = pi * 2 / points * i;
        const ptX = center.x + radius * Math.cos(radian);
        const ptY = center.y + radius * Math.sin(radian);
        swingpoints.push({
          x: ptX,
          y: ptY,
          radian: radian,
          range: random(rangeMin, rangeMax),
          phase: 0
        });
      }
      circles.push(swingpoints);
    }
  }, [center.x, center.y, circles, pi, points, radius]);
   
  useEffect(() => {
    const el: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    setEl(el)
    const ctx: CanvasRenderingContext2D = el.getContext('2d')!;
    setCtx(ctx)

    //Variables
    const showPoints: boolean = false;
    let mouseY: number = 0;
    let tick: number = 12;
    ctx.scale(dpr, dpr);
    el.width = w * dpr;
    el.height = h * dpr;
    el.style.width = w + 'px';
    el.style.height = h + 'px';
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
    
    gradients.current = [gradient1, gradient3, gradient4, gradient5];
  
      updateNumber(false)
    //Funciones
    function getRandomInt(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function handleMove(event: MouseEvent): void {
      mouseY = event.clientY;
    }
    function swingCircle(): void {

      ctx.clearRect(0, 0, w * dpr, h * dpr);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'screen';
       for (let k = 0; k < circles.length; k++) {
        const swingpoints: SwingPoint[] = circles[k];
         for (let i = 0; i < swingpoints.length; i++) {
          swingpoints[i].phase += getRandomInt(1, 10) * -0.01;
           let phase: number = 4 * Math.sin(tick / 65);
           if (mouseY !== 0) {
            phase = mouseY / 200 + 1;
          } 
           const r: number = radius + swingpoints[i].range * phase * Math.sin(swingpoints[i].phase) - rangeMax;
           swingpoints[i].radian += pi / 360;
           const ptX: number = center.x + r * Math.cos(swingpoints[i].radian);
          const ptY: number = center.y + r * Math.sin(swingpoints[i].radian);
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
         const fill: CanvasGradient = gradients.current[k];
         drawCurve(swingpoints, fill);
      }
       tick++;
       requestAnimationFrame(swingCircle);
    }
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
    function cycle(num1: number, num2: number): number {
      return (num1 % num2 + num2) % num2;
    }
    
    //Code
    requestAnimationFrame(swingCircle);
    
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
    
    //Listener
    window.addEventListener('mousemove', handleMove, true);
    //Cleaner
    return () => {
    };
  }, [center, circles, ctx, dpr, el, gradients, h, pi, points, radius, updateNumber, w]);


  
  return (
    <>
      <div>
        <canvas id="canvas" data-testid="canvas" onClick={cambioDeLados}></canvas>
        <div className="copy">
          <h1 id="name">OwO</h1>
        </div>
        <div className='DivNumeroLados transparent_bg'>
          <h3 className='h3NumeoLados'>Número de Lados</h3>
          <p id='counter' data-testid='counter'>3</p>
        </div>
      </div>
    </>
  );
};
 export default JuanJose;