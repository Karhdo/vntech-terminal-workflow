# Terminal-first on a MacBook — slide deck

HTML slides for a talk on a terminal-first Mac setup, in seven parts: introduction, shell & dotfiles, terminal & CLI tools, multiple git accounts, MacBook runtime, AWS config, and tmux & Claude sessions.

Presenter: **Khanh Do**.

## Run locally

You **must open the deck over HTTP**. Double-clicking `index.html` will not work.

```bash
cd presentation
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Export to PDF

- **Browser:** open the deck, press `Cmd+P`, choose *Save as PDF*, margins *None*.
- **Headless**, with the server running on port 8000:

  ```bash
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
    --virtual-time-budget=8000 --no-pdf-header-footer --print-to-pdf=terminal-first.pdf \
    "http://localhost:8000/?print"
  ```

Every slide prints at its last step. The animated terminal background is not printed.

## Keyboard shortcuts

| Key | Action |
|---|---|
| `→` `Space` `Enter` `PageDown` | Next step |
| `←` `Backspace` `PageUp` | Previous step |
| `Home` / `End` | First / last slide |
| `O` | See all slides (click one to jump to it) |
| `T` | Switch light / dark theme |
| `F` | Full screen |
| `Esc` | Close the all-slides view |

## Live demo (slide 34)

Have a tmux session with two project directories open before the talk, Claude Code installed, and `tmux-claude-hatch` loaded (`C-t I`). The slide lists the six demo steps.
