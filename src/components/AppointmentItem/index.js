// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, updateIsStaredStatus} = props
  const {title, appointmentDate, uuid, isStared} = appointmentDetails

  const makeAppointmentStared = () => {
    updateIsStaredStatus(uuid)
  }

  const formattingTheAppointmentDate = () => {
    const formattedDate = format(
      new Date(appointmentDate),
      'dd MMMM yyyy, EEEE',
    )
    return formattedDate
  }

  return (
    <li className="appointment-item">
      <div className="title-star-container">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-button"
          onClick={makeAppointmentStared}
          testid="star"
        >
          <img
            src={
              isStared
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
            alt="star"
          />
        </button>
      </div>
      <p className="appointmentDate">Date:{formattingTheAppointmentDate()}</p>
    </li>
  )
}

export default AppointmentItem
