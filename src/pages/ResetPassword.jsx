import React,{useState} from 'react'
import { Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Footer from "../components/Footer"


const ResetPassword = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const settings = useSelector(state => state.settings)
    const [form, setForm] = useState({
        resetlink: id,
        newpassword: "",
        repassword: ""
    });    

    const { resetlink, newpassword, repassword } = form;

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");    
    const [loading, setLoading] = useState(false);
    
    const hideNotification = () => {
        setError("");
        setSuccess("");
    }

    const triggerChange = (e) => {
        e.preventDefault();
        hideNotification();
        setForm({ ...form, [e.target.name] : e.target.value });
    }

    const triggerSubmit = async (e) => {
        e.preventDefault();
        hideNotification();  
        
        if (resetlink) {
            if (resetlink && newpassword && repassword) {            
                if (newpassword === repassword) {  
                    setLoading(true);         
                    //await axios.post('http://projecttiny.ap-1.evennode.com/resetpassword', form).then((res) => {
                    await axios.post(`${settings.API_URL}/resetpassword`, form).then((res) => {
                        setSuccess(res.data?.message);
                        navigate("/login");                        
                    }).catch((e) => {
                        setLoading(false);
                        setError(e?.message);
                    });
                } else {
                    setError("Password does not match!");
                }
            } else {
                setError("All fields are required!");
            }
        } else {
            setError("Invalid Link!");
        }        
    }    

    return (
        <div >
            
            <Row className="mx-auto my-5">
                <Col className="col-md-6 offset-md-3">
                    <Card className="shadow" >                       
                        <Card.Body>
                            <Card.Title >ResetPassword <Link to='/' className="float-end text-decoration-none text-danger">x</Link></Card.Title>                                
                            {
                                loading ?
                                    (
                                        <div className="text-center my-5">
                                            <div>Processing... Please wait!</div>
                                            <Spinner animation="border" variant="danger" className="mt-3" />
                                        </div>  
                                    )
                                        :
                                    (
                                        <>
                                            <Form onSubmit={triggerSubmit}> 
                                                <Form.Group as={Row} className="mb-3 mt-4 pt-2" >
                                                    <Form.Label column sm="3">
                                                        Password
                                                    </Form.Label>
                                                    <Col sm="9">
                                                    <Form.Control type="password" name="newpassword" value={newpassword} onChange={triggerChange} required />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3" >
                                                    <Form.Label column sm="3">
                                                        Verify Password
                                                    </Form.Label>
                                                    <Col sm="9">
                                                        <Form.Control type="password" name="repassword" value={repassword} onChange={triggerChange} required />
                                                    </Col>
                                                </Form.Group>

                                                <Row>
                                                    <Col className="text-end">
                                                        <Button variant="danger" type="submit"  >
                                                            ResetPassword
                                                        </Button>
                                                    </Col>
                                                </Row>                                
                                                
                                                <Row className="mt-2 text-center">
                                                    <Col>
                                                        {error ? (<Alert variant="danger">{error}</Alert>) : null}
                                                    </Col>
                                                </Row>
                                                <Row className="mt-2 text-center">
                                                    <Col>
                                                        {success ? (<Alert variant="success">{success}</Alert>) : null}
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </>
                                    )
                            }
                            
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <p>Already have an account? <Link to='/login' className="text-decoration-none text-danger">Login</Link></p>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>

            <Footer />
        </div>
    )
}

export default ResetPassword
