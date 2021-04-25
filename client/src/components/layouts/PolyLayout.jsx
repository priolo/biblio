import DocLayout from "./DocLayout"
import MenuLayout from "./MenuLayout"
import LoginLayout from "./LoginLayout"
import RegisterLayout from "./RegisterLayout"
import ActivateLayout from "./ActivateLayout"
import { useUrl } from "../../store/url"
import { DOC_TYPE } from "../../store/doc"
import { useEffect, useRef } from "react"


function PolyLayout ({
	content
}) {

	// HOOKs
	const { state:url, setHash, getHash } = useUrl()
	const contentRef = useRef(null)
	useEffect(()=> {
		if ( getHash() != content.id ) return 
		contentRef.current.scrollIntoView({behavior: "smooth", /*block: "center",*/ inline: "center"})
    }, [url.url])


	// HANDLEs
	const handleClickContent = e => setHash(content.id)


	// RENDER
	const contents = {
		[DOC_TYPE.DOC]: <DocLayout content={content} />,
		[DOC_TYPE.MENU]: <MenuLayout content={content} />,
		[DOC_TYPE.LOGIN]: <LoginLayout content={content} />,
		[DOC_TYPE.REGISTER]: <RegisterLayout content={content} />,
		[DOC_TYPE.ACTIVATE]: <ActivateLayout content={content} />,
	}

    return <div onClick={handleClickContent} ref={contentRef}>
		{contents[content.type]}
	</div>

}

export default PolyLayout