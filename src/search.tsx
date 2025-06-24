import type { FC } from 'react';

import './search.css';

interface SearchProps {
    query: string;
    updateQuery: (query: string) => void;
}

const Search: FC<SearchProps> = ({ query, updateQuery }) => {
    return (
        <div className={'search'}>
            <div className={'container'}>
                <span className={'icon'}>🔍</span>
                <input
                    value={query}
                    onChange={(e) => updateQuery(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Search;
export type { SearchProps };
