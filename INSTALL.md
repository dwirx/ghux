# 📦 GhUp Installation Methods

Multiple ways to install GhUp on your system:

## 🚀 One-line Install (Recommended)

**Curl (Cross-platform)**
```bash
curl -fsSL https://raw.githubusercontent.com/bangunx/ghup/main/install-curl.sh | bash
```

**Wget (Linux)**
```bash
wget -qO- https://raw.githubusercontent.com/bangunx/ghup/main/install-curl.sh | bash
```

This will automatically detect your platform and install the appropriate binary to `/usr/local/bin` or `~/.local/bin`.

## 📦 Package Managers

### NPM/Yarn (Global Installation)

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

### Bun (Recommended for Bun users)

```bash
bun install -g ghup
```

### Homebrew (macOS/Linux)

```bash
# Add the tap (once)
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

**Using makepkg**
```bash
git clone https://aur.archlinux.org/ghup-bin.git
cd ghup-bin
makepkg -si
```

### Scoop (Windows)

```powershell
# Add bucket (once)
scoop bucket add bangunx https://github.com/bangunx/scoop-ghup

# Install
scoop install ghup
```

### Chocolatey (Windows)

```powershell
choco install ghup
```

## 📥 Manual Download

Download pre-built binaries from [GitHub Releases](https://github.com/bangunx/ghup/releases/latest):

- **Linux x64**: `ghup`
- **Linux ARM64**: `ghup-linux-arm64`
- **Windows x64**: `ghup.exe`
- **macOS Intel**: `ghup-macos`
- **macOS Apple Silicon**: `ghup-macos-arm64`

### Manual Installation Steps

1. **Download** the appropriate binary for your platform
2. **Make executable** (Linux/macOS):
   ```bash
   chmod +x ghup
   ```
3. **Move to PATH** (optional, for global access):
   ```bash
   # Linux/macOS
   sudo mv ghup /usr/local/bin/
   
   # Or to user directory
   mkdir -p ~/.local/bin
   mv ghup ~/.local/bin/
   
   # Windows (as administrator)
   move ghup.exe C:\Windows\System32\
   ```

## 🔧 Development Installation

For contributors or advanced users who want to build from source:

```bash
# Clone repository
git clone https://github.com/bangunx/ghup.git
cd GhUp

# Install dependencies
bun install

# Run in development
bun run start

# Build standalone binary
bun run build
```

## ✅ Verify Installation

After installation, verify it works:

```bash
ghup --version
```

You should see the version number and be able to run:

```bash
ghup
```

## 🔄 Updating

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
Simply run the one-line installer again - it will download and replace the existing binary with the latest version.

## 🗑️ Uninstalling

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

### Manual Removal
```bash
# Remove binary
sudo rm /usr/local/bin/ghup
# or
rm ~/.local/bin/ghup

# Remove configuration (optional)
rm -rf ~/.config/github-switch/
```

## 🆘 Troubleshooting

### Command not found
- Make sure the installation directory is in your `$PATH`
- For `~/.local/bin`, add to your shell profile:
  ```bash
  export PATH="$HOME/.local/bin:$PATH"
  ```

### Permission denied
- Make sure the binary is executable: `chmod +x ghup`
- For global installation, you may need `sudo`

### Download issues
- Check your internet connection
- Try using a VPN if GitHub is blocked
- Download manually from GitHub Releases

---

**Need help?** Open an issue on [GitHub](https://github.com/bangunx/ghup/issues) or check our [documentation](https://github.com/bangunx/ghup).
