import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function LogoutPage() {
    const auth = getAuth();
    const navigate = useNavigate();

    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.log(error, alert(`error: ${error}`))
    });
    return (
      <div className="logout-page">
        <h1>Logout</h1>
      </div>
    );
  }
  