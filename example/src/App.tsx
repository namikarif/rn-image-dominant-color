import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { getDominantColor } from 'rn-image-dominant-color';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  React.useEffect(() => {
    getDominantColor('https://namikarifoglu.com/namik.jpeg').then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
