import axios from 'axios'
import {useEffect, useState} from "react";
import {click} from "@testing-library/user-event/dist/click";


const App = () => {
  const [chosenLevel, setChosenLevel] = useState(null)
  const [words,setWords] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)

  const getRandomWords = () => {

    const options = {
      method: 'GET',
      url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
      params: {level: chosenLevel, area: 'sat'},
      headers: {
        'X-RapidAPI-Key': '70248d77afmsh8b1d8e9693f92e6p18702ejsn17ce8e077e23',
        'X-RapidAPI-Host': 'twinword-word-association-quiz.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      setWords(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  }


  useEffect(() => {
    if (chosenLevel) getRandomWords()
  }, [chosenLevel])

  const checkAnswer = (option, optionIndex, correctAnswer) => {

    if (optionIndex == correctAnswer && !correctAnswers.includes(option)) {
      correctAnswers.push(option)
      setScore(score => score+1)
    } else {
      setScore(score => score-1)
    }
    if (!clicked.includes(option)) {
      clicked.push(option)
    }
    console.log(clicked)

  }

  return (
    <div className="App">

      {!chosenLevel && <div className="level-selector">
        <h1>Word Association Game</h1>
        <h4>Select your level of difficulty</h4>
        <select name="levels" id="levels" value={chosenLevel} onChange={(e) => setChosenLevel(e.target.value)}>
          <option value = {null}>Select a level</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
          <option value="5">Level 5</option>
          <option value="6">Level 6</option>
          <option value="7">Level 7</option>
          <option value="8">Level 8</option>
          <option value="9">Level 9</option>
          <option value="10">Level 10</option>
        </select>
      </div>}

      {chosenLevel && words && <div className="question-area">
        <h1>Try to beat the level {chosenLevel}</h1>
        <h3>Your score is {score}</h3>

        <div className="questions" >


          {words.quizlist.map((question, questionIndex) => (
              <div key={questionIndex} className="question-box">
                {question.quiz.map((tip, tipIndex) => (
                    <p key={tipIndex}>{tip}</p>
                ))}
                <div className="question-buttons">
                  {question.option.map((option, optionIndex) => (
                      <div className="question-button">
                        <button
                            disabled = {clicked.includes(option)}
                            onClick={() => checkAnswer(option,optionIndex+1, question.correct)}>{option}
                        </button>
                        {correctAnswers.includes(option) && <p> Correct ! </p>}
                        {clicked.includes(option) && !correctAnswers.includes(option) && <p> Wrong ! </p>}

                      </div>
                  ))}
                </div>
              </div>))}

          </div>

        <button onClick={() => setChosenLevel(null)}>Change level</button>

      </div>}

    </div>
        )
}

export default App;
