import PropTypes from 'prop-types'

function Header({bgColor, textColor, text}) {
 
  return (
    <header style={{backgroundColor: bgColor, color: textColor}}>
      <div className="container"> 
        <h2>{text}</h2>      
      </div>
    </header>
  )
}

Header.defaultProps = {  
  bgColor: 'rgba(0,0,0,0.4)',
  textColor: '#ff6a95',
  text: 'Feedback UI'
}

Header.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string
}

export default Header