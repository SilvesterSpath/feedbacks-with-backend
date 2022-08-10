import { useState, useContext, useEffect } from "react"
import Card from "../shared/Card"
import Button from "../shared/Button"
import RatingSelect from "./RatingSelect"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
  const [text, setText] = useState('')
  const [btnDisabled, setBtnDisables] = useState(true)
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(null)

  const {addFeedback, feedbackEditState, updateFeedback} = useContext(FeedbackContext)

  useEffect(()=>{
    if(feedbackEditState.edit){
      setBtnDisables(false)
      setText(feedbackEditState.item.text)
      setRating(feedbackEditState.item.rating)      
    }
  },[feedbackEditState.edit, feedbackEditState.item.text, feedbackEditState.item.rating])

  const handleTextChange = (e)=>{        
    if (text.length >= 10 || text.length <= 1){
      setBtnDisables(false)
      setMessage(null)
    } else {
      setBtnDisables(true)
      setMessage('Please write at least 10 chars')
    }

    setText(e.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(text.trim().length > 10){
      const newFeedback = {        
        text,
        rating
      }
      if(feedbackEditState.edit){
        updateFeedback(feedbackEditState.item.id, newFeedback)
        setText('')
        setRating(null)        
      } else {
        addFeedback(newFeedback);
        setText('')
      }
     
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating)=>setRating(rating)}/>
        <div className="input-group">
          <input type="text" placeholder="Write a review" value={text} onChange={(e)=> handleTextChange(e)}/>
          <Button type="submit" isDisabled={btnDisabled} >Send</Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>    
  )
}

export default FeedbackForm