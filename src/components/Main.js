import React from 'react'
import { convertBytes } from './helpers'
import moment from 'moment'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

const Main = ({ uploadFile }) => {
  const [name, setName] = React.useState('')
  const [desc, setDesc] = React.useState('')
  const [buffer, setBuffer] = React.useState([])

  //Get video
  const captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = async () => {
      const _buffer = Buffer.from(reader.result)
      setBuffer(_buffer)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    uploadFile(name, desc, buffer)
    console.log(name, desc, buffer)
  }

  return (
    <Container fluid>
      <Row className='justify-content-center'>
        <Col sm={10} md={8} lg={6} xl={4}>
          <div className='my-5'>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h3>Upload your file</h3>
                </Card.Title>
                <Card.Text as='div'>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='file'>
                      <Form.Control
                        type='file'
                        required
                        onChange={captureFile}
                      />
                      <Form.Text className='text-muted'>
                        Upload a file to DStorage
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId='name'>
                      <Form.Label>File name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter a name for the file'
                        required
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId='desc'>
                      <Form.Label>File description</Form.Label>
                      <Form.Control
                        as='textarea'
                        placeholder='Enter a description for the file'
                        rows='3'
                        required
                        value={desc}
                        onChange={({ target }) => setDesc(target.value)}
                      />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                      Upload
                    </Button>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
            {/* Create Table*/}
            <table
              className='table-sm table-bordered text-monospace'
              style={{ width: '1000px', maxHeight: '450px' }}
            >
              {/* Set table columns */}
              {/* Mapping rows... */}
            </table>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Main
