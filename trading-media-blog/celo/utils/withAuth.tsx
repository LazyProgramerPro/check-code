import { useRouter } from "next/router";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/common/loading";
import { IS_SERVER } from "../constants/common";

export default function withAuth(Component) {
  return (props) => {
    const [loading, setLoading] = useState(true);

    if (!IS_SERVER && loading) {
      const { isLoggedIn } = useAuth();
      const router = useRouter();

      if (!isLoggedIn) {
        router.push("/admin/login");
      } else {
        setLoading(false);
      }
    }

    if (loading) {
      return <Loading />;
    }

    return <Component {...props} />;
  };
}
