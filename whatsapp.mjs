const sendMessage = async (client, message, senderID) => {
  try {
    await client.messages.create({
      to: senderID,
      body: message,
      from: "whatsapp:+14155238886",
    });
  } catch (error) {
    console.log(`error at sendMessage ${error}`);
  }
};

export default sendMessage;
