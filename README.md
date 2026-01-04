# 車禍事故處理指引 (Car Accident Guide)

這是一個基於 Vite + React + TypeScript 開發的車禍事故處理指引應用程式。

## 功能
- 提供車禍處理流程指引
- 整合 React 生態系 (Lucide React Icons)
- TypeScript 支援

## 快速開始

### 1. 安裝相依套件

```bash
npm install
```

### 2. 設定環境變數

請複製 `.env.example` (若有) 或建立 `.env` 檔案，並填入必要的 keys (如 Gemini API Key)。

### 3. 本地開發

啟動開發伺服器：

```bash
npm run dev
```

開啟瀏覽器並訪問 `http://localhost:3000` (或終端機顯示的 URL)。

### 4. 建置與部署

建置正式版：

```bash
npm run build
```

預覽建置結果：

```bash
npm run preview
```

## 部署

本專案已設定 GitHub Actions。當推送到 `main` 分支時，會自動部署至 GitHub Pages。

請確保 GitHub Repository 的 Settings -> Pages 中，Source 設定為 `gh-pages` branch。

## 技術堆疊
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lucide React](https://lucide.dev/)
