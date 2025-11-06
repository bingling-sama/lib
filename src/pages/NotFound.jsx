import { Link } from "react-router-dom"
export default function NotFound(){
    return(
        <>
        <h1> Page Not Found</h1>
        <p>this page you are looking for could not be found</p>
        <br />
        <p>
            Back to
            <Link to={"/book"}>主页</Link>
        </p>
        </>
    )
}