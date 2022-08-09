import FeedbackList from '../components/FeedbackList';
import FeedbackStats from '../components/FeedbackStats';
import FeedbackForm from '../components/FeedbackForm';

function Home() {
    return (
    <>
      <FeedbackForm />
      <FeedbackStats />
      <FeedbackList />
    </>
  )
}

export default Home