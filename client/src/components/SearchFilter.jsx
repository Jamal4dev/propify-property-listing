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
        >



            <input

                type="text"

                name="search"

                placeholder="Search properties..."

                value={filters.search}

                onChange={handleChange}

            />







            <input

                type="number"

                name="minPrice"

                placeholder="Minimum price"

                value={filters.minPrice}

                onChange={handleChange}

            />







            <input

                type="number"

                name="maxPrice"

                placeholder="Maximum price"

                value={filters.maxPrice}

                onChange={handleChange}

            />







            <select

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