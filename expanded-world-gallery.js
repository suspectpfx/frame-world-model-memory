(()=>{
  const rows=[...document.querySelectorAll('.eg-row')];
  const groups=3;
  const status=document.querySelector('#eg-status');
  const progress=document.querySelector('#eg-progress');
  const replayAll=document.querySelector('#eg-replay');
  let group=0;

  function ready(video){
    if(video.readyState>=3)return Promise.resolve();
    video.load();
    return new Promise(resolve=>{
      let settled=false;
      const finish=()=>{if(settled)return;settled=true;clearTimeout(timer);resolve();};
      const timer=setTimeout(finish,12000);
      video.addEventListener('canplay',finish,{once:true});
      video.addEventListener('error',finish,{once:true});
    });
  }

  function align(row,startFollowers=false){
    const videos=[...row.querySelectorAll('video')];
    const master=videos[0];
    if(master.paused||master.ended)return;
    videos.slice(1).forEach(video=>{
      if(video.readyState<1)return;
      if(Math.abs(video.currentTime-master.currentTime)>.06)video.currentTime=master.currentTime;
      if(startFollowers&&video.paused&&!video.ended)video.play().catch(()=>{});
    });
  }

  async function playRow(row){
    const videos=[...row.querySelectorAll('video')];
    const button=row.querySelector('.wm-replay-row');
    const token=String(Date.now()+Math.random());
    row.dataset.playToken=token;
    button.setAttribute('aria-busy','true');
    await Promise.all(videos.map(ready));
    if(row.dataset.playToken!==token||row.hidden)return;
    videos.forEach(video=>{video.pause();video.currentTime=0;});
    await Promise.allSettled(videos.map(video=>video.play()));
    align(row,true);
    button.removeAttribute('aria-busy');
  }

  function syncRow(row){
    const videos=[...row.querySelectorAll('video')];
    row.querySelector('.wm-replay-row').addEventListener('click',()=>playRow(row));
    videos[0].addEventListener('timeupdate',()=>align(row,true));
    videos.slice(1).forEach(video=>video.addEventListener('canplay',()=>align(row,true)));
  }

  function show(next){
    group=(next+groups)%groups;
    rows.forEach(row=>{
      row.hidden=Number(row.dataset.group)!==group;
      row.dataset.playToken='cancelled';
      if(row.hidden)row.querySelectorAll('video').forEach(video=>video.pause());
      else row.querySelectorAll('video').forEach(video=>video.load());
    });
    status.textContent=`Group ${group+1} / ${groups} · scenes ${group*5+1}–${group*5+5} of 15`;
    progress.style.width=`${(group+1)/groups*100}%`;
    document.querySelector('#eg-prev').disabled=group===0;
    document.querySelector('#eg-next').disabled=group===groups-1;
  }

  rows.forEach(syncRow);
  setInterval(()=>rows.filter(row=>!row.hidden).forEach(row=>align(row,true)),80);
  document.querySelector('#eg-prev').addEventListener('click',()=>show(group-1));
  document.querySelector('#eg-next').addEventListener('click',()=>show(group+1));
  replayAll.addEventListener('click',async()=>{
    replayAll.setAttribute('aria-busy','true');
    await Promise.all(rows.filter(row=>!row.hidden).map(playRow));
    replayAll.removeAttribute('aria-busy');
  });
  show(0);
})();