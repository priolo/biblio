import DocLayout from "./DocLayout"
import MenuLayout from "./MenuLayout"
import LoginLayout from "./LoginLayout"


function PolyLayout ({
	content
}) {

	const contents = {
		"doc": <DocLayout content={content} />,
		"menu": <MenuLayout content={content} />,
		"login": <LoginLayout content={content} />
	}

    return contents[content.type]

}

export default PolyLayout