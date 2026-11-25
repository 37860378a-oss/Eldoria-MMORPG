/* Eldoria - texturas procedurales pintadas a mano.
   Canvas 128x128 tileable: perfiles visuales por material, bajo coste para PC y Android. */
(function(){
  const SIZE=128;
  function rgbOf(hex){
    let h=String(hex||'#777777').replace('#','').trim();
    if(h.length===3)h=h.split('').map(c=>c+c).join('');
    const n=parseInt(h,16);
    return Number.isFinite(n)?[(n>>16)&255,(n>>8)&255,n&255]:[119,119,119];
  }
  function rgba(rgb,a){return 'rgba('+rgb.map(c=>Math.max(0,Math.min(255,Math.round(c))).toString()).join(',')+','+a+')'}
  function paintBase(ctx,base,variation,rand,repeat){
    const R=rand||Math.random, rgb=rgbOf(base);
    const power=Math.max(.82,Math.min(1.35,.72+(Number(variation)||.5)*.72));
    const max=Math.max.apply(null,rgb),min=Math.min.apply(null,rgb);
    const green=rgb[1]>rgb[0]*1.12&&rgb[1]>rgb[2]*1.04;
    const brown=rgb[0]>rgb[1]*1.12&&rgb[1]>rgb[2]*1.08;
    const stone=max-min<34;
    const blue=rgb[2]>rgb[0]*1.12&&rgb[2]>rgb[1]*1.04;
    const verticalGrain=!!(repeat&&repeat[1]>repeat[0]*1.35);
    const profile=green?'foliage':brown?(verticalGrain?'wood':'earth'):stone?'stone':blue?'cold':'paint';
    const light=rgb.map(c=>Math.min(255,c+(255-c)*.42));
    const shade=rgb.map(c=>Math.max(0,c*.48));
    const accent=green?[Math.min(255,rgb[0]+28),Math.min(255,rgb[1]+38),Math.min(255,rgb[2]+12)]:
      brown?[Math.min(255,rgb[0]+34),Math.min(255,rgb[1]+23),Math.min(255,rgb[2]+10)]:
      stone?[Math.min(255,rgb[0]+24),Math.min(255,rgb[1]+24),Math.min(255,rgb[2]+24)]:
      blue?[Math.min(255,rgb[0]+18),Math.min(255,rgb[1]+24),Math.min(255,rgb[2]+36)]:light;
    ctx.fillStyle=base;ctx.fillRect(0,0,SIZE,SIZE);
    const wrap=(x,y,draw)=>{
      for(const ox of [-SIZE,0,SIZE])for(const oy of [-SIZE,0,SIZE])draw(x+ox,y+oy);
    };
    // Manchas de pigmento: más amplias en piedra y tierra, pequeñas en hojas.
    const blotches=profile==='stone'?34:profile==='foliage'?30:38;
    for(let i=0;i<blotches;i++){
      const x=R()*SIZE,y=R()*SIZE;
      const rx=(profile==='stone'?9:7)+R()*(profile==='stone'?24:20);
      const ry=(profile==='stone'?8:5)+R()*(profile==='stone'?20:15);
      const angle=(R()-.5)*.8,a=(.075+R()*.105)*power;
      ctx.fillStyle=rgba(R()<.58?accent:shade,a);
      wrap(x,y,(px,py)=>{ctx.beginPath();ctx.ellipse(px,py,rx,ry,angle,0,Math.PI*2);ctx.fill()});
    }
    // Dirección de pincel: vetas verticales en madera, horizontales en suelo,
    // trazos cortos dispersos en hojas y manchas irregulares en piedra.
    ctx.lineCap='round';
    for(let i=0;i<210;i++){
      const x=R()*SIZE,y=R()*SIZE;
      let ang=(R()-.5)*1.7,len=5+R()*19;
      if(profile==='wood'){ang=Math.PI/2+(R()-.5)*.30;len=8+R()*25}
      else if(profile==='earth'){ang=(R()-.5)*.22;len=9+R()*24}
      else if(profile==='foliage'){ang=(R()-.5)*2.6;len=4+R()*12}
      else if(profile==='stone'){ang=R()*Math.PI;len=5+R()*15}
      const a=(.09+R()*.13)*power;
      ctx.strokeStyle=rgba(R()<.56?accent:shade,a);
      ctx.lineWidth=profile==='stone'?1.2+R()*3.2:profile==='foliage'?1+R()*2.2:1.2+R()*3.1;
      wrap(x,y,(px,py)=>{
        ctx.beginPath();ctx.moveTo(px,py);
        ctx.quadraticCurveTo(px+Math.cos(ang)*len*.55+1,py+Math.sin(ang)*len*.55-1,px+Math.cos(ang)*len,py+Math.sin(ang)*len);
        ctx.stroke();
      });
    }
    // Puntos y pequeñas pinceladas, con densidad según material.
    const flecks=profile==='foliage'?145:profile==='stone'?210:175;
    for(let i=0;i<flecks;i++){
      const x=R()*SIZE,y=R()*SIZE,w=.8+R()*(profile==='stone'?3:2.4),h=.6+R()*(profile==='foliage'?1.4:2.2);
      const a=(.07+R()*.12)*power;
      ctx.fillStyle=rgba(R()<.5?accent:shade,a);
      wrap(x,y,(px,py)=>ctx.fillRect(px,py,w,h));
    }
    // Grano fino de baja opacidad.
    for(let i=0;i<240;i++){
      const x=R()*SIZE,y=R()*SIZE,a=R()*.045*power;
      ctx.fillStyle=(R()<.5?'rgba(255,255,255,':'rgba(0,0,0,')+a+')';
      ctx.fillRect(x,y,.5+R()*1.1,.5+R()*1.1);
    }
  }
  window.EldoriaTextures={paintBase:paintBase,size:SIZE,style:'painterly-material-profiles-v4-visible'};
})();