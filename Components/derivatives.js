import React from 'react';
import {View, 
    Text, 
    ScrollView, 
    TextInput, 
    Button, TouchableOpacity, ToastAndroid} from 'react-native';
import Polynomial from 'polynomial';
export default class Derivatives extends React.Component{
    constructor(){
        super();
        this.state={
            Polynomial:'',
            Derivatives:'',
            button:[
                {val:'+'},
                {val:'-'},
                {val:'*'},
                {val:'/'},
                {val:'^'},
            ],
            focus:'',
            order:''
        }
    }
    render(){
        return(
            <ScrollView style={{
                flex:1,
                backgroundColor:'#FFF'
            }}>
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
                    }}>Derivatives: {this.state.Derivatives}</Text>
                </View>
                <View style={{
                    paddingVertical:8,
                        paddingHorizontal:10,
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}>
                        <Text style={{
                            fontSize:20
                        }}>Enter order of derivatives</Text>
                        <TextInput
                            value={this.state.order}
                            maxLength={1}
                            onChangeText={(ev)=>{
                                console.log(ev);
                               
                                if(ev>0&&ev<4){
                                  this.setState({order:ev}) 
                                }else{
                                  this.setState({order:''}) 
                                    ToastAndroid.showWithGravityAndOffset(
                                        'Please Enter Derivative between 1 to 3',
                                        ToastAndroid.LONG,
                                        ToastAndroid.BOTTOM,
                                        25,
                                        50,
                                      );
                                }
                            }}
                            style={{
                                paddingHorizontal:8,
                                backgroundColor:'#ddd',
                            }}
                            keyboardType={'numeric'}
                        />
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
                 }else if(this.state.order===''){
                    ToastAndroid.showWithGravityAndOffset(
                        'Please Enter Derivative order' ,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50,
                      );
                 }
                 else{
                     try{
                        let integral=new Polynomial(this.state.Polynomial).derive(this.state.order)
                        let pol=new Polynomial(integral.coeff).toString()
                        this.setState({Derivatives:pol})
                        
                        // if(pol===JSON.stringify(0)){
                        //     ToastAndroid.showWithGravityAndOffset(
                        //         'Please Enter Valid Polynomial' ,
                        //         ToastAndroid.LONG,
                        //         ToastAndroid.BOTTOM,
                        //         25,
                        //         50,
                        //       );
                        // }else{
                        //     this.setState({Derivatives:pol})
                        // }
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