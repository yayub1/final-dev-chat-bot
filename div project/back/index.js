// Firebase and Firestore setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcbxRUEQIfG7rmFXsNhPR0YhtaGXlFuW0",
  authDomain: "history-save.firebaseapp.com",
  projectId: "history-save",
  storageBucket: "history-save.firebasestorage.app",
  messagingSenderId: "62649236458",
  appId: "1:62649236458:web:f7e098380fb94771931093",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Chatbot setup
const API_KEY = "AIzaSyCv0zAnmmbzHgXlAAqBAcm4YEE-k8BE7F8";
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const chatmessage = document.getElementById("chat-message");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const subsub = document.getElementById("subsub");

// Function to generate chatbot response
async function generateResponse(prompt) {
  const response = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate response");
  }
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
// Function to clear markdown from text
function clearMarkdown(text) {
  return text
    .replace(/#{1,6}\s?/g, "")
    .replace(/\*/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Function to add messages to the chat
function addMessage(message, isUser) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(
    "message",
    isUser ? "user-message" : "bot-message"
  );

  const messageContent = document.createElement("div");
  messageContent.classList.add("message-content");
  messageContent.textContent = message;

  messageElement.appendChild(messageContent);
  chatmessage.appendChild(messageElement);
  chatmessage.scrollTop = chatmessage.scrollHeight;
}

// Function to handle user input
async function handleUserInput() {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, true);
    userInput.value = "";
    sendButton.disabled = true;
    userInput.disabled = true;

    try {
      const botMessage = await generateResponse(userMessage);
      const cleanedBotMessage = clearMarkdown(botMessage);
      addMessage(cleanedBotMessage, false);
      await saveChatToFirestore(userMessage, cleanedBotMessage); // Save chat to Firestore
    } catch (error) {
      console.error("Error:", error);
      addMessage("Sorry, I encountered an error. Please try again.", false);
    } finally {
      sendButton.disabled = false;
      userInput.disabled = false;
      userInput.focus();
    }
  }
}

// Function to save chat messages to Firestore
async function saveChatToFirestore(userMessage, botMessage) {
  try {
    await addDoc(collection(db, "chats"), {
      userMessage: userMessage,
      botMessage: botMessage,
      timestamp: new Date(),
    });
    console.log("Chat saved successfully");
  } catch (error) {
    console.error("Error saving chat to Firestore: ", error);
  }
}

// Event listeners
sendButton.addEventListener("click", handleUserInput);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleUserInput();
  }
});
