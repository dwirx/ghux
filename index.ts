#!/usr/bin/env bun
import { main } from "./src/cli";

// Parse command line arguments
const args = process.argv.slice(2);

// Handle direct commands
if (args.length > 0) {
    const command = args[0];

    // Check if first argument is a URL (for git clone functionality)
    if (
        command &&
        (command.startsWith("http://") ||
            command.startsWith("https://") ||
            command.startsWith("git@") ||
            command.startsWith("ssh://"))
    ) {
        // ghux <repo-url> [target-dir]
        const { cloneRepositoryFlow } = await import("./src/flows");
        const repoUrl = command;
        const targetDir = args[1]; // optional
        await cloneRepositoryFlow(repoUrl, targetDir);
        process.exit(0);
    }

    // CLI Shortcuts
    if (command === "switch" && args.length > 1) {
        // ghux switch <account-name>
        const { switchToAccount } = await import("./src/shortcuts");
        const accountName = args[1];
        if (accountName) {
            await switchToAccount(accountName);
        }
        process.exit(0);
    }

    if (command === "quick") {
        // ghux quick - quick switch menu
        const { quickSwitch } = await import("./src/shortcuts");
        await quickSwitch();
        process.exit(0);
    }

    if (command === "status") {
        // ghux status - show current repo status
        const { showStatus } = await import("./src/shortcuts");
        await showStatus();
        process.exit(0);
    }

    if (command === "list") {
        // ghux list - list all accounts
        const { listAccounts } = await import("./src/shortcuts");
        await listAccounts();
        process.exit(0);
    }

    if (command === "shove" && args.length > 1) {
        // ghux shove <message> - add, commit with message, confirm push
        const { shove } = await import("./src/shortcuts");
        const message = args.slice(1).join(" ");
        await shove(message);
        process.exit(0);
    }

    if (command === "shovenc") {
        // ghux shovenc - add, commit with empty message, confirm push
        const { shoveNoCommit } = await import("./src/shortcuts");
        await shoveNoCommit();
        process.exit(0);
    }

    if (command === "health") {
        // ghux health - check health of all accounts
        const { healthCheckFlow } = await import("./src/flows");
        await healthCheckFlow();
        process.exit(0);
    }

    if (command === "log") {
        // ghux log - show activity log
        const { showActivityLogFlow } = await import("./src/flows");
        await showActivityLogFlow();
        process.exit(0);
    }

    // Help and version are handled in main()
}

// Start interactive mode
main();
