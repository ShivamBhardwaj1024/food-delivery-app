import React from "react";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetch("http://localhost:3000/api/auth/me", {
      withcredentials: true,
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an Authprovider");
  }
  return context;
}


export { AuthProvider, useAuth };