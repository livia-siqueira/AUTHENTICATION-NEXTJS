import PerfilUser from "../../components/PerfilUser";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";


const Profile = ({session}) =>
{
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getSession().then((session) => {
        if (!session) {
          window.location.href = "/login";
        }else{
          setIsLoading(false);
        }
        
      });
    }, []);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return(
        <>
        <PerfilUser/>
        </>
    )
}

export async function getServerSideProps(context){
    const session = await getSession({req: context.req})

    if(!session){
        return{
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {session}
    }
}

export default Profile;