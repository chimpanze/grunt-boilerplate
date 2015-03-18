casper.start('http://localhost:1337/index.html')
.then(function(){
  phantomcss.screenshot('.cta-link', 'cta-link');
})
.then(function(){
  this.mouse.move('.cta-link');
  phantomcss.screenshot('.cta-link', 'cta-link--hover');
});