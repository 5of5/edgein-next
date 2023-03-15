import { FC } from "react";
import Link from "next/link";
import { GetEventsQuery } from "@/graphql/types";
import { getFullAddress } from "@/utils/helpers";
import { formatDate } from "@/utils";

type Props = {
  event: GetEventsQuery["events"][0];
  onClickType?: any;
};

export const ElemEventCard: FC<Props> = ({ event, onClickType }) => {
  return (
    <Link key={event.id} href={`/events/${event.slug}`}>
      <a
        key={event.id}
        className="flex flex-col mx-auto w-full p-5 cursor-pointer border border-black/10 rounded-lg transition-all hover:scale-102 hover:shadow"
      >
        <div>
          <div
            className="h-36 rounded-lg w-full bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(${
                event.banner?.url ||
                "https://source.unsplash.com/random/500×200/?city"
              })`,
            }}
          />
        </div>
        <h3 className="mt-4 text-2xl font-bold break-words min-w-0 sm:text-lg lg:text-xl group-hover:opacity-60">
          {event.name}
        </h3>

        <div className="grow mt-1">
          {event.start_date && (
            <div className="w-full inline-flex py-1 font-medium">
              {event.start_date &&
                formatDate(event.start_date, {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  timeZone: "America/Los_Angeles",
                })}

              {event.end_date && (
                <>
                  &nbsp;&ndash;&nbsp;
                  {formatDate(event.end_date, {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    timeZone: "America/Los_Angeles",
                  })}
                </>
              )}
            </div>
          )}

          {event?.types?.length > 0 && (
            <div
              className="my-2 flex flex-wrap gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {event.types.map((type: string) => (
                <div
                  key={type}
                  onClick={(e) => {
                    if (onClickType) {
                      onClickType(e, type);
                    }
                  }}
                  className={`shrink-0 bg-slate-200 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full cursor-pointer hover:bg-slate-300`}
                >
                  {type}
                </div>
              ))}
            </div>
          )}

          <div className="w-full inline-flex py-1 text-sm text-gray-400">
            {/* {event.venue} */}
            {/* {event.venue != null && event.location_json != null && (
													<div className="mx-1">{"•"}</div>
												)} */}
            {event.location_json && (
              <div>{getFullAddress(event.location_json)}</div>
            )}
          </div>

          <div className="w-full inline-flex py-1 text-sm text-gray-400">
            {event.price != null && (
              <div>
                {event.price > 0 ? `Starts at $${event.price}` : "Free"}
              </div>
            )}
            {event.price != null && event.size != null && (
              <div className="mx-1">{"•"}</div>
            )}
            {event.size != null && (
              <>
                <div>
                  {/* {+event.size < 50
																? "Less than 50 people"
																: `${numberWithCommas(+event.size)} people`} */}
                  {event.size}
                </div>
              </>
            )}
          </div>
        </div>

        {/* <div>
											<ElemButton className="pl-0 pr-0" btn="transparent" arrow>
												View
											</ElemButton>
										</div> */}
      </a>
    </Link>
  );
};
