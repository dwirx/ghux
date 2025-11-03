# 📦 GhUp Installation & Distribution Guide

Panduan lengkap instalasi GhUp dengan berbagai metode, seperti yang Anda minta!

## 🚀 Instalasi One-Line (Termudah)

### Curl (Semua Platform)
```bash
curl -fsSL https://raw.githubusercontent.com/bangunx/ghup/main/install-curl.sh | bash
```

### Wget (Linux)
```bash
wget -qO- https://raw.githubusercontent.com/bangunx/ghup/main/install-curl.sh | bash
```

Script ini akan otomatis:
- Detect platform Anda (Linux x64/ARM64, macOS Intel/ARM, Windows)
- Download binary yang sesuai
- Install ke `/usr/local/bin/ghup` atau `~/.local/bin/ghup`
- Setup PATH jika diperlukan

## 📦 Package Managers

### NPM/Yarn/PNPM/Bun (Seperti `@google/gemini-cli`)

**NPM**
```bash
npm install -g ghup
```

**Yarn**
```bash
yarn global add ghup
```

**PNPM**
```bash
pnpm add -g ghup
```

**Bun** (Recommended!)
```bash
bun install -g ghup
```

Setelah install, langsung bisa run:
```bash
ghup
```

### Homebrew (macOS/Linux)
```bash
# Add tap (sekali saja)
brew tap bangunx/ghup

# Install
brew install ghup
```

### Arch Linux (AUR)

**Using yay**
```bash
yay -S ghup-bin
```

**Using paru** 
```bash
paru -S ghup-bin
```

**Manual dengan makepkg**
```bash
git clone https://aur.archlinux.org/ghup-bin.git
cd ghup-bin
makepkg -si
```

### Scoop (Windows)
```powershell
# Add bucket (sekali saja)
scoop bucket add bangunx https://github.com/bangunx/scoop-ghup

# Install
scoop install ghup
```

### Chocolatey (Windows)
```powershell
choco install ghup
```

## 📥 Manual Download

Download dari [GitHub Releases](https://github.com/bangunx/ghup/releases/latest):

- **Linux x64**: `ghup`
- **Linux ARM64**: `ghup-linux-arm64`
- **Windows x64**: `ghup.exe`
- **macOS Intel**: `ghup-macos`
- **macOS Apple Silicon**: `ghup-macos-arm64`

### Install Manual

**Linux/macOS**:
```bash
# Download
wget https://github.com/bangunx/ghup/releases/latest/download/ghup

# Make executable
chmod +x ghup

# Move to PATH
sudo mv ghup /usr/local/bin/

# Test
ghup --version
```

**Windows**:
```powershell
# Download (gunakan browser atau PowerShell)
Invoke-WebRequest -Uri "https://github.com/bangunx/ghup/releases/latest/download/ghup.exe" -OutFile "ghup.exe"

# Move to PATH
Move-Item ghup.exe C:\Windows\System32\

# Test
ghup --version
```

## ✅ Verifikasi Instalasi

Setelah install dengan metode apapun:
```bash
# Cek versi
ghup --version
# atau
ghup -v

# Lihat bantuan
ghup --help
# atau
ghup -h

# Jalankan interaktif
ghup
```

Output versi akan terlihat seperti ini:
```
ghup v1.2.1
Beautiful GitHub Account Switcher
Interactive CLI tool for managing multiple GitHub accounts per repository

GitHub: https://github.com/bangunx/ghup
NPM: https://www.npmjs.com/package/ghup
```

## 🔄 Update

### Package Managers
```bash
# NPM
npm update -g ghup

# Yarn
yarn global upgrade ghup

# Bun
bun update -g ghup

# Homebrew
brew upgrade ghup

# Arch Linux
yay -Syu ghup-bin

# Scoop
scoop update ghup

# Chocolatey
choco upgrade ghup
```

### One-line Installer
Jalankan lagi script instalasi - akan otomatis replace dengan versi terbaru:
```bash
curl -fsSL https://raw.githubusercontent.com/bangunx/ghup/main/install-curl.sh | bash
```

## 🗑️ Uninstall

### Package Managers
```bash
# NPM
npm uninstall -g ghup

# Yarn  
yarn global remove ghup

# Bun
bun remove -g ghup

# Homebrew
brew uninstall ghup

# Arch Linux
yay -R ghup-bin

# Scoop
scoop uninstall ghup

# Chocolatey
choco uninstall ghup
```

### Manual
```bash
# Remove binary
sudo rm /usr/local/bin/ghup
# atau
rm ~/.local/bin/ghup

# Remove config (opsional)
rm -rf ~/.config/github-switch/
```

## 🆘 Troubleshooting

### Command not found
```bash
# Pastikan di PATH
echo $PATH

# Untuk ~/.local/bin, tambah ke shell profile
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Permission denied
```bash
# Make executable
chmod +x ghup

# Atau untuk global install
sudo mv ghup /usr/local/bin/
```

### Network Issues
- Gunakan VPN jika GitHub diblokir
- Download manual dari GitHub Releases
- Cek koneksi internet

## 🎯 Alias Global

Setelah instalasi, Anda bisa gunakan alias `ghup` dari mana saja:

```bash
# Di repository manapun
cd ~/my-project
ghup

# Atau langsung test
ghup --version
```

## 🚀 Quick Start

1. **Install** dengan salah satu metode di atas
2. **Run** `ghup` 
3. **Add account** pertama Anda
4. **Switch** antar akun di repository manapun
5. **Done!** 🎉

## 📚 Dokumentasi Lengkap

- [README.md](README.md) - Overview dan fitur
- [INSTALL.md](INSTALL.md) - Detail instalasi semua platform
- [DISTRIBUTION.md](DISTRIBUTION.md) - Untuk maintainer package

---

**Sekarang GhUp bisa diinstall seperti tool populer lainnya!** 

Mirip dengan:
- `npm install -g @google/gemini-cli`
- `curl -fsSL https://opencode.ai/install | bash`
- `brew install sst/tap/opencode`
- `yay -S opencode-bin`

Tetapi untuk **GhUp** dengan alias `ghup` 🎯
