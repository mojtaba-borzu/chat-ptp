import { useState, useEffect } from 'react'
import client, {
  databases,
  COLLECTION_ID_MESSAGES,
  DATABASE_ID,
} from '../appwriteConfig'
import { ID, Query } from 'appwrite'
import { Trash2 } from 'react-feather'
import Header from '../components/Header'
import { useAuth } from '../utils/AuthContext'

const Room = () => {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [messageBody, setMessageBody] = useState('')

  useEffect(() => {
    getMessages()

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        if (
          response.events.includes(
            'databases.*.collections.*.documents.*.create'
          )
        ) {
          setMessages((prevState) => [response.payload, ...prevState])
        }

        if (
          response.events.includes(
            'databases.*.collections.*.documents.*.delete'
          )
        ) {
          setMessages((prevState) =>
            prevState.filter((message) => message.$id !== response.payload.$id)
          )
        }
      }
    )

    return () => {
      unsubscribe()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody,
    }
    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    )

    setMessageBody('')
  }

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    setMessages(response.documents)
  }

  const deleteMessage = async (message_id) => {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id)
  }

  return (
    <main className="container">
      <Header />
      <div className="room--container">
        <form onSubmit={handleSubmit} className="message--form">
          <div>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="2"
              required
              maxLength={1000}
              placeholder="Say something..."
              onChange={(e) => setMessageBody(e.currentTarget.value)}
              value={messageBody}
            ></textarea>
          </div>
          <div className="send-btn--wrapper">
            <input
              type="submit"
              name="Send"
              value="Send"
              id="Send"
              className="
            btn btn--secondary"
            />
          </div>
        </form>
        <div>
          {messages?.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
                <p>
                  {message?.username ? (
                    <span>{message?.username}</span>
                  ) : (
                    <span>Anonymous user</span>
                  )}

                  <small className="message-timestamp">
                    {new Date(message.$createdAt).toLocaleString('IR')}
                  </small>
                </p>

                <Trash2
                  className="delete--btn"
                  onClick={() => {
                    deleteMessage(message.$id)
                  }}
                />
              </div>

              <div
                className="message--body"
                style={{
                  backgroundColor: `${
                    message?.username === user.name && '#000000'
                  }`,
                  color: `${message?.username === user.name && '#ffffff'}`,
                  border: `${message?.username === user.name && '1px'}`,
                }}
              >
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Room
