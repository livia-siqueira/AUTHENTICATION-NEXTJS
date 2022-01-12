import { useEffect } from "react";
import AuthForm from "../../components/AuthForm";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react/cjs/react.development";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      }else{
          setIsLoading(false);
      }
    });
  }, [router]);
  if(isLoading){
      return <p>Loading...</p>
  }
  return <AuthForm />;
};

export default Login;
