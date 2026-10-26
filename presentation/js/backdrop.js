// Ambient terminal behind the active slide: a faint tmux layout (four panes and a status line),
// shell commands from the talk scrolling in each pane, and one pane typing with a block cursor.
// It is the deck's one piece of ambient motion. One canvas is moved into whichever slide deck.js
// announces ('deck:slide') and takes that slide's --accent. Reduced motion: drawn once, no typing.
(() => {
  const W = 1280, H = 720, STATUS = 26, LINE = 19, PAD = 14, CPS = 22; // CPS: typed chars per second
  const canvas = document.createElement('canvas');
  canvas.className = 'backdrop';
  canvas.setAttribute('aria-hidden', 'true');
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  // tmux layout: a tall left pane, the right column split in three.
  const bodyH = H - STATUS;
  const panes = [
    { x: 0, y: 0, w: 520, h: bodyH },
    { x: 520, y: 0, w: W - 520, h: 300 },
    { x: 520, y: 300, w: 380, h: bodyH - 300 },
    { x: 900, y: 300, w: W - 900, h: bodyH - 300 },
  ];

  // [prompt?, text]: true = a command typed after the prompt, false = output.
  const SCRIPT = [
    [true, 'brew bundle'], [false, 'Using fzf, zoxide, eza, starship, tmux, wezterm'], [false, 'Homebrew Bundle complete! 24 dependencies'],
    [true, 'stow -t ~ .'], [true, 'ls -la ~/.zshrc'], [false, '.zshrc -> Workplace/Karhdo/dotfiles/.zshrc'],
    [true, 'z loanbud'], [true, 'git spartan-check'], [false, '✅ Spartan config loaded!'],
    [true, 'aws sso login --sso-session loanbud_sso'], [false, 'Successfully logged into Start URL'],
    [true, 'colima start'], [false, 'INFO[0012] done'], [true, 'docker ps'],
    [true, 'echo $PATH | tr : "\\n" | head -3'], [false, '/opt/homebrew/opt/libpq/bin'],
    [true, 'source ~/.zshrc'], [true, 'gcof'], [false, '> feat/terminal-talk'],
    [true, 'claude --resume'], [false, '✻ Welcome back! Resuming conversation…'],
    [true, 'tmux attach -t LoanBud'], [true, 'eza --icons=always'], [true, 'fnm current'], [false, 'v20.11.1'],
  ];

  // Deterministic: each pane starts at its own offset into the script.
  const state = panes.map((p, i) => {
    const rows = Math.floor((p.h - PAD * 2) / LINE);
    const lines = [];
    let k = i * 7;
    for (let r = 0; r < rows - 1; r++) lines.push(SCRIPT[k++ % SCRIPT.length]);
    return { rows, lines, next: k, typed: 0, wait: 0.6 + i * 0.9 };
  });
  const ACTIVE = 1; // the pane that types; the others add a line now and then

  let host = null, accent = '#7aa2f7', ink = '#c0caf5', mono = 'monospace', last = 0, raf = 0, sampled = 0, t = 0;
  const readColors = () => {
    if (!host) return;
    const cs = getComputedStyle(host);
    accent = cs.getPropertyValue('--accent').trim() || accent;
    ink = cs.getPropertyValue('--ink').trim() || ink;
    mono = cs.getPropertyValue('--mono').trim() || mono;
  };

  function drawLine(x, y, [cmd, text], cut) {
    const shown = cut == null ? text : text.slice(0, cut);
    if (cmd) {
      ctx.globalAlpha = 0.26; ctx.fillStyle = accent; ctx.fillText('❯', x, y);
      ctx.globalAlpha = 0.12; ctx.fillStyle = ink; ctx.fillText(shown, x + 16, y);
      return x + 16 + ctx.measureText(shown).width;
    }
    ctx.globalAlpha = 0.07; ctx.fillStyle = ink; ctx.fillText(shown, x, y);
    return x + ctx.measureText(shown).width;
  }

  function frame(now) {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now; t += dt;
    if (now - sampled > 500) { readColors(); sampled = now; } // picks up the T theme toggle
    ctx.clearRect(0, 0, W, H);
    ctx.font = `13px ${mono}`;
    ctx.textBaseline = 'top';

    // pane borders: the active pane's border takes the accent, like tmux
    panes.forEach((p, i) => {
      ctx.globalAlpha = i === ACTIVE ? 0.28 : 0.09;
      ctx.strokeStyle = i === ACTIVE ? accent : ink;
      ctx.lineWidth = 1;
      ctx.strokeRect(p.x + 0.5, p.y + 0.5, p.w - 1, p.h - 1);
    });

    panes.forEach((p, i) => {
      const s = state[i];
      if (!reduce.matches) {
        s.wait -= dt;
        const cur = SCRIPT[s.next % SCRIPT.length];
        if (s.wait <= 0) {
          if (i === ACTIVE && cur[0] && s.typed < cur[1].length) s.typed = Math.min(cur[1].length, s.typed + dt * CPS);
          else {
            s.lines.push(cur); s.next++; s.typed = 0;
            if (s.lines.length > s.rows - 1) s.lines.shift();
            s.wait = i === ACTIVE ? (cur[0] ? 0.5 : 0.25) : 2.5 + ((i * 1.7 + s.next) % 3);
          }
        }
      }
      ctx.save();
      ctx.beginPath(); ctx.rect(p.x, p.y, p.w, p.h); ctx.clip();
      s.lines.forEach((ln, r) => drawLine(p.x + PAD, p.y + PAD + r * LINE, ln));
      // the line being typed, with a block cursor
      const y = p.y + PAD + s.lines.length * LINE;
      const cur = SCRIPT[s.next % SCRIPT.length];
      const typing = i === ACTIVE && cur[0];
      const end = drawLine(p.x + PAD, y, typing ? cur : [true, ''], typing ? Math.floor(s.typed) : null);
      if (i === ACTIVE && (reduce.matches || Math.floor(t * 1.8) % 2 === 0)) {
        ctx.globalAlpha = 0.32; ctx.fillStyle = accent;
        ctx.fillRect(end + 2, y, 8, 15);
      }
      ctx.restore();
    });

    // status line
    ctx.globalAlpha = 0.09; ctx.fillStyle = accent; ctx.fillRect(0, bodyH, W, STATUS);
    ctx.globalAlpha = 0.3; ctx.fillStyle = ink; ctx.textBaseline = 'middle';
    ctx.fillText('[LoanBud]  1:backend-hub*  2:frontend  3:claude', PAD, bodyH + STATUS / 2);
    ctx.textAlign = 'right';
    ctx.fillText('Ho Chi Minh  ·  tmux', W - PAD, bodyH + STATUS / 2);
    ctx.textAlign = 'left';

    ctx.globalAlpha = 1;
    raf = reduce.matches ? 0 : requestAnimationFrame(frame);
  }

  const start = () => { if (!raf && !document.hidden) { last = 0; raf = requestAnimationFrame(frame); } };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };

  document.addEventListener('deck:slide', (e) => {
    host = e.detail;
    host.prepend(canvas);
    readColors();
    stop();
    start();
  });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  reduce.addEventListener?.('change', () => { stop(); start(); });
})();
