import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import facebookApi from '../../apis/facebook-api';

const SearchField = (props) => {
    
    const [term, setTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
    // const history = useHistory();
    
    // const autoCompleteList = useRef([]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (term !== "") {
                setDebouncedTerm(term);
            }
        }, 200);
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
                return <option key={user.id} id={`${user.id}`} value={`${user.firstName} ${user.lastName}`} path={`${user.path}`}/>
            })
        )
    }

    const submitChosenUser = (e) => {
        e.preventDefault();
        const user = autocompleteSuggestions.filter(user =>
            `${user.firstName} ${user.lastName}` === debouncedTerm
        );
        console.log(window.location.pathname)
        console.log(document.location)
        try {
            // history.push({pathname: `users/${user[0].path}`});
            // window.location.replace(`users/${user[0].path}`)
            document.location.pathname = `users/${user[0].path}`;
        } catch(e) {
            alert("Can't reach user's page")
        }
    }


    return (
        <div className="searchField">
            <form autoComplete="on">
                <div className="ui action input mini">
                    <input type="text" list="autocomplete"
                        onChange={event => setTerm(event.target.value)} value={term} />
                    <button className="ui icon button" onClick={(e)=>submitChosenUser(e)}><i className="search icon"></i></button>
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