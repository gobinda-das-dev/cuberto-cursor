const $ = (e, p = document) => p.querySelector(e);

const cursor = $('#gb-cursor');
const cursorText = $('#gb-cursor-text');
console.log(cursorText);

const mouse = {x: 0, y: 0}
const smoothMouse = {x: 0, y: 0}
const mouseVelocity = {x: 0, y: 0}
const lerp = (x, y, a) => x * (1 - a) + y * a;

window.addEventListener('mousemove', (e) => {
   mouse.x = e.clientX;
   mouse.y = e.clientY;
})

const setter = {
   x: gsap.quickSetter(cursor, 'x', 'px'),
   y: gsap.quickSetter(cursor, 'y', 'px'),
   scaleY: gsap.quickSetter(cursor, 'scaleY'),
   scaleX: gsap.quickSetter(cursor, 'scaleX'),
   rotation: gsap.quickSetter(cursor, 'rotation', 'deg'),
   wc: gsap.quickSetter(cursor, 'willChange'),
   textRotation: gsap.quickSetter(cursorText, 'rotation', 'deg'),
}

gsap.ticker.add(() => {
   smoothMouse.x = lerp(smoothMouse.x, mouse.x, 0.15);
   smoothMouse.y = lerp(smoothMouse.y, mouse.y, 0.15);
   
   mouseVelocity.x = Math.abs(mouse.x - smoothMouse.x);
   mouseVelocity.y = Math.abs(mouse.y - smoothMouse.y);
   
   const angle = Math.atan2(mouse.y - smoothMouse.y, mouse.x - smoothMouse.x) * (180 / Math.PI);
   const scaleAmount = Math.min((mouseVelocity.x + mouseVelocity.y) * 0.0035, 0.5);
   
   setter.x(smoothMouse.x);
   setter.y(smoothMouse.y);
   setter.scaleY(1 - scaleAmount);
   setter.scaleX(1 + scaleAmount);
   setter.rotation(angle);
   setter.wc('transform');
   setter.textRotation(-angle);
})