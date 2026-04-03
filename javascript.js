(function() {

    // Create script element
    var loaderScript = document.createElement("script");
    loaderScript.type = "text/javascript";

    // JS code as string
    loaderScript.text = `
        (function() {
            const originalAddEventListener = document.addEventListener;
            document.addEventListener = function(type, listener, options) {
                if (type === "DOMContentLoaded") {
                    const fnStr = listener.toString();
                    if (fnStr.includes("savvyAll") || fnStr.includes("savvy") || fnStr.includes("sAll")) {
                        console.log("Blocked a savvy loader listener");
                        return;
                    }
                }
                return originalAddEventListener.call(this, type, listener, options);
            };
        })();
    `;

    // Append to head or body
    (document.head || document.body).appendChild(loaderScript);

})();
