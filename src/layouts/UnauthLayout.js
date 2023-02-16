
import { useAuth } from "src/hooks/useAuth";
import Loading from "./components/Loading";


const UnauthLayout = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return (
      <>
        <Loading />
      </>
    )

  } else {
    return (
      <>
        {children}
      </>
    );
  }

}

export default UnauthLayout;
