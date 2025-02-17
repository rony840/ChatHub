import { memo } from "react";
import { FlatList, StyleSheet, Text } from "react-native"
import ChatBubble from "./ChatBubble";

const ChatList = (props) => {
    const {chats, scrollReference, currUser} = props;

    const renderChat = ({ item, index }) => {
        const prevItem = index > 0 ? chats[index - 1] : null;
        const showDate = !prevItem || new Date(prevItem.timestamp).toDateString() !== new Date(item.timestamp).toDateString();
    
        return (
          <>
            {showDate && <Text style={styles.dateHeader}>{new Date(item.timestamp).toDateString()}</Text>}
            <ChatBubble message={item} isCurrentUser={item.sender === currUser} />
          </>
        );
      };

    return(
    <FlatList
        ref={scrollReference}
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderChat}
        onContentSizeChange={() => scrollReference.current?.scrollToEnd({ animated: true })}
        onLayout={() => scrollReference.current?.scrollToEnd({ animated: true })}
        initialNumToRender={10} // Render the first 10 items initially
        maxToRenderPerBatch={5} 
        windowSize={5} // The number of items to keep in memory (before and after the visible area)
        
    />
    );
};

const styles = StyleSheet.create({
    dateHeader: {
        textAlign: 'center',
        color: 'rgba(253, 253, 253, 0.49)',
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 5,
      },
});


export default memo(ChatList);