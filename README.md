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
npm install -g onion-cli
```

### Local Development
```bash
git clone <repository-url>
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
