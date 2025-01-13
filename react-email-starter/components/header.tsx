import { Link, Section, Img } from '@react-email/components';

export const EmailHeader = () => {
  return (
    <Section className="pt-[50px] px-[40px] pb-[30px]">
      <Link
        href="https://www.edgein.io"
        className="text-[#5e41fe] no-underline"
        target="_blank"
        data-saferedirecturl="https://www.google.com/url?q=https://www.edgein.io">
        <Img
          src="https://d3k81ch9hvuctc.cloudfront.net/company/VFvqvF/images/5340f47e-30ed-450b-b975-cf5c352b5a3c.png"
          alt="Mentibus"
          width="150"
          className="my-0"
        />
      </Link>
    </Section>
  );
};

export default EmailHeader;
