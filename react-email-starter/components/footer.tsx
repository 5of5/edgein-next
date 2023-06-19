import { Link, Section, Text, Img, Row, Column } from '@react-email/components';

export const EmailFooter = () => {
  return (
    <Section className="bg-[#e8ecf2] p-[40px] pb-[64px]">
      <Section>
        <Text className="text-[#525f7f] text-[12px] leading-[16px] m-0">
          New to EdgeIn? With EdgeIn you and your team can gain clear,
          accessible, Web3 knowledge.
        </Text>
        <Text className="text-[#525f7f] text-[12px] leading-[16px] m-0">
          <Link
            href="https://edgein.io/"
            target="_blank"
            className="text-[#5e41fe] no-underline"
          >
            Learn more
          </Link>
          {` or `}
          <Link
            href="https://edgein.io/support/"
            target="_blank"
            className="text-[#5e41fe] no-underline"
          >
            Visit support
          </Link>
          .
        </Text>
      </Section>

      <Section className="mt-[20px]">
        <Row>
          <Column align="left">
            <Link
              href="https://www.edgein.io"
              className="text-[#525f7f] text-[12px] leading-[16px] underline"
              target="_blank"
            >
              <Img
                src="https://www.edgein.io/email-edgein-text.png"
                alt="EdgeIn"
                width="50"
              />
              <span>&copy;{` EdgeIn.io ${new Date().getFullYear()}`}</span>
            </Link>
          </Column>

          <Column align="right">
            <Link
              href="https://www.linkedin.com/company/edgein/"
              className="inline-block no-underline"
              target="_blank"
            >
              <Img
                src="https://www.edgein.io/email-linkedin.png"
                alt="LinkedIn"
                width="20"
              />
            </Link>
            <Link
              href="https://twitter.com/EdgeInio"
              className="inline-block no-underline ml-[4px]"
              target="_blank"
            >
              <Img
                src="https://www.edgein.io/email-twitter.png"
                alt="Twitter"
                width="20"
              />
            </Link>
          </Column>
        </Row>
      </Section>
    </Section>
  );
};

export default EmailFooter;
