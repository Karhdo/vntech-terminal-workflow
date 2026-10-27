# Kịch bản nói — Terminal-first trên MacBook

Mỗi slide một mục, theo đúng thứ tự deck. **Nói** là phần bạn dẫn; các dòng **→** là những
`data-step` (bấm mũi tên phải rồi nói dòng đó); **Chốt** là câu để lại trong đầu mọi người
trước khi qua slide tiếp theo.

Không có gì ở đây hiện trên màn hình. Số liệu và lệnh thì lấy slide làm chuẩn — sửa slide thì
nhớ sửa luôn ở đây. Thuật ngữ kỹ thuật (alias, PATH, symlink, session, pane, prompt, …) giữ tiếng Anh.

## Trước khi bắt đầu

- Mở deck: https://karhdo.github.io/vntech-terminal-workflow/ (hoặc `cd presentation && python3 -m http.server 8000`), bấm `F` để fullscreen.
- Phím: `→` / `←` để step, `O` xem overview, `T` đổi theme sáng.
- Cho demo (slide 34): mở sẵn WezTerm, một tmux session `LoanBud` có 2 pane ở `backend-hub` và `frontend`. Kiểm tra `C-t y` mở được popup trước giờ nói.
- Tắt notification, tăng font WezTerm lên 1–2 cỡ để người ngồi cuối đọc được.
- Không mở `~/.claude/settings.json`, `~/.aws/credentials` hay `.envrc` trên màn hình — có token.

## Thời lượng

| Phần | Slide | Dự kiến |
|---|---|---|
| Mở đầu | 1–3 | 3 phút |
| 01 Shell & dotfiles | 4–9 | 7 phút |
| 02 Terminal & CLI tools | 10–18 | 9 phút |
| 03 Multiple git accounts | 19–22 | 5 phút |
| 04 MacBook runtime | 23–25 | 4 phút |
| 05 AWS config | 26–27 | 3 phút |
| 06 tmux & Claude sessions | 28–33 | 7 phút |
| Demo | 34 | 5 phút |
| Thank you + Q&A | 35 | 2 phút + hỏi đáp |

**Tổng khoảng 45 phút.** Cần cắt thì cắt theo thứ tự: slide 11 (bảng terminal, chỉ nói "mình dùng
WezTerm"), slide 16, slide 22. Đừng bỏ demo — popup Claude chạy thật là thứ mọi người nhớ.

---

# Mở đầu

### 1 / 35 · Cover — Terminal-first on a MacBook
**Nói:** Chào mọi người, mình là Khánh. Hôm nay mình không giới thiệu một tool mới, mà kể về cách
mình setup cái MacBook để làm việc gần như hoàn toàn trong terminal. Mục tiêu có ba: đổi máy mới
mất một tiếng chứ không phải một ngày; mọi tool đọc config từ git; và chạy bốn, năm phiên Claude
Code cùng lúc mà không lạc cái nào. Hình bên phải chính là màn hình của mình: WezTerm, tmux, và một
popup Claude nổi lên trên.
**Chốt:** Tất cả những gì mình show hôm nay đều là file text nằm trong một repo public.

### 2 / 35 · Outline
**Nói:** Sáu phần. Đi từ dưới lên: file zsh chạy mỗi khi mở terminal, rồi terminal và CLI tools, rồi
chuyện hai tài khoản git trên một máy, PATH và Docker, AWS, và cuối cùng là tmux với Claude — phần
mình thích nhất, có demo.
**Chốt:** Mỗi phần một màu — nhìn màu là biết đang ở đâu.

### 3 / 35 · The stack
**Nói:** Đây là toàn bộ stack, xếp theo tầng. Dưới cùng là terminal — WezTerm, config là một file
Lua. Trên đó là shell: zsh, starship, vài plugin.
**→** Rồi tới các CLI tool, khai báo trong Brewfile; phần git với nhiều identity; và PATH, Colima.
**→** Có một tầng nằm ngoài repo: AWS. Cố ý — đó là chỗ có credential.
**→** Trên cùng là tmux và các popup Claude.
**Chốt:** Mọi tầng là một file text — nên backup được, review được, và cài lại được.

---

# Phần 01 — Shell & dotfiles

### 4 / 35 · Divider — Shell & dotfiles
**Nói:** Bắt đầu với thứ chạy đầu tiên mỗi khi mở terminal, và cách giữ nó — cùng mọi config khác —
trong git.

### 5 / 35 · .zshrc — Your terminal runs one script every time it opens
**Nói:** Từ macOS Catalina, shell mặc định là zsh. Mỗi lần mở tab mới, hay pane mới trong tmux, zsh
chạy file `~/.zshrc` từ trên xuống, từng dòng một. Alias, PATH, prompt, plugin, phím tắt — mọi thứ
"tự có" khi mở terminal đều đến từ file này.
**→** Và chỉ khi chạy hết dòng cuối, bạn mới thấy prompt. Có một dòng chậm là tab nào mở ra cũng chậm.
**Chốt:** `.zshrc` không phải file cấu hình bí ẩn — nó là một script bình thường.

### 6 / 35 · Managing .zshrc — Group by tool, comment the why
**Nói:** Đây là `.zshrc` thật của mình, rút gọn. Chia khối theo tool: Plugins, Starship, FZF,
Aliases, PATH, Tools init, Docker. Bỏ một tool là xoá một khối. Thứ tự quan trọng: khối nào gọi
lệnh thì lệnh đó phải có trên PATH trước, nên Homebrew đứng gần đầu.
**→** Comment thì viết *tại sao*, không viết *cái gì*. Dòng highlight đó — "Testcontainers ignores
Docker contexts" — sáu tháng sau mới là dòng bạn cần. Hai alias mình dùng mỗi ngày: `cz` mở file
ngay trong repo dotfiles, `rz` source lại. Lưu ý: `source` không xoá alias cũ, muốn sạch thì
`exec zsh`.
**Chốt:** Đọc lại `.zshrc` sau sáu tháng mà vẫn hiểu — đó là tiêu chuẩn.

### 7 / 35 · Dotfiles — Move config into a repo that mirrors $HOME
**Nói:** Vấn đề: config nằm rải rác trong `$HOME` thì không có lịch sử, không có backup. Hỏng máy là
mất; tuần trước sửa gì làm vỡ prompt cũng không biết. Cách giải: một repo, cấu trúc y hệt `$HOME`.
**→** Đây là `ls -la ~` thật trên máy mình: `.zshrc`, `.tmux.conf`, `.wezterm.lua` đều là symlink
trỏ vào repo.
**→** Sửa `~/.zshrc` tức là sửa file trong repo. `git commit` là backup, `git log` cho biết tuần
trước mình đổi gì.
**Chốt:** Config có lịch sử thì dám thử, vì luôn quay lại được.

### 8 / 35 · GNU Stow — Stow creates the symlinks
**Nói:** Không ai muốn gõ `ln -s` cho từng file. GNU Stow làm việc đó: đứng ở repo, chạy
`stow -t ~ .` — mọi file trong repo thành symlink tương ứng trong `$HOME`. Thêm file mới thì
`stow -R`. File nào chỉ nằm trong repo — README, Brewfile — thì ghi vào `.stow-local-ignore`. Stow
không bao giờ ghi đè file thật; phải dời file cũ đi trước.
**→** Gotcha mình gặp thật: *folding*. Nếu `~/.config` chưa tồn tại, Stow link nguyên cả thư mục. Từ
đó mọi app ghi vào `~/.config` là ghi thẳng vào repo của bạn — kể cả token của `gh` và Copilot.
Mình chặn bằng `.gitignore`. Cách tránh từ đầu: `stow --no-folding`.
**Chốt:** Repo dotfiles mà public thì `.gitignore` là hàng rào cuối cùng — kiểm tra nó.

### 9 / 35 · Brewfile — One file lists every tool
**Nói:** Còn bản thân các tool? Brewfile. Mỗi dòng một package, kèm comment vì sao nó ở đây. Một lệnh
`brew bundle` là cài hết. Cài tay thứ gì thì thêm vào đây, không thì máy sau sẽ thiếu.
**→** Máy mới: cài Homebrew, clone repo, `brew bundle`, `stow`. README có đủ mười bước copy-paste.
**Chốt:** README chính là script cài đặt — bước nào không viết ra thì sẽ bị quên.

---

# Phần 02 — Terminal & CLI tools

### 10 / 35 · Divider — Terminal & CLI tools
**Nói:** Giờ tới cái cửa sổ bạn nhìn cả ngày: terminal, prompt, và mấy tool nhỏ thay cho `cd`, `ls`,
`find`, `Ctrl-R`.

### 11 / 35 · Terminal apps — Pick one whose settings are a text file
**Nói:** Năm lựa chọn phổ biến trên Mac. Terminal.app có sẵn, đủ dùng cho tới khi bạn muốn split hay
theme đồng bộ. iTerm2 nhiều tính năng nhất, nhưng settings nằm trong preferences, lưu thành plist —
khó diff. Ghostty và Alacritty nhanh, config là file text. Mình chọn WezTerm vì config là code Lua,
và cùng một file chạy trên macOS, Linux, Windows.
**Chốt:** Tiêu chí của mình chỉ một câu: settings có commit vào git được không.

### 12 / 35 · WezTerm — 66 lines of Lua
**Nói:** Toàn bộ config WezTerm là 66 dòng. Không có tab bar — WezTerm chỉ vẽ chữ, tab và pane để tmux
lo. Một chi tiết nhỏ: mình bỏ transparency. Cửa sổ trong suốt thì chữ đè lên app phía sau, khó đọc.
Thay vào đó vẽ wallpaper *bên trong* cửa sổ, phủ một lớp tối 96% — nhìn giống nhau dù phía sau là gì.
**→** Dòng highlight: `Shift+Enter` gửi `ESC + CR`, Claude Code hiểu là xuống dòng chứ không phải gửi
prompt. Và Nerd Font — icon của starship, eza, tmux đều là ký tự trong font này; thiếu nó là thấy ô vuông.
**Chốt:** Một binding nhỏ, nhưng viết prompt nhiều dòng cho Claude dễ hơn hẳn.

### 13 / 35 · Starship — The prompt shows only what the directory needs
**Nói:** Prompt là starship — một dòng `eval` trong `.zshrc`, config trong `starship.toml`. Ở thư mục
thường, prompt gọn: chỉ đường dẫn.
**→** Vào một project Node: thấy `package.json` là hiện branch, trạng thái git, version Node.
**→** Vào service Java: hiện Java 21 và Gradle. Viết bằng Rust nên nhanh, và chạy được cho zsh, bash, fish.
**Chốt:** Prompt nói cho bạn biết đang ở đâu, không hơn.

### 14 / 35 · zsh plugins — Suggestions from history, colors that catch typos
**Nói:** Hai plugin, không cần Oh My Zsh. Cái đầu: zsh-autosuggestions. Gõ `git p`, nó hiện phần còn
lại bằng chữ xám — lấy từ lệnh gần nhất trong history bắt đầu bằng thứ bạn gõ.
**→** Mặc định nhận bằng phím mũi tên phải. Mình bind `Shift+Tab` để `Tab` vẫn là completion bình
thường. Mũi tên lên thì tìm history theo prefix đã gõ.
**→** Cái thứ hai: zsh-syntax-highlighting. Gõ `gti` — đỏ, không có lệnh đó. `git` — xanh. Đường dẫn
tồn tại thì gạch chân. Quên đóng ngoặc kép thì vàng tới cuối dòng. Thấy lỗi trước khi bấm Enter.
Lưu ý: source nó ở cuối `.zshrc`.
**Chốt:** Cài bằng hai lệnh `git clone` và hai dòng `source`. Không framework.

### 15 / 35 · fzf + fd + bat
**Nói:** Ba tool ghép thành một pipeline. `fd` liệt kê file, nhanh, có file ẩn, bỏ `.git`. `fzf` lọc
mờ khi bạn gõ — gõ `tmxcnf` ra `.tmux.conf`. `bat` preview file đang chọn, có màu.
**→** Dùng hằng ngày qua ba phím: `Ctrl-T` chọn file dán vào lệnh, `Alt-C` nhảy thư mục, `Ctrl-R` tìm
history. Và một function nhỏ `gcof`: chọn branch bằng fzf rồi checkout, cả branch remote.
**Chốt:** `Ctrl-R` với fzf là thứ đầu tiên mình cài trên mọi máy.

### 16 / 35 · zoxide + eza
**Nói:** zoxide thay `cd`: nó nhớ mọi thư mục bạn từng vào, xếp theo tần suất và độ gần đây. `z loanbud`
là tới thẳng `~/Workplace/Spartan/loanbud-hq`. eza thay `ls`: có màu, icon, cột git status, `--tree`.
**Chốt:** Nhảy thư mục bằng tên, không bằng đường dẫn.

### 17 / 35 · Aliases — Alias what you type five times a day
**Nói:** Alias của mình chia bốn nhóm. Rút gọn: `v` là nvim, `lzd` là lazydocker. Nhảy thư mục: `zw`,
`zs`, `zd`. Sửa config: `cz`, `cv`, `ca`, `rz`. Và thay lệnh: `ls` thành eza.
**→** Cần tham số hay logic thì viết function, như `gcof`. Alias chỉ là thay chữ.
**Chốt:** Quy tắc: gõ năm lần một ngày thì đáng một alias.

### 18 / 35 · Dotfiles philosophy — Config is code; credentials are not
**Nói:** Gom lại phần này thành vài nguyên tắc. Một: mọi config vào git — có diff, lịch sử, backup.
Hai: secret thì không — file identity cá nhân, `~/.ssh`, token trong `.envrc`, `~/.aws` đều nằm ngoài repo.
**→** Ba: comment *tại sao*. Bốn: một theme cho mọi thứ — Tokyo Night trong WezTerm, tmux, bat, fzf,
delta, Claude Code; chụp màn hình tool nào cũng thấy cùng một máy. Chính deck này cũng dùng Tokyo Night.
**→** Năm: README là setup. Bước nào không ghi lại, máy sau sẽ không có.
**Chốt:** Config là code — đối xử với nó như code.

---

# Phần 03 — Multiple git accounts

### 19 / 35 · Divider — Multiple git accounts
**Nói:** Ai có tài khoản GitHub cá nhân và tài khoản công ty trên cùng một máy chắc gặp rồi: commit
công ty với email cá nhân, push bằng nhầm SSH key, `gh` đăng nhập nhầm người. Cách giải của mình:
để thư mục quyết định bạn là ai.

### 20 / 35 · includeIf — The directory decides who you are
**Nói:** Trong `.gitconfig` có hai dòng `includeIf`. Repo nằm dưới `~/Workplace/Karhdo/` thì nạp file
identity cá nhân; dưới `~/Workplace/Spartan/` thì nạp file công ty — name, email, signing key riêng.
**→** Cùng một lệnh `git config user.name`, ở hai thư mục cho ra hai kết quả. Mẹo nhỏ: mỗi file có một
alias riêng, `git spartan-check` in ra "Spartan config loaded" — biết ngay file nào đang được nạp.
**→** Dấu `/` cuối trong `gitdir:` là để khớp mọi repo bên dưới. Và `signingkey` cũng đến từ file đó:
mọi commit được ký bằng SSH key của đúng account, không cần GPG.
**Chốt:** Không phải nhớ đổi identity — `cd` là đủ.

### 21 / 35 · SSH host aliases — One host per key
**Nói:** Git config lo phần tên và email, còn push thì SSH. GitHub nhận diện bạn bằng key đầu tiên SSH
đưa ra. Nên mình có hai host alias cho cùng `github.com`: `github` dùng key cá nhân, `github-spartan`
dùng key công ty. `IdentitiesOnly yes` để ssh-agent không đưa nhầm key kia trước. Remote URL chọn alias.
**→** Khi clone thì dùng alias: `git@github-spartan:org/repo.git`. URL copy từ GitHub ghi `github.com`,
nhớ sửa chỗ đó.
**Chốt:** Remote URL quyết định key nào được dùng.

### 22 / 35 · gh + direnv — A token per workspace
**Nói:** Còn `gh` CLI có login riêng, không dùng SSH key. Mình dùng direnv: mỗi workspace có một
`.envrc` export `GH_TOKEN`, không bao giờ commit. Vào thư mục là có token, ra là mất.
**→** `gh` ưu tiên `GH_TOKEN` hơn login đã lưu, nên thư mục quyết định account. Mỗi workspace một
fine-grained token riêng — thu hồi cái này không ảnh hưởng cái kia.
**→** Tổng kết lại trong một bảng: thư mục quyết định git user, SSH host, gh account, signing key.
**Chốt:** Một lần setup, sau đó không bao giờ commit nhầm account nữa.

---

# Phần 04 — MacBook runtime

### 23 / 35 · Divider — MacBook runtime
**Nói:** Phần ngắn: một cái PATH giải thích được, và Docker mà không cần Docker Desktop.

### 24 / 35 · PATH — The last export wins
**Nói:** Bên trái là các dòng export trong `.zshrc`, theo thứ tự. Mỗi dòng `export PATH="X:$PATH"`
chèn thư mục lên *đầu*.
**→** Nên kết quả ngược lại: dòng export cuối cùng — libpq — đứng đầu PATH; Homebrew, dòng đầu tiên,
xuống cuối.
**→** Hai binary trùng tên thì cái đứng trước thắng — `which -a node` cho thấy mọi bản. Muốn thắng
Homebrew thì phải export *sau* `brew shellenv`. Và một gotcha: mỗi pane tmux chạy lại `.zshrc`, PATH
bị lặp đôi. Một dòng `typeset -U path` ở đầu file là giữ cho các entry không trùng.
**Chốt:** Lệnh chạy sai version? Nhìn thứ tự PATH trước.

### 25 / 35 · Docker without Docker Desktop — Colima
**Nói:** Mình không dùng Docker Desktop. Docker CLI cài từ brew là miễn phí; còn engine thì chạy trong
một VM Linux nhỏ tên Colima. CLI nói chuyện với engine qua `docker.sock`. `colima start` lần đầu với
CPU, RAM và Rosetta để chạy image amd64; `colima stop` là trả RAM lại.
**→** Lệnh `docker`, `docker compose` y như cũ. Hai chỗ cần biết: Testcontainers bỏ qua docker context,
phải set `DOCKER_HOST` trỏ vào socket của Colima. Và bind mount chỉ chạy từ `$HOME` — mount từ `/tmp`
ra thư mục rỗng, không báo lỗi.
**Chốt:** Cùng lệnh, cùng compose — chỉ có engine đổi chỗ.

---

# Phần 05 — AWS config

### 26 / 35 · Divider — AWS config
**Nói:** Một lần đăng nhập SSO trên browser, rồi mỗi môi trường một profile. Không có access key tĩnh
nằm trong file.

### 27 / 35 · SSO profiles — Log in once, switch by profile name
**Nói:** Đây là `~/.aws/config`, không nằm trong repo dotfiles. Một block `sso-session`, và ba profile
dev, staging, prod cùng trỏ vào session đó. Đăng nhập một lần, dùng cả ba.
**→** Để ý prod: role khác hẳn dev và staging. Khác biệt đó nằm ngay trong file config, ai đọc cũng thấy.
**→** Hằng ngày: `aws sso login` một lần qua browser, rồi `--profile` cho từng lệnh, hoặc
`export AWS_PROFILE` cho cả shell. Token có cache và tự hết hạn — không có key tĩnh nào phải xoay vòng.
**Chốt:** Key tĩnh sống mãi; token SSO thì hết hạn. Chọn cái hết hạn.

---

# Phần 06 — tmux & Claude sessions

### 28 / 35 · Divider — tmux & Claude sessions
**Nói:** Phần cuối, và là phần mình dùng nhiều nhất. tmux trước — session sống lâu hơn cửa sổ. Rồi Claude
Code trong popup cho từng project: ẩn, chọn, quay lại mà không mất.

### 29 / 35 · tmux — Sessions outlive the window
**Nói:** tmux có ba tầng. Session — mỗi project một cái. Window — giống tab. Pane — chia nhỏ trong window.
Tất cả chạy trong một tmux server ở nền. Đóng WezTerm, hay WezTerm crash, mọi shell và process vẫn chạy.
**→** `prefix d` để detach, `tmux attach -t LoanBud` là quay lại y nguyên. Và popup Claude lát nữa cũng
chính là tmux session — đó là lý do nó không chết khi bạn đóng.
**Chốt:** tmux là chỗ chứa công việc, không phải cửa sổ.

### 30 / 35 · .tmux.conf — One prefix, vim keys
**Nói:** Prefix của mình là `Ctrl-t` thay cho `Ctrl-b`. Di chuyển giữa pane bằng `h j k l` như vim,
resize bằng `Ctrl` + `h j k l`. Bật mouse, tăng history, tự đánh số lại window, và truyền true color
sang WezTerm. Bên phải là các phím dùng hằng ngày.
**→** Vì sao `Ctrl-t`: `Ctrl-b` phải với xa, lại trùng phím lùi con trỏ trong shell. Chọn prefix bấm được
bằng một tay.
**Chốt:** Một prefix, vài phím — đủ dùng cả ngày.

### 31 / 35 · tmux-claude-hatch — Claude in a popup
**Nói:** Vấn đề: chạy Claude cho bốn project là bốn tab, không biết tab nào đang chờ mình trả lời, lỡ
`Ctrl+C` là mất. Mình dùng plugin tmux-claude-hatch: Claude chạy trong popup, một phím là hiện. Bên trái
là config trong `.tmux.conf`. Bốn phím: `y` mở Claude cho thư mục hiện tại, `Y` mở với `--resume`,
`u` là picker liệt kê mọi Claude đang chạy kèm trạng thái waiting hay working, `d` để ẩn — Claude vẫn chạy.
**→** Mỗi popup là một tmux session lồng bên trong, nên ẩn chỉ là detach. Và script `claude.sh` của mình
thả về shell khi Claude thoát — `Ctrl+C` không bao giờ giết popup.
**Chốt:** Claude cách bạn đúng một phím, và không bao giờ bị đóng nhầm.

### 32 / 35 · claude-popup.sh — One popup per project, one window per directory
**Nói:** Đây là phần mình tự viết thêm. Bên trái là tmux session `LoanBud`, bắt đầu ở `loanbud-hq`. Bên
phải là popup session của nó — mỗi tmux session ngoài có đúng một popup session.
**→** Bấm `C-t y` ở pane `backend-hub`: tạo window `backend-hub` chạy Claude.
**→** Bấm ở pane `frontend`: thêm window thứ hai.
**→** Quay lại `backend-hub` bấm lần nữa: không tạo Claude mới, mở lại đúng window cũ — nhận ra nhờ tag
`@claude_dir`. Mặc định plugin tạo một popup cho mỗi thư mục; mình gom theo tmux session, nên trong popup
`C-t n/p` là lật qua các Claude của cùng project.
**Chốt:** Một project, một popup, mỗi thư mục một Claude — không bao giờ trùng.

### 33 / 35 · Claude Code settings — Claude knows it runs inside tmux
**Nói:** Đây là một đoạn trích `settings.json` của Claude Code — file thật không nằm trong repo vì có
token. `teammateMode: tmux` cùng agent teams: khi Claude tạo teammate, mỗi teammate mở trong một pane tmux
riêng, mình xem được chúng làm việc. Cùng theme Tokyo Night. Và các LSP plugin cho Claude go-to-definition,
diagnostics trong TypeScript, Python, Java.
**→** Còn cờ `--dangerously-skip-permissions` trong `.tmux.conf`: nó cho Claude đang ẩn làm việc tiếp mà
không dừng hỏi. Đổi lại, mọi lệnh chạy với quyền của bạn. Ổn trên máy cá nhân, mọi project trong git,
review diff trước khi commit. Không bao giờ dùng khi có credential prod sẵn trong shell.
**Chốt:** Bỏ qua permission là một lựa chọn có điều kiện, không phải mặc định.

### 34 / 35 · Live demo
**Nói:** Giờ chuyển qua terminal. *(Chuyển sang WezTerm.)*
1. Ở pane `backend-hub`, `C-t y`, giao Claude một task nhỏ — ví dụ đọc README và tóm tắt.
2. `C-t d` ẩn đi, gõ vài lệnh trong pane để thấy mình vẫn làm việc bình thường.
3. Sang pane `frontend`, `C-t y` — thấy window mới trong cùng popup.
4. Quay lại `backend-hub`, `C-t y` — đúng Claude cũ, vẫn đang chạy hoặc đã xong.
5. `C-t u` — picker: chỉ cho mọi người cột trạng thái, cái nào đang waiting.
6. Trong popup bấm `Ctrl+C` — Claude thoát nhưng shell còn; gõ `claude -c` để tiếp tục.

**Nếu demo trục trặc:** quay lại slide 32 và giải thích bằng hình — đừng debug trên sân khấu.
**Chốt:** Hai project, hai Claude, không mất cái nào.

### 35 / 35 · Thank you
**Nói:** Ba điều mang về. Một: `.zshrc`, dotfiles trong git, và một Brewfile — máy mới chỉ còn một tiếng
copy-paste. Hai: để thư mục quyết định — git identity, gh token, AWS profile. Ba: tmux giữ các session,
kể cả session Claude — ẩn, chọn, không bao giờ mất. Toàn bộ config ở repo này, quét QR là có, README là
mười bước setup. Cảm ơn mọi người — giờ mình nhận câu hỏi.

**Câu hỏi hay gặp, chuẩn bị sẵn:**
- *Sao không dùng Oh My Zsh?* — Hai plugin là đủ; Oh My Zsh nạp nhiều thứ không dùng, làm tab mới chậm.
- *iTerm2 có tmux integration sao không dùng?* — Muốn config là file text, và cùng một setup chạy trên Linux.
- *Skip permissions có an toàn không?* — Quay lại slide 33: chỉ trên máy cá nhân, mọi thứ trong git, không có credential prod trong shell.
- *Dotfiles public có lộ gì không?* — Secret nằm ngoài repo, `.gitignore` chặn `.config/gh` và Copilot; xem slide 8.
