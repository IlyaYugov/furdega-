import { Dispatch, FC, SetStateAction, useState } from "react"
import { Row, Col, InputGroup, Button, Form } from "react-bootstrap"

import { workingProcessSectionApi } from "../../../../api/home/working-process-section-api"
import { AdminSectionMode } from "../../../../const/admin"
import { WorkingProcessSectionResponse } from "../../../../types/home/process"

type EditProps = {
  data: WorkingProcessSectionResponse
  setMode: Dispatch<SetStateAction<AdminSectionMode>>
}

const Edit: FC<EditProps> = ({ data, setMode }) => {
  const isDataEmpty = Object.values(data).every((val) => val === null)

  const [header, setHeader] = useState<string>(data.header || "")
  const [firstStage, setFirstStage] = useState<string>(data.firstStage || "")
  const [secondStage, setSecondStage] = useState<string>(data.secondStage || "")
  const [thirdStage, setThirdStage] = useState<string>(data.thirdStage || "")
  const [finalStage, setFinalStage] = useState<string>(data.finalStage || "")

  const save = async () => {
    const request = {
      header,
      firstStage,
      secondStage,
      thirdStage,
      finalStage,
    }

    if (isDataEmpty) {
      await workingProcessSectionApi.create(request)
    } else {
      await workingProcessSectionApi.update(request)
    }
  }

  return (
    <Row className="flex-column gy-3">
      <Col>
        <InputGroup>
          <InputGroup.Text className="w-25 text-center text-wrap">
            Текст заголовка
          </InputGroup.Text>

          <Form.Control
            as="textarea"
            value={header}
            onChange={(event) => {
              setHeader(event.target.value)
            }}
          />
        </InputGroup>
      </Col>

      <Col>
        <InputGroup>
          <InputGroup.Text className="w-25">Первый этап</InputGroup.Text>
          <Form.Control
            as="textarea"
            value={firstStage}
            onChange={(event) => {
              setFirstStage(event.target.value)
            }}
          />
        </InputGroup>
      </Col>

      <Col>
        <InputGroup>
          <InputGroup.Text className="w-25">Второй этап</InputGroup.Text>
          <Form.Control
            as="textarea"
            value={secondStage}
            onChange={(event) => {
              setSecondStage(event.target.value)
            }}
          />
        </InputGroup>
      </Col>

      <Col>
        <InputGroup>
          <InputGroup.Text className="w-25">Третий этап</InputGroup.Text>
          <Form.Control
            as="textarea"
            value={thirdStage}
            onChange={(event) => {
              setThirdStage(event.target.value)
            }}
          />
        </InputGroup>
      </Col>

      <Col>
        <InputGroup>
          <InputGroup.Text className="w-25">Конечный этап</InputGroup.Text>
          <Form.Control
            as="textarea"
            value={finalStage}
            onChange={(event) => {
              setFinalStage(event.target.value)
            }}
          />
        </InputGroup>
      </Col>

      <Col className="d-flex justify-content-end">
        <Row>
          <Col>
            <Button
              size="lg"
              className="text-nowrap"
              onClick={() => {
                save()
              }}
            >
              Сохранить изменения
            </Button>
          </Col>
          <Col>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                setMode(AdminSectionMode.view)
              }}
            >
              Отмена
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export { Edit }