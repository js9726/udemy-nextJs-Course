import { SignIn } from '@clerk/clerk-react';

function Login() {
  return (
    <div className="login-container">
      <SignIn />
    </div>
  );
}

export default Login; 