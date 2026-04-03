(function() {
    const loadedScripts = new Set();

    // Custom condition function - sirf ye domain scripts track karenge
    function shouldTrackScript(src) {
        return src.includes("savvyhrm.github.io") || src.includes("cdn.jsdelivr.net");
    }

    // MutationObserver se naye script tags track karo
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === 'SCRIPT') {
                    const src = node.src || node.getAttribute('src');
                    if (!src) return;

                    if (shouldTrackScript(src)) {
                        if (loadedScripts.has(src)) {
                            console.log("Duplicate script blocked:", src);
                            node.remove();
                        } else {
                            loadedScripts.add(src);
                        }
                    }
                }
            });
        });
    });

    // Initial page ke scripts bhi track karlo jinke src match kare
    document.querySelectorAll('script[src]').forEach(script => {
        const src = script.src;
        if (shouldTrackScript(src)) {
            loadedScripts.add(src);
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

})();
