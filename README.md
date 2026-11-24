# 2.0 NA GT86 · 藤澤 386 賽道雙階演化特輯

展示 Toyota GT86 (`#86` · 車牌 `藤沢 386 な 9-101`) 從「街道競技初階式樣」到「2.0 NA 賽道空力式樣」的完整視覺與賽道氛圍互動網頁。

## 功能特色

- **雙階車體預覽舞台**：支援切換「式樣 01（純粹街車紅頂）」與「式樣 02（碳纖車頂 + 前下擾流 + 側裙 + GT 尾翼）」及高解析原圖檢視。
- **空力進化即時對比滑桿**：可自由拖曳比較兩張實車圖的空力細節差異。
- **FA20 2.0L 水平對臥轉速與聲浪模擬**：內建 Web Audio API 合成的水平對臥四缸引擎聲浪、6 速手排換檔與超轉燈指示。
- **日本經典賽道單圈看板**：比較筑波 TC2000、富士國際賽車場與箱根山道之空力效益差異。

## 本機開發與建置

```bash
npm install
npm run dev
```

建置靜態網頁檔案（輸出至 `dist/`）：

```bash
npm run build
```

## 發布至 GitHub 與 GitHub Pages

本專案已內建 `.github/workflows/deploy.yml` 自動部署設定，推送至 GitHub 後即可自動編譯並發布為靜態網站：

```bash
git init
git add .
git commit -m "feat: 2.0 NA GT86 racing showcase website"
git branch -M main
git remote add origin https://github.com/<你的帳號>/<你的儲存庫名稱>.git
git push -u origin main
```

接著在 GitHub Repository 的 **Settings → Pages → Source** 中選擇 **GitHub Actions**，即可取得公開網址。
