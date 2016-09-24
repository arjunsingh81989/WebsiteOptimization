## Website Performance Optimization portfolio project

Technologies: Grunt Javascript Task Runner, Javascript, Google Chrome’s Timeline Dev Tool

###Part 1: Optimize PageSpeed Insights score for index.html

I performed following steps to optimize PageSpeed Insights (PI) score for `index.html`.


Initial PI score is:

- Mobile 28%
- Desktop 30%

There are two screenshots in the folder Results.

1.) MobilePageSpeedInsights : 96/100 Speed, 100/100 User Experience

2.) DesktopPageSpeedInsights : 97/100 

These screenshots indicate the score I was able to achieve after performing the following optimizations on the website. 


#### Optimize images

* pizzeria.jpg (under `views/images` folder) - This image is a full-resolution image over 2MB.
However, index.html file only shows this image in a size of 100px width.
By compression and resizing this file, the image is ~12KB (over 90%).

* profilepic.jpg (under `img` folder) - This image is lossless compressed to reduce the size from ~14KB to ~7KB (50%)

#### Remove render-blocking JavaScript

Google's analytic is not related to rendering the website. I put `async` attribute to the corresponding script tag.

```
	<script async src="http://www.google-analytics.com/analytics.js"></script>
```

#### Optimize CSS Delivery

`print.css` contains rules for `print` device only, thus I set its `media` attribute to `print` so that it won't block the critical rendering path (CRP).

```
    <link href="css/print.css" rel="stylesheet" media="print">
```

`style.css` is relativel small (about 1.5KB), I made it as inline style so that it won't block the (CRP).

#### Optimize Google's Font loading

The CSS for Google font blocks the CRP. This [article](https://www.lockedowndesign.com/load-google-fonts-asynchronously-for-page-speed) shows how to defer the loading of Google's Font using asynchronous loading. Browser will use standard font, once the Google's font is ready, the display is refreshed.

THe following code is added to replace the use of Google's font CSS request.

```
    <script type="text/javascript">
      WebFontConfig = {
        google: { families: [ 'Open+Sans:400,700' ] }
      };
      (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();
    </script>
```

After these optimizations, the PI score archives over 90% for both mobile and desktop version.


###Part 2: Optimize Frames per Second in pizza.html

*Note*: All my optimizations in the JS code for pizza page (`views/js/main.js`) have been marked as comment: `// FIXED`

#### Optimize for 60 fps when scrolling in pizza.html

1. The provided script creates 200 elements for pizzas in the background. Everytime the page is scrolled, all 200 elements need to move although only some of them are actually visible.

	My improvement is to reduce this to 60 elements which is enough to cover the web page in all kind of screen sizes.

2. Store references to all 'mover' elements in an array variable instead of finding them every scroll.

3. Other improvements include using `getElementsById` and `getElementsByClassName` instead of `querySelector` where applicable. According to the API, these methods perform better than `querySelector`.


#### Reduce the time to resize pizzas to under 5ms

When resizing pizzas, the provided script iterates through each pizza's element to calculate the change for the old/new size then set the new width per elements.

However, since all pizzas will have the same size, the key improvement is to calculate size difference once, then apply to all elements.

