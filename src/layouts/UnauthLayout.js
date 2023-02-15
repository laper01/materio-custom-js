
import { useAuth } from "src/hooks/useAuth";


const UnauthLayout = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return (
      <>
        loading
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
