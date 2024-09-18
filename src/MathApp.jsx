import { useState, useRef } from "react";
import styles from "./styles.module.css";

export default function MathApp() {
    const [number, setNumber] = useState(1);
    const [total, setTotal] = useState(1);
    const answerInput = useRef(null);
    const digitsInput = useRef(null);
    const intervalmsInput = useRef(null);
    const numberOfQuestionsInput = useRef(null);

    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const startButton = async (e) => {
        // 桁数
        const digits = parseInt(digitsInput.current.value);
        const randMin = 10 ** (digits - 1); // 4桁なら1000～9999
        const randMax = (10 ** (digits)) - 1;
        // 表示間隔
        var intervalms = intervalmsInput.current.value;
        // 問題数
        var numberOfQuestions = numberOfQuestionsInput.current.value;

        //まず解答に入力されている数字を消す
        answerInput.current.value = null;

        setTotal(0);
        for (let i = 0; i < numberOfQuestions; i++) {
            await _sleep(intervalms * 0.6);
            // 整数の乱数 （1 ～ 10^digits）
            const randNumInt = Math.floor(Math.random() * (randMax - randMin + 1)) + randMin;
            console.log(randNumInt);
            setNumber(randNumInt);
            setTotal(total => total + randNumInt);
            // 問題で同じ番号が続いた場合、分かりづらいので、表示を一瞬消す
            await _sleep(intervalms * 0.4);
            setNumber("");
        }

    };
    const answerButton = () => {
        if (parseInt(answerInput.current.value, 10) === total) {
            alert("正解だよん");
        } else {
            alert("不正解だよん。");
        }
    };
    const showAnswer = () => {
        alert("正解は" + total + "でした。");
    };
    return (
        <>
            <div >
                桁数：<input ref={digitsInput} type="text" defaultValue="2" maxlength="1" /></div>
            <div >表示速度：<input ref={intervalmsInput} type="text" defaultValue="200" maxlength="3" /> ms</div>
            <div >出題数：<input ref={numberOfQuestionsInput} type="text" defaultValue="10" maxlength="2" /></div >
            <div>
                <button onClick={startButton}>開始！</button></div>
            <div>解答：
                <input ref={answerInput} type="text" inputMode="numeric" pattern="\d*" />
                <button onClick={answerButton}>確認する</button>
                <button onClick={showAnswer}>答えをみる</button>
            </div>
            <div className={styles["show-numbers"]}>
                {number}
            </div >
        </>
    );
};

