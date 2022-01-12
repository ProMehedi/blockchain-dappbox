import React from 'react'
import { convertBytes } from './helpers'
import moment from 'moment'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

const Main = ({}) => {
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
                <Card.Text>
                  <Form>
                    <Form.Group controlId='file'>
                      <Form.Control type='file' required />
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
                      />
                    </Form.Group>
                    <Form.Group controlId='desc'>
                      <Form.Label>File description</Form.Label>
                      <Form.Control
                        as='textarea'
                        placeholder='Enter a description for the file'
                        rows='3'
                        required
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
