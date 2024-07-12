# Listen
A text to speech web application that speaks word, sentences or even long articles in a music player like interface.

**View the app at https://www.vivek.nexus/listen**

<img src="https://www.vivek.nexus/listen/link-preview.png" />


<br />

<br />

<br />

## Passing article text to pre-fill
Pass the article text as a URL parameter. URL encode the text for sanity.

Example: https://www.vivek.nexus/listen/app?text=This%20is%20the%20first%20line%20of%20the%20article.%0A%0AThis%20is%20the%20second%20line.%20Make%20sure%20to%20URL%20encode%20the%20text%20before%20passing

<br />

## Passing a link to fetch
Pass the link as a URL parameter. Make sure to allow cross origin requests (CORS) on your website server from https://www.vivek.nexus origin.
- If you use no-code hosting methods, consult your hosting provider's documentation to enable CORS
- If you control the code on your server, see https://www.w3.org/wiki/CORS_Enabled for instructions

Example: https://www.vivek.nexus/listen/app?url=https://ideas.ted.com/how-to-handle-anxiety-lionel

<br />

<br />

<br />


## Integrating Listen on your blog

#### [Option 1] Load Listen as an iframe (recommended method)
- On your blog pages, load the site as an iframe in a suitable way. Make sure the iframe size is at least 360px by 780px for optimal UI experience.
- Use URL params to send your article

#### [Option 2] Open Listen in a new tab
- On your blog page, provide a button such as `Listen to this article`
- On click of the button, open Listen in a new tab. Send your article using URL params.


## Help
Create an issue here https://github.com/vivek-nexus/listen/issues
