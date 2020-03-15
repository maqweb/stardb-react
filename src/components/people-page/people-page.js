import React, {Component} from 'react';
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/person-details";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiResourse from "../../api/api";
import Row from "../row/row";


class PeoplePage extends Component {

    swapi = new SwapiResourse();

    state = {
        selectedPerson: null,
        hasError: false
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true
        })
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    };

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        const itemList =  <ItemList onPersonSelected={this.onPersonSelected}
                                    getData={this.swapi.getAllPeople}
                                    renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear} )`}/>;

        const personDetails = <PersonDetails personId={this.state.selectedPerson}/>;

        return (
           <Row left={itemList} right={personDetails}/>
        );
    }
}

export default PeoplePage;