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
			setIdentity: ()=>{
				let accessToken = localStorage.getItem("accessToken")
				let refreshToken = localStorage.getItem("refreshToken")
				let id = localStorage.getItem("id")
				let type = localStorage.getItem("type")
				setStore({
					accessToken:accessToken,
					refreshToken:refreshToken,
					id:id,
					type:type
				})
			},
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
			login: async (email,password,type)=>{
				let urlRoute = ""
				type==="user"? urlRoute="/user/login"
				:urlRoute="/coach/login"

				const resp = await fetch(apiUrl+urlRoute, {
					method:'POST',
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify({email,password})
				})
				if(!resp.ok){
					return resp.json()
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
				let store = getStore()
				let authorizationHeader=localStorage.getItem("accessToken")
				return {"Authorization":"Bearer " + authorizationHeader}
			},
			loadTokens:()=>{
				let accessToken = localStorage.getItem("accessToken")
				let refreshToken = localStorage.getItem("refreshToken")
				setStore({accessToken,refreshToken})

			},
			getProfile: async()=>{
				const resp = await fetch(apiUrl+"/userinfo",{
					headers:{
						...getActions().getAutorizationHeader()
					}
				})
				if (!resp.ok){
					resp.text().then(text => {
						let errorObj = JSON.parse(text)
						switch(errorObj.msg){
							case "Token has expired":
								getActions().updateTokens()
								break;
							default:
								throw new Error(errorObj.msg)
						}
					})
				}else{
					let data = await resp.json();
					let newStore = {};
					newStore["userinfo"] = data;
					setStore(newStore);
				}
				
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
			getDefaultPicture:async()=>{
				let response = await fetch("https://api.dicebear.com/5.x/shapes/svg?seed=Felix")
				//https://www.youtube.com/watch?v=cP5E0b21f_Y
			},
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
			// Functions to post new information
			setProfileImage:async ()=>{
				let token = localStorage.accessToken
				let first = token.slice(token.length/2);
				const data = new FormData()
				let avatarResponse = await fetch(`https://api.dicebear.com/5.x/bottts-neutral/jpg?seed=${first}`)
					.then(res=>res.blob())
					.then(blob=>{
						const file = new File([blob],'image',{type:blob.type})
						data.set('file',file)
					})
					
					const response = await fetch(apiUrl+"/setprofilepic", {
						method:'POST',
						body: data
					})
			},
			// functions to update information
			updateTokens:async ()=>{
				const resp = await fetch(apiUrl+"/refresh", {
					method:'POST',
					headers: {
						"Authorization":"Bearer " + localStorage.refreshToken
					}
				})
				if(!resp.ok){
					resp.text().then(text => {
						let errorObj = JSON.parse(text)
						switch(errorObj.msg){
							case "Token has expired":
								console.log("Token has expired")
								break;
							default:
								throw new Error(errorObj.msg)
						}
					})
				}
				const data = await resp.json()
				setStore({
					accessToken:data.access_token
				})
				localStorage.setItem("accessToken",data.access_token)
				window.location.reload();
				return "ok"
			},
			updateAccountDetails: async (postData)=>{
				let response = await fetch(apiUrl +`/updateprofile`,{
					method: 'PATCH',
					headers: {
						...getActions().getAutorizationHeader()
					},
					body: postData,
				});
				if (!response.ok){
					resp.text().then(text => {
						let errorObj = JSON.parse(text)
						switch(errorObj.msg){
							case "Token has expired":
								console.log("Token has expired")
								break;
							default:
								throw new Error(errorObj.msg)
						}
					})
				}
				return true
			},
			updateImage: async (postData)=>{
				let response = await fetch(apiUrl +`/setprofilepic`,{
					method: 'PATCH',
					headers: {
						...getActions().getAutorizationHeader()
					},
					body: postData,
				});
				if (!response.ok){
					console.error(response.statusText)
					return false
				}
				return true
			}
		}
	};
};

export default getState;
