const baseUrl = "http://localhost:5000";
//Creating chat room
export async function createChatRoom(receiver, message) {
  return (
    await fetch(`${baseUrl}/messages/createChatRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ message: message, receiver: receiver }),
    })
  ).json();
}
//Gathering old conversations
export async function getUserConversations() {
  return (
    await fetch(`${baseUrl}/messages/getUserConversations`, {
      credentials: "include",
    })
  ).json();
}
//Sending the message.
export async function sendMessage(chatId, message) {
  return (
    await fetch(`${baseUrl}/messages/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ chatId, message }),
    })
  ).json();
}
