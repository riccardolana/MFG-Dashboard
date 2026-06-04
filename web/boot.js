// Bootstraps the app: fetch data from the backend, expose it as the globals app.js
// expects, then load app.js. If the API is unreachable (e.g. opening the file directly
// without the server), fall back to the bundled data-fallback.js so the app still runs.
(function () {
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = function () {
        reject(new Error("failed to load " + src));
      };
      document.body.appendChild(s);
    });
  }

  fetch("/api/strategy")
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (data) {
      window.strategyData = data.strategy;
      window.valueTreeData = data.valueTree;
      window.timelineEnablers = data.timeline;
      return loadScript("app.js");
    })
    .catch(function (err) {
      console.warn("Strategy API unavailable, using bundled fallback data:", err);
      return loadScript("data-fallback.js").then(function () {
        return loadScript("app.js");
      });
    });
})();
