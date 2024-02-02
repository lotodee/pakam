import React, { createContext, useReducer, useEffect, ReactNode } from "react";

interface AuthState {
  user: string | null;
}

interface AuthAction {
  type: string;
  payload?: any;
}

interface AccountState {
  account: string | null;
}

interface AccountAction {
  type: string;
  payload?: any;
}

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = createContext<{
  user: string | null;
  dispatch: React.Dispatch<AuthAction>;
}>({
  user: null,
  dispatch: () => {},
});

export const AccountContext = createContext<{
  account: string | null;
  accDispatch: React.Dispatch<AccountAction>;
}>({
  account: null,
  accDispatch: () => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        user: null,
      };
    default:
      return state;
  }
};

const accountReducer = (
  state: AccountState,
  action: AccountAction
): AccountState => {
  switch (action.type) {
    case 'GETACCOUNT':
      return {
        account: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<AuthContextProps> = ({
  children,
}) => {
  const [authState, authDispatch] = useReducer(authReducer, { user: null });
  const [accountState, accDispatch] = useReducer(accountReducer, {
    account: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const signed = JSON.parse(localStorage.getItem('signed') || 'null');

    if (user) {
      authDispatch({ type: 'LOGIN', payload: user });
    }

    if (signed) {
      authDispatch({ type: 'LOGIN', payload: signed });
    }
  }, []);

  console.log("AuthContext State ", authState);
  console.log("AccountContext State ", accountState);

  return (
    <AuthContext.Provider value={{ ...authState, dispatch: authDispatch }}>
      <AccountContext.Provider
        value={{ ...accountState, accDispatch: accDispatch }}
      >
        {children}
      </AccountContext.Provider>
    </AuthContext.Provider>
  );
};
