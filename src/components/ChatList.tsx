import React, { memo, useRef } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import ChatBubble from "./ChatBubble";

interface chatObj {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface chatListProps {
  chats: chatObj[];
  currUser: string;
  scrollRef: any;
  onContentSize: () => void;
  onLayout: () => void;
}

const ChatList: React.FC<chatListProps> = ({ chats, currUser, scrollRef, onContentSize, onLayout}) => {

  const renderChat = ({ item, index }: { item: chatObj; index: number }) => {
    const prevItem = index > 0 ? chats[index - 1] : null;
    const showDate =
      !prevItem ||
      new Date(prevItem.timestamp).toDateString() !==
        new Date(item.timestamp).toDateString();

    return (
      <>
        {showDate && (
          <Text style={styles.dateHeader}>
            {new Date(item.timestamp).toDateString()}
          </Text>
        )}
        <ChatBubble message={item} isCurrentUser={item.sender === currUser} />
      </>
    );
  };

  return (
    <FlatList
      ref={scrollRef}
      data={chats}
      keyExtractor={(item) => item.id}
      renderItem={renderChat}
      onContentSizeChange={onContentSize}
      onLayout={onLayout}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );
};

const styles = StyleSheet.create({
  dateHeader: {
    textAlign: "center",
    color: "rgba(253, 253, 253, 0.49)",
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
  },
});

export default memo(ChatList);
