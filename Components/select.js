import React from 'react';
import {View,ScrollView, 
    Dimensions, Text,TextInput, Button,
TouchableOpacity, ToastAndroid} from 'react-native';
import Polynomial from 'polynomial';
import {Actions} from 'react-native-router-flux';
export default class Select extends React.Component{
    constructor(){
        super();
        this.state={
           actions:[
               {key:'Polynomials'},
               {key:'Integration'},
               {key:'Derivatives'},
           ]
        }
    }
    render(){
        let val=new Polynomial('x^2+5x').eval(5)
                                console.log(val);
        return(
            <ScrollView style={{ flex: 1, backgroundColor:'#FFF'}}>
                    <View style={{
                        flexDirection:'row',
                        flexWrap:'wrap',
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                        {this.state.actions.map((act, i)=>{
                           return(
                               <View key={i} style={{
                                   width:'32%'
                               }}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            Actions[`${act.key}`]()
                                        }}
                                    style={{
                                        marginHorizontal:10,
                                        marginVertical:10,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        backgroundColor:'yellow',
                                        height:60,
                                        borderRadius:10
                                    }}>
                                        <Text>{act.key}</Text>
                                    </TouchableOpacity>
                               </View>
                            )})}
                    </View>
            </ScrollView>
        )
    }
}