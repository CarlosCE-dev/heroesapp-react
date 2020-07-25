import React, { useMemo } from 'react'

import queryString from 'query-string';

import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHereosByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();

    const { q = "" } = queryString.parse( location.search );
    
    const [ formValue, handleInputChange ] = useForm({ search: q })
    
    const { search } = formValue;

    const heroesFiltered = useMemo(() => getHereosByName( q ), [ q ]);

    const handleSubmit = ( e ) => {
        e.preventDefault();
        history.push(`?q=${ search }`)
    }

    return (
        <div>
            <h1> Search screen </h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4> Search Form </h4>
                    <hr/>

                    <form onClick={ handleSubmit }>
                        <input
                            autoComplete="off"
                            onChange={ handleInputChange }
                            value={ search }
                            name="search"
                            type="text" 
                            placeholder="Find your hero"
                            className="form-control"/>
                        <button type="submit"
                                className="btn m-1 btn-block btn-outline-primary">
                                Search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4> Results </h4>
                    <hr/>

                    {
                        ( q === "" ) &&
                         <div className="alert alert-info">
                         Search a hero 
                        </div>
                    }

                    {
                        ( q !== "" && heroesFiltered.length === 0 ) &&
                         <div className="alert alert-danger">
                         There is no hero with { q }
                        </div>
                    }

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard 
                                key={ hero.id }
                                { ...hero }
                            />
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
