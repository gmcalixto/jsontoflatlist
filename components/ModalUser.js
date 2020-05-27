import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, Platform, Modal, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

export default class ModalUser extends React.Component {

  //state para controlar visibilidade do modal
  state = {
    modalVisible: false,
  }

  //construtor para uso do props
  constructor(props){
    super(props);
  }

  //troca o modo de visibilidade do modal
  alteraModal(visibilidade){
    this.setState({modalVisible: visibilidade});
  }

  render(){
    return(
    <View style={{margin: 20}}>
        
        <Modal
          animationType = {'slide'}
          transparent = {false}
          visible = {this.state.modalVisible}
          onRequestClose= {() => console.log('Modal fechado')}
        >

          <View style={styles.modal}>
            <View style={styles.loader}>
              <Image
                style={styles.tinyLogo}
                source={{uri:this.props.image_source}}
              />
              <Text style={styles.info}>Name: {this.props.first_name} {this.props.last_name}</Text>
              <Text style={styles.info}>E-mail: {this.props.email}</Text>
            </View>

            <TouchableHighlight
              onPress={
                ()=>{
                  this.alteraModal(!this.state.modalVisible)
                }}>
                    <Text style={styles.button}>Fechar</Text>
            </TouchableHighlight>

          </View>

        </Modal>


        <TouchableHighlight
          onPress={
            ()=>{
              this.alteraModal(!this.state.modalVisible)
            }}>
          <Text style={styles.button}>{this.props.first_name} {this.props.last_name}</Text>
        </TouchableHighlight>
     </View>
    );
  }

  //renderização do componente


  }

const styles = StyleSheet.create({
  button:{
    borderColor:'black',
    borderWidth: 1,
    fontSize: 15,
    backgroundColor: 'grey',
    textAlign: 'center',
    fontFamily: Platform.OS==='ios'?'AvenirNext-Regular':'Roboto'
  },
  modal: {
    fontSize: 20,
    marginTop: 200,
    padding: 20,
    fontFamily: Platform.OS==='ios'?'AvenirNext-Regular':'Roboto'
  },
   loader:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
   tinyLogo: {
    width: 100,
    height: 100,
    marginBottom: 30
  },
  info: {
    margin: 5,
    fontFamily: Platform.OS==='ios'?'AvenirNext-Regular':'Roboto'
  }
});

ModalUser.propTypes = {image_source: PropTypes.string.isRequired,
                           first_name: PropTypes.string.isRequired,
                           last_name: PropTypes.string.isRequired,
                           email: PropTypes.string.isRequired};