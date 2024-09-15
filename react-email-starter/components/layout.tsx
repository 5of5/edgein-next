import {
  Html,
  Head,
  Tailwind,
  Body,
  Container,
  Section,
} from '@react-email/components';
import EmailHeader from './header';
import EmailFooter from './footer';

type EmailLayoutProps = {
  children: JSX.Element;
};

export const EmailLayout = ({ children }: EmailLayoutProps) => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: {
                  500: '#5E41FE',
                },
              },
            },
          },
        }}>
        <Body className="bg-[#f9fafb] my-auto mx-auto font-sans py-[40px]">
          <Container className="bg-[#FFFFFF] rounded-md max-w-[600px] w-[600px] shadow-sm">
            <EmailHeader />
            <Section>{children}</Section>
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailLayout;
