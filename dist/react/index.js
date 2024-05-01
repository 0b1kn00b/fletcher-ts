"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReducerWithThunk = void 0;
// https://chwastek.eu/blog/async-actions-with-usereducer-in-react
const react_1 = require("react");
const Fletcher_1 = require("../Fletcher");
function react(self, p) {
    return function (dispatch) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Fletcher_1.Fletcher.Resolve(self, p);
            dispatch(result);
        });
    };
}
exports.default = react;
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
