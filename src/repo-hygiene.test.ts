import { describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import { resolve } from "node:path";

/**
 * Round-6 contract (docs/code-review-audit-round6-2026-08-31.md C1): no secret
 * material may be tracked in git. `docs/ssh-key.txt` was committed in 0be0fe8
 * despite the .gitignore entry — ignore rules do not untrack files. This guard
 * fails if the key (or any key-like artifact) ever re-enters the index.
 * Rotation of the leaked key remains a repo-owner action (history keeps it).
 */
const root = resolve(__dirname, "..");

function trackedFiles(): string[] {
  const out = execSync("git ls-files", {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  return out.split("\n").filter(Boolean);
}

describe("no secret material is tracked", () => {
  it("does not track docs/ssh-key.txt (round-6 C1)", () => {
    const tracked = trackedFiles();
    expect(tracked).not.toContain("docs/ssh-key.txt");
  });

  it("tracks no key-like files anywhere (pem/key/id_rsa patterns)", () => {
    const suspicious = trackedFiles().filter((f) =>
      /(^|\/)(id_rsa|id_ed25519|id_ecdsa)(\..*)?$|\.pem$|\.key$|ssh-key/i.test(f),
    );
    expect(suspicious).toEqual([]);
  });
});

describe("no reference copies are tracked", () => {
  // Round-12 guard (audit F-9): the src.orig/ reference copy shipped tracked
  // in git (64 files) even though .gitignore listed it — ignore rules do not
  // untrack, the exact lesson of round-6 C1. Pruned 2026-08-31; this fails if
  // it (or any src.orig path) ever re-enters the index.
  it("does not track the src.orig/ reference copy (audit F-9)", () => {
    const tracked = trackedFiles();
    const leftovers = tracked.filter((f) => f === "src.orig" || f.startsWith("src.orig/"));
    expect(leftovers).toEqual([]);
  });
});
