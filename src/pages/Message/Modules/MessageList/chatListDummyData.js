export const IDS = {
  hospitalId:'4c763a46-5490-47d1-b32f-ab66c5edd494',
  patientA:'c0f636bc-43d2-4b9c-9efb-530426729be5',
  patientB:'a2ed9b2e-1ede-4a25-960e-481d53068c66',
  patient_A_MsgId:'ae774049-ad14-4192-bf87-1a23f54dfc82',
  patient_B_MsgId:'ac78b49e-a9c6-46ee-aa57-61d47b5af756'
} 


export const conversationData_PatientA = [
  {
    message:"Hai",
    senderId:IDS.hospitalId,
    reciverId:IDS.patientA,
    conversationId:IDS.patient_A_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },
  {
    message:"what",
    senderId:IDS.patientA,
    reciverId:IDS.hospitalId,
    conversationId:IDS.patient_A_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },  {
    message:"how are you",
    senderId:IDS.hospitalId,
    reciverId:IDS.patientA,
    conversationId:IDS.patient_A_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },  {
    message:"fine",
    senderId:IDS.hospitalId,
    reciverId:IDS.hospitalId,
    conversationId:IDS.patient_A_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },
  {
    message:"fine",
    senderId:IDS.patientA,
    reciverId:IDS.hospitalId,
    conversationId:IDS.patient_A_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  }, {
    message:"fine",
    senderId:IDS.hospitalId,
    reciverId:IDS.patientA,
    conversationId:IDS.patient_A_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },
]

const conversationData_PatientB = [
  {
    message:"Hai",
    senderId:IDS.hospitalId,
    reciverId:IDS.patientB,
    conversationId:IDS.patient_B_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },
  {
    message:"what",
    senderId:IDS.patientB,
    reciverId:IDS.hospitalId,
    conversationId:IDS.patient_B_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },  {
    message:"how are you",
    senderId:IDS.hospitalId,
    reciverId:IDS.patientB,
    conversationId:IDS.patient_B_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },  {
    message:"yup",
    senderId:IDS.hospitalId,
    reciverId:IDS.hospitalId,
    conversationId:IDS.patient_B_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },
  {
    message:"no",
    senderId:IDS.patientB,
    reciverId:IDS.hospitalId,
    conversationId:IDS.patient_B_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },
  {
    message:"no yes ",
    senderId:IDS.hospitalId,
    reciverId:IDS.patientB,
    conversationId:IDS.patient_B_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },
  {
    message:"no what the hell ",
    senderId:IDS.hospitalId,
    reciverId:IDS.patientB,
    conversationId:IDS.patient_B_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },
   {
    message:"yes",
    senderId:IDS.hospitalId,
    reciverId:IDS.patientB,
    conversationId:IDS.patient_B_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },
  {
    message:"this is mass",
    senderId:IDS.hospitalId,
    reciverId:IDS.hospitalId,
    conversationId:IDS.patient_B_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },
  {
    message:"you can",
    senderId:IDS.patientB,
    reciverId:IDS.hospitalId,
    conversationId:IDS.patient_B_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  }, {
    message:"no we ",
    senderId:IDS.hospitalId,
    reciverId:IDS.patientB,
    conversationId:IDS.patient_B_MsgId,
    timestamp:"2016-01-12 15:12:34.524"
  },
  

]

export const chatList = [
  {
    userId: 1,
    userName: "Patient A ",
    userAvatar: "https://i.pravatar.cc/300",
    lastMessage: "how are you ?",
    lastMessageTime: "2 min",
    messageUnRead: 20,
    userActive: false,
    messageList:conversationData_PatientA,
  },
  {
    userId: 1,
    userName: "Patient B ",
    userAvatar: "https://i.pravatar.cc/300",
    lastMessage: "how are you ?",
    lastMessageTime: "2 min",
    messageUnRead: 20,
    userActive: false,
    messageList:conversationData_PatientB,
  },
  // {
  //   userId: 3,
  //   userName: "Rishard vilson",
  //   userAvatar: "https://i.pravatar.cc/300",
  //   lastMessage: "okay",
  //   lastMessageTime: "",
  //   messageUnRead: null,
  //   userActive: true,
  // },
  // {
  //   userId: 4,
  //   userName: "Max Well",
  //   userAvatar: "https://i.pravatar.cc/300",
  //   lastMessage: "how are you ?",
  //   lastMessageTime: "2 min",
  //   messageUnRead: 20,
  //   userActive: false,
  // },
  // {
  //   userId: 5,
  //   userName: "Rishard vilson",
  //   userAvatar: "https://i.pravatar.cc/300",
  //   lastMessage: "how are you ?",
  //   lastMessageTime: "2 min",
  //   messageUnRead: 20,
  //   userActive: false,
  // },
  // {
  //   userId: 6,
  //   userName: "Marry",
  //   userAvatar: "https://i.pravatar.cc/300",
  //   lastMessage: "good night",
  //   lastMessageTime: "",
  //   messageUnRead: 20,
  // },
  // {
  //   userId: 4,
  //   userName: "Max Well",
  //   userAvatar: "https://i.pravatar.cc/300",
  //   lastMessage: "how are you ?",
  //   lastMessageTime: "2 min",
  //   messageUnRead: 20,
  //   userActive: false,
  // },
  // {
  //   userId: 5,
  //   userName: "Rishard vilson",
  //   userAvatar: "https://i.pravatar.cc/300",
  //   lastMessage: "how are you ?",
  //   lastMessageTime: "2 min",
  //   messageUnRead: 20,
  //   userActive: false,
  // },
  // {
  //   userId: 6,
  //   userName: "Marry",
  //   userAvatar: "https://i.pravatar.cc/300",
  //   lastMessage: "good night",
  //   lastMessageTime: "",
  //   messageUnRead: 20,
  // },
];


// conversationId: "ac78b49e-a9c6-46ee-aa57-61d47b5af756"
// createdAt: "2021-02-06T16:55:13.000Z"
// id: 20
// message: "Sure dispatching to your location."
// recieverId: "a2ed9b2e-1ede-4a25-960e-481d53068c66"
// senderId: "4c763a46-5490-47d1-b32f-ab66c5edd494"
// status: "sent"