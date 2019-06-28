import React from 'react';
// import {} from 'react-native';
import Select from './Components/select';
import Polynomials from './Components/polynomial';
import  Integration from './Components/integration';
import Derivatives from './Components/derivatives';
import {Router, Stack, Scene} from 'react-native-router-flux';
export default class Routers extends React.Component{
    render(){
        return(
            <Router>
                <Stack key="root">
                    <Scene key="Select" initial={true} component={Select} title="Select"/>
                    <Scene key="Polynomials" component={Polynomials} title="Polynomial Remainder"/>
                    <Scene key="Integration"  component={Integration} title="Integration"/>
                    <Scene key="Derivatives"  component={Derivatives} title="Derivatives"/>
                </Stack>
            </Router>
        )
    }
}