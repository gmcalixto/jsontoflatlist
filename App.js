import React,{Component, useState} from 'react';
import { Text, View, StyleSheet,FlatList,SafeAreaView,TouchableHighlight} from 'react-native';
import Constants from 'expo-constants';
import ModalUser from './components/ModalUser';

var count = 1;

//função que gera cada elemento
function Item({nome, sobrenome,image_source,email}){ 

  return(
    <ModalUser 
          first_name={nome}
          last_name={sobrenome}
          image_source={image_source}
          email={email}/>
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
            <Item nome={item.first_name} 
                  sobrenome={item.last_name}
                  image_source={item.avatar}
                  email={item.email}/>
        }
        ListHeaderComponent={
          <View>
            <Text>Tarefa 2</Text>
            <TouchableHighlight
              onPress={
                () =>{
                  count= count==1?2:1
                  this.fetchJSON()
                }
              }
              >
              <Text style={{backgroundColor:'yellow', textAlign: 'center'}}>Page {count}</Text>
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
  }
});