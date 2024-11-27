import { format } from "date-fns";
import Footer from "../components/Footer";
import Header from "../components/header/Header";
import { getSearchResult } from "../utils/api";
import { SearchResultData } from "../types/app";
import ListingCard from "../components/ListingCard";
import SearchFilter from "./SearchFilter";

const SearchResult = async ({
  searchParams,
}: {
  searchParams: Promise<{
    location?: string;
    startDate?: string;
    endDate?: string;
    numOfGuests?: string;
  }>;
}) => {
  const location = (await searchParams).location || "Unknown";
  const startDate = (await searchParams).startDate || "";
  const endDate = (await searchParams).endDate || "";
  const numOfGuests = (await searchParams).numOfGuests || "1";

  let range = "No Dates Selected";
  if (startDate && endDate) {
    const formatedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formatedEndDate = format(new Date(endDate), "dd MMMM yy");
    range = `${formatedStartDate} - ${formatedEndDate}`;
  }

  let searchResultData: SearchResultData = [];
  try {
    searchResultData = await getSearchResult();
  } catch (error) {
    console.error("Failed to fetch search results:", error);
  }

  return (
    <>
      <Header placeholder={`${location} | ${range} | ${numOfGuests} guests`} />
      <main>
        <section>
          <div className="container flex">
            <div className="pt-14 pr-4">
              <p className="text-xs">
                300+ Stays - {range} - for {numOfGuests} guests
              </p>
              <h1 className="text-3xl font-semibold mt-2 mb-6">
                Stays in {location}
              </h1>
              <SearchFilter />
              <div>
                {searchResultData.length > 0 ? (
                  searchResultData.map((listing) => (
                    <ListingCard
                      key={listing.title}
                      img={listing.img}
                      title={listing.title}
                      location={listing.location}
                      description={listing.description}
                      price={listing.price}
                      total={listing.total}
                      star={listing.star}
                    />
                  ))
                ) : (
                  <p>No results found.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SearchResult;
