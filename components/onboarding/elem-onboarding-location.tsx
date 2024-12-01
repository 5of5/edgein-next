import { FC, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Place } from '@aws-sdk/client-location';
import { Segment } from '@/types/onboarding';
import { ElemButton } from '../elem-button';
import ElemLocationTagInput from '../elem-location-tag-input';
import { getGeometryPlace } from '@/utils/helpers';
import { numberWithCommas } from '@/utils';

type Props = {
  segment?: Segment;
  locations: Place[];
  onChangeLocations: (locations: Place[]) => void;
  onNext?: () => void;
};

export const ElemOnboardingLocation: FC<Props> = ({
  segment,
  locations,
  onChangeLocations,
  onNext,
}) => {
  const heading = useMemo(() => {
    const locationPlural = locations.length > 1 ? 'locations' : 'location';
    switch (segment) {
      case 'Executive':
        return `New investments in your ${locationPlural}`;
      case 'Team Member':
      case 'Event Organizer':
        return `New events in your ${locationPlural}`;
      default:
        return `New companies in your ${locationPlural}`;
    }
  }, [segment, locations]);

  const { data, refetch: getLocationInsight } = useQuery(
    ['get-location-insight'],
    async () =>
      await fetch(
        `/api/get-location-insight/?segment=${segment}&locations=${encodeURIComponent(
          locations
            .map(locationItem => JSON.stringify(getGeometryPlace(locationItem)))
            .join('+'),
        )}`,
      ).then(res => res.json()),
    {
      enabled: false,
    },
  );

  useEffect(() => {
    if (locations.length > 0) {
      getLocationInsight();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  return (
    <>
      <div className="max-w-sm">
        <h1 className="mt-4 text-2xl text-center font-medium lg:text-3xl">
          Where are you based?
        </h1>
        <p className="mt-5 text-xs text-center text-slate-500 font-normal">
          We&apos;ll show you interesting companies, investors, events and news
          directly from your area. You can even add multiple locations.
        </p>
      </div>

      <div className="mt-8 w-full">
        <ElemLocationTagInput
          tags={locations}
          layers={['MunicipalityType', 'RegionType']}
          placeholder="Try “San Francisco”"
          onChange={onChangeLocations}
        />
      </div>

      {locations.length > 0 && data && data.last7days > 0 && (
        <div className="px-5 py-4 mt-16 w-full max-w-sm rounded-lg border border-gray-200">
          <p className="text-gray-300 font-medium">{heading}</p>
          <p className="text-gray-500 text-xs mt-1 mb-3">In the last month</p>
          <p>
            <span className="text-primary-500 text-2xl font-semibold mr-1">
              {numberWithCommas(data.last7days)}
            </span>
            <span className="text-gray-500 text-sm">{`from ${numberWithCommas(
              data.total,
            )} total`}</span>
          </p>
        </div>
      )}

      <ElemButton
        btn="primary"
        size="md"
        className="max-w-sm w-full mt-8 md:mt-16"
        disabled={locations.length === 0}
        onClick={onNext}>
        Next
      </ElemButton>
    </>
  );
};
