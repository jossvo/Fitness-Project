import { func } from "prop-types";

const apiUrl = process.env.BACKEND_URL;

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {},
    actions: {
      setIdentity: () => {
        let accessToken = localStorage.getItem("accessToken");
        let refreshToken = localStorage.getItem("refreshToken");
        let id = localStorage.getItem("id");
        let type = localStorage.getItem("type");
        let wkID = localStorage.getItem("wkID");
        setStore({
          accessToken: accessToken,
          refreshToken: refreshToken,
          id: id,
          type: type,
        });
        if (wkID) setStore({ wkID: wkID });
      },
      // login functions
      login: async (email, password, type) => {
        let urlRoute = "";
        type === "user"
          ? (urlRoute = "/user/login")
          : (urlRoute = "/coach/login");

        const resp = await fetch(apiUrl + urlRoute, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        if (!resp.ok) {
          return resp.json();
        }
        const data = await resp.json();
        setStore({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          id: data.id,
          type: data.type,
        });
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("id", data.id);
        localStorage.setItem("type", data.type);
        return "ok";
      },
      getAutorizationHeader: () => {
        let store = getStore();
        let authorizationHeader = localStorage.getItem("accessToken");
        return { Authorization: "Bearer " + authorizationHeader };
      },
      loadTokens: () => {
        let accessToken = localStorage.getItem("accessToken");
        let refreshToken = localStorage.getItem("refreshToken");
        setStore({ accessToken, refreshToken });
      },
      // logout:async ()=>{
      // 	if(!getStore().accessToken)return;
      // 	const resp = await fetch(apiUrl+"/api/logout",{
      // 		method: 'POST',
      // 		headers: {
      // 			...getActions().getAutorizationHeader()
      // 		}
      // 	})
      // 	if(!resp.ok){
      // 		console.error(resp.statusText
      // 		return false
      // 	}
      // 	localStorage.removeItem("accessToken")
      // 	localStorage.removeItem("refreshToken")
      // 	setStore({accessToken:null,refreshToken:null})
      // 	return "ok"
      // },

      // functions to get information
      getProfile: async () => {
        let urlRoute = "";
        let store = getStore();

        store.type === "u"
          ? (urlRoute = "/userinfo")
          : (urlRoute = "/coachinfo");

        const resp = await fetch(apiUrl + urlRoute, {
          headers: {
            ...getActions().getAutorizationHeader(),
          },
        });
        if (!resp.ok) {
          resp.text().then((text) => {
            let errorObj = JSON.parse(text);
            switch (errorObj.msg) {
              case "Token has expired":
                getActions().updateTokens();
                break;
              default:
                throw new Error(errorObj.msg);
            }
          });
        } else {
          let data = await resp.json();
          let newStore = {};
          newStore["userinfo"] = data;
          setStore(newStore);
        }
      },

      getPublicProfile: async (coach_id) => {
        const resp = await fetch(apiUrl + `/coachpublicinfo/${coach_id}`);
        if (!resp.ok) {
    
            return false
        } else {
          let data = await resp.json();
          let newStore = {};
          newStore["publicCoachInfo"] = data;
          setStore(newStore);
        }
      },
      getDetails: async (element, id) => {
        let response = await fetch(apiUrl + `/${element}/${id}`);
        if (!response.ok)
          console.error(`Error en la petición ${response.statusText}`);
        else {
          let data = await response.json();
          let newStore = {};
          newStore[element + "Detail"] = data;
          setStore(newStore);
        }
      },
      getList: async (elements, name = elements) => {
        let response = await fetch(apiUrl + `/${elements}`, {
          method: "GET",
          headers: {
            ...getActions().getAutorizationHeader(),
          },
        });
        if (!response.ok)
          response.text().then((text) => {
            let errorObj = JSON.parse(text);
            switch (errorObj.msg) {
              case "Token has expired":
                getActions().updateTokens();
                break;
              default:
                throw new Error(errorObj.msg);
            }
          });
        else {
          let data = await response.json();
          let newStore = {};
          newStore[name] = data;
          setStore(newStore);
        }
      },

      // Functions to post new information
      setNewProfile: async (postData, type) => {
        let url = "/users/signup";
        if (type === "coach") url = "/coach/signup";
        let response = await fetch(apiUrl + url, {
          method: "POST",
          body: postData,
        });
        if (!response.ok) {
          return response.json();
        }
        let data = await response.json();
        let resp = await getActions().setProfileImage(
          data.id,
          data.seed,
          data.type
        );
        if (resp == "ok") return "ok";
      },
      setProfileImage: async (user_id, seed, type) => {
        const data = new FormData();
        let avatarResponse = await fetch(
          `https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=${seed}`
        )
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "image", { type: blob.type });
            data.set("file", file);
          });
        let url = /setprofilepic/;
        if (type === "coach") url = /setcoachprofilepic/;
        const response = await fetch(apiUrl + url + user_id, {
          method: "POST",
          body: data,
        });
        if (!response.ok) return false;
        else return "ok";
      },
      setNewElement: async (url, data) => {
        const response = await fetch(apiUrl + "/" + url, {
          method: "POST",
          headers: {
            ...getActions().getAutorizationHeader(),
          },
          body: data,
        });
        if (!response.ok) {
          response.text().then((text) => {
            let errorObj = JSON.parse(text);
            switch (errorObj.msg) {
              case "Token has expired":
                getActions().updateTokens();
                break;
              default:
                console.log(errorObj.msg);
                throw new Error(errorObj.msg);
            }
          });
          return "error";
        } else {
          let data = await response.json();
          return data.id;
        }
      },
      // functions to update information
      updateTokens: async () => {
        const response = await fetch(apiUrl + "/refresh", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.refreshToken,
          },
        });
        if (!response.ok) {
          response.text().then((text) => {
            let errorObj = JSON.parse(text);
            switch (errorObj.msg) {
              case "Token has expired":
                console.log("Token has expired");
                break;
              default:
                throw new Error(errorObj.msg);
            }
          });
        }
        const data = await response.json();
        setStore({
          accessToken: data.access_token,
        });
        localStorage.setItem("accessToken", data.access_token);
        window.location.reload();
        return "ok";
      },
      updateAccountDetails: async (postData) => {
        let urlRoute = "";
        let store = getStore();

        store.type === "u"
          ? (urlRoute = "/updateprofile")
          : (urlRoute = "/updatecoachprofile");

        let response = await fetch(apiUrl + urlRoute, {
          method: "PATCH",
          headers: {
            ...getActions().getAutorizationHeader(),
          },
          body: postData,
        });
        if (!response.ok) {
          return response.json();
        }
        return "ok";
      },
      updateImage: async (postData) => {
        let urlRoute = "";
        let store = getStore();
        store.type === "u"
          ? (urlRoute = "/setprofilepic")
          : (urlRoute = "/setcoachprofilepic");
        let response = await fetch(apiUrl + urlRoute, {
          method: "PATCH",
          headers: {
            ...getActions().getAutorizationHeader(),
          },
          body: postData,
        });
        if (!response.ok) {
          console.error(response.statusText);
          return false;
        }
        return true;
      },
      updateWorkout: async (formData, workout_id) => {
        let response = await fetch(apiUrl + `/workouts/${workout_id}`, {
          method: "PATCH",
          headers: {
            ...getActions().getAutorizationHeader(),
          },
          body: formData,
        });
        if (!response.ok) {
          response.text().then((text) => {
            let errorObj = JSON.parse(text);
            switch (errorObj.msg) {
              case "Token has expired":
                getActions().updateTokens();
                break;
              default:
                console.log(errorObj.msg);
                throw new Error(errorObj.msg);
            }
          });
          return false;
        }
        return "ok";
      },
      updateExercise: async (formData, itemType, exercise_id) => {
        let response = await fetch(apiUrl + `/${itemType}/${exercise_id}`, {
          method: "PATCH",
          headers: {
            ...getActions().getAutorizationHeader(),
          },
          body: formData,
        });
        if (!response.ok) {
          response.text().then((text) => {
            let errorObj = JSON.parse(text);
            switch (errorObj.msg) {
              case "Token has expired":
                getActions().updateTokens();
                break;
              default:
                console.log(errorObj.msg);
                throw new Error(errorObj.msg);
            }
          });
          return false;
        }
        return "ok";
      },
    },
  };
};

export default getState;
