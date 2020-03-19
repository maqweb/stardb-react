import React, {Component} from 'react';

import './item-details.css';
import SwapiResourse from "../../api/api";
import Spinner from "../spiner/spinner";
import ErrorButton from "../error-button/error-button";

export default class ItemDetails extends Component {

    swapi = new SwapiResourse();

    state = {
        item: null,
        loading: false,
        image: null
    };

    componentDidMount() {
        this.updatePerson()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId) {
            this.setState({
                loading: true
            });
            this.updatePerson();
        }
    }

    updatePerson() {
        const {itemId, getData, getImageUrl} = this.props;

        if (!itemId) {
            return
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false,
                    image: getImageUrl(item)
                })
            })
    }


    render() {

        if (!this.state.item) {
            return <span>Select a person from a list</span>
        }
        // const {id, name, gender, birthYear, eyeColor} = this.state.person;
        const {item, loading, image} = this.state;

        const spinner = loading ? <Spinner/> : null;
        const content = !loading ?  <ItemView item={item} image={image}/> : null;

        return (
            <div className="person-details card">

                {spinner}
                {content}

            </div>
        )
    }
}

const ItemView = (props) => {

    const {id, name, gender, birthYear, eyeColor} = props.item;
    const image = props.image;

    return (
        <React.Fragment>
            <img className="person-image"
                 src={image}
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