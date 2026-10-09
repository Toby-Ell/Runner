# Abdhul Rahmaan — Personal Portfolio

A beginner-friendly portfolio built with HTML, CSS, and vanilla JavaScript.

## Files
- `index.html` — page content and sections
- `style.css` — colours, layout, responsive design
- `script.js` — mobile menu and contact form behavior
- `assets/images/` — add your profile photo and project screenshots here

## Open the website
1. Extract the ZIP file.
2. Open the project folder.
3. Double-click `index.html` to preview it in your browser.
4. To edit it, open the folder in Cursor. No installation/build process is required.

## Edit content
Open `index.html` and update the relevant text. Skill cards, project cards, education, and certificates are ordinary HTML, so you can copy an existing card to add another. The email in this version is `adoolz671@gmail.com`, as provided.

## Add your profile photo
1. Copy your photo into `assets/images/`, for example `profile.jpg`.
2. Find the profile photo placeholder in `index.html`.
3. Replace that placeholder with:
   `<img class="profile-image" src="assets/images/profile.jpg" alt="Photo of Abdhul Rahmaan">`
4. Add this CSS to `style.css`:
   `.profile-image { width: 100%; aspect-ratio: 4 / 4.5; object-fit: cover; border-radius: 26px; }`

## Add project screenshots
Put a screenshot in `assets/images/` and replace the project preview placeholder with:
`<img src="assets/images/project-1.png" alt="Screenshot of my project">`
Style the image with `width:100%; height:210px; object-fit:cover; display:block;`.

## Add social links
Replace `href="#"` for GitHub and Instagram with your real profile URLs when ready. They are placeholders for now.

## Change colours
At the top of `style.css`, change the variables `--bg`, `--panel`, `--cyan`, `--blue`, and `--purple`.

## Contact form
This is a static site. The form opens the visitor's default email application using `mailto:`. It does not send messages to a server. The recipient address is configured in `script.js`.

No additional personal achievements, school name, certificates, or social URLs have been invented.
