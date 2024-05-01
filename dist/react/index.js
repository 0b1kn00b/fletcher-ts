"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReducerWithThunk = exports.react = void 0;
// https://chwastek.eu/blog/async-actions-with-usereducer-in-react
const react_1 = require("react");
const Fletcher_1 = require("../Fletcher");
function react(self, p) {
    return async function (dispatch) {
        const result = await Fletcher_1.Fletcher.Resolve(self, p);
        dispatch(result);
    };
}
exports.react = react;
function useReducerWithThunk(reducer, initialState) {
    const [state, dispatch] = (0, react_1.useReducer)(reducer, initialState);
    function customDispatch(action) {
        if (typeof action === 'function') {
            return action(customDispatch);
        }
        else {
            dispatch(action);
        }
    }
    ;
    // Memoize so you can include it in the dependency array without causing infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const stableDispatch = (0, react_1.useCallback)(customDispatch, [dispatch]);
    return [state, stableDispatch];
}
exports.useReducerWithThunk = useReducerWithThunk;
