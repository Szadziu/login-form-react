import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext(
    // obiekt ten przekazujemy, aby uzyskać podpowiedzi, gdy odnosimy się do tego kontekstu w innym miejscu.
    {
        isLoggedIn: false,
        onLogout: () => {},
        onLogin: (email, password) => {},
    }
);

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const isUserLoggedInInformation =
            localStorage.getItem('isLoggedIn') === '1';

        if (isUserLoggedInInformation) {
            setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    const loginHandler = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', '1');
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
