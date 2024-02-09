import * as React from 'react';
import { Card, Button , Text} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Message = () => {
    const navigation = useNavigation();
  return(<Card>
    <Card.Actions>
        <Text> You should follow the users.. </Text>
      <Button onPress={()=>navigation.navigate("Search")}>Ok</Button>
    </Card.Actions>
  </Card>);
}

export default Message;