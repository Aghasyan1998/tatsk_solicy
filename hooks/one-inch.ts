"use client";

import {buildTxForSwap1Inch, swap1InchQuote} from "@/utils/1inch/api";
import { calculateGasMargin } from "@/utils/calculateGasMargin";
import { ROUTER_ADDRESSES_1INCH } from "@/utils/constants";
import {generate1InchSwapParams, generate1InchSwapQuoteParams, getSigner} from "@/utils/helpers";
import isZero from "@/utils/isZero";
import { BigNumber } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";
import {useCallback, useEffect, useState} from "react";
import {Token} from "@/app/lib/definitions";

interface IProps {
  tokensList: Token[]
}

export const useSwap1Inch = ({
  tokensList
}: IProps) => {
  const chainId = 1;
  const { account, library } = useWeb3React();

  const router1Inch = ROUTER_ADDRESSES_1INCH[chainId];

  const [selectedTokenFrom, setSelectedTokenFrom] = useState<Token>(tokensList[0])
  const [selectedTokenTo, setSelectedTokenTo] = useState<Token | null>(null)
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [error, setError] = useState<string>('')


  useEffect(() => {
    if (selectedTokenFrom && selectedTokenTo && Number(fromAmount)) {
      setError('')
      const swapParams = generate1InchSwapQuoteParams(
          selectedTokenFrom.address,
          selectedTokenTo.address,
          fromAmount
      );

      swap1InchQuote(swapParams, chainId).then((res: any) => {
        if (res.success) {
          setToAmount(res?.data.dstAmount)
        } else {
          console.error(res)
          setError(res.message)
        }
      })
    }
  }, [selectedTokenTo, selectedTokenFrom, fromAmount, chainId])

  const swap1Inch = async () => {
    if (!account || !selectedTokenTo) {
      return
    }

    const from = selectedTokenFrom.address; // TO DO: set address from
    const to = selectedTokenTo.address; // TO DO: set address to
    const typedValue = fromAmount; // TO DO: get from input

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const swapParams = generate1InchSwapParams(
      from,
      to,
      Number(typedValue),
      account,
      1
    );

    const swapTransactionResponse = await buildTxForSwap1Inch(swapParams, chainId);

    if (!swapTransactionResponse.success) {
      console.error(swapTransactionResponse)
      return
    }

    const { data: swapTransaction } = swapTransactionResponse;

    // TO DO: Remove when change DEV plan for 1Inch (1 Request per second)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const tx = {
        from: account ?? "",
        to: router1Inch,
        data: swapTransaction.data,
        ...(swapTransaction.value && !isZero(swapTransaction.value)
          ? { value: swapTransaction.value.toString(16) } // Convert to Hex.If not working use toHex() from @uniswap/v3-sdk 
          : {}),
      };
      const response = await getSigner(library, account)
        .estimateGas(tx)
        .then((estimate: BigNumber) => {
          const newTxn = {
            ...tx,
            gasLimit: calculateGasMargin(estimate),
          };

          return getSigner(library, account)
            .sendTransaction(newTxn)
            .then((response: { hash: any }) => {
              if (!response.hash) {
                throw new Error(
                  `Your swap was modified through your wallet. If this was a mistake, please cancel immediately or risk losing your funds.`
                );
              }
              return response;
            });
        });

      return response;
    } catch (err) {
      console.error(err);
      return;
    }
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setToAmount('0')
    }
    setFromAmount(e.target.value)
  }, [setFromAmount])

  return {
    swap1Inch,
    selectedTokenFrom,
    selectedTokenTo,
    setSelectedTokenFrom,
    setSelectedTokenTo,
    handleInputChange,
    fromAmount,
    toAmount
  };
};
