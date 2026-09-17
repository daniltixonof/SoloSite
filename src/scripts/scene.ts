import type { Mesh, QuadraticBezierCurve3 } from 'three';
export async function initScene(host:HTMLElement){
 try {
 const T=await import('three');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const low=window.matchMedia('(max-width: 700px)').matches;
 const renderer=new T.WebGLRenderer({alpha:true,antialias:!low,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,low?1.25:1.75));
 renderer.setClearColor(0,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.5;
 host.querySelector('.scene-canvas')!.appendChild(renderer.domElement);
 const scene=new T.Scene();const camera=new T.PerspectiveCamera(35,1,.1,100);camera.position.set(0,.2,12.5);
 scene.add(new T.AmbientLight(0xffffff,1.4));
 const key=new T.DirectionalLight(0xffeaa3,5);key.position.set(4,5,7);scene.add(key);
 const rim=new T.DirectionalLight(0xffffff,3);rim.position.set(-4,1,2);scene.add(rim);
 const warm=new T.PointLight(0xffc12d,40,14);warm.position.set(1,-2,3);scene.add(warm);
 const system=new T.Group();scene.add(system);system.rotation.set(.3,-.22,-.3);
 const mat=new T.MeshStandardMaterial({color:0xf2c742,metalness:.65,roughness:.25});
 // A continuous loop is the central process; connected nodes represent external services.
 const core=new T.Group();system.add(core);
 const ring=new T.Mesh(new T.TorusGeometry(1.5,.46,low?20:32,low?64:100),mat);core.add(ring);
 const inner=new T.Mesh(new T.TorusGeometry(1.03,.025,8,90),new T.MeshBasicMaterial({color:0xfff0bc}));inner.position.z=.14;core.add(inner);
 for(let i=0;i<28;i++){const a=i/28*Math.PI*2;const notch=new T.Mesh(new T.BoxGeometry(.025,.18,.035),new T.MeshStandardMaterial({color:0x322b18,metalness:.8,roughness:.3}));notch.position.set(Math.cos(a)*1.53,Math.sin(a)*1.53,.45);notch.rotation.z=a-Math.PI/2;core.add(notch);}
 const central=new T.Mesh(new T.OctahedronGeometry(.43,0),new T.MeshStandardMaterial({color:0xffdc60,metalness:.35,roughness:.22}));system.add(central);
 const nodePositions=[new T.Vector3(-2.7,1.4,.1),new T.Vector3(2.5,1.8,-.2),new T.Vector3(2.25,-1.9,.5)];
 const lineMat=new T.LineBasicMaterial({color:0x978657,transparent:true,opacity:.6});
 const beads:Mesh[]=[];const curves:QuadraticBezierCurve3[]=[];
 nodePositions.forEach((p)=>{const n=new T.Mesh(new T.IcosahedronGeometry(.4,1),new T.MeshStandardMaterial({color:0x343938,metalness:.78,roughness:.22}));n.position.copy(p);system.add(n);const edges=new T.LineSegments(new T.EdgesGeometry(n.geometry),new T.LineBasicMaterial({color:0xd4c177,transparent:true,opacity:.45}));n.add(edges);const end=p.clone().normalize().multiplyScalar(1.55);const mid=p.clone().add(end).multiplyScalar(.5);mid.z+=.6;const curve=new T.QuadraticBezierCurve3(p,mid,end);curves.push(curve);system.add(new T.Line(new T.BufferGeometry().setFromPoints(curve.getPoints(40)),lineMat));const bead=new T.Mesh(new T.SphereGeometry(.065,12,12),new T.MeshBasicMaterial({color:0xffe6a0}));bead.position.copy(curve.getPoint(.5));beads.push(bead);system.add(bead);});
 const orbit=new T.LineLoop(new T.BufferGeometry().setFromPoints(Array.from({length:120},(_,i)=>{const a=i/120*2*Math.PI;return new T.Vector3(3.2*Math.cos(a),2.45*Math.sin(a),-.6);})),new T.LineBasicMaterial({color:0x555645,transparent:true,opacity:.38}));system.add(orbit);
 const resize=()=>{const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.render(scene,camera);};new ResizeObserver(resize).observe(host);resize();host.classList.add('scene-ready');
 let visible=true,paused=reduced.matches,raf=0,last=0;const pointer={x:0,y:0};
 host.addEventListener('pointermove',e=>{const r=host.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width-.5)*.12;pointer.y=((e.clientY-r.top)/r.height-.5)*.12;});host.addEventListener('pointerleave',()=>{pointer.x=pointer.y=0;});
 const render=(t:number)=>{raf=requestAnimationFrame(render);if(paused||!visible||document.hidden||t-last<33)return;last=t;system.rotation.y=-.22+Math.sin(t*.00017)*.13+pointer.x;system.rotation.x=.3+pointer.y;core.rotation.z=Math.sin(t*.00012)*.1;central.rotation.y=t*.00025;beads.forEach((b,i)=>b.position.copy(curves[i].getPoint((t*.00018+i*.32)%1)));renderer.render(scene,camera);};raf=requestAnimationFrame(render);
 const btn=host.querySelector<HTMLButtonElement>('.scene-pause')!;btn.hidden=false;const sync=()=>{btn.setAttribute('aria-pressed',String(paused));btn.setAttribute('aria-label',paused?'Включить 3D-анимацию':'Приостановить 3D-анимацию');btn.textContent=paused?'▷':'Ⅱ';};sync();btn.addEventListener('click',()=>{paused=!paused;sync();});reduced.addEventListener('change',e=>{paused=e.matches;sync();});new IntersectionObserver(([e])=>{visible=e.isIntersecting;}).observe(host);
 window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);renderer.dispose();},{once:true});
 }catch{host.classList.remove('scene-ready');}
}
