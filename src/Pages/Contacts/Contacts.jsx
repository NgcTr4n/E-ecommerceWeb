import React from 'react';
import ChatBox from '../Contacts/ChatBox';
import Map from './Map';

const Contacts = () => {
    const address = '261 - 263 Khánh Hội, P5, Q4, TP. Hồ Chí Minh';

  return (
    <div>
      <h1>Contacts</h1>
      <ChatBox />
      <Map address={address} />
    </div>
  );
};

export default Contacts;
