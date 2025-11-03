# Changelog

All notable changes to GhUx will be documented in this file.

## [v1.0.1] - 2025-01-XX

### 🎉 Major Feature Update

Enhanced GhUx with account health monitoring, activity logging, CLI shortcuts, and multi-platform support.

### ✨ New Features

#### 🏥 Account Health Check
- **Health Monitoring**: Check SSH keys and tokens validity for all accounts
- **Expiry Detection**: Detect expiring tokens (within 7 days warning)
- **Comprehensive Testing**: Test SSH connections and token authentication
- **Health Summary**: Visual dashboard showing healthy, warning, and error states
- **Automatic Caching**: Health check results saved for quick reference

#### 📜 Activity Log
- **Operation Tracking**: Log all account switches, additions, removals, and tests
- **History View**: View recent activity with timestamps and details
- **Statistics Dashboard**: See account usage, repository usage, method preferences
- **CSV Export**: Export activity log to CSV for external analysis
- **Success/Failure Tracking**: Monitor operation outcomes

#### ⚡ CLI Shortcuts
- **Direct Commands**: Run operations without interactive menu
  - `ghux switch <account>` - Switch to specific account by name
  - `ghux quick` - Quick switch menu with recent accounts starred
  - `ghux status` - Show current repository status and active account
  - `ghux list` - List all configured accounts
  - `ghux health` - Run health check on all accounts
  - `ghux log` - View activity log and statistics

#### 🚀 Git Shortcuts (Shove Commands)
- **ghux shove <message>**: Add all files, commit with message, confirm before push
- **ghux shovenc**: Add all files, commit with empty message, confirm before push
- **Confirmation**: Always asks before pushing to prevent accidents
- **Activity Logging**: Automatically logs push operations

#### 🌐 Multi-Platform Git Service Support
- **Platform Selection**: Choose from GitHub, GitLab, Bitbucket, Gitea, or Other
- **Custom Domains**: Support for self-hosted instances (e.g., gitlab.company.com)
- **Platform-Specific Testing**: Tailored connection tests for each platform
- **API Endpoints**: Custom API URLs for enterprise installations
- **Platform Tracking**: Activity log tracks which platform was used

### 🔧 Improvements
- **Enhanced Help**: Updated help text with all new commands and examples
- **Better UX**: Quick switch shows recently used accounts first with star indicator
- **Detailed Status**: Repository status command shows comprehensive information
- **Activity Integration**: All operations automatically logged for tracking
- **Platform Awareness**: System detects and adapts to different git platforms

### 📊 New Commands
```bash
ghux switch work          # Direct switch to account
ghux quick                # Quick switch to recent account
ghux status               # Show current repo status
ghux shove "fix: bug"     # Add, commit, and push
ghux shovenc              # Add, commit (no msg), and push
ghux health               # Check all accounts health
ghux log                  # View activity history
```

### 🔧 Platform-Aware SSH Fixes
- **Multi-Platform SSH Support**: SSH config and testing now fully platform-aware
- **Success Pattern Recognition**: Recognizes authentication messages from:
  - GitHub: `Hi username! You've successfully authenticated`
  - GitLab: `Welcome to GitLab, @username!`
  - Bitbucket: `authenticated via ssh key`
  - Gitea: `Hi there, username!`
- **Dynamic Hostname**: SSH config blocks now use correct hostname for each platform
- **Exit Code Handling**: Properly handles different exit codes (0, 1, 255) across platforms
- **Custom Domain Support**: Self-hosted instances fully supported with custom domains

### 🛠️ Technical Changes
- **New Modules**: 
  - `src/healthCheck.ts` - Account health verification
  - `src/activityLog.ts` - Activity tracking and statistics
  - `src/shortcuts.ts` - CLI shortcut implementations
- **Enhanced Types**: Added `GitPlatform`, `PlatformConfig`, `HealthStatus`, `ActivityLogEntry`
- **Config Extension**: AppConfig now includes `activityLog`, `healthChecks`, `lastHealthCheck`
- **Platform Integration**: All authentication methods support multiple platforms

### 📚 Documentation
- **Updated README**: New features documented with examples
- **Command Reference**: Complete list of CLI shortcuts and their usage
- **Help Text**: Enhanced `--help` output with all commands

### 🐛 Bug Fixes
- **SSH Config**: Fixed hardcoded `github.com` in `ensureSshConfigBlock()` - now platform-aware
- **SSH Test**: Fixed regex patterns to recognize Bitbucket and Gitea success messages
- **Platform Detection**: All SSH operations now use correct hostname based on account platform
- **Logging Consistency**: All operations now properly logged
- **Error Handling**: Better error messages in health checks
- **Permission Checks**: SSH key permission validation before testing

### 🧪 Testing & Documentation
- **Platform Testing Script**: Added `test_ssh_platforms.sh` for automated SSH testing
- **Troubleshooting Guide**: Comprehensive `TROUBLESHOOTING.md` with platform-specific solutions
- **Platform Test Guide**: Detailed `TEST_PLATFORMS.md` with expected outputs for all platforms
- **Debug Instructions**: Step-by-step debugging guide for SSH connection issues

---

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
