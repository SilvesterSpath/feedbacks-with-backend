import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() { 
  const {feedbacks} = useContext(FeedbackContext)

  // Calculate sum
  const average = (feedbacks.reduce((accum, curr)=> accum + curr.rating, 0) / feedbacks.length).toFixed(1).replace(/[.,]0$/, '')
    
  return (
    <div className="feedback-stats">
      <h4>{feedbacks.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average} </h4>
    </div>
  )
}


export default FeedbackStats