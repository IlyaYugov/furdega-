import { FC, useEffect, useState } from "react"
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap"

import { FormInputEvent } from "../../../types/utils"
import { fileToBase64 } from "../../../utils/file-to-base64"
import { ReactComponent as YellowSnakeIcon } from "../../../assets/svg/yellow-snake.svg"
import { getDefaultImage } from "../../../utils/get-default-image"
import { MaterialBrandCreateRequest } from "../../../types/material-brand"
import { BrandData } from "."

type CreateProps = {
  show: boolean
  materialId: number
  submit: (request: MaterialBrandCreateRequest) => Promise<void>
  close: () => void
}

const getCreateBrandData = (materialId: number): BrandData => ({
  id: -1,
  materialId,
  title: "",
  mainImage: getDefaultImage(),
  previewImage: getDefaultImage(),
  images: [],
})

const Create: FC<CreateProps> = ({ show, materialId, submit, close }) => {
  const [title, setTitle] = useState<string>("")
  const [previewImage, setPreviewImage] = useState(getDefaultImage())
  const [mainImage, setMainImage] = useState(getDefaultImage())
  const [images, setImages] = useState()
  const [previewImageBase64, setPreviewImageBase64] = useState<string | null>(
    null
  )
  const [mainImageBase64, setMainImageBase64] = useState<string | null>(null)

  useEffect(() => {
    const data = getCreateBrandData(materialId)
    setTitle(data.title)
    setPreviewImage(data.previewImage)
    setMainImage(data.mainImage)
    setPreviewImageBase64(null)
    setMainImageBase64(null)
  }, [show])

  const onPreviewImageChange = async (event: FormInputEvent) => {
    const files = (event.currentTarget as HTMLInputElement).files
    if (!files) return null

    const file = files[0]
    const fileUrl = URL.createObjectURL(file)
    const base64 = await fileToBase64(file)

    setPreviewImage({ ...previewImage, imageUrl: fileUrl })
    setPreviewImageBase64(base64)
  }

  const onMainImageChange = async (event: FormInputEvent) => {
    const files = (event.currentTarget as HTMLInputElement).files
    if (!files) return null

    const file = files[0]
    const fileUrl = URL.createObjectURL(file)
    const base64 = await fileToBase64(file)

    setMainImage({ ...mainImage, imageUrl: fileUrl })
    setMainImageBase64(base64)
  }

  const onSubmitClick = async () => {
    if (!(mainImageBase64 && previewImageBase64)) return

    const request: MaterialBrandCreateRequest = {
      title,
      materialId,
      mainImage: {
        id: mainImage.id,
        base64ImageString: mainImageBase64,
      },
      previewImage: {
        id: previewImage.id,
        base64ImageString: previewImageBase64,
      },
      images: [],
    }

    submit(request)
  }

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Добавление нового бренда</Modal.Title>
      </Modal.Header>

      <Modal.Body className="overflow-hidden">
        <Row className="flex-column gy-3">
          <Col>
            <div className="fw-bold">Название бренда</div>
            <Form.Control
              as="input"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)
              }}
            />
          </Col>

          <Col>
            <YellowSnakeIcon />
          </Col>

          <Col>
            <Row>
              <Col>
                <Row className="flex-column gy-2">
                  <div className="fw-bold">Preview изображение</div>

                  <Col>
                    <Image fluid src={previewImage.imageUrl} />
                  </Col>

                  <Col>
                    <Form.Control
                      type="file"
                      accept=".jpeg, .jpg, .png"
                      onChange={onPreviewImageChange}
                    />
                  </Col>
                </Row>
              </Col>

              <Col>
                <Row className="flex-column gy-2">
                  <div className="fw-bold">Главное изображение</div>

                  <Col>
                    <Image fluid src={mainImage.imageUrl} />
                  </Col>

                  <Col>
                    <Form.Control
                      type="file"
                      accept=".jpeg, .jpg, .png"
                      onChange={onMainImageChange}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Отмена
        </Button>
        <Button variant="primary" onClick={onSubmitClick}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export { Create }