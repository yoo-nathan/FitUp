import React, {useState} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Switch,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  Pressable,
  
} from 'react-native';

    

const FilterPage = ({navigation}) => {
    const [genderPreference, setGender] = useState(null);
    const handleGenderClick = (option) => {
        setGender(option);
    };
    const [isPR, setPR] = useState(null);
    const handlePRClick = (option) => {
        setPR(option);
    };
    const [isWorkSched, setWorkSched] = useState(null);
    const handleWorkClick = (option) => {
        setWorkSched(option);
    };
    const [isPurpose, setPurpose] = useState(null);
    const handlePurposeClick = (option) => {
        setPurpose(option);
    };
    const handleReset = () =>{
        setGender(null);
        setPR(null);
        setWorkSched(null);
        setPurpose(null);
    }
//style={[styles.optionText, genderPreference === 1 && styles.selectedOptionText]}
    return (
        <SafeAreaView style={styles.upperModal}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={styles.filterHead}>Filter</Text>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Text style={styles.filterHead}>&#10005;</Text>
                </TouchableOpacity>
                
                
            </View>                       
            <View style={styles.lowerModal}>
                <View>

                
                <Text></Text>
                <Text style={styles.filterText}>Partner Gender Preference: </Text>
                <View style={styles.buttonView}>             
                    <TouchableOpacity
                        style={[styles.option, genderPreference === 1 && styles.selectedOption]}
                        onPress={() => handleGenderClick(1)}
                    >
                        <Text style={[styles.optionText, genderPreference === 1 && styles.selectedOptionText]} >Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.option, genderPreference === 2 && styles.selectedOption]}
                        onPress={() => handleGenderClick(2)}
                    >
                        <Text style={[styles.optionText, genderPreference === 2 && styles.selectedOptionText]}>Female</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.option, genderPreference === 3 && styles.selectedOption]}
                        onPress={() => handleGenderClick(3)}
                    >
                        <Text style={[styles.optionText, genderPreference === 3 && styles.selectedOptionText]}>None</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.filterText}>Similar Personal Record:</Text>
                <View style={styles.buttonView}>             
                    <TouchableOpacity
                        style={[styles.option, isPR === 1 && styles.selectedOption]}
                        onPress={() => handlePRClick(1)}
                    >
                        <Text style={[styles.optionText, isPR === 1 && styles.selectedOptionText]}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.option, isPR === 2 && styles.selectedOption]}
                        onPress={() => handlePRClick(2)}
                    >
                        <Text style={[styles.optionText, isPR === 2 && styles.selectedOptionText]}>No</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.filterText}>Similar Workout Schedule:</Text>
                <View style={styles.buttonView}>             
                    <TouchableOpacity
                        style={[styles.option, isWorkSched === 1 && styles.selectedOption]}
                        onPress={() => handleWorkClick(1)}
                    >
                        <Text style={[styles.optionText, isWorkSched === 1 && styles.selectedOptionText]}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.option, isWorkSched === 2 && styles.selectedOption]}
                        onPress={() => handleWorkClick(2)}
                    >
                        <Text style={[styles.optionText, isWorkSched === 2 && styles.selectedOptionText]}>No</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.filterText}>Similar Purpose:</Text>
                <View style={styles.buttonView}>             
                    <TouchableOpacity
                        style={[styles.option, isPurpose === 1 && styles.selectedOption]}
                        onPress={() => handlePurposeClick(1)}
                    >
                        <Text style={[styles.optionText, isPurpose === 1 && styles.selectedOptionText]}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.option, isPurpose === 2 && styles.selectedOption]}
                        onPress={() => handlePurposeClick(2)}
                    >
                        <Text style={[styles.optionText, isPurpose === 2 && styles.selectedOptionText]}>No</Text>
                    </TouchableOpacity>
                </View>
                </View>

                <View style={styles.bottomButtonView}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('MainContainer',{
                        genderPref: genderPreference,
                        pr: isPR,
                        workoutSchedule: isWorkSched,
                        similarPurpose: isPurpose 
                    })}
                    style={styles.SaveButtonTO}
                    >
                        <Text style={styles.saveButton}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={handleReset}
                    style={styles.CancelButtonTO}
                    >
                        <Text style={styles.optionText}>Reset Filters</Text>
                    </TouchableOpacity>
                </View>

            </View>
            
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    upperModal: {
        flex:1,
        backgroundColor: '#373F51',
        
    },
    lowerModal: {
        height: 700, 
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent:'space-between'
    },
    filterHead: {
        fontSize: 35,
        fontWeight: '700',
        color: 'white',
        paddingVertical: 30,
        textAlign: 'center',
        paddingHorizontal: 35
    },
    filterText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'black',
        marginHorizontal: 10
    },
    option: {
        height: 45,
        flex:1,
        marginHorizontal:10,
        borderRadius: 25,
        
        backgroundColor: 'rgba(225,225,225,1)',
        alignItems: 'center',
        justifyContent:'center'

    },
    selectedOption: {
        backgroundColor: '#8075FF',
    },
    optionText:{
        fontSize:16,
        fontWeight: '600',
        color: 'grey'
    },
    selectedOptionText:{
        color:'white'
    },
    buttonView:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
        marginBottom: 25
    },
    bottomButtonView:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
        marginBottom: 60
    },
    CancelButtonTO:{
        height: 45,
        flex:1,
        marginHorizontal:10,
        borderRadius: 25,
        
        backgroundColor: 'rgba(225,225,225,1)',
        alignItems: 'center',
        justifyContent:'center'
    },
    SaveButtonTO:{
        height: 45,
        flex:1,
        marginHorizontal:10,
        borderRadius: 25,
        
        backgroundColor: '#8075FF',
        alignItems: 'center',
        justifyContent:'center'
    },
    saveButton:{
        fontSize:16,
        fontWeight: '600',
        color: 'white'
    }

})

export default FilterPage;
/*

*/