# 🧅 Onion — A Terminal Directory Explorer

Onion is a lightweight, interactive directory explorer for your terminal.
Navigate folders using arrow keys and explore your filesystem with ease.

## 🚀 Features
- **Keyboard navigation** (↑ ↓ Enter Backspace Esc)
- **Folder/File icons** 📁 📄
- **File path copying** - Copy file paths to clipboard with Enter
- **Error handling** - Graceful handling of permissions and clipboard errors
- **Empty directory support** - Clear indication when directories are empty
- **Cross-platform** - Works on macOS, Linux, and Windows

## 📦 Installation

### Global Installation
```bash
npm install -g onion-explorer
```

### Local Development
```bash
git clone https://github.com/Ashwinrosario/onion
cd onion
npm install
npm link
```

## 🎮 Usage

### Basic Usage
```bash
# Navigate current directory
onion

# Navigate specific directory
onion /path/to/directory
```

### Controls
- **↑ ↓** - Move cursor up/down
- **Enter** - Open directory or copy file path to clipboard
- **Backspace** - Go to parent directory  
- **Esc** or **Ctrl+C** - Exit

## 🛠 Development

```bash
# Run locally
npm start

# Check syntax
npm test

# Link for global testing
npm run link

# Unlink
npm run unlink
```

## 🔧 Requirements
- Node.js >= 14.0.0
- Terminal with keyboard input support

## 📝 License
MIT

## 📦 Package size

The package contents and sizes (from a dry-run publish using `npm pack --dry-run`) are:

- Package size (tarball): 2.9 kB
- Unpacked size: 8.0 kB

Dependencies on your machine (approximate) when installed locally:

- `node_modules` size: ~1.5 MB

These values were captured from a local dry-run and may vary slightly per environment.

If you'd like to shrink the install size, consider removing non-essential dependencies or using lighter alternatives.

## 🐞 Issues

If you find bugs or want to request features, please use the project's issues page:

https://github.com/Ashwinrosario/onion/issues

You can convert those proposals into real GitHub issues, or I can open them for you.
