import { NextApiRequest, NextApiResponse } from "next/types";
import Express from "express";

export interface CommonRequest {
	url: string | undefined;
	cookies: {
			[key: string]: string;
	};
	body: any;
	method: string | undefined;
}

export interface CommonResponse {
	send: (body: any) => CommonResponse;
	status: (status: number) => CommonResponse;
}

export const convertNextToCommonRequest = (req : NextApiRequest ) => {
  const commonReq: CommonRequest = {
    url: req.url,
    cookies: req.cookies,
    body: req.body,
    method: req.method,
  }
  return commonReq;
}

export const convertNextToCommonResp = (res : NextApiResponse) => {
  const commonRes: CommonResponse = {
    status: (status: number) => {
      res.status(status);
      return commonRes;
    },
    send: (body: any) => {
      res.send(body);
      return commonRes;
    }
  };
  return commonRes;
}

export const convertExpressToCommonRequest = (req: Express.Request) =>{
  const commonReq: CommonRequest = {
      url: req.url,
      cookies: req.cookies,
      body: req.body,
      method: req.method,
  };
  return commonReq;
}
export const convertExpressToCommonResp = (res: Express.Response) =>{
  const commonRes: CommonResponse = {
      status: (status: number) => {
        res.status(status);
        return commonRes;
      },
      send: (body: any) => {
        res.send(body);
        return commonRes;
      }
    };
  return commonRes;
}
