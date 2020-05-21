import React,{Component, useState} from 'react';
import { Text, View, StyleSheet,FlatList,SafeAreaView,TouchableHighlight} from 'react-native';
import Constants from 'expo-constants';

var count = 1;

//função que gera cada elemento
function Item({nome, sobrenome}){ 

  return(
    <View style={styles.item}>
      <Text>{nome} {sobrenome}</Text>
    </View>
  );
}

class App extends Component{
  
  constructor(props) {
      super(props);
      
      this.state = {
        listdata: [],
      };
  }

  componentDidMount(){
    this.fetchJSON();

  }

  fetchJSON(){
    fetch("https://reqres.in/api/users?page=" + count)
    .then(response => response.json())
    .then((responseJson)=> {

      var listdata = responseJson['data']

      this.setState({listdata: listdata})

    })
    .catch(error=>console.log(error))
  }



  render(){
    return(
    <SafeAreaView style={styles.container}>
      <FlatList
        data={this.state.listdata}
        renderItem={
            ({item}) =>             
            <Item nome={item.first_name} sobrenome={item.last_name}/>
        }
        ListHeaderComponent={
          <View>
            <Text>Exemplo</Text>
            <TouchableHighlight
              onPress={
                () =>{
                  count= count==1?2:1
                  this.fetchJSON()
                }
              }
              >
              <Text style={{backgroundColor:'grey', textAlign: 'center'}}>Page {count}</Text>
            </TouchableHighlight>
          </View>
        }
        stickyHeaderIndices={[0]}
        />
    </SafeAreaView>
    )
  }
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
  item: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 20,
  }
});