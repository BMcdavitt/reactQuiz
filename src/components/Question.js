import React from "react";
import HtmlReactParser from "html-react-parser";

export default function Question (props) {

    function answerSelect(answerclicked){
        props.selectClick(props.identifier, answerclicked.target.attributes.answervalue.value)

    }

    function answerClassName(x) {
        // props.selected === props.allAnswers[x] ? "choiceSelected" : "choice"
        

        if(props.gameState === "Play"){

            if(props.allAnswers[x] === props.selected) {
                return ("choiceSelected")
            }
            else {
                return ("choice")
            }}
        else {
            if(props.allAnswers[x] === props.correctAnswer)   {
                return("choiceCorrect")
            }
            else if (props.allAnswers[x] === props.selected) {
                return ("choiceIncorrect")
            }
            else {
                return ("choice")
            }
        }
    }

    function answers() {

        let answerList = []

        for(let x = 0; x < props.allAnswers.length; x++)
        {
            answerList[x+1] = <div className={answerClassName(x)}
                                   onClick={answerSelect}
                                   answervalue={props.allAnswers[x]}
                                   key={x}>{HtmlReactParser(props.allAnswers[x])}</div>
        }

        return answerList
    }

    return (
        <div>
            <div className="question">{props.question}</div>
            <div className="choices">
                {answers()}
            </div>
            <hr />
        </div>
    )
}