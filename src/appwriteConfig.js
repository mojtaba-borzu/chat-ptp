import { Client, Databases, Account } from 'appwrite'

export const PROJECT_ID = '64a1bbd0375fcaa5454f'
export const DATABASE_ID = '64a1dd68b9e988b5d549'
export const COLLECTION_ID_MESSAGES = '64a1dd70c124e460c7e2'

const client = new Client()

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('64a1bbd0375fcaa5454f')

export const databases = new Databases(client)
export const account = new Account(client)

export default client
