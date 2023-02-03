import { GetServerSidePropsContext } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};

const providerIcons = {
  Google:
    'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png',
};

export default function Login({ providers }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  {
    session && router.push(`yard/${session.user.id}`);
  }

  return (
    <div className="login-background">
      <div className="login-body">
        {/* Loop through the different providers and make a login button for each */}
        <h1 className="pb-10 font-semibold font-mono text-xl">
          Login to Your Account
        </h1>
        {Object.values(providers).map((provider) => (
          <div className="flex justify-center" key={provider.name}>
            <button
              className={`flex items-center ${provider.name}`}
              onClick={() => signIn(provider.id)}
            >
              <div className="h-10 w-10 bg-white rounded mr-2">
                <img className="h-full" src={providerIcons[provider.name]} />
              </div>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
