import prompts from "prompts";
import { loadConfig } from "./config";
import { addAccountFlow, listAccounts, removeAccountFlow, switchForCurrentRepo, chooseAccount, detectActiveAccount } from "./flows";
import { generateSshKey } from "./ssh";
import { getCurrentGitUser, getCurrentRemoteInfo, isGitRepo } from "./git";
import { 
  showTitle, 
  showSection, 
  stylePrompt, 
  showSuccess, 
  showError, 
  showSeparator,
  showWarning,
  showBox,
  colors 
} from "./utils/ui";
import { ensureGithubCli, manageGithubCliFlow } from "./utils/githubCli";
import type { Account } from "./types";

// Get version from package.json
const PACKAGE_VERSION = "1.2.1";

function showVersion() {
  console.log(`ghup v${PACKAGE_VERSION}`);
  console.log("Beautiful GitHub Account Switcher");
  console.log("Interactive CLI tool for managing multiple GitHub accounts per repository");
  console.log("");
  console.log("GitHub: https://github.com/bangunx/ghup");
  console.log("NPM: https://www.npmjs.com/package/ghup");
}

function showHelp() {
  console.log("GhUp - GitHub Account Switcher");
  console.log("");
  console.log("Usage:");
  console.log("  ghup                 Start interactive mode");
  console.log("  ghup --version       Show version information");
  console.log("  ghup --help          Show this help message");
  console.log("");
  console.log("Interactive Commands:");
  console.log("  • Add account         Add a new GitHub account");
  console.log("  • Switch account      Switch account for current repository");
  console.log("  • List accounts       Show all configured accounts");
  console.log("  • Remove account      Remove an existing account");
  console.log("  • Test connection     Test SSH/token connectivity");
  console.log("  • Generate SSH key    Create new SSH key for an account");
  console.log("");
  console.log("Examples:");
  console.log("  ghup                 # Start interactive menu");
  console.log("  npm install -g ghup  # Install globally");
  console.log("");
  console.log("Documentation: https://github.com/bangunx/ghup#readme");
}

async function showRepositoryContext(accounts: Account[]) {
  const cwd = process.cwd();

  if (!(await isGitRepo(cwd))) {
    showBox(colors.muted("Run ghup inside a Git repository to see active account details."), {
      title: "Repository Context",
      type: "info",
    });
    return;
  }

  const [activeAccount, remoteInfo, gitUser] = await Promise.all([
    detectActiveAccount(accounts, cwd),
    getCurrentRemoteInfo(cwd),
    getCurrentGitUser(cwd),
  ]);

  const lines: string[] = [];

  if (remoteInfo?.repoPath) {
    lines.push(`Repository: ${colors.accent(remoteInfo.repoPath)}`);
    const [owner] = remoteInfo.repoPath.split("/");
    if (owner) {
      lines.push(`Owner: ${colors.text(owner)}`);
    }
  } else {
    lines.push(colors.warning("No origin remote configured"));
  }

  if (remoteInfo?.authType) {
    lines.push(`Auth Type: ${colors.secondary(remoteInfo.authType.toUpperCase())}`);
  }

  if (gitUser) {
    lines.push(`Git User: ${colors.text(gitUser.userName || "Not set")}`);
    lines.push(`Git Email: ${colors.text(gitUser.userEmail || "Not set")}`);
  }

  if (activeAccount) {
    lines.push(`Active Account: ${colors.success(activeAccount)}`);
  } else {
    lines.push(colors.warning("Active account could not be detected"));
  }

  showBox(lines.join("\n"), {
    title: "Repository Context",
    type: activeAccount ? "success" : "warning",
  });
}

export async function main() {
  // Handle command line arguments
  const args = process.argv.slice(2);
  
  if (args.includes('--version') || args.includes('-v')) {
    showVersion();
    return;
  }
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  
  // Show beautiful title
  showTitle();

  await ensureGithubCli({ promptInstall: false, promptLogin: false });

  const cfg = loadConfig();
  
  while (true) {
    showSection("Main Menu");

    await showRepositoryContext(cfg.accounts);
    
    const { action } = await prompts({
      type: "select",
      name: "action",
      message: stylePrompt("Choose an action"),
      choices: [
        { 
          title: colors.primary("🔄 Switch account for current repo"), 
          value: "switch",
          description: "Change GitHub account for this repository"
        },
        { 
          title: colors.accent("📋 List accounts"), 
          value: "list",
          description: "View all configured accounts"
        },
        { 
          title: colors.success("➕ Add account"), 
          value: "add",
          description: "Configure a new GitHub account"
        },
        { 
          title: colors.secondary("✏️  Edit account"), 
          value: "edit",
          description: "Modify existing account settings"
        },
        { 
          title: colors.warning("🗑️  Remove account"), 
          value: "remove",
          description: "Delete an account configuration"
        },
        { 
          title: colors.accent("🔑 Generate SSH key"), 
          value: "genkey",
          description: "Create new SSH key for an account"
        },
        { 
          title: colors.secondary("📥 Import SSH private key"), 
          value: "importkey",
          description: "Import existing SSH key"
        },
        { 
          title: colors.primary("🌐 Switch SSH globally"), 
          value: "globalssh",
          description: "Change global SSH configuration"
        },
        { 
          title: colors.accent("🧪 Test connection"), 
          value: "test",
          description: "Verify account authentication"
        },
        { 
          title: colors.accent("☁ Kelola GitHub CLI"), 
          value: "githubcli",
          description: "Instal, cek status, login, dan lihat panduan perintah"
        },
        { 
          title: colors.muted("🚪 Exit"), 
          value: "exit",
          description: "Close the application"
        },
      ],
      initial: 0,
    });

    if (action === "exit" || action === undefined) {
      showSeparator();
      showSuccess("Thank you for using GhUp! 👋");
      break;
    }
    
    try {
      showSeparator();
      
      if (action === "switch") await switchForCurrentRepo(cfg);
      if (action === "list") await listAccounts(cfg);
      if (action === "add") await addAccountFlow(cfg);
      if (action === "edit") {
        const { editAccountFlow } = await import("./flows");
        await editAccountFlow(cfg);
      }
      if (action === "remove") await removeAccountFlow(cfg);
      if (action === "genkey") {
        if (!cfg.accounts.length) {
          showError("No accounts found. Please add an account first.");
        } else {
          const acc = await chooseAccount(cfg.accounts);
          if (acc?.ssh) {
            const keyPath = acc.ssh.keyPath;
            await generateSshKey(keyPath, acc.gitEmail || acc.gitUserName || `${acc.name}@github`);
            showSuccess(`Generated SSH key: ${keyPath}`);
          } else {
            showWarning("Selected account has no SSH configuration.");
          }
        }
      }
      if (action === "importkey") {
        const { importSshKeyFlow } = await import("./flows");
        await importSshKeyFlow(cfg);
      }
      if (action === "test") {
        const { testConnectionFlow } = await import("./flows");
        await testConnectionFlow(cfg);
      }
      if (action === "globalssh") {
        const { switchGlobalSshFlow } = await import("./flows");
        await switchGlobalSshFlow(cfg);
      }
      if (action === "githubcli") {
        await manageGithubCliFlow();
      }
    } catch (e: any) {
      showError(`Operation failed: ${e?.message || String(e)}`);
    }
    
    // Add a pause before showing menu again
    console.log();
    await prompts({
      type: "text",
      name: "continue",
      message: colors.muted("Press Enter to continue..."),
      initial: ""
    });
  }
}
