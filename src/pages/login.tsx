import { GetServerSidePropsContext } from "next"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from "next-auth/react"
import Layout from "../components/Layout"

type Props = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}

export default function Login({ providers }: Props) {
  return (
    <Layout>
      {/* Loop through the different providers and make a login button for each */}
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  console.log({ providers });
  return {
    props: { providers },
  }
}