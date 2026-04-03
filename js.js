(function() {
    // Track loaded scripts
    const loadedScripts = new Set();

    // Override document.createElement to track script creation
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        const element = originalCreateElement.call(this, tagName);

        if (tagName.toLowerCase() === 'script') {
            let srcValue = '';

            Object.defineProperty(element, 'src', {
                set: function(value) {
                    if (loadedScripts.has(value) || document.querySelector(`script[src="${value}"]`)) {
                        console.log('Blocked duplicate script (src set):', value);
                        // Don't actually set src to prevent loading
                        return;
                    }
                    srcValue = value;
                    loadedScripts.add(value);
                    this.setAttribute('src', value);
                },
                get: function() {
                    return srcValue;
                }
            });
        }

        return element;
    };

    // Override appendChild to block already loaded scripts
    const originalAppendChild = Element.prototype.appendChild;
    Element.prototype.appendChild = function(element) {
        if (element.tagName === 'SCRIPT') {
            const src = element.src || element.getAttribute('src');
            if (loadedScripts.has(src) || document.querySelector(`script[src="${src}"]`)) {
                console.log('Blocked duplicate script (appendChild):', src);
                return element; // prevent duplicate append
            }
            loadedScripts.add(src);
        }
        return originalAppendChild.call(this, element);
    };

})();
