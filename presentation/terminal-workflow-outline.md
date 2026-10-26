# Terminal-first trên MacBook
### Một repo dotfiles, một terminal, nhiều Claude cùng chạy

> **Đối tượng:** Middle Backend + Frontend Engineer
> **Presenter:** Khanh Do (một mình)
> **Thời lượng dự kiến:** ~45 phút + demo · 35 slide

File này là nguồn nội dung cho slide. Slide là bản tiếng Anh của outline này, không viết lại tự do.
Config trích dẫn lấy từ `~/Workplace/Karhdo/dotfiles` (public: github.com/Karhdo/dotfiles), `~/.aws/config`, `~/.ssh/config`.
Deck được publish → không bao giờ show secret: email ghi `<personal email>` / `<work email>`, account ID `XXXX`, token `github_pat_…`.

Phạm vi: không nói về editor (Neovim) và language runtime (Node/Java/Go).

---

## MỤC LỤC

0. (không có divider) Cover, outline, slide stack
1. Shell & dotfiles — `.zshrc` là gì, quản lý thế nào, backup bằng dotfiles + Stow + Brewfile
2. Terminal & CLI tools — terminal apps, WezTerm, starship, nano/vim/nvim, zsh-autosuggestions, zsh-syntax-highlighting, fzf, zoxide, eza, alias, triết lý dotfiles
3. Multiple git accounts — includeIf, SSH host alias, ký commit bằng SSH, gh + direnv
4. MacBook runtime — PATH, Colima
5. AWS config — SSO session, profile theo môi trường, ECR
6. tmux & Claude sessions — tmux cơ bản, tpm, tmux-claude-hatch + 3 script, Claude settings, demo
99. Thank you — 3 takeaways + QR repo dotfi## 0. Mở đầu (slide 1–3)

- **Cover** · **Outline** (6 phần) · **Stack:** WezTerm → zsh + starship → CLI tools → git → runtimes → AWS (ngoài repo) → tmux + Claude.

## 1. Shell & dotfiles (slide 4–9)

- **.zshrc là gì:** zsh mặc định từ Catalina; mỗi tab/pane chạy `~/.zshrc` từ trên xuống.
- **Quản lý .zshrc:** chia khối theo tool, comment *tại sao*; `cz` mở trong repo, `rz` reload, `exec zsh` khi cần sạch.
- **Dotfiles repo:** repo mirror `$HOME`, symlink thật.
- **GNU Stow:** `stow -t ~ .`; gotcha *folding* `~/.config` → `.gitignore` chặn secret, `--no-folding`.
- **Brewfile:** `brew bundle`; máy mới = Homebrew, clone, `brew bundle`, `stow` (README đủ 10 bước).

## 2. Terminal & CLI tools (slide 10–18)

- **Terminal apps:** Terminal.app, iTerm2, WezTerm (chọn), Ghostty, Alacritty.
- **WezTerm** · **Starship**.
- **zsh plugins (1 slide):** zsh-autosuggestions (`Shift+Tab` nhận, ↑ theo prefix) + zsh-syntax-highlighting (đỏ/gạch chân/vàng, source cuối file).
- **fzf + fd + bat** · **zoxide + eza** · **Aliases** · **Triết lý dotfiles** (git, không secret, comment why, một theme, README = setup).

## 3. Multiple git accounts (slide 19–22)

- Divider nêu vấn đề (sai email, sai SSH key, `gh` sai user).
- **includeIf:** identity + `signingkey` theo thư mục; ký commit bằng SSH.
- **SSH host alias:** `github` / `github-spartan`, `IdentitiesOnly yes`.
- **gh + direnv:** `GH_TOKEN` theo workspace; bảng tổng hợp.

## 4. MacBook runtime (slide 23–25)

- **PATH:** export cuối thắng; `typeset -U path` chống lặp trong tmux.
- **Colima:** sơ đồ + lệnh; Testcontainers `DOCKER_HOST`; bind mount chỉ từ `$HOME`.

## 5. AWS config (slide 26–27)

- **SSO profiles:** 1 sso-session, 3 profile, prod role khác; daily: `aws sso login` → `--profile` / `AWS_PROFILE`.

## 6. tmux & Claude sessions (slide 28–34)

- **tmux model** · **.tmux.conf** (prefix `C-t`, hjkl).
- **tmux-claude-hatch:** config + 4 phím `y/Y/u/d`; `claude.sh` giữ popup khi Ctrl+C.
- **claude-popup.sh:** 1 popup session / tmux session, 1 window / thư mục.
- **Claude Code settings** + trade-off `--dangerously-skip-permissions`.
- **Demo:** 6 bước.

## 99. Thank you (slide 35)

3 takeaways + QR `github.com/Karhdo/dotfiles`.
