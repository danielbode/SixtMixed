import React from 'react';
import NavBar from './components/NavBar';
import OfferList from './components/OfferList';
import NextEvent from './components/NextEvent';
import { getUrlParameter } from './utils';
import ConfirmModal from './components/ConfirmModal';
import { fetchPerson } from './api';
import './App.css';

function App() {
  const userId = parseInt(getUrlParameter('user')) || 0;
  const [orderContent, setOrderContent] = React.useState(null);
  const [event, setEvent] = React.useState(null);
  const [offers, setOffers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchPerson(userId)
      .then((person) => {
        const raw = person.event;
        setEvent({
          startTime: new Date(raw.start),
          endTime: new Date(raw.end),
          title: raw.title,
          location: raw.location,
        });
        setOffers(person.offers.map(o => ({
          ...o,
          startTime: new Date(o.startTime),
          endTime: new Date(o.endTime),
        })));
      })
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="App App-Loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="App">
      <ConfirmModal
        offer={orderContent}
        setOrderContent={setOrderContent}
      />
      <div className="App-MainContainer">
        {event && <NextEvent event={event} />}
        <OfferList
          onOrder={setOrderContent}
          event={event}
          offers={offers}
        />
      </div>
      <NavBar />
    </div>
  );
}

export default App;
