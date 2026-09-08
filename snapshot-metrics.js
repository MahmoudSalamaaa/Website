(() => {
  const grid = document.querySelector('.exec-snapshot-grid');
  if (!grid) return;

  // Executive-scale metrics only; project-specific proof stays in its own sections.
  grid.innerHTML = `
    <div><strong class="metric-count" data-count="18" data-suffix="+">18+</strong><span>years of technology leadership</span></div>
    <div><strong class="metric-count" data-count="54">54</strong><span>people in the technology organization</span></div>
    <div><strong class="metric-count" data-count="150" data-prefix="EGP " data-suffix="M">EGP 150M</strong><span>annual IT budget accountability</span></div>
    <div><strong class="metric-count" data-count="200" data-suffix="+">200+</strong><span>projects across healthcare, government &amp; enterprise</span></div>
  `;

  if (!document.getElementById('executive-metrics-five')) {
    const style = document.createElement('style');
    style.id = 'executive-metrics-five';
    style.textContent = `
      .exec-snapshot-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important}
      @media(max-width:1100px){.exec-snapshot-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
      @media(max-width:420px){.exec-snapshot-grid{grid-template-columns:1fr!important}}
    `;
    document.head.appendChild(style);
  }

  const items = [...grid.children];
  const counters = [...grid.querySelectorAll('.metric-count[data-count]')];
  if (!items.length || !counters.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const formatValue = (el, value, final = false) => {
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const grouping = el.dataset.grouping === 'true';
    const target = Number(el.dataset.count);

    if (suffix === 'M+' && target <= 9) {
      const number = final ? Math.round(target).toString() : value.toFixed(1);
      return `${prefix}${number}${suffix}`;
    }

    const number = grouping
      ? Math.round(value).toLocaleString('en-US')
      : Math.round(value).toString();

    return `${prefix}${number}${suffix}`;
  };

  const setFinal = () => counters.forEach((el) => {
    el.textContent = formatValue(el, Number(el.dataset.count), true);
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    setFinal();
    return;
  }

  document.documentElement.classList.add('metrics-animate-ready');
  let played = false;
  const section = document.querySelector('.exec-snapshot');
  if (!section) return;

  const animateCounter = (el, delay = 0) => {
    const target = Number(el.dataset.count);
    const duration = target <= 9 ? 1350 : 1050;

    window.setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = formatValue(el, target * eased, progress === 1);

        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
  };

  const observer = new IntersectionObserver((entries) => {
    if (played || !entries.some((entry) => entry.isIntersecting)) return;

    played = true;
    items.forEach((item, index) => {
      window.setTimeout(() => item.classList.add('metric-visible'), index * 55);
    });
    counters.forEach((counter, index) => animateCounter(counter, index * 55));
    observer.disconnect();
  }, { threshold: 0.22 });

  observer.observe(section);


  // Compact executive footer — UI/UX correction for Home only.
  if (!document.getElementById('compact-executive-footer')) {
    const footerStyle = document.createElement('style');
    footerStyle.id = 'compact-executive-footer';
    footerStyle.textContent = `
      body.home-page footer{
        min-height:0!important;
      }

      body.home-page footer .final-footer{
        max-width:1180px!important;
        padding:28px 24px 18px!important;
      }

      body.home-page footer .footer-title{
        max-width:680px!important;
        margin:0!important;
        font-family:"DM Sans",Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;
        font-size:clamp(20px,2vw,27px)!important;
        line-height:1.2!important;
        font-weight:650!important;
        letter-spacing:-.025em!important;
      }

      body.home-page footer .footer-title em{
        font-weight:650!important;
      }

      body.home-page footer .footer-title em::after{
        height:3px!important;
        bottom:-3px!important;
        opacity:.62!important;
      }

      body.home-page footer .footer-intro{
        max-width:900px!important;
        margin:10px 0 0!important;
        font-family:"DM Sans",Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;
        font-size:13.5px!important;
        line-height:1.5!important;
        font-weight:400!important;
        letter-spacing:0!important;
        color:rgba(244,250,255,.78)!important;
        text-shadow:none!important;
      }

      body.home-page footer .footer-links{
        gap:7px!important;
        margin-top:14px!important;
      }

      body.home-page footer .footer-links a{
        min-height:34px!important;
        padding:6px 11px!important;
        font-family:"DM Sans",Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;
        font-size:12.5px!important;
        line-height:1!important;
        font-weight:500!important;
        letter-spacing:0!important;
        text-shadow:none!important;
        background:rgba(255,255,255,.055)!important;
      }

      body.home-page footer .footer-row{
        margin-top:16px!important;
        padding-top:13px!important;
        font-family:"DM Sans",Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;
        font-size:12px!important;
        line-height:1.45!important;
        font-weight:400!important;
        letter-spacing:0!important;
        border-top:1px solid rgba(255,255,255,.13)!important;
        color:rgba(236,244,250,.67)!important;
      }

      body.home-page footer .footer-row span:first-child{
        color:rgba(236,244,250,.67)!important;
      }

      body.home-page footer .footer-row span:last-child{
        color:rgba(255,255,255,.82)!important;
        font-weight:500!important;
      }

      body.home-page footer::before{
        width:125px!important;
        height:16px!important;
        top:14px!important;
        opacity:.65!important;
      }

      body.home-page footer::after{
        width:90px!important;
        height:13px!important;
        bottom:16px!important;
        opacity:.58!important;
      }

      body.home-page footer .final-footer::after{
        top:18px!important;
        right:24px!important;
        font-size:10px!important;
        letter-spacing:.07em!important;
        opacity:.7!important;
      }

      @media(max-width:760px){
        body.home-page footer .final-footer{
          padding:24px 20px 17px!important;
        }

        body.home-page footer .footer-title{
          font-size:20px!important;
          line-height:1.24!important;
        }

        body.home-page footer .footer-intro{
          margin-top:9px!important;
          font-size:13px!important;
          line-height:1.48!important;
        }

        body.home-page footer .footer-links{
          margin-top:12px!important;
          gap:6px!important;
        }

        body.home-page footer .footer-links a{
          min-height:32px!important;
          padding:6px 10px!important;
          font-size:12px!important;
        }

        body.home-page footer .footer-row{
          margin-top:14px!important;
          padding-top:12px!important;
          font-size:11.5px!important;
        }

        body.home-page footer::before{
          width:82px!important;
          height:12px!important;
          top:10px!important;
        }

        body.home-page footer::after{
          width:64px!important;
          height:10px!important;
          bottom:12px!important;
        }
      }
    `;
    document.head.appendChild(footerStyle);
  }

})();
