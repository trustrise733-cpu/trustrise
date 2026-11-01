'use strict';
const services = {
  zomato: {title:'Zomato onboarding', category:'GET ONLINE / DELIVERY ONBOARDING', description:'A guided start to bringing your food business onto Zomato.', includes:['Outlet profile and listing information coordination','Menu information and asset preparation support','Application preparation and onboarding follow-up'], start:'Tell us your outlet name, location and whether you already have a Zomato listing.', note:'Independent onboarding assistance. Listing approval, fees and activation are decided by Zomato.'},
  swiggy: {title:'Swiggy onboarding', category:'GET ONLINE / DELIVERY ONBOARDING', description:'Support with the information and coordination needed for your Swiggy onboarding journey.', includes:['Outlet and business information coordination','Menu and listing setup assistance','Application preparation and onboarding follow-up'], start:'Share your outlet name, location and current Swiggy onboarding stage.', note:'Independent onboarding assistance. Listing approval, fees and activation are decided by Swiggy.'},
  fssai: {title:'FSSAI registration', category:'GET REGISTERED / BUSINESS REGISTRATIONS', description:'Practical coordination to help you navigate your food business registration application.', includes:['Discussion of your business and application needs','Document requirement and information coordination','Application preparation and process follow-up'], start:'Tell us your food business type, location and whether this is a new application or an existing registration query.', note:'Registration or licensing requirements depend on the business. The relevant authority determines eligibility, processing and approval. No approval is guaranteed.'},
  msme: {title:'MSME registration', category:'GET REGISTERED / BUSINESS REGISTRATIONS', description:'Assistance organising your business details for the Udyam registration process.', includes:['Business information preparation support','Application information and document coordination','Guidance through the agreed registration steps'], start:'Share your business type and whether you already have an Udyam registration.', note:'We provide independent assistance, not government representation. Any consultancy fee will be explained separately from official charges, if applicable.'},
  gst: {title:'GST registration', category:'GET REGISTERED / BUSINESS REGISTRATIONS', description:'Application coordination and support for the next stage of your business.', includes:['Discussion of your business registration needs','Information and document coordination','Application preparation and status follow-up'], start:'Share your business type, operating location and whether you already have a GST registration.', note:'Applicability and documentation depend on your circumstances. The relevant authority decides registration and approval. The listed service is registration assistance.'},
  social: {title:'Social media management', category:'GET NOTICED / CREATIVE & MARKETING', description:'Build a more consistent, recognisable presence for your food business.', includes:['Content themes and a posting plan','Creative and caption coordination','Account management within an agreed scope'], start:'Tell us your social media handle, your audience and the main goal for your page.', note:'Platforms, deliverables, posting frequency and any advertising budget will be agreed before work starts. Results are not guaranteed.'},
  reels: {title:'Reel edits', category:'GET NOTICED / CREATIVE & MARKETING', description:'Give your footage a clear story, a better pace and a finish that fits your brand.', includes:['Short-form video editing from your supplied footage','Pacing, captions and brand styling as agreed','Export format and revision scope agreed in advance'], start:'Tell us your video idea, preferred reel length and whether your footage is ready.', note:'Editing scope, number of videos and revisions are confirmed before work starts. Any music or other third-party assets must be licensed for the intended use.'}
};
const menuToggle=document.querySelector('.menu-toggle');
const nav=document.getElementById('main-nav');
function closeMenu(){nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menuToggle.focus();}});
const filters=[...document.querySelectorAll('[data-filter]')];
const cards=[...document.querySelectorAll('[data-category]')];
filters.forEach(button=>button.addEventListener('click',()=>{
  const category=button.dataset.filter;
  filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  let count=0;
  cards.forEach(card=>{const show=category==='all'||card.dataset.category===category;card.hidden=!show;if(show)count++;});
  document.getElementById('service-help').hidden=category!=='all';
  document.getElementById('filter-count').textContent=category==='all'?'7 services, one point of contact':`${count} services to ${button.textContent.toLowerCase().trim()}`;
}));
const dialog=document.getElementById('service-dialog');
let selectedService=null;
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{
  selectedService=button.dataset.service;const service=services[selectedService];
  document.getElementById('dialog-title').textContent=service.title;
  document.getElementById('dialog-category').textContent=service.category;
  document.getElementById('dialog-description').textContent=service.description;
  document.getElementById('dialog-start').textContent=service.start;
  document.getElementById('dialog-note').textContent=service.note;
  document.getElementById('dialog-includes').replaceChildren(...service.includes.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
  dialog.showModal();document.body.classList.add('modal-open');
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close();}});
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
document.getElementById('dialog-inquire').addEventListener('click',()=>{
  document.getElementById('service').value=selectedService;
  resetPreview();dialog.close();
  document.getElementById('contact').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  document.getElementById('name').focus({preventScroll:true});
});
const form=document.getElementById('inquiry-form');
const phone=document.getElementById('phone');
const phoneError=document.getElementById('phone-error');
const nameInput=document.getElementById('name');
const preview=document.getElementById('inquiry-preview');
function cleanPhone(value){return value.replace(/[\s()-]/g,'').replace(/^(\+91|0091|91(?=\d{10}$))/,'');}
function validatePhone(){const valid=/^[6-9]\d{9}$/.test(cleanPhone(phone.value));phone.setCustomValidity(valid?'':'Enter a valid 10-digit Indian mobile number.');phone.setAttribute('aria-invalid',String(!valid));phoneError.hidden=valid;return valid;}
function validateName(){nameInput.setCustomValidity(nameInput.value.trim()?'':'Please enter your name.');}
function resetPreview(){preview.hidden=true;form.hidden=false;document.getElementById('whatsapp-send').removeAttribute('href');}
phone.addEventListener('input',()=>{phone.setCustomValidity('');phone.setAttribute('aria-invalid','false');phoneError.hidden=true;});
phone.addEventListener('blur',()=>{if(phone.value)validatePhone();});
nameInput.addEventListener('input',()=>nameInput.setCustomValidity(''));
form.querySelector('[type=submit]').addEventListener('click',()=>{validateName();validatePhone();});
form.addEventListener('submit',event=>{
  event.preventDefault();validateName();validatePhone();if(!form.reportValidity())return;
  const serviceSelect=document.getElementById('service');
  const business=document.getElementById('business').value.trim();
  const message=document.getElementById('message').value.trim();
  const lines=['Hello TrustRise Restaurant Consultant, I would like to inquire about your services.','',`Name: ${nameInput.value.trim()}`,`Mobile: +91 ${cleanPhone(phone.value)}`,`Service: ${serviceSelect.options[serviceSelect.selectedIndex].text}`];
  if(business)lines.push(`Business: ${business}`);
  if(message)lines.push('',`My goal: ${message}`);
  const text=lines.join('\n');
  document.getElementById('preview-message').textContent=text;
  document.getElementById('whatsapp-send').href=`https://wa.me/919625528504?text=${encodeURIComponent(text)}`;
  form.hidden=true;preview.hidden=false;document.getElementById('preview-title').focus({preventScroll:true});
});
document.querySelector('.preview-edit').addEventListener('click',()=>{resetPreview();nameInput.focus({preventScroll:true});});
document.getElementById('year').textContent=new Date().getFullYear();
