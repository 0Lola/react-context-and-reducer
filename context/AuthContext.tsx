import * as React from 'react';
import { createContext, useContext, useReducer, useMemo } from 'react';

// 1. 宣告 Context
export const AuthContext = createContext([] as any[]);

// Optional
AuthContext.displayName = 'AuthContext';

// 2. 建立 Provider
export function AuthContextProvider({ children }) {
  // 初始化資料
  let initialState = {
    // 假設已登入會暫存 token
    isSignIn: false,
    auth: 'Init',
  };

  // 使用 reducer 的方式將 value 代入 provider
  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. 匯出 useContext
export function useAuthContext() {
  return useContext(AuthContext);
}

// 4. 匯出可更改資料的 functtion
export const setAuth = (dispatch: any, type: 'isSignIn' | 'auth', value: any) =>
  dispatch({ type, value });

// 5. 收到資料後的處理，action 會收到上方 dispatch 的 {type, value}
function reducer(state: any, action: { type; value }) {
  switch (action.type) {
    case 'isSignIn':
      // 如果收到後需要做一些其他處理，則 case 起來處理
      if (action.value == false) localStorage.clear();
      return { ...state, [action.type]: action.value };
    default:
      // 如果收到後只是更新參數不做其他處理，由 default 解決
      return { ...state, [action.type]: action.value };
  }
}
