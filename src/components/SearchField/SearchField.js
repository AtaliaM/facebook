import React, { useState, useEffect } from 'react';
import facebookApi from '../../apis/facebook-api';


const SearchField = (props) => {

    const [term, setTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);


    useEffect(() => {
        const timerId = setTimeout(() => {
            if (term !== "") {
                setDebouncedTerm(term);
            }
        }, 1000);
        return () => {
            clearTimeout(timerId);
        }
    }, [term])


    useEffect(() => {
        const search = async () => {
            const res = await facebookApi.get("/users");
            let autoCompleteList = res.data.map((user) => {
                return { firstName: user.firstName, lastName: user.lastName, id: user._id, path: user.path };
            })
            console.log(autoCompleteList)
            setAutocompleteSuggestions(autoCompleteList);
        }
        if (debouncedTerm.length > 0) {
            search();
        }

    }, [debouncedTerm]);

    const RenderAutocompleteUserList = () => {
        return (
            autocompleteSuggestions.map((user) => {
                return <option key={user.id} id={`${user.id}`} value={`${user.firstName} ${user.lastName}`}/>
            })
        )
    }

    const submitChosenUser = (e) => {
        e.preventDefault();
        const city = autocompleteSuggestions.filter(user =>
            user.firstName = user.lastName === debouncedTerm
        );
        console.log(city);
    }


    return (
        <div className="searchField">
            <form autoComplete="on">
                {/* <label>Search:</label> */}
                <div className="ui action input mini">
                    <input type="text" list="autocomplete"
                        onChange={event => setTerm(event.target.value)} value={term} />
                    <button className="ui icon button" onClick={(e) => submitChosenUser(e)}><i className="search icon"></i></button>
                </div>
                {autocompleteSuggestions.length > 0 ?
                    <datalist id="autocomplete">
                        {RenderAutocompleteUserList()}
                    </datalist> : null}
            </form>
        </div>
    )

}

export default SearchField;