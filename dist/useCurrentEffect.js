"use strict";
exports.__esModule = true;
var react_1 = require("react");
function useCurrentEffect(callback, deps) {
    react_1.useEffect(function () {
        var isCurrent = true;
        var currentCheck = function () { return isCurrent; };
        var cleanup = callback(currentCheck);
        return function () {
            isCurrent = false;
            cleanup && cleanup();
        };
    }, deps);
}
exports.useCurrentEffect = useCurrentEffect;
//# sourceMappingURL=useCurrentEffect.js.map