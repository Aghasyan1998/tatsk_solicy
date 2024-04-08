"use client"

import { useWeb3React } from '@web3-react/core';
import {injected} from "@/app/connectors";
import Image from "next/image";

import styles from './index.module.scss';

interface IProps {
    swap1Inch: () => void
}

export default function ConnectWallet({
    swap1Inch
}: IProps) {
    const { activate, deactivate, active } = useWeb3React();

    const connect = async () => {
        try {
            await activate(injected);
        } catch (ex) {
            console.error(ex);
        }
    };

    const disconnect = () => {
        try {
            deactivate();
        } catch (ex) {
            console.error(ex);
        }
    };

    return (
        <>
            {active ? (
                <button className={styles.connect_wallet} onClick={swap1Inch}>Swap</button>
            ) : (
                <button onClick={connect} className={styles.connect_wallet}>
                    <Image
                        src="https://app.1inch.io/assets/images/icons/connect.svg"
                        alt="alt"
                        width={24}
                        height={24}
                    />
                    Connect Wallet
                </button>
            )}
        </>
    );
}
