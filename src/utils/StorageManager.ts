import Session from "../types/Session";

export const SaveSessions = (sessions: Session[]) => {
  localStorage.setItem("sessions", JSON.stringify(sessions));
};

export const GetSessions = () => {
  const sessions: Session[] = JSON.parse(localStorage.getItem('sessions') || '{}');
  return sessions;
};

export const DeleteSession = (session: Session) => {
  let Existedsessions: Session[] = JSON.parse(localStorage.getItem('sessions') || '{}');
  Existedsessions.forEach((element, index) => {
    if (element.title === session.title) Existedsessions.splice(index, 1);
  });
  localStorage.setItem("sessions", JSON.stringify(Existedsessions));
};

// export const UpdateSession = (session: Session) => {
//   let Existedsessions: Session[] = JSON.parse(localStorage.getItem('sessions') || '{}');
//   console.log("update", Existedsessions, session);

//   Existedsessions.forEach((element, index) => {
//     if (element.id === session.id) {
//       Existedsessions[index].title = session.title
//       Existedsessions[index].date = session.date
//       Existedsessions[index].notes = session.notes
//       console.log("hereee");


//     }
//   });
//   localStorage.setItem("sessions", JSON.stringify(Existedsessions));
// };
