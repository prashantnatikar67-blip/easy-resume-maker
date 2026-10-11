# Easy Resume Maker

A free, no-login resume builder made with HTML, CSS, and JavaScript.

## Files
- `index.html` — page structure and form
- `style.css` — responsive design and three resume templates
- `script.js` — live preview, sample data, template switching, and PDF download

## Run on your computer
1. Extract the ZIP file.
2. Open the `easy_resume_maker` folder.
3. Double-click `index.html` to open it in Chrome or Edge.
4. Fill out the form. The preview updates automatically.
5. Select Classic, Modern, or Minimal.
6. Click **Download PDF**.

PDF download uses the html2pdf.js library loaded from a CDN, so you need an internet connection for that feature. Resume details are processed in the browser and are not sent to a backend by this app.

## Publish free using GitHub Pages
1. Create or sign in to a GitHub account at https://github.com.
2. Click **New repository**.
3. Name it `easy-resume-maker`. Set it to **Public**.
4. Create the repository.
5. Click **Add file → Upload files**.
6. Upload `index.html`, `style.css`, and `script.js` (upload the files themselves, not the ZIP).
7. Click **Commit changes**.
8. Open the repository **Settings → Pages**.
9. Under **Build and deployment**, choose **Deploy from a branch**.
10. Select branch `main` and folder `/(root)`, then click **Save**.
11. Wait a few minutes. The Pages section will show your website URL, usually:
    `https://YOUR-USERNAME.github.io/easy-resume-maker/`

## Connect it to Google Sites
Google Sites does not host this app's HTML/JavaScript directly. Publish the app first, then:
1. Open your Google Sites editor.
2. Click the **Create My Resume** button (or insert a new Button).
3. Paste the published GitHub Pages URL into the Link field.
4. Publish or republish Google Sites.

## Notes
- No login is required for visitors.
- No database or backend is used.
- Visitors should avoid entering sensitive personal information they do not want displayed in their resume.
- The PDF library is loaded from cdnjs; internet access is needed for PDF download.
- The app is provided as a starting point. Test the generated PDF before using it for a job application.
