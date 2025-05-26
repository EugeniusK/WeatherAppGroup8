// import React, { JSX } from 'react';
// import HomeScreen from './HomeScreen';

// const App = (): JSX.Element => {
//   return <HomeScreen />;
// };

// export default App;


import React from 'react';
import { AppRegistry } from 'react-native';
import { AppProvider } from '../utils/context';
import RootLayout from './_layout'; // Use your layout with navigation

const App = (): JSX.Element => {
  return (
    <AppProvider>
      <RootLayout />
    </AppProvider>
  );
};

AppRegistry.registerComponent('main', () => App);

export default App;
