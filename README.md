# Abdhul Rahmaan — Portfolio

A responsive personal portfolio built with only HTML, CSS, and vanilla JavaScript.

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a browser. No build tools are required.
3. For a better development workflow, open the folder in Cursor.

## Add your own images
Put your images in `assets/images/` and use these filenames, or update the paths in `index.html` and `script.js`:
- `profile.png` — hero profile photo
- `about-me.png` — About section image
- `project-1.png`, `project-2.png`, `project-3.png` — project screenshots
- `background.jpg` — optional background image

Supported formats include PNG, JPG/JPEG, and WEBP. Keep the filename and extension consistent with the path in the code. Missing photos show a placeholder instead of a broken-image icon.

## Add your CV
Place your PDF at `assets/documents/cv.pdf`.

## Update projects
Edit the `projects` array near the top of `script.js`. Update each project's title, description, technologies, image, GitHub URL, and demo URL. Replace example links before publishing.

## Contact
The email address is `abdhulrxhmaan675@gmail.com`. The contact form validates input and opens the visitor's email application with a prepared message; it does not send automatically. A backend or email service is required for direct form submission.

## Publish
Upload the extracted project folder to a GitHub repository, then import that repository into Vercel. This is a static website and does not require a build command.
