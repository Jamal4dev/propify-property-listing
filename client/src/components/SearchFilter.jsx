import { useState } from "react";


function SearchFilter({
    onFilter
}) {


    const [filters, setFilters] = useState({

        search: "",
        minPrice: "",
        maxPrice: "",
        sort: "newest"

    });





    const handleChange = (event) => {


        setFilters({

            ...filters,

            [event.target.name]: event.target.value

        });


    };







    const handleSubmit = (event) => {


        event.preventDefault();


        onFilter(filters);


    };







    const handleReset = () => {


        const resetFilters = {


            search: "",

            minPrice: "",

            maxPrice: "",

            sort: "newest"


        };



        setFilters(resetFilters);


        onFilter(resetFilters);


    };







    return (


        <form
            className="search-filter"
            onSubmit={handleSubmit}
            aria-label="Search and filter properties"
        >


            <div className="filter-field filter-search-field">
                <label htmlFor="property-search">Search listings</label>
                <input
                id="property-search"

                type="text"

                name="search"

                placeholder="Search properties..."

                value={filters.search}

                onChange={handleChange}

                />
            </div>






            <div className="filter-field">
                <label htmlFor="minimum-price">Minimum price</label>
                <input
                id="minimum-price"

                type="number"

                name="minPrice"

                placeholder="Minimum price"

                value={filters.minPrice}

                onChange={handleChange}

                />
            </div>






            <div className="filter-field">
                <label htmlFor="maximum-price">Maximum price</label>
                <input
                id="maximum-price"

                type="number"

                name="maxPrice"

                placeholder="Maximum price"

                value={filters.maxPrice}

                onChange={handleChange}

                />
            </div>






            <div className="filter-field">
                <label htmlFor="property-sort">Sort listings</label>
                <select
                id="property-sort"

                name="sort"

                value={filters.sort}

                onChange={handleChange}

            >

                <option value="newest">
                    Newest
                </option>


                <option value="priceAsc">
                    Lowest Price
                </option>


                <option value="priceDesc">
                    Highest Price
                </option>


                </select>
            </div>







            <div className="filter-actions">


                <button type="submit">

                    Apply Filters

                </button>




                <button

                    type="button"

                    onClick={handleReset}

                >

                    Reset

                </button>



            </div>





        </form>


    );

}


export default SearchFilter;