import React from "react";
import { Disclosure } from "@headlessui/react";
import { IconPolygonDown } from "../icons";
import { convertToInternationalCurrencySystem } from "@/utils";

export type Metrics = {
  id: string;
  name: string;
};

export type TokenInfo = {
  ticker: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  low24H: number;
  high24H: number;
  vol24H: number;
};

type Props = {
  tokens: Array<TokenInfo>;
  metrics: Metrics[];
};

const ElemTokenInfo: React.FC<Props> = ({ metrics, tokens }) => {
  if (tokens.length === 1) {
    return (
      <div className="bg-white shadow rounded-lg md:mt-0 p-5">
        <h2 className="text-xl font-bold">
          {`Token Info (${tokens[0].ticker})`}
        </h2>
        {renderMetrics(tokens[0], metrics)}
        {renderSourceReference()}
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg md:mt-0 pb-3">
      {tokens.map((tokenInfo, index) => (
        <Disclosure
          as="div"
          className="px-5 pb-2 border-b border-slate-200"
          key={tokenInfo.ticker}
          defaultOpen={index === 0}
        >
          {({ open }) => (
            /* Use the `open` state to conditionally change the direction of an icon. */
            <>
              <Disclosure.Button className="flex justify-between items-center w-full pt-2">
                <h2 className="text-xl font-bold">
                  {`Token Info (${tokenInfo.ticker})`}
                </h2>
                <IconPolygonDown
                  className={`w-8 h-8 text-slate-400 ${
                    open ? "rotate-180 transform" : ""
                  }`}
                />
              </Disclosure.Button>
              <Disclosure.Panel>
                {Object.values(tokenInfo).some((i) => i > 0) && (
                  <section>{renderMetrics(tokenInfo, metrics)}</section>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}

      {renderSourceReference()}
    </div>
  );
};

const renderMetrics = (tokenInfo: TokenInfo, metrics: Array<Metrics>) => {
  return (
    <div className="flex flex-col space-y-2 mt-2">
      {metrics.map((item) => {
        let metricsClass = "";

        if (item.id === "currentPrice") {
          metricsClass = "text-green-700";
        } else if (item.id === "marketCap") {
          metricsClass = "text-green-700";
        } else if (item.id === "marketCapRank") {
          metricsClass = "";
        } else if (item.id === "highLow24H") {
          metricsClass = "";
        } else if (item.id === "vol24H") {
          metricsClass = "text-green-700";
        } else {
          metricsClass = "";
        }

        return (
          <div
            className="flex items-center justify-between space-x-2"
            key={item.id}
          >
            <div>{item.name}</div>
            <div
              className={`${metricsClass} text-sm font-semibold border-none rounded-2xl py-1 px-2`}
            >
              {tokenInfo[item.id as keyof TokenInfo]
                ? item.id === "highLow24H"
                  ? `$${convertAmountRaised(
                      tokenInfo.high24H
                    )}/$${convertAmountRaised(tokenInfo.low24H)}`
                  : `${
                      item.id === "marketCapRank" ? "#" : "$"
                    }${convertAmountRaised(
                      Number(tokenInfo[item.id as keyof TokenInfo])
                    )}`
                : `N/A`}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const renderSourceReference = () => (
  <div className="mt-3 text-xs text-center text-slate-400">
    Token data source:{" "}
    <a
      href="https://www.amberdata.io/?ref=edgeinio"
      target="_blank"
      rel="noreferrer"
      className="hover:text-slate-600"
    >
      AmberData
    </a>{" "}
    and Coingecko
  </div>
);

const convertAmountRaised = (theAmount: number) => {
  return convertToInternationalCurrencySystem(theAmount);
};

export default ElemTokenInfo;
