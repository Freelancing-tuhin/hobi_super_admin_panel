import CardBox from 'src/components/shared/CardBox';
// import React from 'react';
import EventTable from './EventTable';
import { getEvent } from 'src/service/getEvents';
import { useState } from 'react';
import SearchBox from 'src/views/forms/searchBox/SearchBox';

const ProductTablelist = () => {
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState(null);

  const getEvents = async (page = 1) => {
    try {
      const response = await getEvent({
        filter: { page: page, limit: 4, search: searchText },
      });
      setEvents(response.result || []);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <>
      <CardBox>
        <div className="flex justify-between items-center">
          <SearchBox
            setSearchText={setSearchText}
            searchText={searchText}
            getOrganizer={getEvents}
            placeholder={'Search by event name..'}
          />
        </div>

        <EventTable
          events={events}
          totalPages={totalPages}
          getEvents={getEvents}
          searchText={searchText}
        />
      </CardBox>
    </>
  );
};

export default ProductTablelist;
