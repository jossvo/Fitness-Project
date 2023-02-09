const apiUrl = process.env.BACKEND_URL

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			// login functions
			login: async (email,password)=>{
				const resp = await fetch(apiUrl+"/login", {
					method:'POST',
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify({email,password})
				})
				if(!resp.ok){
					return resp.statusText
				}
				const data = await resp.json()
				setStore({
					accessToken:data.access_token,
					refreshToken: data.refresh_token,
					id:data.id,
					type:data.type
				})
				localStorage.setItem("accessToken",data.access_token)
				localStorage.setItem("refreshToken",data.refresh_token)
				localStorage.setItem("id",data.id)
				localStorage.setItem("type",data.type)
				return "ok"
			},
			getAutorizationHeader:()=>{
				let temp = getStore()
				return {"Authorization":"Bearer " + temp.accessToken}
			},
			loadTokens:()=>{
				let accessToken = localStorage.getItem("accessToken")
				let refreshToken = localStorage.getItem("refreshToken")
				setStore({accessToken,refreshToken})

			},
			logout:async ()=>{
				if(!getStore().accessToken)return;
				const resp = await fetch(apiUrl+"/api/logout",{
					method: 'POST',
					headers: {
						...getActions().getAutorizationHeader()
					}
				})
				if(!resp.ok){
					console.error(resp.statusText)
					return false
				}
				localStorage.removeItem("accessToken")
				localStorage.removeItem("refreshToken")
				setStore({accessToken:null,refreshToken:null})
				return "ok"
			},
			// functions to get information
			getDetails: async(element,id)=>{
				let response = await fetch(apiUrl +`/${element}/${id}`);
				if (!response.ok)
				  console.error(`Error en la petición ${response.statusText}`);
				else {
				  let data = await response.json();
				  let newStore = {};
				  newStore[element+"Detail"] = data;
				  setStore(newStore);
				}
			},
			getList: async (elements) => {
				let response = await fetch(apiUrl +`/${elements}`);
				if (!response.ok)
				  console.error(`Error en la petición ${response.statusText}`);
				else {
				  let data = await response.json();
				  let newStore = {};
				  newStore[elements] = data;
				  setStore(newStore);
				}
			},
			// functions to update information
			updateAccountDetails: async (postData,user_id)=>{
				let response = await fetch(apiUrl +`/users/${user_id}`,{
					method: 'PATCH',
					body: postData,
				});
				if (!response.ok){
					console.error(response.statusText)
					return false
				}
				return true
			},
		}
	};
};

export default getState;
