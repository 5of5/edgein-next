import type { GetStaticProps } from 'next';

export default function Login() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-10 lg:min-h-[40vh]">
      <div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8"></div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      metaTitle: 'Sign up - EdgeIn.io',
    },
  };
};
