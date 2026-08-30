
/* Analytics adapter: no external tracking is loaded by default. Configure your preferred provider after deployment. */
window.msTrack=function(event,props={}){const payload={event,...props,path:location.pathname,utm_source:sessionStorage.getItem('utm_source')||'',utm_medium:sessionStorage.getItem('utm_medium')||'',utm_campaign:sessionStorage.getItem('utm_campaign')||''};if(typeof window.gtag==='function')window.gtag('event',event,props);if(typeof window.plausible==='function')window.plausible(event,{props:payload});window.dispatchEvent(new CustomEvent('ms:analytics',{detail:payload}));};
