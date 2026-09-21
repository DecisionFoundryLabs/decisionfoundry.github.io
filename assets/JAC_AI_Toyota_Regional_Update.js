/* JAC-AI Toyota Regional Update
   Surgical add-on: updates Toyota Ecosystem -> Toyota Regional,
   adds regional opportunity content, and pre-fills email/WhatsApp messages.
   Existing video, music, demo, ROI, trial, package and subscription logic are untouched.
*/
(() => {
  'use strict';

  const EMAIL = 'soni.gunadis@toyota.astra.co.id';
  const WA_NUMBER = '6289605424423';
  const SUBJECT = 'Ketertarikan Trial dan Demo JAC-AI';
  const MESSAGE = `Dear Pak Soni,

Perkenalkan, saya tertarik untuk mengetahui lebih lanjut mengenai pengembangan JAC-AI sebagai Enterprise Decision Intelligence Platform untuk perusahaan kami.

Kami ingin mendiskusikan potensi use case yang paling sesuai, sekaligus memperoleh informasi mengenai demo produk dan masa free trial 14 hari. Mohon dapat dibagikan penjelasan mengenai alur trial, kebutuhan awal, pilihan paket implementasi, serta jadwal yang tersedia untuk sesi demonstrasi.

Terima kasih. Saya menantikan kesempatan untuk berdiskusi lebih lanjut mengenai potensi penerapan JAC-AI di perusahaan kami.

Hormat kami,`;

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(MESSAGE)}`;
  const whatsapp = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  const regionalRows = [
    ['Indonesia', '>500 lokasi', 'Quality, Warehouse, Dealer Support'],
    ['Thailand', '>400 lokasi', 'Manufacturing, Dealer, Service'],
    ['Malaysia', '>100 lokasi', 'Dealer & Technical Support'],
    ['Philippines', '>70 lokasi', 'Dealer & Service'],
    ['Vietnam', '>80 lokasi', 'Manufacturing & Dealer'],
    ['Cambodia', '25+ lokasi', 'Dealer & Service'],
    ['Singapore', '20+ lokasi', 'Service & Customer Support'],
    ['Myanmar', '30+ lokasi', 'Dealer & Technical Knowledge'],
    ['Laos', '10+ lokasi', 'Service Assistant'],
    ['Brunei', '5+ lokasi', 'Service Assistant']
  ];

  function addStyles() {
    if (document.getElementById('jacRegionalStyles')) return;
    const style = document.createElement('style');
    style.id = 'jacRegionalStyles';
    style.textContent = `
      .regionalOpportunity{margin-top:22px;border:1px solid var(--line);border-radius:28px;padding:30px;background:linear-gradient(135deg,#071426,#0b2c50);color:#fff;overflow:hidden;position:relative}
      .regionalOpportunity:after{content:"";position:absolute;width:260px;height:260px;border-radius:50%;right:-120px;top:-120px;background:#4aa8ff;filter:blur(90px);opacity:.2}
      .regionalHead{display:flex;justify-content:space-between;align-items:end;gap:24px;position:relative;z-index:1}
      .regionalHead h3{font-size:clamp(29px,4vw,50px);margin:5px 0 8px;letter-spacing:-.045em}
      .regionalHead p{margin:0;color:#b9cada;line-height:1.5;max-width:710px}
      .regionalTotal{min-width:220px;text-align:center;padding:18px;border:1px solid #ffffff24;background:#ffffff0b;border-radius:19px}
      .regionalTotal strong{display:block;font-size:43px;color:var(--gold);line-height:1}.regionalTotal span{display:block;margin-top:7px;font-size:11px;font-weight:900;letter-spacing:.1em;color:#d7e7f4}
      .regionalTableWrap{position:relative;z-index:1;margin-top:24px;overflow:auto;border:1px solid #ffffff1c;border-radius:18px}
      .regionalTable{width:100%;border-collapse:collapse;min-width:720px}.regionalTable th,.regionalTable td{padding:14px 16px;text-align:left;border-bottom:1px solid #ffffff16}.regionalTable th{background:#ffffff10;font-size:12px;letter-spacing:.06em;color:#fff}.regionalTable td{font-size:13px;color:#c5d4e2}.regionalTable tr:last-child td{border-bottom:0}.regionalTable td:nth-child(2){color:#79d8ff;font-weight:850}
      .regionalPath{position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px}.regionalPath article{padding:17px;border:1px solid #ffffff18;border-radius:16px;background:#ffffff08}.regionalPath small{display:block;color:#77d9ff;font-weight:900;letter-spacing:.08em}.regionalPath b{display:block;margin-top:7px}.regionalPath p{font-size:12px;color:#aebfd0;line-height:1.45;margin:7px 0 0}
      .regionalNote{position:relative;z-index:1;margin-top:15px;color:#8196aa;font-size:11px;line-height:1.5}
      @media(max-width:800px){.regionalHead{display:block}.regionalTotal{margin-top:18px}.regionalPath{grid-template-columns:1fr}.regionalOpportunity{padding:23px}}
    `;
    document.head.appendChild(style);
  }

  function regionalHTML() {
    const rows = regionalRows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('');
    return `<div class="regionalOpportunity reveal visible" id="toyotaRegionalOpportunity">
      <div class="regionalHead">
        <div><div class="eyebrow">Toyota Regional Opportunity</div><h3>🌏 Satu platform. Peluang lintas negara.</h3><p>JAC-AI dapat dikembangkan dari use case yang telah terbukti, lalu direplikasi untuk manufacturing, dealer, service, warehouse, dan technical knowledge di jaringan regional.</p></div>
        <div class="regionalTotal"><strong>&gt;1.200</strong><span>ESTIMASI LOKASI POTENSIAL</span></div>
      </div>
      <div class="regionalTableWrap"><table class="regionalTable"><thead><tr><th>Negara</th><th>Estimasi Dealer & Service Network</th><th>Potensi Use Case</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="regionalPath">
        <article><small>STEP 01</small><b>Prove in One Market</b><p>Mulai dari satu use case prioritas dengan knowledge dan impact yang terukur.</p></article>
        <article><small>STEP 02</small><b>Replicate the Solution</b><p>Adaptasi bahasa, knowledge, SOP, dan konteks operasional setiap negara.</p></article>
        <article><small>STEP 03</small><b>Scale Regionally</b><p>Bangun recurring platform melalui implementasi multi-location dan multi-use-case.</p></article>
      </div>
      <div class="regionalNote">Angka lokasi merupakan estimasi awal untuk visualisasi peluang pasar dan perlu divalidasi kembali pada tahap business assessment bersama fungsi regional terkait.</div>
    </div>`;
  }

  function updateMarket() {
    // New interactive market version
    document.querySelectorAll('.marketTab').forEach(btn => {
      if ((btn.textContent || '').trim() === 'Toyota Ecosystem') {
        btn.textContent = 'Toyota Regional';
        btn.dataset.market = 'regional';
      }
    });

    if (typeof marketData !== 'undefined') {
      marketData.regional = {
        k:'Regional growth opportunity',
        t:'Toyota Regional',
        x:'JAC-AI dapat dimulai dari satu use case di Indonesia, kemudian disesuaikan untuk dealer, service, manufacturing, warehouse, dan technical knowledge di jaringan regional.',
        i:'🌏', n:'>1.200', nl:'ESTIMASI LOKASI POTENSIAL ASIA TENGGARA',
        lt:'Negara dan use case prioritas',
        c:['Indonesia','Thailand','Malaysia','Philippines','Vietnam','Cambodia','Singapore','Myanmar','Laos','Brunei'],
        u:['Quality decision support','Manufacturing analytics','Dealer & service knowledge','Warehouse assistant','Technical knowledge'],
        s:'Estimasi awal untuk visualisasi peluang regional. Validasi market diperlukan sebelum komersialisasi.'
      };
    }

    // Older market card version
    document.querySelectorAll('h3').forEach(h => {
      if ((h.textContent || '').trim() === 'Toyota Ecosystem') {
        h.textContent = 'Toyota Regional';
        const p = h.nextElementSibling;
        if (p && p.tagName === 'P') p.textContent = 'Indonesia, Thailand, Malaysia, Philippines, Vietnam, Cambodia, Singapore, Myanmar, Laos, dan Brunei.';
      }
    });

    const target = document.querySelector('#industri .wrap') || document.querySelector('#market .wrap') || document.querySelector('.usecases .wrap');
    if (target && !document.getElementById('toyotaRegionalOpportunity')) {
      const holder = document.createElement('div');
      holder.innerHTML = regionalHTML();
      const demoButton = target.querySelector('#caseDemo');
      target.insertBefore(holder.firstElementChild, demoButton ? demoButton.parentElement : null);
    }
  }

  function updateContacts() {
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
      a.href = mailto;
      a.addEventListener('click', () => {}, {passive:true});
    });
    document.querySelectorAll('a[href^="tel:"]').forEach(a => {
      a.href = whatsapp;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      if (/hubungi|telepon|0896/i.test(a.textContent || '')) a.textContent = 'WhatsApp 0896 0542 4423';
    });

    const ids = ['requestBtn','contactBtn'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el || el.dataset.prefillReady) return;
      el.dataset.prefillReady = 'true';
      el.addEventListener('click', ev => {
        ev.preventDefault(); ev.stopImmediatePropagation();
        window.location.href = id === 'contactBtn' ? whatsapp : mailto;
      }, true);
    });

    document.querySelectorAll('.pickPlan,.choose').forEach(btn => {
      if (btn.dataset.prefillReady) return;
      btn.dataset.prefillReady = 'true';
      btn.addEventListener('click', ev => {
        ev.preventDefault(); ev.stopImmediatePropagation();
        const plan = btn.dataset.plan || btn.textContent.trim();
        const planMessage = `${MESSAGE}\n\nPaket yang ingin kami diskusikan: ${plan}.`;
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Konsultasi JAC-AI - '+plan)}&body=${encodeURIComponent(planMessage)}`;
      }, true);
    });
  }

  function run() { addStyles(); updateMarket(); updateContacts(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true}); else run();
})();
