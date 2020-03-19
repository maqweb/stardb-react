import React from 'react';
import './App.css';
import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from "../error-indicator/error-indicator";
import PeoplePage from "../people-page/people-page";
import SwapiResourse from "../../api/api";
import ItemDetails from "../item-details/item-details";
import Row from "../row/row";


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
        console.log('componentDidCatch()');
        this.setState({hasError: true})
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

        const {getPerson, getStarship, getPersonImage, getStarshipImage} = this.swapi;

        const personDetails = (
            <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}/>
        );

        const starshipDetails = (
            <ItemDetails itemId={5} getData={getStarship} getImageUrl={getStarshipImage}/>
        );

        return (
            <div>
                <Header/>
                {planet}

                {/* <button className="toggle-planet btn btn-warning btn-lg" onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>

                <ErrorButton/>

                <PeoplePage/>*/}

                <Row left={personDetails} right={starshipDetails}/>

            </div>
        );
    }
}

export default App;
