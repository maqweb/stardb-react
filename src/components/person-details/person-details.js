import React, {Component} from 'react';

import './person-details.css';
import SwapiResourse from "../../api/api";
import Spinner from "../spiner/spinner";
import ErrorButton from "../error-button/error-button";

export default class PersonDetails extends Component {

    swapi = new SwapiResourse();

    state = {
        person: null,
        loading: false
    };

    componentDidMount() {
        this.updatePerson()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.personId !== prevProps.personId) {
            this.setState({
                loading: true
            });
            this.updatePerson();
        }
    }

    updatePerson() {
        const {personId} = this.props;

        if (!personId) {
            return
        }

        this.swapi.getPerson(personId)
            .then((person) => {
                this.setState({person, loading: false})
            })
    }


    render() {

        if (!this.state.person) {
            return <span>Select a person from a list</span>
        }
        // const {id, name, gender, birthYear, eyeColor} = this.state.person;
        const {person, loading} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const content = !loading ?  <PersonView person={person}/> : null;

        return (
            <div className="person-details card">

                {spinner}
                {content}

            </div>
        )
    }
}

const PersonView = (props) => {

    const {id, name, gender, birthYear, eyeColor} = props.person;

    return (
        <React.Fragment>
            <img className="person-image"
                 src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                 alt="person"/>

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{eyeColor}</span>
                    </li>
                </ul>
                <ErrorButton/>
            </div>
        </React.Fragment>
    )
};