import * as os from "os";
import * as fs from "fs";
import { run, exec } from "./utils/shell";
import { getGitCredentialsPath } from "./utils/platform";

const GIT_CREDENTIALS = getGitCredentialsPath();

export async function isGitRepo(cwd: string) {
    try {
        await run(["git", "rev-parse", "--is-inside-work-tree"], { cwd });
        return true;
    } catch {
        return false;
    }
}

export async function getGitRoot(cwd: string) {
    try {
        const root = await run(["git", "rev-parse", "--show-toplevel"], {
            cwd,
        });
        return root;
    } catch {
        return null;
    }
}

export async function getRemoteUrl(remote = "origin", cwd = process.cwd()) {
    try {
        return await run(["git", "remote", "get-url", remote], { cwd });
    } catch {
        return null;
    }
}

export function parseRepoFromUrl(url: string | null) {
    if (!url) return null;
    let m = url.match(/^git@[^:]+:([^\s]+)$/);
    if (m && m[1]) return m[1].replace(/^\/+/, "");
    m = url.match(/^ssh:\/\/[^/]+\/(.+)$/);
    if (m && m[1]) return m[1];
    m = url.match(/^https?:\/\/[^/]+\/(.+)$/);
    if (m && m[1]) return m[1];
    return null;
}

export async function setRemoteUrl(
    newUrl: string,
    remote = "origin",
    cwd = process.cwd(),
) {
    await run(["git", "remote", "set-url", remote, newUrl], { cwd });
}

export async function setLocalGitIdentity(
    userName?: string,
    email?: string,
    cwd = process.cwd(),
) {
    if (userName) await run(["git", "config", "user.name", userName], { cwd });
    if (email) await run(["git", "config", "user.email", email], { cwd });
}

export function withGitSuffix(repo: string) {
    return repo.endsWith(".git") ? repo : `${repo}.git`;
}

export async function ensureCredentialStore(username: string, token: string) {
    try {
        await run(["git", "config", "credential.helper", "store"]);
    } catch {}
    let existing = "";
    try {
        existing = fs.readFileSync(GIT_CREDENTIALS, "utf8");
    } catch {
        existing = "";
    }
    const lines = existing.split(/\r?\n/).filter(Boolean);
    const filtered = lines.filter((l) => !l.includes("@github.com"));
    filtered.push(
        `https://${encodeURIComponent(username)}:${encodeURIComponent(token)}@github.com`,
    );
    fs.writeFileSync(GIT_CREDENTIALS, filtered.join("\n") + "\n", "utf8");
}

export async function testTokenAuth(username: string, token: string) {
    if (!username || !token) {
        return { ok: false, message: "Username and token are required" };
    }

    try {
        const { code, stdout, stderr } = await exec([
            "curl",
            "-s",
            "-o",
            "/dev/null",
            "-w",
            "%{http_code}",
            "-u",
            `${username}:${token}`,
            "https://api.github.com/user",
        ]);

        const httpCode = (stdout || "").trim();
        const ok = httpCode === "200";

        if (ok) {
            return {
                ok: true,
                message: `HTTP ${httpCode} - Authentication successful`,
            };
        }

        // Provide detailed error messages based on HTTP status code
        let errorMessage = `HTTP ${httpCode}`;
        if (httpCode === "401") {
            errorMessage +=
                " - Invalid credentials. Check your username and token.";
        } else if (httpCode === "403") {
            errorMessage +=
                " - Access forbidden. Token may lack required permissions.";
        } else if (httpCode === "404") {
            errorMessage += " - Not found. Check your username.";
        } else if (httpCode === "000" || !httpCode) {
            errorMessage = "Connection failed. Check your network connection.";
        } else {
            errorMessage += " - Unexpected response from GitHub API.";
        }

        return { ok: false, message: errorMessage };
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        return { ok: false, message: `Token test error: ${errorMsg}` };
    }
}

export async function getCurrentGitUser(cwd = process.cwd()) {
    try {
        const userName = await run(["git", "config", "user.name"], { cwd });
        const userEmail = await run(["git", "config", "user.email"], { cwd });
        return { userName: userName.trim(), userEmail: userEmail.trim() };
    } catch {
        return null;
    }
}

export async function getCurrentRemoteInfo(cwd = process.cwd()) {
    try {
        const remoteUrl = await getRemoteUrl("origin", cwd);
        const repoPath = parseRepoFromUrl(remoteUrl || "");
        const isSSH = remoteUrl?.startsWith("git@") || false;
        return {
            remoteUrl,
            repoPath: repoPath?.replace(/\.git$/, ""),
            authType: isSSH ? "ssh" : "https",
        };
    } catch {
        return null;
    }
}
