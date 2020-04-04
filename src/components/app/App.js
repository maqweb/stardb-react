import React from 'react';
import './App.css';
import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from "../error-indicator/error-indicator";
import PeoplePage from "../people-page/people-page";
import ItemList from "../item-list/item-list"
import SwapiResourse from "../../api/api";
import ItemDetails, {Record} from "../item-details/item-details";
import Row from "../row/row";
import ErrorBoundry from "../error-boundry/error-boundry";
import {PersonList, StarshipList, PlanetList} from "../sw-components/item-lists";
import {PersonDetails, PlanetDetails, StarshipDetails} from "../sw-components/details";


class App extends React.Component {

    swapi = new SwapiResourse();

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    };

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true})
    }

    render() {

        const {getAllPeople, getAllPlanets} = this.swapi;

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

        const {getPerson, getStarship, getPersonImage, getStarshipImage} = this.swapi;

        /*const personDetails = (
            <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}>
                <Record field="gender" label="Gender"/>
                <Record field="eyeColor" label="Eye Color"/>
            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails itemId={5} getData={getStarship} getImageUrl={getStarshipImage}>
                <Record field="model" label="Model"/>
                <Record field="length" label="Length"/>
                <Record field="costInCredits" label="Cost"/>
            </ItemDetails>
        );*/

        return (
            <ErrorBoundry>
                <div className="stardb-app">
                    <Header/>

                    {/*<ItemList
                        getData={getAllPeople}
                        onItemSelected={() => {}}>
                        { ({name}) => <span>{name}</span> }
                    </ItemList>

                    <ItemList
                        getData={getAllPlanets}
                        onItemSelected={() => {}}>
                        { ({name}) => <span>{name}</span> }
                    </ItemList>*/}

                    <PersonList/>
                    <PersonDetails itemId={11}/>

                    <StarshipList/>
                    <StarshipDetails itemId={9}/>

                    <PlanetList/>
                    <PlanetDetails itemId={5}/>

                </div>
            </ErrorBoundry>
            // <div>
            //     <Header/>
            //     {planet}
            //
            //     {/* <button className="toggle-planet btn btn-warning btn-lg" onClick={this.toggleRandomPlanet}>
            //         Toggle Random Planet
            //     </button>
            //
            //     <ErrorButton/>*/}
            //
            //     {/*<PeoplePage/>*/}
            //
            //     <ItemList/>
            //
            //     <Row left={personDetails} right={starshipDetails}/>
            //
            // </div>
        );
    }
}

export default App;
