import { ElemTooltip } from "@/components/elem-tooltip";
import { IconEye, IconHide } from "@/components/icons-temp";
import React, { FC, useState } from "react";

type Props = {
  value: string;
};

const ElemGeneratedPassword: FC<Props> = ({ value }) => {
  const [show, setShow] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  const onMouseOut = () => {
    if (copied) {
      setCopied(false);
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      {show ? (
        <button onClick={() => setShow(false)}>
          <IconHide className="w-8 h-8 px-1 cursor-pointer rounded-md text-gray-400 hover:bg-slate-200" />
        </button>
      ) : (
        <button onClick={() => setShow(true)}>
          <IconEye className="w-7 h-7 px-1 cursor-pointer rounded-md hover:bg-slate-200" />
        </button>
      )}
      <div>
        {show ? (
          <ElemTooltip content={copied ? "Copied" : "Click to copy"}>
            <button
              className="bg-slate-200 p-2 rounded-md"
              onClick={onCopy}
              onMouseOut={onMouseOut}
            >
              {value}
            </button>
          </ElemTooltip>
        ) : (
          <span className="p-2 leading-9">••••••••••••</span>
        )}
      </div>
    </div>
  );
};

export default ElemGeneratedPassword;
