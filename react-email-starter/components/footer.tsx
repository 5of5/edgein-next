import { Link, Section, Text, Img, Row, Column } from '@react-email/components';

export const EmailFooter = () => {
  return (
    <Section className="bg-[#f3f4f6] p-[40px] pb-[8px]">
      <Section>
        <Text className="text-[#64748b] text-[12px] leading-[16px] m-0">
          Got this email by mistake? Don&apos;t worry, you can safely ignore it.
        </Text>
        <Text className="text-[#64748b] text-[12px] leading-[16px] m-0 mt-[2px]">
          Mentibus gathers, refines, and tailors the Web3 and AI data you need
          to get an edge.
        </Text>
        <Text className="text-[#64748b] text-[12px] leading-[16px] m-0 mt-[2px]">
          <Link
            href="https://edgein.io/"
            target="_blank"
            className="text-[#5e41fe] no-underline">
            Learn more
          </Link>
          {` or `}
          <Link
            href="https://edgein.io/support/"
            target="_blank"
            className="text-[#5e41fe] no-underline">
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
              className="text-[#64748b] text-[12px] leading-[16px] underline"
              target="_blank">
              <Img
                src="https://www.edgein.io/email-edgein-text.png"
                alt="Mentibus"
                width="50"
              />
            </Link>
            <Text className="text-[#838faf] text-[12px] leading-[16px] mt-[8px]">
              &copy;{` EdgeIn.io ${new Date().getFullYear()}`}
            </Text>
          </Column>

          <Column align="right">
            <Link
              href="https://www.linkedin.com/company/edgein/"
              className="inline-block no-underline"
              target="_blank">
              <Img
                src="https://www.edgein.io/email-linkedin.png"
                alt="LinkedIn"
                width="20"
              />
            </Link>
            <Link
              href="https://twitter.com/EdgeInio"
              className="inline-block no-underline ml-[12px]"
              target="_blank">
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
