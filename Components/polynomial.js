import React from 'react';
import {View,ScrollView, 
    Dimensions, Text,TextInput, Button,
TouchableOpacity, ToastAndroid} from 'react-native';
import Polynomial from 'polynomial';
export default class Polynomials extends React.Component{
    constructor(){
        super();
        this.state={
            reminder:'',
            Numanator:'',
            Denomanator:'',
            button:[
                {val:'+'},
                {val:'-'},
                {val:'*'},
                {val:'/'},
                {val:'^'},
            ],
            focus:''
        }
    }
    render(){
        return(
            <ScrollView style={{ flex: 1, backgroundColor:'#FFF'}}>
            <View style={{
                paddingHorizontal:10,
                paddingVertical:10,
                justifyContent:'center',
                alignItems:'center',
            }}>
                 <Text style={{
                     borderRadius:10,
                     paddingHorizontal:10,
                     paddingVertical:20,
                     width:'100%',
                     backgroundColor:'#ddd',
                     color:'#000',
                     fontSize:20
                 }}>Reminder: {this.state.reminder}</Text>
            </View>
            <View>
                <View style={{
                    paddingHorizontal:10
                }}>
                     <TextInput 
                         placeholder={'Enter Numanator'} 
                         multiline={true}
                         onFocus={(ev)=>{
                             this.setState({focus:'Numanator'})
                         }}
                         style={{
                             width:'100%',
                             minHeight:60,
                             borderRadius:8,
                             backgroundColor:'#ddd',
                             fontSize:18,
                             fontWeight:'700'
                         }} value={this.state.Numanator} onChangeText={(ev)=>{
                             this.setState({Numanator:ev})
                         }}/>
                </View>
                <View style={{
                    paddingTop:8,
                    paddingHorizontal:10
                }}>
                     <TextInput
                     onFocus={(ev)=>{
                         this.setState({focus:'Denomanator'})
                     }}
                         placeholder={'Enter Denomanator'}
                         multiline={true}
                         // underlineColorAndroid={true}
                     style={{
                         width:'100%',
                         minHeight:60,
                         borderRadius:8,
                         backgroundColor:'#ddd',
                         fontSize:18,
                         fontWeight:'700'
                     }} value={this.state.Denomanator} onChangeText={(ev)=>{
                         this.setState({Denomanator:ev})
                     }}/>
                </View>
            </View>
            <View style={{
                    paddingTop:8
                    ,justifyContent:'center', 
                    alignItems:'center'}}>
                 <TouchableOpacity onPress={()=>{
                     if(this.state.Numanator===''){
                         ToastAndroid.showWithGravityAndOffset(
                             'please enter Numanator',
                             ToastAndroid.LONG,
                             ToastAndroid.BOTTOM,
                             25,
                             50,
                           );
                     }else if(this.state.Denomanator===''){
                         ToastAndroid.showWithGravityAndOffset(
                             'Please Enter Denomanator' ,
                             ToastAndroid.LONG,
                             ToastAndroid.BOTTOM,
                             25,
                             50,
                           );
                     }else{
                         try{
                             let div=new Polynomial(this.state.Numanator).mod(this.state.Denomanator);
                             let rem=new Polynomial(div.coeff).toString()
                            this.setState({reminder:rem})
                         }
                         catch{
                            ToastAndroid.showWithGravityAndOffset(
                                'Please Enter Valid Polynomial' ,
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50,
                              );
                         }
                     }
                 }} style={{
                     backgroundColor:'yellow',
                     height:40,
                     width:150,
                     justifyContent:'center',
                     alignItems:'center'
                 }}>
                     <Text style={{
                         fontSize:18,
                         fontWeight:'bold'
                     }}>Calculate</Text>
                 </TouchableOpacity>
            </View>
              <View style={{
                  flexDirection:'row',flexWrap:'wrap'
              }}>
                 {this.state.button.map((butt, i)=>{
                     return(
                         <View key={i} style={{
                             height:30, 
                             width:100,
                             margin:10,
                         }}>
                             <Button   title={butt.val} onPress={()=>{
                                if(this.state.focus==='Numanator'){
                                 this.setState({
                                    Numanator:this.state.Numanator.concat(butt.val)    
                                 })
                                }else if(this.state.focus==='Denomanator'){

                                    this.setState({
                                    Denomanator:this.state.Denomanator.concat(butt.val)    
                                        
                                     })
                                }
                             }}/>
                         </View>
                     )
                 })}
             </View>   
         </ScrollView>
        )
    }
}