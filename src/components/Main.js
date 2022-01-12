import React from 'react'
import { convertBytes } from './helpers'
import moment from 'moment'
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { ScaleLoader } from 'react-spinners'

const Main = ({ files, uploadFile, loading }) => {
  const [name, setName] = React.useState('')
  const [desc, setDesc] = React.useState('')
  const [type, setType] = React.useState('')
  const [buffer, setBuffer] = React.useState([])

  //Get video
  const captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    setType(file.type)
    setName(file.name)
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = async () => {
      const _buffer = Buffer.from(reader.result)
      setBuffer(_buffer)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    uploadFile(name, desc, buffer, type)
  }

  return (
    <Container fluid>
      <Row className='justify-content-center'>
        <Col sm={10} md={8} lg={6} xl={4}>
          <Card className='my-5'>
            <Card.Body>
              <Card.Title>
                <h3>Upload your file</h3>
              </Card.Title>
              <Card.Text as='div'>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId='file'>
                    <Form.Control type='file' required onChange={captureFile} />
                    <Form.Text className='text-muted'>
                      Upload a file to DStorage
                    </Form.Text>
                  </Form.Group>
                  {/* <Form.Group controlId='name'>
                    <Form.Label>File name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter a name for the file'
                      required
                      value={name}
                      onChange={({ target }) => setName(target.value)}
                    />
                  </Form.Group> */}
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
                  <Button
                    variant='primary btn-block'
                    type='submit'
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        Uploading...{' '}
                        <ScaleLoader color='#fff' height={15} width={3} />
                      </>
                    ) : (
                      'Upload'
                    )}
                  </Button>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {files.length > 0 && (
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Size</th>
              <th>Uploaded</th>
              <th>Uploader</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{file.fileName}</td>
                <td>{file.fileDescription}</td>
                <td>{file.fileType}</td>
                <td>{convertBytes(file.fileSize)}</td>
                <td>
                  {moment.unix(file.uploadTime).format('h:mm:ssa - MM/MD/Y')}
                </td>
                <td>
                  <a
                    href={'https://etherscan.io/address/' + file.uploader}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {file.uploader.substring(0, 10)}...
                  </a>
                </td>
                <td>
                  <Button
                    variant='primary'
                    href={`https://ipfs.infura.io/ipfs/${file.fileHash}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default Main
