import React, { useState } from 'react';
import axios from 'axios';

function SearchSuggestions() {
    const [partialQuery, setPartialQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');

    const handlePartialQueryChange = async (e) => {
        const partialQuery = e.target.value;
        setPartialQuery(partialQuery);
        try {
            if (partialQuery.trim().length > 0) {
                const response = await axios.get(`http://localhost:4000/product/getSuggestions?q=${partialQuery}`);
                setSuggestions(response.data);
            } else {
                setSuggestions([]);
            }
            setError('');
        } catch (error) {
            setError('Error fetching suggestions');
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setPartialQuery(suggestion.name);
        setSuggestions([]);
    };

    return (
        <div className="search-suggestions relative max-w-[250px] mx-auto">
            <form className="mt-0 mx-auto max-w-[250px] max-h-[40px] py-1 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
                <input 
                    type="text" 
                    placeholder="Search for Books" 
                    className="font-bodoni-ferrara bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0" 
                    name="topic" 
                    value={partialQuery}
                    onChange={handlePartialQueryChange}
                />
                <button 
                    className="mt-0 font-bodoni-ferrara flex flex-row items-center justify-center min-w-[70px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1 h-[27px] -mr-5" 
                    type="submit"
                >
                    Search
                </button>
            </form>
            {partialQuery.trim().length > 0 && (
                <ul className="bg-white border border-gray-100 w-full mt-2 absolute z-10">
                    {suggestions.map((suggestion) => (
                        <li 
                            key={suggestion.id} 
                            className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
    );
}

export default SearchSuggestions;
