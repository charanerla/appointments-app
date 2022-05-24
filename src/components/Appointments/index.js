// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    appointmentDate: '',
    listOfAppointments: [],
    isFilterActive: false,
  }

  addTitle = event => {
    const newTitle = event.target.value

    this.setState({title: newTitle})
  }

  addAppointmentDate = event => {
    const newAppointmentDate = event.target.value

    this.setState({appointmentDate: newAppointmentDate})
  }

  addAppointment = event => {
    event.preventDefault()

    const {title, appointmentDate} = this.state
    if (title !== '' && appointmentDate !== '') {
      const appointmentDetails = {
        title,
        appointmentDate,
        uuid: uuidv4(),
        isStared: false,
      }

      this.setState(prevState => ({
        listOfAppointments: [
          ...prevState.listOfAppointments,
          appointmentDetails,
        ],
      }))

      this.setState({title: '', appointmentDate: ''})
    }
  }

  updateIsStaredStatus = id => {
    const {listOfAppointments} = this.state

    const updateAppointmentList = listOfAppointments.map(eachAppointment => {
      if (eachAppointment.uuid === id) {
        const updateAppointment = {
          ...eachAppointment,
          isStared: !eachAppointment.isStared,
        }
        return updateAppointment
      }
      return eachAppointment
    })

    this.setState({listOfAppointments: updateAppointmentList})
  }

  onFilter = () => {
    this.setState(prevState => ({isFilterActive: !prevState.isFilterActive}))
  }

  getFilteredAppointmentsList = () => {
    const {listOfAppointments, isFilterActive} = this.state

    if (isFilterActive) {
      return listOfAppointments.filter(
        eachTransaction => eachTransaction.isStared === true,
      )
    }
    return listOfAppointments
  }

  render() {
    const {title, appointmentDate, isFilterActive} = this.state
    const cssStylesForTheFilteredButton = isFilterActive
      ? 'starred-button filtered'
      : 'starred-button unFiltered'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="gradient-main-container">
        <div className="responsive-dynamic-container">
          <h1 className="add-appointment-heading">Add Appointment</h1>
          <div className="form-logo-container">
            <div className="form-container">
              <form
                className="add-appointment-form"
                onSubmit={this.addAppointment}
              >
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={this.addTitle}
                />
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  onChange={this.addAppointmentDate}
                  value={appointmentDate}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="logo"
            />
          </div>
          <hr />
          <div className="appointments-container">
            <div className="appointments-heading-stared-button-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={cssStylesForTheFilteredButton}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="unOrdered-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={uuidv4()}
                  appointmentDetails={eachAppointment}
                  updateIsStaredStatus={this.updateIsStaredStatus}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
