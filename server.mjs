import express from "express";
// const MessagingResponse = require('twilio').twiml.MessagingResponse;
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();
import sendMessage from "./whatsapp.mjs";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const app = express();

// app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("I am a hello world server");
});

app.post("/sendsms", (req, res) => {
  // console.log("req: ", JSON.stringify(req.body));

  console.log("message: ", req.body.Body);

  // TODO: ask dialogflow what to respond

  client.messages
    .create({ body: "Hi there", from: "+18454157128", to: "+19177256735" })
    .then((message) => console.log(message.sid))
    .done();

  // let twiml = new twilio.twiml.MessagingResponse();
  // twiml.message("The Robots are coming! Head for the hills!");

  // res.header("Content-Type", "text/xml");
  // res.send(twiml.toString());
});

// const sendMessage = whatsapp("./whatsapp.mjs");
// whatsapp route

app.post("/whatsapp", (req, res) => {
  console.log(req.body);
  let message = req.body.Body;
  let senderID = req.body.From;
  console.log(message);
  console.log(senderID);

  // function to reply back from whatsapp
  sendMessage(client, "Hello from the other side", senderID);
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
