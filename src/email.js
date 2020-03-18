import React from 'react'
import ReactMarkdown from 'react-markdown'
import {readFileSync} from 'fs'
import {
  Mjml,
  MjmlHead,
  MjmlFont,
  MjmlTitle,
  MjmlPreview,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlButton,
  MjmlImage,
  MjmlStyle,
  MjmlText,
  MjmlRaw,
  MjmlAll,
  MjmlClass,
  MjmlGroup,
  MjmlHero,
  MjmlWrapper,
  MjmlDivider,
} from 'mjml-react'
import moment from 'moment'

const css = readFileSync('./assets/styles.css').toString()

export function generate(data, DAYS_BACK) {
  const {
    playlists = [],
    courses = [],
    lessons = [],
    podcasts = [],
    popular_courses = [],
  } = data || {}

  return (
    <Mjml>
      <MjmlHead>
        <MjmlTitle>
          {`What's up at egghead for the last ${DAYS_BACK} days...`}
        </MjmlTitle>
        <MjmlPreview>
          {`What's up at egghead for the last ${DAYS_BACK} days...`}
        </MjmlPreview>
        <MjmlStyle>{css}</MjmlStyle>
        <MjmlFont
          name="Open Sans"
          href="https://fonts.googleapis.com/css?family=Open+Sans"
        />
      </MjmlHead>
      <MjmlBody width={600}>
        <MjmlHero
          mode="fluid-height"
          background-color="white"
          height="280px"
          padding="30px"
          // background-url="https://res.cloudinary.com/dg3gyk0gu/image/upload/v1577721075/email-images/fresh-assets/header.png"
          // background-repeat="no-repeat"
          // background-width="600px"
          // background-height="330px"
        >
          <MjmlImage
            width="40px"
            src="https://res.cloudinary.com/dg3gyk0gu/image/upload/w_120/v1569292667/eggo/eggo_flair.png"
          />
          <MjmlText
            align="center"
            font-size="12px"
            line-height="1.5"
            padding="0"
          >
            <h1>What's up at egghead for the last {DAYS_BACK} days</h1>
          </MjmlText>

          <MjmlText
            color="rgba(0,0,0,0.6)"
            align="center"
            font-size="11px"
            text-transform="uppercase"
            padding="0"
          >
            {moment()
              .subtract(DAYS_BACK, 'days')
              .endOf('day')
              .format('MMMM DD, YYYY')
            //.calendar()
            }{' '}
            —{' '}
            {moment()
              .endOf('day')
              .format('MMMM DD, YYYY')
            //.calendar()
            }
          </MjmlText>
          <MjmlSection padding="20px 0 0 0">
            <MjmlGroup>
              <MjmlColumn>
                <MjmlText align="center" color="#6884FC">
                  {lessons.length} lesson{lessons.length > 1 && 's'}
                </MjmlText>
              </MjmlColumn>
              <MjmlColumn>
                <MjmlText align="center" color="#6884FC">
                  {podcasts.length} podcast{podcasts.length > 1 && 's'}
                </MjmlText>
              </MjmlColumn>
            </MjmlGroup>
            <MjmlGroup>
              <MjmlColumn>
                <MjmlText align="center" color="#6884FC">
                  {courses.length} course{courses.length > 1 && 's'}
                </MjmlText>
              </MjmlColumn>
              <MjmlColumn>
                <MjmlText align="center" color="#6884FC">
                  {playlists.length} playlist{playlists.length > 1 && 's'}
                </MjmlText>
              </MjmlColumn>
            </MjmlGroup>
          </MjmlSection>
        </MjmlHero>
        <MjmlWrapper>
          <Resources
            title="New Courses"
            resources={courses.slice(0, 1)}
            getImage={series => series.square_cover_url}
            byLine={({instructor = ''}) => `by ${instructor.full_name}`}
            columnWidth="100%"
          />
          <Resources
            title="Podcasts"
            resources={podcasts}
            getImage={podcast => podcast.image_url}
            byLine={podcast =>
              `[PLAY BUTTON] — hosted by ${podcast.contributors.join(',')}`
            }
            getDescription={podcast => podcast.summary}
          />
          <Resources
            title="Lessons"
            resources={lessons}
            getImage={lesson => lesson.image_url}
            byLine={({instructor = ''}) => `by ${instructor.full_name}`}
            getDescription={lesson => lesson.summary}
          />
        </MjmlWrapper>
      </MjmlBody>
    </Mjml>
  )
}

function Resources({
  title,
  resources = [],
  byLine,
  getImage,
  getDescription = resource => resource.description || '',
  columnWidth = '50%',
}) {
  return (
    resources.length > 0 && (
      <>
        {title && (
          <MjmlText text-transform="uppercase" color="rgba(0,0,0,0.6)">
            {title}
          </MjmlText>
        )}
        <MjmlSection backgroundColor="white">
          {resources.map(resource => {
            return (
              <MjmlColumn
                backgroundColor="white"
                width={columnWidth}
                padding="16px"
                key={resource.slug}
                fontFamily="Open Sans, sans-serif"
              >
                <MjmlSection borderBottom="1px solid #f1f1f1" paddingTop="0px">
                  <MjmlColumn align="center">
                    {getImage && (
                      <MjmlImage
                        align="center"
                        width="200px"
                        fluid-on-mobile={true}
                        src={getImage(resource)}
                        href={`https://egghead.io${resource.path}`}
                      />
                    )}

                    <MjmlSection padding="0" align="center">
                      <MjmlButton
                        href={`https://egghead.io${resource.path}`}
                        text-align="center"
                        font-size="20px"
                        inner-padding="0"
                        padding-bottom="0px"
                        color="#007AFF"
                        background-color="transparent"
                        text-decoration="none"
                        width="100%"
                      >
                        {resource.title}
                      </MjmlButton>
                    </MjmlSection>
                    <MjmlSection
                      text-align="center"
                      align="center"
                      padding="8px 0"
                    >
                      {resource.instructor && (
                        <MjmlColumn padding="0" width="32px">
                          <MjmlImage
                            width="32px"
                            height="32px"
                            padding="0"
                            border-radius="16px"
                            src={resource.instructor.avatar_64_url}
                          />
                        </MjmlColumn>
                      )}
                      <MjmlColumn
                        padding="0"
                        height="32px"
                        vertical-align="middle"
                        width="120px"
                      >
                        <MjmlText
                          fontSize="12px"
                          padding-top="9px"
                          padding-left="6px"
                          color="gray"
                          padding="0"
                        >
                          {byLine(resource)}
                        </MjmlText>
                      </MjmlColumn>
                    </MjmlSection>
                    <MjmlText padding="0px" lineHeight="1.5">
                      <ReactMarkdown source={getDescription(resource)} />
                    </MjmlText>
                  </MjmlColumn>
                </MjmlSection>
              </MjmlColumn>
            )
          })}
        </MjmlSection>
      </>
    )
  )
}
