import * as React from "react";

export const useAuth = () => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<{ user: any } | null>(null);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setUser({ user: { id: 1212 } });
    }, 300);
  }, []);

  return { loading, user };
};
