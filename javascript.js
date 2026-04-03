(function() {
    const originalAddEventListener = document.addEventListener;
    document.addEventListener = function(type, listener, options) {
        if (type === "DOMContentLoaded") {
            const fnStr = listener.toString();
              if (fnStr.includes("savvyAll") || fnStr.includes("savvy") || fnStr.includes("sAll")) {
                
                return;  
            }
        }

        return originalAddEventListener.call(this, type, listener, options);
    };
})();
