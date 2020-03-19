import React, {Component} from 'react';
import ItemList from "../item-list/item-list";
import ItemDetails from "../item-details/item-details";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiResourse from "../../api/api";
import Row from "../row/row";

class ErrorBoundry extends Component {

    state = {
        hasError: false
    };

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }
        return this.props.children
    }
}


class PeoplePage extends Component {

    swapi = new SwapiResourse();

    state = {
        selectedPerson: 11
    };

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    };

    render() {

        const itemList = (
            <ItemList onPersonSelected={this.onPersonSelected}
                      getData={this.swapi.getAllPeople}>
                {(i) => (
                    `${i.name} (${i.birthYear} )`
                )}
            </ItemList>
        );

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails itemId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );

        return (
            <Row left={itemList} right={personDetails}/>
        );
    }
}

export default PeoplePage;