// https://www.newline.co/fullstack-react/articles/Declaratively_loading_JS_libraries/index.html
// https://github.com/ryanflorence/react-training/blob/gh-pages/lessons/05-wrapping-dom-libs.md Portals in React

class ScriptCache {
  constructor(scripts) {
    this.loaded = [];
    this.fauled = [];
    this.pending = [];
    this.load(scripts);
  }

  loadSrc(src) {
    if (this.loaded.indexOf(src) >= 0) {
      return Promise.resolve(src);
    }

    this.pending.push(src);
    return this.scriptTag(src)
      .then(() => {
        // handle success
        console.log('script loaded & appended');
      })
      .catch(() => {
        // handle cleanup
        console.log('script load/append error');
      });
  }

  // 2nd arg cb
  scriptTag = (src) => {
    return new Promise((resolve, reject) => {
      let resolved = false;
      let errored = false;
      const body = document.getElementsByTagName('body')[0];
      const tag = document.createElement('script');

      tag.type = 'text/javascript';
      tag.async = false; // Load in order

      //   const handleCallback = (tag.onreadystatechange = function() {
      //     if (resolved) return handleLoad();
      //     if (errored) return handleReject();
      //     const state = tag.readyState;
      //     if (state === 'complete') {
      //       handleLoad();
      //     } else if (state === 'error') {
      //       handleReject();
      //     }
      //   });

      const handleLoad = evt => {
        console.log(evt);
        resolved = true;
        resolve(src);
      };
      const handleReject = evt => {
        console.log(evt);
        errored = true;
        reject(src);
      };

      tag.addEventListener('load', handleLoad);
      tag.addEventListener('error', handleReject);
      tag.src = src;
      body.appendChild(tag);
      console.log(resolved, errored);
      return tag;
    });
  };
}

export default ScriptCache
