# The Scoop

A lightweight, responsive website for **The Scoop**, a novelty gift and mystery scoop brand powered by **TSA Creations Pty Ltd**.

The website directs visitors to The Scoop's social media channels, where they can browse novelty gifts, view mystery scoop videos, and contact the sales team.

## Live Website

https://tsascoops.co.za/

## About the Project

The Scoop website was designed as a fast, simple and mobile-friendly landing page without requiring a backend application or content management system.

The site provides visitors with access to:

* The Scoop gift gallery and store on Facebook
* Mystery scoop, packing and unboxing videos on TikTok
* A direct email contact option for custom orders and enquiries

## Features

* Responsive, mobile-first layout
* Static HTML, CSS and JavaScript
* No server-side application or database
* No Node.js, npm or frontend build process required
* Locally hosted fonts and Tailwind CSS assets
* Responsive AVIF and WebP images
* Open Graph and social sharing metadata
* Search engine canonical URL and page description
* Web app manifest and favicon support
* Keyboard-accessible interactive buttons
* Obfuscated email and social media destinations
* Apache and LiteSpeed-compatible security configuration
* Browser caching and compression rules
* Hotlink protection for images and fonts
* Restrictive Content Security Policy
* HTTPS and canonical hostname redirects

## Technology

The website uses:

* HTML5
* CSS3
* Vanilla JavaScript
* Tailwind CSS 3.4.17, hosted locally
* AVIF and WebP responsive images
* Apache or LiteSpeed `.htaccess` configuration

## Repository Structure

```text
.
├── assets/
│   ├── css/
│   │   ├── fonts-local.css
│   │   └── tailwind-3.4.17-local.min.css
│   ├── fonts/
│   └── images/
├── .htaccess
├── contact-obfuscator.js
├── index.html
├── styles.css
├── site.webmanifest
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── LICENSE
└── README.md
```

## Local Development

No dependency installation or build process is required.

Clone the repository:

```bash
git clone git@github.com:tim0n3/tsascoops.co.za.git
cd tsascoops.co.za
```

The website can be opened directly in a browser:

```bash
open index.html
```

Alternatively, start a local HTTP server:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000/
```

Using a local HTTP server is recommended because it more closely reflects how the website will behave when deployed.

## Deployment

The website can be deployed to any web server or static hosting service capable of serving HTML, CSS, JavaScript, fonts and image files.

For an Apache or LiteSpeed server:

1. Copy the repository contents into the domain's document root.
2. Ensure `.htaccess` overrides are permitted by the hosting environment.
3. Confirm that the domain has a valid TLS certificate.
4. Test the apex and `www` hostnames.
5. Verify that the canonical hostname redirects to:

```text
https://tsascoops.co.za/
```

A typical deployment using `rsync` could look like:

```bash
rsync -avz --delete \
  --exclude=".git/" \
  --exclude="README.md" \
  ./ user@example-host:/path/to/document-root/
```

Replace the SSH destination and document-root path with the correct values for the hosting environment.

## Security

The included `.htaccess` configuration provides several protections for compatible Apache and LiteSpeed hosting environments, including:

* Directory listing prevention
* Canonical hostname enforcement
* Hidden-file protection
* Blocking of temporary, configuration and backup files
* Blocking of accidentally uploaded executable scripts
* Image and font hotlink protection
* MIME-type declarations
* HTTP security headers
* Content Security Policy
* HTTPS Strict Transport Security
* Cross-origin isolation policies
* Compression and browser caching

The email address and social media destinations are decoded in the browser only after a user activates the corresponding button.

This helps reduce basic automated scraping, but it should be considered obfuscation rather than encryption or access control. Any value delivered to a visitor's browser can ultimately be recovered by a sufficiently capable user or automated browser.

## Updating Content

The main page content is maintained in:

```text
index.html
```

Custom colours, effects and component styling are maintained in:

```text
styles.css
```

Contact and social media destinations are configured as encoded tokens in:

```text
contact-obfuscator.js
```

When changing a protected destination, generate a new encoded token rather than adding the plain-text destination to the HTML or rendered page.

## Image Optimisation

The hero image uses responsive AVIF and WebP variants. When replacing it:

* Retain both AVIF and WebP formats
* Generate multiple image widths
* Preserve the image aspect ratio
* Update the `srcset`, dimensions and Open Graph image where necessary
* Keep the original source image outside the production web root where practical
* Test the result on mobile and desktop screen sizes

## Browser Support

The website is intended for current versions of major browsers, including:

* Google Chrome
* Mozilla Firefox
* Microsoft Edge
* Apple Safari

Browsers without AVIF support can use the WebP fallback image.

## Organisation

The Scoop is powered by **TSA Creations Pty Ltd**.

* The Scoop: https://tsascoops.co.za/
* TSA Creations: https://tsacreations.co.za/

