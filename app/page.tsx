import styles from "./page.module.scss";
import SwapForm from "@/app/ui/SwapForm";
import {fetchTokenList} from "@/utils/1inch/api";
import {Token} from "@/app/lib/definitions";

export default async function Home() {
    const response = await fetchTokenList(1)
    const {tokens = {}} = response?.data || {};
    const tokensList = Object.values(tokens) as Token[]
    return (
        <main className={styles.main}>
            <SwapForm tokensList={tokensList}/>
        </main>
    );
}
