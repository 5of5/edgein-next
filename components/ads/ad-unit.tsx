import { useEffect } from 'react';

interface AdUnitProps {
  client: string;
  slot: string;
  format: string;
  testMode?: boolean;
}

const AdUnit: React.FC<AdUnitProps> = ({
  client,
  slot,
  format,
  testMode = false,
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-adtest={testMode ? 'on' : undefined}></ins>
  );
};

export default AdUnit;
