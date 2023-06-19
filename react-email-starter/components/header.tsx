import { Link, Section, Img } from '@react-email/components';

export const EmailHeader = () => {
  return (
    <Section className="px-[40px] pt-[50px] pb-[30px]">
      <Link
        href="https://www.edgein.io"
        className="text-[#5e41fe] no-underline"
        target="_blank"
        data-saferedirecturl="https://www.google.com/url?q=https://www.edgein.io"
      >
        <Img
          src="https://d3k81ch9hvuctc.cloudfront.net/company/VFvqvF/images/5340f47e-30ed-450b-b975-cf5c352b5a3c.png"
          alt="EdgeIn"
          width="150"
        />
      </Link>
    </Section>
  );
};

export default EmailHeader;
