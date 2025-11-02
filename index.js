#!/usr/bin/env node

import fs from "fs";
import path from "path";
import chalk from "chalk";
import clipboardy from "clipboardy";
import readline from "readline";

let currentPath = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
let cursor = 0;

// Validate initial path
try {
    if (!fs.existsSync(currentPath)) {
        console.error(chalk.red(`Error: Path does not exist: ${currentPath}`));
        process.exit(1);
    }
    if (!fs.statSync(currentPath).isDirectory()) {
        console.error(chalk.red(`Error: Path is not a directory: ${currentPath}`));
        process.exit(1);
    }
} catch (err) {
    console.error(chalk.red(`Error accessing path: ${err.message}`));
    process.exit(1);
}

function listDir(dir) {
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        return entries
            .map(e => ({
                name: e.name,
                path: path.join(dir, e.name),
                isDir: e.isDirectory(),
            }))
            .sort((a, b) => (a.isDir === b.isDir ? a.name.localeCompare(b.name) : b.isDir - a.isDir));
    } catch (err) {
        console.error(chalk.red(`Error reading directory: ${err.message}`));
        return [];
    }
}

function clearScreen() {
    // Multiple clearing methods for better compatibility
    try {
        // Method 1: Node.js built-in (most reliable)
        console.clear();
    } catch (err) {
        // Method 2: ANSI escape sequences as fallback
        process.stdout.write("\x1b[2J\x1b[0f");
    }
    
    // Ensure cursor is at top-left
    process.stdout.write("\x1b[H");
}

function render(items) {
    clearScreen();
    
    // Ensure cursor is within bounds
    if (items.length > 0 && cursor >= items.length) {
        cursor = 0;
    }
    
    // Add some visual separation
    console.log(chalk.cyan.bold(`\n📂 ${currentPath}\n`));
    
    if (items.length === 0) {
        console.log(chalk.gray("  (Empty directory)\n"));
    } else {
        // Handle scrolling for large directories
        const maxDisplayItems = 15;
        const totalItems = items.length;
        
        let startIndex = 0;
        if (totalItems > maxDisplayItems) {
            // Center the cursor in the visible area
            startIndex = Math.max(0, cursor - Math.floor(maxDisplayItems / 2));
            // Adjust if we're near the end
            if (startIndex + maxDisplayItems > totalItems) {
                startIndex = totalItems - maxDisplayItems;
            }
        }
        
        const endIndex = Math.min(startIndex + maxDisplayItems, totalItems);
        const displayItems = items.slice(startIndex, endIndex);
        
        displayItems.forEach((item, i) => {
            const actualIndex = startIndex + i;
            const pointer = actualIndex === cursor ? chalk.green("➜") : " ";
            const icon = item.isDir ? chalk.blue("📁") : chalk.white("📄");
            const name = actualIndex === cursor ? chalk.yellow.bold(item.name) : item.name;
            console.log(`${pointer} ${icon} ${name}`);
        });
        
        // Show scroll indicator
        if (totalItems > maxDisplayItems) {
            const current = cursor + 1;
            console.log(chalk.gray(`\n  Showing ${startIndex + 1}-${endIndex} of ${totalItems} items (${current}/${totalItems})`));
        }
    }
    
    console.log(chalk.gray("\n↑↓ Move | Enter Open/Copy | Backspace Up | Esc Exit\n"));
}

// Cleanup function to restore terminal state
function cleanup() {
    try {
        clearScreen();
        process.stdin.setRawMode(false);
        process.stdin.pause();
    } catch (err) {
        // Ignore cleanup errors
    }
}

// Handle process termination gracefully
process.on('SIGINT', () => {
    cleanup();
    process.exit(0);
});

process.on('SIGTERM', () => {
    cleanup();
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    cleanup();
    console.error(chalk.red(`Unexpected error: ${err.message}`));
    process.exit(1);
});

let items = listDir(currentPath);
render(items);

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (_, key) => {
    if (key.name === "up" && items.length > 0) {
        cursor = (cursor - 1 + items.length) % items.length;
        render(items);
    } else if (key.name === "down" && items.length > 0) {
        cursor = (cursor + 1) % items.length;
        render(items);
    } else if (key.name === "return") {
        const selected = items[cursor];
        if (!selected) return;

        if (selected.isDir) {
            currentPath = selected.path;
            items = listDir(currentPath);
            cursor = 0; // Always start at the top when entering a new directory
            render(items);
        } else {
            try {
                clipboardy.writeSync(selected.path);
                clearScreen();
                console.log(chalk.green(`✅ Copied to clipboard:\n${selected.path}\n`));
                console.log(chalk.gray("\nPress any key to return..."));
                process.stdin.once("keypress", () => render(items));
            } catch (err) {
                clearScreen();
                console.log(chalk.red(`❌ Failed to copy to clipboard: ${err.message}\n`));
                console.log(chalk.gray("\nPress any key to return..."));
                process.stdin.once("keypress", () => render(items));
            }
        }
    } else if (key.name === "backspace") {
        const parent = path.dirname(currentPath);
        if (parent !== currentPath) {
            currentPath = parent;
            items = listDir(currentPath);
            cursor = 0;
            render(items);
        }
    } else if (key.name === "escape" || (key.ctrl && key.name === "c")) {
        cleanup();
        process.exit(0);
    }
});
