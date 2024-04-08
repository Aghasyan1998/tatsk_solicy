import styles from "./index.module.scss";
import SwapDropdown from "@/app/ui/SwapDropdown";
import {Token} from "@/app/lib/definitions";

interface IProps {
    actionTitle: string,
    tokens: Token[],
    selectedToken: Token | null,
    handleSelectToken: (arg0: Token) => void,
    className?: string,
    dropdownClassName?: string,
    disabled?: boolean | undefined,
    value?: string | number
    handleInputChange?: (arg0: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FormGroup({
    actionTitle,
    tokens,
    selectedToken,
    handleSelectToken,
    className,
    dropdownClassName,
    disabled,
    handleInputChange,
    value
}: IProps) {
    return (
        <div className={`${styles.form_group} ${className}`}>
            <div className={styles.header}>{actionTitle}</div>
            <div className={styles.body}>
                <SwapDropdown
                    className={dropdownClassName}
                    tokens={tokens}
                    selectedToken={selectedToken}
                    handleSelectToken={handleSelectToken}
                />
                <input
                    type="number"
                    className={styles.input}
                    min={0}
                    maxLength={20}
                    disabled={disabled}
                    onChange={handleInputChange}
                    value={value}
                />
            </div>
            <div className={styles.footer}>
                {selectedToken ? (
                    <div className={styles.header}>{selectedToken.name}</div>
                ) : null}
            </div>
        </div>
    );
}
