import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
GoalInput
export default function App() {
  const [courseGoals, setCourseGoals] = useState([]); 
  const [isAddMode, setIsAddMode] = useState(false); 

  const addGoalHandler = newGoal  => {
    setCourseGoals(() => [...courseGoals, { key: Math.random().toString(), value: newGoal}]);
    setIsAddMode(false);
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  }

  const removeGoalHandler = goalID => {
    setCourseGoals( currentGoals => {
      return currentGoals.filter( goal => goal.key != goalID); 
    });
  }

  return (
    <View style={styles.screen}>
      <Button title="Add new Goal" onPress={()=> setIsAddMode(true)}/>
      <GoalInput visible={isAddMode} 
                  onAddGoal={addGoalHandler}
                  onCancel={cancelGoalAdditionHandler}/>
      <FlatList data={courseGoals}
                renderItem={ itemData =>  
                <GoalItem id={itemData.item.key}
                          title={itemData.item.value} 
                          onDelete={removeGoalHandler}/>
              }/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  input: {
    borderColor: 'black', 
    width: '80%',
    borderWidth: 1
  }
});
