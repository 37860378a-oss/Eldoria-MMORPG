/* Eldoria - texturas procedurales pintadas a mano.
   Canvas 128x128, tileable y liviano para WebGL móvil y escritorio. */
(function(){
  const SIZE=128;
  function paintBase(ctx,base,variation,rand){
    const R=rand||Math.random;
    ctx.fillStyle=base;ctx.fillRect(0,0,SIZE,SIZE);
    const wrap=(x,y,draw)=>{
      for(const ox of [-SIZE,0,SIZE])for(const oy of [-SIZE,0,SIZE])draw(x+ox,y+oy);
    };
    // Manchas amplias y suaves: rompen el aspecto de color plano sin cargar geometría.
    for(let i=0;i<52;i++){
      const x=R()*SIZE,y=R()*SIZE,rx=4+R()*15,ry=3+R()*11,angle=R()*Math.PI;
      const light=R()<.52,alpha=(.025+R()*.075)*Math.min(1,variation*2.8);
      ctx.fillStyle=light?'rgba(255,238,190,'+alpha+')':'rgba(24,32,18,'+alpha+')';
      wrap(x,y,(px,py)=>{
        ctx.beginPath();ctx.ellipse(px,py,rx,ry,angle,0,Math.PI*2);ctx.fill();
      });
    }
    // Trazos cortos tipo pincel, con variación cálida y verde.
    for(let i=0;i<190;i++){
      const x=R()*SIZE,y=R()*SIZE,len=2+R()*8,ang=(R()-.5)*1.1;
      const a=(.035+R()*.09)*Math.min(1,variation*3.2);
      ctx.strokeStyle=R()<.58?'rgba(225,218,155,'+a+')':'rgba(28,58,28,'+a+')';
      ctx.lineWidth=.5+R()*1.4;
      wrap(x,y,(px,py)=>{ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px+Math.cos(ang)*len,py+Math.sin(ang)*len);ctx.stroke()});
    }
    // Grano fino discreto para evitar superficies artificialmente lisas.
    for(let i=0;i<620;i++){
      const x=R()*SIZE,y=R()*SIZE;
      ctx.fillStyle=R()<.5?'rgba(255,255,255,'+(R()*.10*variation)+')':'rgba(0,0,0,'+(R()*.10*variation)+')';
      ctx.fillRect(x,y,.6+R()*1.3,.6+R()*1.3);
    }
  }
  window.EldoriaTextures={paintBase:paintBase,size:SIZE,style:'painterly-tileable-v1'};
})();