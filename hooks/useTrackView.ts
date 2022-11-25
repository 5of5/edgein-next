import { useEffect } from "react";
import { useRouter } from "next/router";

type TrackCommonType = {
  resourceId?: number;
  resourceType?: "companies" | "vc_firms" | "people";
  properties?: any;
};

type TrackHookType = TrackCommonType & {
  enabled?: any;
};

type TrackActionType = TrackCommonType & {
  pathname: string;
};

export const onTrackView = async ({
  resourceId,
  resourceType,
  properties,
  pathname,
}: TrackActionType) => {
  await fetch("/api/track/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resourceId,
      resourceType,
      properties,
      pathname,
    }),
  });
};

const useTrackView = ({
  enabled,
  resourceId,
  resourceType,
  properties,
}: TrackHookType) => {
  const router = useRouter();

  useEffect(() => {
    if (enabled) {
      onTrackView({
        resourceId,
        resourceType,
        properties,
        pathname: router.asPath,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
};

export default useTrackView;
