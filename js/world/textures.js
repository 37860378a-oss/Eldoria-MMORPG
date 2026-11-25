/* Eldoria - texturas procedurales pintadas a mano.
   Canvas 128x128 tileable: mantiene bajo el consumo de memoria en PC modestos y Android. */
(function(){
  const SIZE=128;
  function rgbOf(hex){
    let h=String(hex||'#777777').replace('#','').trim();
    if(h.length===3)h=h.split('').map(c=>c+c).join('');
    const n=parseInt(h,16);
    return Number.isFinite(n)?[(n>>16)&255,(n>>8)&255,n&255]:[119,119,119];
  }
  function paintBase(ctx,base,variation,rand){
    const R=rand||Math.random, rgb=rgbOf(base);
    const power=Math.max(.35,Math.min(1.4,Number(variation)||.5));
    const light='rgba('+rgb.map(c=>Math.min(255,c+Math.round((255-c)*.42))).join(',')+',';
    const shade='rgba('+rgb.map(c=>Math.max(0,Math.round(c*.48))).join(',')+',';
    ctx.fillStyle=base;ctx.fillRect(0,0,SIZE,SIZE);
    const wrap=(x,y,draw)=>{
      for(const ox of [-SIZE,0,SIZE])for(const oy of [-SIZE,0,SIZE])draw(x+ox,y+oy);
    };
    // Nubes de pigmento: variación amplia, sin bordes visibles al repetir la textura.
    for(let i=0;i<34;i++){
      const x=R()*SIZE,y=R()*SIZE,rx=5+R()*17,ry=4+R()*13,angle=(R()-.5)*.8,a=(.025+R()*.055)*power;
      ctx.fillStyle=(R()<.54?light:shade)+a+')';
      wrap(x,y,(px,py)=>{
        ctx.beginPath();ctx.ellipse(px,py,rx,ry,angle,0,Math.PI*2);ctx.fill();
      });
    }
    // Pinceladas medianas con extremos redondeados y dirección irregular.
    ctx.lineCap='round';
    for(let i=0;i<210;i++){
      const x=R()*SIZE,y=R()*SIZE,len=3+R()*13,ang=(R()-.5)*1.7;
      const a=(.045+R()*.085)*power;
      ctx.strokeStyle=(R()<.56?light:shade)+a+')';
      ctx.lineWidth=.7+R()*2.1;
      wrap(x,y,(px,py)=>{
        ctx.beginPath();ctx.moveTo(px,py);
        ctx.quadraticCurveTo(px+Math.cos(ang)*len*.55+1,py+Math.sin(ang)*len*.55-1,px+Math.cos(ang)*len,py+Math.sin(ang)*len);
        ctx.stroke();
      });
    }
    // Pequeños toques de pigmento que dan lectura artesanal sin ruido excesivo.
    for(let i=0;i<260;i++){
      const x=R()*SIZE,y=R()*SIZE,w=.8+R()*2.4,h=.6+R()*1.8,a=(.035+R()*.075)*power;
      ctx.fillStyle=(R()<.5?light:shade)+a+')';
      wrap(x,y,(px,py)=>ctx.fillRect(px,py,w,h));
    }
    // Grano fino y discreto para romper superficies demasiado lisas.
    for(let i=0;i<420;i++){
      const x=R()*SIZE,y=R()*SIZE,a=R()*.075*power;
      ctx.fillStyle=(R()<.5?'rgba(255,255,255,':'rgba(0,0,0,')+a+')';
      ctx.fillRect(x,y,.5+R()*1.1,.5+R()*1.1);
    }
  }
  window.EldoriaTextures={paintBase:paintBase,size:SIZE,style:'painterly-tileable-v2'};
})();