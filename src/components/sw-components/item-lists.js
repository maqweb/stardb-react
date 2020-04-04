import React from "react";
import ItemList from "../item-list/item-list";
import withData from './../hoc-helper/with-data';
import SwapiResourse from "../../api/api";

const swapi = new SwapiResourse();

const {
    getAllPeople,
    getAllStarships,
    getAllPlanets
} = swapi;

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
};

const renderName = ({name}) => <span>{name}</span>;

const PersonList = withData(withChildFunction(ItemList, renderName), getAllPeople);
const PlanetList = withData(withChildFunction(ItemList, renderName), getAllPlanets);
const StarshipList = withData(withChildFunction(ItemList, renderName), getAllStarships);

export {
    PersonList,
    PlanetList,
    StarshipList
};