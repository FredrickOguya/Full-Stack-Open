import { useFeedbackControls } from "../Store"


const Buttons = () => {

  const { handleGoodClick, handleNeutralClick, handleBadClick } = useFeedbackControls(state => state.actions)


  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
    </div>
  )
}

export default Buttons
