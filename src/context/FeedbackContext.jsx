import {createContext, useState, useEffect} from 'react'
import axios from 'axios'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedbacks, setFeedbacks] = useState([])
  const [feedbackEditState, setFeedbackEditState] = useState({
    item: {},
    edit: false
  })

  useEffect(()=>{
    getFeedbacks()
  }, [])

  // Get feedbacks
  const getFeedbacks = async ()=> {
    const feedbacks = await axios.get('/feedback?_sort=id&_order=desc')
    
    setFeedbacks(feedbacks.data)
    setIsLoading(false)
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete')) {
      await axios.delete(`/feedback/${id}`)
      setFeedbacks(feedbacks.filter((item) => item.id !== id));
    }
  };

  // Set item to be updated
  const editFeedback = (item)=>{
    setFeedbackEditState({
      item,
      edit: true
    })
  }

  // Add a feedback
  const addFeedback = async(newFeedback) => {
    const response = await axios.post('/feedback', newFeedback)
    const data = await response.data    
    setFeedbacks([data, ...feedbacks]);    
  };

  // Update feedback item
  const updateFeedback = async (id, feedbackItem)=>{
    const response = await axios.put(`/feedback/${id}`, feedbackItem)
    const data = response.data
    setFeedbacks(feedbacks.map((item)=> item.id === id ? {...item, ...data}: item))
  }
 
  return <FeedbackContext.Provider value={{
    feedbacks,
    deleteFeedback,
    addFeedback,
    editFeedback,
    feedbackEditState,
    updateFeedback,
    isLoading
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext
