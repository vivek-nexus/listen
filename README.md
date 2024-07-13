# Listen
> **Your world-class reading companion**

<img src="https://www.vivek.nexus/listen/link-preview.png" />


A text to speech web application that speaks words, sentences or even long articles, in a music player like interface.

- You can use it to listen to news pages or blog pages, as if they were **podcasts**
- You can use it to **proof-read**, or should we say, proof-listen to your writing
- You can use it to record **voice-overs**
- and much more...

**View the app at https://www.vivek.nexus/listen**


<br />

<br />

<br />


## Integrating Listen on your blog
**Allow your readers to instantly listen to your pages**

### [Option 1] Load Listen as an iframe (code method)
- On your blog pages, load Listen as an iframe in a suitable way. Make sure the iframe size is at least 360px by 780px for optimal UI experience.
-  Make sure to allow cross origin requests (CORS) on your website server from https://www.vivek.nexus origin, so that Listen can fetch article HTML from your server.
    - If you use no-code hosting methods, consult your hosting provider's documentation to enable CORS
    - If you control the code on your server, see https://www.w3.org/wiki/CORS_Enabled for instructions 
- Send your article through URL parameters. See below section for details.

### [Option 2] Open Listen in a new tab (no-code method)
- On your blog page, add a button or text such as `Listen to this article`
- Hyperlink the text or the button, to open Listen in a new tab. Send your article through URL parameters. See below section for details.



<br />

<br />

<br />

## Send article through URL parameters
### Passing article link
Pass the link as a URL parameter

Example: https://www.vivek.nexus/listen/app?url=https://ideas.ted.com/how-to-handle-anxiety-lionel


### Passing article text
Pass the article text as a URL parameter. URL encode the text for sanity.

Example: https://www.vivek.nexus/listen/app?text=This%20is%20the%20first%20line%20of%20the%20article.%0A%0AThis%20is%20the%20second%20line.%20Make%20sure%20to%20URL%20encode%20the%20text%20before%20passing



<br />
<br />
<br />

## Help
For help with anything on the app or to report a bug, create an issue here https://github.com/vivek-nexus/listen/issues


