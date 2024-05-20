import Button from "@/components/buttons/Button"
import FrameworkCard from "@/components/cards/FrameworkCard"
import { UserStore } from "@/stores/stacks/user"
import { useStore } from "@priolo/jon"
import { FunctionComponent, useEffect } from "react"
import cls from "./View.module.css"
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import authSo from "@/stores/auth"



interface Props {
	store?: UserStore
}

const UserView: FunctionComponent<Props> = ({
	store,
}) => {

	// STORE
	const state = useStore(store)
	const authSa = useStore(authSo)

	// HOOKs
	useEffect(() => {
	}, [])

	// HANDLER

	const handleLoginSuccess = (response: CredentialResponse) => {
		console.log('Login Success:', response);
		authSo.createSession(response.credential)
	};

	const handleLoginFailure = (error: any) => {
		console.log('Login Failure:', error);
	};

	// RENDER
	return <FrameworkCard
		store={store}
	>
		<div className="lyt-form">

			{authSa.user != null ? <div>SUCCESS3</div> : <div>LOGIN!!!</div>}

			<GoogleOAuthProvider clientId="106027300810-0udm0cjghhjr87626qrvcoug5ahgq1bh.apps.googleusercontent.com">
				<div>
					<h2>Login with Google</h2>
					<GoogleLogin
						onSuccess={handleLoginSuccess}
						onFailure={handleLoginFailure}
					/>
				</div>
			</GoogleOAuthProvider>

		</div>

	</FrameworkCard>
}

export default UserView

