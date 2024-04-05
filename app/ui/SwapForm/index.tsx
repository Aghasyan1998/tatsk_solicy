"use client"

import styles from "./index.module.scss";
import FormGroup from "@/app/ui/FormGroup";
import {Token} from "@/app/lib/definitions";
import {useSwap1Inch} from "@/hooks/one-inch";
import ConnectWallet from "@/app/ui/ConnectWallet";

interface IProps {
    tokensList: Token[]
}

export default function SwapForm({
    tokensList
}: IProps) {
    const {
        setSelectedTokenFrom,
        setSelectedTokenTo,
        selectedTokenTo,
        selectedTokenFrom,
        handleInputChange,
        fromAmount,
        toAmount,
        swap1Inch
    } = useSwap1Inch({ tokensList })

    return (
        <div className={styles.swap_form_content}>
            <div className={styles.swap_header}>
                Swap
            </div>
            <FormGroup
                tokens={tokensList}
                actionTitle="You pay"
                selectedToken={selectedTokenFrom}
                handleSelectToken={setSelectedTokenFrom}
                value={fromAmount}
                handleInputChange={handleInputChange}
            />
            <FormGroup
                dropdownClassName={styles.dropdown}
                className={styles.form_group}
                tokens={tokensList}
                actionTitle="You receive"
                selectedToken={selectedTokenTo}
                handleSelectToken={setSelectedTokenTo}
                value={toAmount}
                disabled
            />
            <ConnectWallet swap1Inch={swap1Inch}/>
        </div>
    );
}
