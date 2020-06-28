import { createStore } from "redux";

import reducer from "./reducer";

export const myStore = createStore(reducer);

