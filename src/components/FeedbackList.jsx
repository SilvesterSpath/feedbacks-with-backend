import FeedbackItem from "./FeedbackItem"
import {motion, AnimatePresence} from 'framer-motion'
import {useContext} from 'react'
import FeedbackContext from "../context/FeedbackContext"
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../shared/Spinner'

function FeedbackList() {
  const {feedbacks, isLoading} = useContext(FeedbackContext)  

  if(!isLoading && (!feedbacks || feedbacks.length === 0)){
    return <p>No Feedback Yet</p>
  }
  
/*   return (
    <div className="feedback-list">   
     {feedbacks.map((item, idx)=>(
      <FeedbackItem key={idx} item={item} handleDel={handleDel}/>
    ))}
    </div>
  ) */

  return isLoading ? <Spinner/> : (
    <div className="feedback-list">  
    <AnimatePresence>
      {feedbacks.map((item, idx)=>(
        <motion.div key={uuidv4()} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity:0}}>
          <FeedbackItem key={idx} item={item} />
        </motion.div>        
      ))}
    </AnimatePresence>

    </div>
  )
  
}

/* FeedbackList.propTypes = {
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired
    })
  )
} */

export default FeedbackList