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

    return (
        <div className="search-suggestions relative">
            <input 
                type="text" 
                className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" 
                placeholder="search..." 
                value={partialQuery}
                onChange={handlePartialQueryChange}
            />
            {partialQuery.trim().length > 0 && (
                <ul className="bg-white border border-gray-100 w-full mt-2 absolute z-10">
                    {suggestions.map((suggestion) => (
                        <li 
                            key={suggestion.id} 
                            className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {/* Remove the arrow icon and the input value from the suggestion */}
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchSuggestions;
