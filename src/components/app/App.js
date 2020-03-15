import React from 'react';
import './App.css';
import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from "../error-indicator/error-indicator";
import PeoplePage from "../people-page/people-page";
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/person-details";
import SwapiResourse from "../../api/api";


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

        return (
            <div>
                <Header/>
                {planet}

                <button className="toggle-planet btn btn-warning btn-lg" onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>
                <ErrorButton/>

                <PeoplePage/>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <ItemList onPersonSelected={this.onPersonSelected}
                                  getData={this.swapi.getAllPlanets}
                                  renderItem={(item) => item.name}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <ItemList onPersonSelected={this.onPersonSelected}
                                  getData={this.swapi.getAllStarships}
                                  renderItem={(item) => item.name}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
