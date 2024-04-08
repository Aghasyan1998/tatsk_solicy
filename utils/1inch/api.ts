import {extractErrorDetails, I1InchSwapParams, I1InchSwapParamsQuote} from "../helpers";
import axios1InchClient from "@/utils/client-api";
import {AxiosError} from "axios";

const oneInchBaseUrl = process.env.NEXT_PUBLIC_REACT_APP_1INCH_BASE_URL || "";

export const create1InchProxyUrl = (url: string) =>
  `?url=${oneInchBaseUrl}${url}`;
export const broadcastApiUrl1Inch = (chainId: string | number) =>
  create1InchProxyUrl(`/tx-gateway/v1.1/${chainId}/broadcast`);
export const apiBaseUrl1Inch = (chainId: string | number) =>
  create1InchProxyUrl(`/swap/v5.2/${chainId}`);

export function apiRequestUrl(path: string, queryParams: any) {
  return path + "?" + new URLSearchParams(queryParams).toString();
}

export async function buildTxForSwap1Inch(
  swapParams: I1InchSwapParams,
  chainId: string | number
) {
  const url = creteProxyGetUrl(`/swap/v6.0/${chainId}/swap`, swapParams);

  try {
    const response = await axios1InchClient.get(url);
    return { success: true, data: response.data.tx };
  } catch (err) {
    const errorData = extractErrorDetails(err as AxiosError | Error)
    return { success: false, message: errorData.message };
  }
}

const creteProxyGetUrl = (url: string, params: any) => {
  const searchParams = new URLSearchParams(params).toString()
  return '?url=' + encodeURIComponent(`${url}?${searchParams}`)
}

export async function swap1InchQuote(
    swapParams: I1InchSwapParamsQuote,
    chainId: string | number
) {
  const url = creteProxyGetUrl(`/swap/v6.0/${chainId}/quote`, swapParams)

  try {
    const response = await axios1InchClient.get(url);

    return { success: true, data: response.data };
  } catch (err) {
    const errorData = extractErrorDetails(err as AxiosError | Error)
    return { success: false, message: errorData.message };
  }
}


export async function fetchTokenList(
    chainId: string | number
) {
  const url = creteProxyGetUrl(`/swap/v6.0/${chainId}/tokens`, {})

  try {
    return axios1InchClient.get(url)
  } catch (err) {
    const errorData = extractErrorDetails(err as AxiosError | Error)
    console.error(errorData)
  }
}
