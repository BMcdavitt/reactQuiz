import React from "react";
import HtmlReactParser from "html-react-parser";
import Question from "./Question.js";

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export default function GamePage () {


    const [questions, updateQuestions] = React.useState("")

    const [gameState, updateGameState] = React.useState("Play")

    const [correctAnswers, updateCorrectAnswers] = React.useState(0)

        React.useEffect(() => {

        if(gameState === "Play")
        {
        fetch(`https://opentdb.com/api.php?amount=5`)
        .then(res => res.json())
        .then(data => {
            
            let updatedQuestions = data.results.map(oldResults => (
                {...oldResults, 
                    "selected": "",
                    "allAnswers": shuffle(oldResults.incorrect_answers.concat(oldResults.correct_answer))}))

            return updateQuestions(updatedQuestions) })}},[gameState])

        const questionsArray = Object.keys(questions)

    let questionString = [];

    for(let x = 0; x < questionsArray.length; x++)
    {
        let thisQuestion = HtmlReactParser(questions[x].question)
        let thisAnswer = HtmlReactParser(questions[x].correct_answer)
        let thisIncorrectAnswers = questions[x].incorrect_answers
        let thisSelected = questions[x].selected
        let thisAllAnswers = questions[x].allAnswers
        questionString[x] = <Question question={thisQuestion} 
                                      correctAnswer={thisAnswer} 
                                      incorrectAnswers={thisIncorrectAnswers} 
                                      selectClick={selectAnswer} 
                                      selected={thisSelected}
                                      key={x}
                                      identifier={x}
                                      allAnswers={thisAllAnswers}
                                      gameState={gameState}/>
    }

    function selectAnswer(identifier, answer) {

        let newQuestions = []

        for(let x = 0; x < questions.length; x++)
        {
            
            if(identifier === x) {
                newQuestions.push({...questions[x], "selected":answer})
            }
            else {
                newQuestions.push(questions[x])
            }
        }

        updateQuestions(newQuestions)

    }

    function checkAnswers() {
        updateGameState("checkAnswers")

        for(let x = 0; x < questions.length; x++)
        {

            if(questions[x].correct_answer === questions[x].selected) {
                updateCorrectAnswers(oldCorrect => oldCorrect+1) 
            } 
        }
     }

    function newGame() {
        updateGameState("Play")
        updateCorrectAnswers(0)
    }

    return(
        <div className="gameContent">
            <img src="images/blob1.png" className="blob1" alt="blob1"/>
            <div className="questionContainer">
                {questionString}
            </div>
            <div className="gameState">
                {gameState==="Play" ? <button onClick={checkAnswers}>Check Answers</button> : <button onClick={newGame}>Play Again</button>}
                {gameState==="checkAnswers" ? <div className="results">You scored {correctAnswers}/5 correct answers</div>:<div></div>}
            </div>
            <img src="images/blob2.png" className="blob2" alt="blob2"/>
        </div>
    )
}