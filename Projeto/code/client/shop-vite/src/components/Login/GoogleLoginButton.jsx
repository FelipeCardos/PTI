import { GoogleLogin } from "react-google-login";

const clientId =
  "605017327713-opokg48ftsd42qfmg8pqonroui009qrn.apps.googleusercontent.com";

export default function GoogleLoginButton() {
  const onSuccess = (res) => {
    console.log("[Login Success] currentUser:", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("[Login failed] res:", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText='Sign In with Google'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}
