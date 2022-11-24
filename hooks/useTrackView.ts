import { useEffect } from "react";
import { useRouter } from "next/router";

type TrackType = {
  enabled?: boolean;
  resourceId?: number;
  resourceType: "companies" | "vc_firms";
};

const useTrackView = ({ enabled, resourceId, resourceType }: TrackType) => {
  const router = useRouter();

  useEffect(() => {
    const track = async () => {
      if (enabled) {
        await fetch("/api/track/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resourceId,
            resourceType,
            pathname: router.asPath,
          }),
        });
      }
    };

    track();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
};

export default useTrackView;
