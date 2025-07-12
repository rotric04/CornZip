# 🔐 PeaZipX — The Modern File Archiver (PWA + Desktop + Voice Assistant)

> A high-speed, visually stunning PeaZip-inspired archiver with real-time compression, conversion, voice control, and immersive UI/UX for desktop and web.

![screenshot](./preview.gif)

---

## 🚀 Overview

**PeaZipX** is a cross-platform, performance-optimized file compression and extraction tool built with a modern, minimalist interface and motion-driven user experience. Inspired by PeaZip but redesigned for today's web and desktop users, it features voice/chat-based control, smooth drag-and-drop file management, and advanced compression formats.

This app supports:
- ✅ Web (PWA)
- ✅ Desktop (Electron)
- ✅ Voice/Chat Interactions

---

## ✨ Features

- 🔹 **Multi-format compression & extraction**  
  Supports `.zip`, `.7z`, `.rar`, `.tar`, `.gz`, `.xz`, `.iso`, etc.

- 🔹 **Ultra-fast transfer & compression**  
  WebAssembly (WASM) and Web Workers boost processing speed.

- 🔹 **Modern Motion UI/UX**  
  Minimalist glassmorphic interface with smooth transitions and animated loaders.

- 🔹 **Voice & Chat Assistant**  
  Control operations hands-free using Web Speech API or GPT-powered AI.

- 🔹 **Drag-and-drop Interface**  
  Compress or extract by simply dragging files into the app.

- 🔹 **Offline Support**  
  Works offline as a full-featured PWA via Service Workers.

- 🔹 **Secure Archive Management**  
  Split files, apply password protection, and AES-256 encryption.

---

## 🛠 Tech Stack

| Layer        | Tools Used                                         |
|--------------|----------------------------------------------------|
| UI/UX        | HTML5, TailwindCSS, Framer Motion / GSAP           |
| Logic        | Vanilla JS / React / TypeScript (optional)         |
| Compression  | `fflate`, `lzma`, `wasm-libarchive`, Web Workers   |
| Voice AI     | Web Speech API / Whisper + OpenAI GPT-4 (chat)     |
| Desktop App  | ElectronJS                                          |
| Web App      | Vite + PWA + Service Workers                        |

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/PeaZipX.git
cd PeaZipX
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server (Web version)

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Run Electron app (Desktop version)

```bash
npm run electron:dev
```

---

## 🧪 How to Use

### 📁 Compress Files

* Drag and drop files/folders into the "Compress" tab.
* Choose output format (e.g., ZIP, 7Z).
* Click **Start Compression**.

### 📂 Extract Files

* Drag and drop an archive into the "Extract" tab.
* Choose extraction location.
* Click **Extract**.

### 🔄 Convert Archive Format

* Drop your file into the "Convert" tab.
* Select target format (e.g., RAR to ZIP).
* Click **Convert**.

### 🎙 Use Voice Assistant

Say:

* `"Compress Downloads folder"`
* `"Extract files to Desktop"`
* `"Convert this ZIP to 7Z"`

Or ask the assistant for help in the chat window.

---

## 📦 PWA Installation

To install the app on your device:

1. Open the app in your browser.
2. Click on the **install icon** in the address bar or "Add to Home Screen".
3. Launch the app offline from your desktop or phone.

---

## 🧠 AI Assistant Setup (Optional)

1. Enable your microphone in browser settings.
2. Add OpenAI API key in `.env`:

   ```
   VITE_OPENAI_API_KEY=your_key_here
   ```
3. Chat with the assistant or use voice commands to automate tasks.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by [Mohit Assudani](https://github.com/rotric04)
Built using Vibe Coding workflows + Open Source Libraries + AI Prompt Engineering 🚀

---

## ⭐️ Support

If you find this project useful:

* 🌟 Star this repo
* 🛠 Contribute code/features
* 🧠 Share feedback or ideas!

---

```

---

Let me know if you’d like:
- A `CONTRIBUTING.md`
- Starter GitHub repository setup (with branches for `web`, `electron`, `ai-assistant`)
- Visual assets like logos/screenshots/banners for branding

I can also generate a boilerplate starter repo for this project structure.
```
