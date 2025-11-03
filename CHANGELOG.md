# Changelog

All notable changes to GhUx will be documented in this file.

## [v1.0.0] - 2025-01-XX

### 🎉 Initial Release

The first official release of **GhUx** (formerly GhUp) - a beautiful GitHub account switcher for managing multiple GitHub accounts per repository.

### ✨ Core Features
- **Beautiful Terminal UI**: Charm-inspired interface with colors, gradients, and animations
- **Multi-Account Management**: Add, edit, remove, and list multiple GitHub accounts
- **Dual Authentication**: Support for both SSH keys and Personal Access Tokens
- **Repository Switching**: Switch accounts per repository with automatic configuration
- **Active Account Detection**: Automatically detect which account is currently active in a repository
- **Cross-Platform Support**: Full compatibility with Linux, Windows, and macOS

### 🔐 Authentication Methods
- **SSH Keys**: 
  - Generate new Ed25519 SSH keys
  - Import existing SSH keys
  - Automatic SSH config management
  - Per-account SSH key configuration
  - Global SSH configuration switching
- **Personal Access Tokens**:
  - HTTPS authentication with tokens
  - Credential store integration
  - Per-repository token management

### 🧪 Enhanced Connection Testing
- **SSH Key Validation**: Check if SSH key exists before testing connection
- **Enhanced Error Messages**: Display ✓/✗ icons with clear success/failure indicators
- **Inline Troubleshooting**: Provide step-by-step guidance when connection fails
- **Username Extraction**: Show authenticated username from GitHub response
- **HTTP Status Mapping**: Map token auth HTTP codes to descriptive error messages
- **Comprehensive Error Handling**: Try-catch blocks with detailed error information
- **Smart Host Detection**: Always test to github.com directly (fixes hostname resolution issues)
- **Visual Feedback**: Added loading spinners during connection tests
- **Detailed Logging**: Include operation details and status messages in output

### 🎯 User Experience
- **Interactive CLI**: Beautiful prompts with autocomplete and validation
- **Repository Context**: Show current repository status and active account
- **Visual Indicators**: Color-coded status indicators and icons
- **Helpful Messages**: Clear success/error messages with actionable guidance
- **Command Line Arguments**: Support for `--version` and `--help` flags

### 🛠️ Technical Features
- **Built with Bun**: Fast TypeScript runtime for optimal performance
- **Zero Dependencies**: Standalone binaries with everything included
- **TypeScript**: Fully typed codebase for reliability
- **Cross-Shell Compatibility**: Works with bash, zsh, fish, and other shells
- **Automatic Updates**: GitHub Actions workflows for releases and NPM publishing

### 📦 Distribution
- **NPM Package**: `npm install -g ghux`
- **Pre-built Binaries**: Available for all major platforms
- **GitHub Releases**: Automated release workflow with checksums
- **Multiple Install Methods**: One-line installer, package managers, manual download

### 🐛 Bug Fixes
- **SSH Hostname Resolution**: Fixed "Could not resolve hostname" error by always testing to github.com
- **Template Literal**: Fixed unclosed template literal in ASCII art rendering
- **Function Export**: Ensured all UI utility functions are properly exported
- **Permission Handling**: Proper file permissions for SSH keys and config files

### 📚 Documentation
- Complete README with usage examples
- Installation guides for all platforms
- Troubleshooting documentation
- Contributing guidelines
- Comprehensive inline code documentation

### 🆕 Added
- **Cross-Platform Support**: Full Windows, Linux, macOS compatibility
- **Platform Detection Utility**: Automatic OS detection and proper path handling
- **Enhanced Build System**: Organized standalone binary outputs in `build/` directory
- **Windows Compatibility Fixes**: Resolved figlet font loading issues on Windows

### 🔧 Fixed
- **Figlet Font Loading**: Graceful fallback system for ASCII art rendering on Windows
- **Path Handling**: Platform-aware SSH directory and config file paths
- **Git Credentials**: Cross-platform git credentials file location handling
- **TypeScript Compilation**: Fixed array indexing and multiselect prompt issues

### 🏗️ Infrastructure
- **Build Organization**: All build artifacts now organized in `build/` directory
- **GitHub Actions**: Updated CI/CD workflows for cross-platform builds
- **Type Safety**: Enhanced TypeScript strict mode compliance
- **Error Handling**: Improved null checks and error boundaries

### 🎨 UI/UX
- **Visual Consistency**: Platform-aware messages and path displays
- **User Experience**: Better error messages with platform-specific context
- **Interactive Prompts**: Fixed multiselect behavior for account method selection

### 🔧 Technical Improvements
- **Code Quality**: Refactored testConnectionFlow for better maintainability
- **Spinner Indicators**: Added loading spinners for visual feedback during tests
- **Smart Host Detection**: Automatically uses hostAlias or falls back to github.com
- **Detailed Logging**: Console output includes operation details and status messages

### 📚 Documentation
- **Cross-Platform Notes**: Updated README with Windows compatibility information
- **Build Instructions**: Enhanced documentation for multi-platform builds

---

## [v1.1.0] - Previous Version

### Features
- Interactive CLI for GitHub account switching
- SSH and Token authentication support
- Repository-specific account management
- Beautiful terminal UI with gradients and colors
- SSH key generation and management

---

**Legend:**
- 🆕 Added: New features
- 🔧 Fixed: Bug fixes
- 🏗️ Infrastructure: Build, CI/CD, tooling
- 🎨 UI/UX: User interface improvements
- 📝 Documentation: Documentation updates
