const branches=[{name:'Hillside',phone:'0789563705'},{name:'Borrowdale',phone:'0778839183'},{name:'Strathaven',phone:'0780709088'},{name:'Newlands Shopping',phone:'0776362124'},{name:'CBD · Orange Mall',phone:'0777370540'}];
const international=p=>'263'+p.slice(1);
const branchSelect=document.querySelector('#branch');
branches.forEach((b,i)=>{branchSelect.add(new Option(b.name,String(i),i===1,i===1));const card=document.createElement('article');card.className='branch';card.innerHTML=`<p class="eyebrow">HARARE / 0${i+1}</p><h3>${b.name}</h3><a class="phone" href="tel:+${international(b.phone)}">${b.phone.slice(0,3)} ${b.phone.slice(3,6)} ${b.phone.slice(6)}</a><div class="branch-links"><a href="https://wa.me/${international(b.phone)}" target="_blank" rel="noopener">WhatsApp ↗</a><a href="#book" data-branch="${i}">Book here ↗</a></div>`;document.querySelector('#branches').append(card)});
function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Harare',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
const dateInput=document.querySelector('#date');dateInput.min=today();document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#service').value=button.dataset.service;document.querySelector('#book').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}));
document.querySelectorAll('[data-branch]').forEach(a=>a.addEventListener('click',()=>{branchSelect.value=a.dataset.branch}));
document.querySelector('#booking-form').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;dateInput.setCustomValidity('');const data=new FormData(form);const b=branches[Number(data.get('branch'))];const date=data.get('date'),time=data.get('time');const currentDate=today();const nowTime=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Harare',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());if(date<currentDate||(date===currentDate&&time<=nowTime)){dateInput.setCustomValidity('Please choose a future appointment date and time.');dateInput.reportValidity();return;}if(!form.reportValidity()||!b)return;const message=`Hello Vintage Classic! I'd like to request an appointment.\n\nName: ${data.get('name').trim()}\nPhone: ${data.get('phone').trim()}\nBranch: ${b.name}\nService: ${data.get('service')}\nPreferred date: ${date}\nPreferred time: ${time} (Harare time)${data.get('notes').trim()?'\nNotes: '+data.get('notes').trim():''}\n\nPlease confirm availability and price. Thank you!`;const url=`https://wa.me/${international(b.phone)}?text=${encodeURIComponent(message)}`;window.open(url,'_blank','noopener');const status=document.querySelector('#booking-status');status.textContent='Send the prepared message in WhatsApp. Waiting for your branch to confirm your appointment. ';const fallback=document.createElement('a');fallback.href=url;fallback.target='_blank';fallback.rel='noopener';fallback.textContent='Open WhatsApp again ↗';status.append(fallback)});
dateInput.addEventListener('input',()=>dateInput.setCustomValidity(''));
// Source rectangles exclude the phone UI, social controls and story stickers.
// Render the original photograph through a responsive viewport without resampling it.
const portraitCrops={
 'photo-1.jpg':[8,350,220,340],
 'photo-2.jpg':[8,365,483,430],
 'photo-3.jpg':[8,360,483,560],
 'photo-4.jpg':[20,75,450,560],
 'photo-5.jpg':[8,260,483,305],
 'photo-6.jpg':[8,195,483,510],
 'photo-8.jpg':[8,205,483,460],
 'photo-9.jpg':[175,264,215,320],
 'photo-10.jpg':[8,185,483,520]
};
document.querySelectorAll('.extras img').forEach(img=>{
 if(img.getAttribute('src').endsWith('photo-7.jpg')){img.remove();return;}
 const viewport=document.createElement('div');viewport.className='photo';img.replaceWith(viewport);viewport.append(img);
});
document.querySelectorAll('.photo img').forEach(img=>{
 const rect=portraitCrops[img.getAttribute('src').split('/').pop()];if(!rect)return;
 const viewport=img.parentElement;
 function frame(){if(!img.naturalWidth||!viewport.clientWidth||!viewport.clientHeight)return;const [x,y,w,h]=rect;const scale=Math.max(viewport.clientWidth/w,viewport.clientHeight/h);Object.assign(img.style,{width:`${img.naturalWidth*scale}px`,height:`${img.naturalHeight*scale}px`,left:`${(viewport.clientWidth-w*scale)/2-x*scale}px`,top:`${(viewport.clientHeight-h*scale)/2-y*scale}px`,maxWidth:'none',objectFit:'fill'});}
 img.addEventListener('load',frame);new ResizeObserver(frame).observe(viewport);frame();
});
