export default `#graphql

   type Task {
    id: ID
    solanaTaskId: String
    user: Int
    title: String
    description: String
    category: Int
    participants: [Int]
    prizeAmount: Int
    isCompleted: Boolean
    status: String
    completer: Int
    expiryTime: Int
    createdAt: Int
    updatedAt: Int
   }

   type Query {
      latestTask: [Task]
   }
`;
