# [PixelPerc](http://pixelperc.com)
### A simple tool to help build responsive websites

This is a simple tool to help developers convert fixed pixel widths to percentages. A use-case would be, being handed a typical desktop-sized design, but being told it should be responsive and fluid. Put in the widths of the main columns into the app and get back the percentages.

## Notes

* It's entirely client-side, other than setting `index.html` as the 404 page to internal linking can wotk with JavaScript.
* CSS was done in LESS. I'll convert it to raw CSS soon so it's easy to add to and work on.
* It's fully responsive, naturally.
* Proxima Nova is served from my Typekit account. It will only work with `pixelperc.com` and `pixelperc.dev`.
* I've added crude timestamps onto the CSS and JS refrences for cache busting. Better techniques welcome.
* Only needs to support good browsers. I'm not bothered about IE, I'm sure developers won't be IE users anyway.

## Todo

* Convert LESS to CSS
* Clean up (hasitlly written) JavaScript