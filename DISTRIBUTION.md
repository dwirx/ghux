# GhUp - GitHub Account Switcher

A beautiful, interactive CLI tool for managing multiple GitHub accounts per repository.

## 📦 Installation Methods

### 🚀 One-line Install (Recommended)

**Curl (Cross-platform)**
```bash
curl -fsSL https://raw.githubusercontent.com/bangunx/ghup/main/install-curl.sh | bash
```

**Wget (Linux)**
```bash
wget -qO- https://raw.githubusercontent.com/bangunx/ghup/main/install-curl.sh | bash
```

This automatically detects your platform and installs the appropriate binary.

### 📦 Package Managers

**NPM/Yarn/PNPM/Bun**
```bash
npm install -g ghup
yarn global add ghup
pnpm add -g ghup
bun install -g ghup
```

**Homebrew (macOS/Linux)**
```bash
brew tap bangunx/ghup
brew install ghup
```

**Arch Linux (AUR)**
```bash
yay -S ghup-bin
paru -S ghup-bin
```

**Scoop (Windows)**
```powershell
scoop bucket add bangunx https://github.com/bangunx/scoop-ghup
scoop install ghup
```

**Chocolatey (Windows)**
```powershell
choco install ghup
```

### Download and Install

1. Download the appropriate binary for your platform:
   - **Linux x64**: `ghup`
   - **Linux ARM64**: `ghup-linux-arm64`
   - **Windows x64**: `ghup.exe`
   - **macOS Intel**: `ghup-macos`
   - **macOS Apple Silicon**: `ghup-macos-arm64`

2. Make it executable (Linux/macOS):
   ```bash
   chmod +x ghup
   ```

3. Run it:
   ```bash
   # Linux/macOS
   ./ghup
   
   # Windows
   ./ghup.exe
   ```

### Global Installation (Optional)

To use `ghup` from anywhere, move it to your PATH:

**Linux/macOS:**
```bash
# Copy to a directory in your PATH
sudo cp ghup /usr/local/bin/
# Now you can run: ghup
```

**Windows:**
```cmd
# Copy to a directory in your PATH, e.g.:
copy ghup.exe C:\Windows\System32\
# Now you can run: ghup
```

## ✨ Features

- 🔄 **Switch between multiple GitHub accounts** per repository
- 🔐 **Dual authentication support**: SSH keys and Personal Access Tokens
- 🎨 **Beautiful terminal interface** with colors and animations
- 🔍 **Active account detection** - see which account is currently active
- 🧪 **Connection testing** - verify your GitHub connectivity
- ⚡ **Zero dependencies** - single executable file
- 🖥️ **Cross-platform** - works on Linux, Windows, and macOS

## 🚀 Quick Start

1. **Run GhUp**:
   ```bash
   ./ghup
   ```

2. **Add your first account**:
   - Choose "➕ Add account"
   - Enter account details (name, git identity)
   - Choose authentication method (SSH or Token)
   - Follow the prompts

3. **Switch accounts in any repository**:
   - Navigate to your git repository
   - Run `./ghup`
   - Choose "🔄 Switch account for current repo"
   - Select your desired account

4. **Test your connection**:
   - Choose "🧪 Test connection"
   - Verify GitHub connectivity

## 📋 Account Management

### SSH Authentication
- Uses SSH keys for authentication
- Supports host aliases for multiple accounts
- Automatically manages `~/.ssh/config`
- Can generate new SSH keys if needed

### Token Authentication  
- Uses GitHub Personal Access Tokens
- Manages Git credential store
- Perfect for HTTPS workflows
- Secure token storage

### Dual Method Support
Each account can have BOTH SSH and token authentication configured for maximum flexibility.

## 🔧 Configuration

GhUp stores its configuration in:
- **Linux/macOS**: `~/.config/github-switch/config.json`
- **Windows**: `%APPDATA%\github-switch\config.json`

## 🛠️ Development

If you want to build from source:

```bash
# Clone the repository
git clone https://github.com/bangunx/ghup.git
cd GhUp

# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Install dependencies
bun install

# Run in development mode
bun run index.ts

# Build standalone executables
chmod +x build.sh
./build.sh
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

Found a bug or have a feature request? Please open an issue on GitHub.

---

Made with ❤️ using Bun and TypeScript
