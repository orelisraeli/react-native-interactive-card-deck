# react-native-card-deck

An interactive card deck for React Native.

<img src="./carddeck.gif" alt="carddeck" width="400"/>

### Example

```js
<View
  style={{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <CardDeck width={500} height={435} maxSideItems={3}>
    <View
      style={{
        width: 200,
        height: 300,
        borderRadius: 20,
        backgroundColor: '#5BC0F8',
      }}
    />
    <View
      style={{
        width: 200,
        height: 300,
        backgroundColor: '#FCE700',
        borderRadius: 20,
      }}
    />
    <View
      style={{
        width: 200,
        height: 300,
        borderRadius: 20,
        backgroundColor: '#EA047E',
      }}
    />
    <View
      style={{
        width: 200,
        height: 300,
        backgroundColor: '#FF6D28',
        borderRadius: 20,
      }}
    />

    <View
      style={{
        width: 200,
        height: 300,
        borderRadius: 20,
        backgroundColor: '#CD0404',
      }}
    />
  </CardDeck>
</View>
```

Inspired by [CardStack](https://github.com/notsobigcompany/CardStack)

