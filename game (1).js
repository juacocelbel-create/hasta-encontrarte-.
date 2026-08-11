const mensajesCofres=[
"Al conocerte fue mi salvación. Me salvaste de mi dolor, mi cabeza; me sanaste las heridas que tú no provocaste, pero aun así lo hiciste.",
"A pesar de las cosas que se decían de mí, me elegiste sobre todas esas cosas. Decidiste creer en mí como nadie lo hizo antes, menos de esa forma. Gracias.",
"Desde el momento que te vi sabía que eras para mí, aunque tenía miedo de dañarte con mis problemas, con mis palabras y acciones. Pero aun así me esfuerzo todos los días para cambiar lo malo de mí.",
"De verdad estoy enamorado. Estoy loco por ti. No me crees, pero noche tras noche pienso en ti, en cómo hacerte feliz, en cómo cuidarte, en qué puedo hacer para ser el hombre que mereces.",
"Me has visto llorar por las cosas más leves, por un beso, por un abrazo. Porque me miras, lloro porque te amo. Me siento seguro mostrándome indefenso junto a ti.",
"Ya no sé cómo decirte que te amo. Te lo he dicho de muchas maneras, de muchas formas, pero no es suficiente.",
"Eres fuerte, no sé cómo lo haces. Cada día te veo seguir adelante. No sé cómo, pero te admiro. De verdad te admiro. Yo he pensado en rendirme tantas veces. Antes de conocerte estaba tan decidido, pero tú me salvaste, me diste una razón para no rendirme.",
"He dicho muchas cosas de la forma en que te amo, cómo me siento, cómo me sentía y cómo te veo. Simplemente eres tú. No hay nadie más que tú.",
"Eres única, mi amorcito. Me has hecho ser un hombre distinto. Ni en un millón de años encontraría a alguien como tú. Sé que hemos avanzado muy rápido en nuestra relación, pero siento que debió ser así, porque si no hubiera sido así, el tiempo no sería igual.",
"De verdad quiero una vida contigo. Tener hijos. Te apoyaré siempre. Quiero que en algún momento vivamos juntos. Sé que es apresurado, pero quiero todo contigo."
];

const world=document.getElementById("world"),player=document.getElementById("player");
let level=1,x=100,y=80,vx=0,vy=0,onGround=false,running=false,emoji="👨",platforms=[],traps=[];

function startGame(g){
 emoji=g==="male"?"👨":"👩"; player.textContent=emoji;
 document.getElementById("menu").style.display="none"; document.getElementById("game").style.display="block";
 running=true; loadLevel(); requestAnimationFrame(loop);
}
function clearLevel(){world.querySelectorAll(".platform,.trap,.chest,.finish").forEach(e=>e.remove());platforms=[];traps=[]}
function platform(l,b,w){let e=document.createElement("div");e.className="platform";e.style.cssText=`left:${l}px;bottom:${b}px;width:${w}px`;world.appendChild(e);platforms.push({l,r:l+w,b})}
function trap(l,b){let e=document.createElement("div");e.className="trap";e.textContent="🔺";e.style.cssText=`left:${l}px;bottom:${b}px`;world.appendChild(e);traps.push({l,r:l+35,b})}
function loadLevel(){
 clearLevel();x=100;y=80;vx=vy=0;
 document.getElementById("levelText").textContent=`Nivel ${level} / 10`;
 platform(0,0,520); platform(650,110,170); platform(930,190,150); platform(1200,280,170);
 platform(1500,150,150); platform(1800,240,170); platform(2140,340,150); platform(2470,190,170);
 platform(2800,290,170); platform(3150,390,210); platform(3500,470,300);
 [520,840,1100,1380,1660,1970,2290,2640,2970].forEach((n,i)=>trap(n,[0,110,190,280,150,240,340,190,290][i]));
 let c=document.createElement("div");c.className="chest";c.textContent="📦";c.style.cssText="left:2200px;bottom:390px";c.onclick=openChest;world.appendChild(c);
 let f=document.createElement("div");f.className="finish";f.textContent=level===10?"❤️":"🚪";f.style.cssText="left:3550px;bottom:500px";world.appendChild(f);
}
function openChest(){running=false;document.getElementById("message").textContent=mensajesCofres[level-1];document.getElementById("messageBox").style.display="flex"}
function closeMessage(){document.getElementById("messageBox").style.display="none";running=true;if(level<10){level++;loadLevel()}else{showFinal()}}
function showFinal(){running=false;document.getElementById("finalContent").innerHTML=`<div class="finalHeart">❤️</div><h2>Lo encontraste...</h2><p>Después de superar los 10 niveles, finalmente llegaste hasta esa persona.</p><button onclick="giveKey()">🔑 Recibir la llave</button>`;document.getElementById("finalBox").style.display="flex"}
function giveKey(){document.getElementById("finalContent").innerHTML=`<div style="font-size:75px">🔑</div><h2>Una llave...</h2><p>La otra persona te entrega una pequeña llave.</p><button onclick="openHeartChest()">🔐 Abrir el cofre</button>`}
function openHeartChest(){document.getElementById("finalContent").innerHTML=`<div style="font-size:80px">💗</div><h2>El cofre del corazón</h2><p>La llave encaja perfectamente...<br><br>Dentro hay un anillo.</p><div style="font-size:80px">💍</div><p><strong>“No es real... pero en un momento lo será.”</strong></p><button onclick="finishGame()">❤️</button>`}
function finishGame(){document.getElementById("finalContent").innerHTML=`<div class="finalHeart">❤️</div><h2>FIN</h2><p>Dos mitades.<br>Un solo corazón.<br><br>Y una historia que recién comienza...</p><button onclick="location.reload()">Volver a jugar</button>`}

const keys={};
addEventListener("keydown",e=>{keys[e.key]=true;if((e.key==="ArrowUp"||e.key===" ")&&onGround)vy=15});
addEventListener("keyup",e=>keys[e.key]=false);

function holdButton(id,dir){
 const b=document.getElementById(id);
 const down=e=>{e.preventDefault();keys[dir]=true};
 const up=e=>{e.preventDefault();keys[dir]=false};
 ["pointerdown","touchstart"].forEach(ev=>b.addEventListener(ev,down,{passive:false}));
 ["pointerup","pointercancel","pointerleave","touchend"].forEach(ev=>b.addEventListener(ev,up,{passive:false}));
}
holdButton("left","left");holdButton("right","right");
document.getElementById("jump").addEventListener("pointerdown",e=>{e.preventDefault();if(onGround)vy=15});

function reset(){x=100;y=80;vx=vy=0}
function update(){
 if(!running)return;
 vx=(keys.right?6:0)-(keys.left?6:0); x+=vx; vy-=.8;y+=vy;onGround=false;
 for(const p of platforms)if(x+40>p.l&&x<p.r&&y<=p.b+30&&y>=p.b-5&&vy<=0){y=p.b+25;vy=0;onGround=true}
 for(const t of traps)if(x+35>t.l&&x<t.r&&y<t.b+50&&y>t.b-20)reset();
 if(y<-120)reset();
 if(x>3550){if(level===10)showFinal();else{level++;loadLevel()}}
 player.style.left=x+"px";player.style.bottom=y+"px";
 world.style.transform=`translateX(${-Math.max(0,x-innerWidth/2)}px)`;
}
function loop(){update();requestAnimationFrame(loop)}
/* MODO MOVIL FACIL */
document.addEventListener("touchstart",e=>{if(e.target.closest("canvas,button,#game,#controls,.controls"))e.preventDefault()},{passive:false});
