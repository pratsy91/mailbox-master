import { redirect } from "react-router-dom";
// import { emailDetailsActions } from "./emailDetailSlice";
import { mailSliceActions } from "./mailSlice";
import { sentSliceActions } from "./sentMailSlice";

export function getauthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getauthToken();
}

export function checkAuthLoader() {
  const token = getauthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }
  return null;
}

export const sendMail = (emailData) => {
  return async (dispatch) => {
    const sendData = async () => {
      const response = await fetch(
        "https://mail-box-bbdee-default-rtdb.firebaseio.com/emails.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailData.email,
            body: emailData.body,
            read: false,
          }),
        }
      );
      return response;
    };
    try {
      const response = await sendData();
      if (response.ok) {
        dispatch(getMails());
      }
    } catch (error) {}
  };
};

export const getMails = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://mail-box-bbdee-default-rtdb.firebaseio.com/emails.json"
      );
      return response;
    };
    try {
      const response = await sendRequest();
      const data = await response.json();
      const loadedMails = [];
      for (const key in data) {
        loadedMails.push({
          id: key,
          email: data[key].email,
          body: data[key].body,
          read: data[key].read,
        });
      }
      dispatch(mailSliceActions.setMails({ mails: loadedMails }));
    } catch (error) {}
  };
};

// export const getEmailDetails = (id) => {
//   return async (dispatch) => {
//     const sendRequest = async () => {
//       const response = await fetch(
//         `https://mail-box-bbdee-default-rtdb.firebaseio.com/emails/${id}.json`
//       );
//       return response;
//     };
//     try {
//       const response = await sendRequest();
//       const data = await response.json();
//       dispatch(emailDetailsActions.setMail({ mail: data }));
//     } catch (error) {}
//   };
// };

export const updateMail = (mail) => {
  return async (dispatch) => {
    const sendData = async () => {
      const response = await fetch(
        `https://mail-box-bbdee-default-rtdb.firebaseio.com/emails/${mail.id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: mail.email,
            body: mail.body,
            read: true,
          }),
        }
      );
      return response;
    };
    try {
      const response = await sendData();
      if (response.ok) {
      }
    } catch (error) {}
  };
};

export const sentData = (emailData) => {
  return async (dispatch) => {
    const sendData = async () => {
      const response = await fetch(
        "https://mail-box-bbdee-default-rtdb.firebaseio.com/sentmails.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailData.email,
            body: emailData.body,
            read: false,
          }),
        }
      );
      return response;
    };
    try {
      const response = await sendData();
      if (response.ok) {
        dispatch(getSentMails());
      }
    } catch (error) {}
  };
};

export const deleteMail = (id) => {
  return async (dispatch) => {
    const sendData = async () => {
      const response = await fetch(
        `https://mail-box-bbdee-default-rtdb.firebaseio.com/emails/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    };
    try {
      const response = await sendData();
      if (response.ok) {
        dispatch(getMails());
      }
    } catch (error) {}
  };
};

export const deleteSentMail = (id) => {
  return async (dispatch) => {
    const sendData = async () => {
      const response = await fetch(
        `https://mail-box-bbdee-default-rtdb.firebaseio.com/sentmails/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    };
    try {
      const response = await sendData();
      if (response.ok) {
        dispatch(getSentMails());
      }
    } catch (error) {}
  };
};

export const getSentMails = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://mail-box-bbdee-default-rtdb.firebaseio.com/sentmails.json"
      );
      return response;
    };
    try {
      const response = await sendRequest();
      const data = await response.json();
      const loadedMails = [];
      for (const key in data) {
        loadedMails.push({
          id: key,
          email: data[key].email,
          body: data[key].body,
          read: data[key].read,
        });
      }
      dispatch(sentSliceActions.setMails({ mails: loadedMails }));
    } catch (error) {}
  };
};
