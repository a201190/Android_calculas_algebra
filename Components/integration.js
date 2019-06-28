import React from 'react';
import {View, 
    Text, 
    ScrollView, 
    TextInput, 
    Button, TouchableOpacity, ToastAndroid} from 'react-native';
import Polynomial from 'polynomial';

export default class Integration extends React.Component{
    constructor(){
        super();
        this.state={
            Polynomial:'',
            Integration:'',
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
            <ScrollView>
                <View>
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
                        }}>Integration: {this.state.Integration}</Text>
                    </View>
                    <View style={{
                            paddingHorizontal:10
                        }}>
                    <TextInput 
                         placeholder={'Enter Polynomial'} 
                         multiline={true}
                         onFocus={(ev)=>{
                             this.setState({focus:'yes'})
                         }}
                         style={{
                             width:'100%',
                             minHeight:60,
                             borderRadius:8,
                             backgroundColor:'#ddd',
                             fontSize:18,
                             fontWeight:'700'
                         }} value={this.state.Polynomial} onChangeText={(ev)=>{
                             this.setState({Polynomial:ev})
                         }}/>
                    </View>
                    <View style={{
                    paddingTop:8
                    ,justifyContent:'center', 
                    alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>{
                     if(this.state.Polynomial===''){
                         ToastAndroid.showWithGravityAndOffset(
                             'Please Enter Polynomial',
                             ToastAndroid.LONG,
                             ToastAndroid.BOTTOM,
                             25,
                             50,
                           );
                     }else{
                         try{
                            let integral=new Polynomial(this.state.Polynomial).integrate()
                            let pol=new Polynomial(integral.coeff).toString()
                            if(pol===JSON.stringify(0)){
                                ToastAndroid.showWithGravityAndOffset(
                                    'Please Enter Valid Polynomial' ,
                                    ToastAndroid.LONG,
                                    ToastAndroid.BOTTOM,
                                    25,
                                    50,
                                  );
                            }else{
                                this.setState({Integration:pol})
                            }
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
                                if(this.state.focus==='yes'){
                                 this.setState({
                                    Polynomial:this.state.Polynomial.concat(butt.val)    
                                 })
                                }
                             }}/>
                         </View>
                     )
                 })}
             </View>   
                </View>
            </ScrollView>
        )
    }
}