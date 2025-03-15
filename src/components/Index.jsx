import { useAuth } from "../context/AuthContext";

import AuthorizedIndex from "./Authorized/Index";
import UnauthorizedIndex from "./Unauthorized/Index";

export default function Index() {
    const {user, loading} = useAuth();

    return <>
        {user ?  <AuthorizedIndex /> : <UnauthorizedIndex />}
    </>
}