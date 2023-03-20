import Login from "@components/Login";
import { firebaseAdmin } from "@firebase/firebaseAdmin";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/dist/client/router";
import nookies from "nookies";
const LoginPage = ({ uid }: { uid: string }) => {
  const router = useRouter();
  if (uid) {
    router.push("/pokemons");
    return null;
  }
  return <Login />;
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid } = token;
    return {
      props: {
        uid: uid,
      },
    };
  } catch (error) {
    return { props: {} as never };
  }
}

export default LoginPage;
