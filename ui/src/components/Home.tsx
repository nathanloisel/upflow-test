import ParaglindersContainer from 'containers/ParaglindersContainer';
import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <main>
        <h1>Paraglinders list</h1>
        <ParaglindersContainer />
      </main>
    );
  }
}

export default Home;
