"use client"

import {Roboto} from "next/font/google";
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from "@ethersproject/providers";

import "./globals.css";
import {ethers} from 'ethers';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})


function getLibrary(provider: any) {
  // @ts-ignore
  return new Web3Provider(provider);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <Web3ReactProvider getLibrary={getLibrary}>
      <body className={roboto.className}>{children}</body>
    </Web3ReactProvider>
    </html>
  );
}
