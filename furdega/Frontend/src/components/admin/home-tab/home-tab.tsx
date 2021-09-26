import { FC, useEffect, useState } from "react"
import {
  Tab,
  Row,
  Col,
  Nav,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap"

import { homeApi } from "../../../api/home-api"
import { scrollspyAnchorsMap } from "../../../const/home"
import {
  AboutSection as AboutSectionType,
  HomePageContent,
} from "../../../types/home"
import { AboutSection } from "./about-section"

const HomeTab: FC = () => {
  const [content, setContent] = useState<HomePageContent | null>(null)

  const [header, setHeader] = useState<string>("")

  const fetchContent = async () => {
    const data = await homeApi.getHomePageContent()
    setContent(data)
    setHeader(data.header)
  }

  useEffect(() => {
    fetchContent()
  }, [])

  const onAboutSectionContentChange = (
    aboutSectionContent: AboutSectionType
  ) => {
    console.log(aboutSectionContent)
  }

  // TODO add skeleton or default content
  if (!content) return null

  return (
    <Tab.Container defaultActiveKey="header">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="header">Заголовок</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="about">
                {scrollspyAnchorsMap["about"].name}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="examples">
                {scrollspyAnchorsMap["examples"].name}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="header">
              <Row className="flex-column">
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="w-25 text-center text-wrap">
                      Текст заголовка
                    </InputGroup.Text>
                    <FormControl
                      as="textarea"
                      value={header}
                      onChange={(event) => {
                        setHeader(event.target.value)
                      }}
                    />
                  </InputGroup>
                </Col>

                <Col>
                  <Button size="lg">Применить</Button>
                </Col>
              </Row>
            </Tab.Pane>

            <Tab.Pane eventKey="about">
              <AboutSection
                {...content.aboutSection}
                onChange={onAboutSectionContentChange}
              />
            </Tab.Pane>

            <Tab.Pane eventKey="examples"></Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export { HomeTab }