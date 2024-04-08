"use client"

import ArrowDownIcon from "@/assets/icons/arrow-down-icon";
import styles from "./index.module.scss";
import {Token} from "@/app/lib/definitions";
import Image from "next/image";
import {useCallback, useState} from "react";

interface IProps {
    tokens: Token[],
    selectedToken: Token | null,
    handleSelectToken: (arg1: Token) => void,
    className?: string
}

export default function SwapDropdown({
    tokens,
    selectedToken,
    handleSelectToken,
    className
}: IProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onSelectToken = useCallback((token: Token) => {
        handleSelectToken(token)
        setIsOpen(prevState => !prevState)
    }, [setIsOpen, handleSelectToken])

    return(
        <>
            <div className={styles.swap_dropdown_content} onClick={() => setIsOpen(prevState => !prevState)}>
                {selectedToken ? (
                    <>
                        <div className={`${styles.selected_token} ${className}`}>
                            <Image
                                src={selectedToken.logoURI}
                                alt='alt'
                                width={24}
                                height={24}
                            />
                            {selectedToken.symbol}
                            <ArrowDownIcon/>
                        </div>
                    </>
                ) : (
                    <div className={styles.select_token}>
                        Select a token
                        <ArrowDownIcon/>
                    </div>
                )}
            </div>
            {isOpen ? (
                <div className={styles.dropdown_list}>
                    <div className={styles.header}>
                        <button onClick={() => setIsOpen(prevState => !prevState)}><ArrowDownIcon/></button>
                        Select a token
                    </div>
                    <div className={styles.scrollable_list}>
                        {tokens.map(token => (
                            <div key={token.address} className={styles.list_item} onClick={() => onSelectToken(token)}>
                                <Image
                                    src={token.logoURI}
                                    alt="alt"
                                    width={40}
                                    height={40}
                                />
                                <div className={styles.details}>
                                    <div className={styles.name}>{token.name}</div>
                                    <div className={styles.symbol}>0 {token.symbol}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ): null}
        </>
    )
}