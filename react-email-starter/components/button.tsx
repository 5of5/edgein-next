import { Button } from '@react-email/components';

type EmailButtonProps = {
  text: string;
  url: string;
};

export const EmailButton = ({ text, url }: EmailButtonProps) => {
  return (
    <Button
      pX={24}
      pY={12}
      className="bg-[#5e41fe] rounded-[100px] text-white text-[14px] font-semibold no-underline text-center"
      href={url}>
      {text}
    </Button>
  );
};

export default EmailButton;
