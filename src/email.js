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
            <h1>What's up at egghead for the last {DAYS_BACK} days...</h1>
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
              .format('MMMM d, YYYY')
            //.calendar()
            }{' '}
            —{' '}
            {moment().format('MMMM d, YYYY')
            //.calendar()
            }
          </MjmlText>
          <MjmlText align="center" padding-top="30px" color="#6884FC">
            {lessons.length} lesson{lessons.length > 1 && 's'} ・{' '}
            {podcasts.length} podcast{podcasts.length > 1 && 's'} ・{' '}
            {courses.length} course{courses.length > 1 && 's'} ・{' '}
            {playlists.length} playlist{playlists.length > 1 && 's'}
          </MjmlText>
        </MjmlHero>
        <MjmlWrapper>
          <MjmlSection
            padding="10px"
            border="1px solid #f1f1f1"
            border-radius="5px"
          >
            <Resources
              //title="New Courses"
              resources={courses.slice(0, 1)}
              getImage={series => series.square_cover_url}
              byLine={({instructor = ''}) => `by ${instructor.full_name}`}
              columnWidth="100%"
            />
          </MjmlSection>
          <MjmlSection>
            <Resources
              title="Podcasts"
              resources={podcasts}
              getImage={podcast => podcast.image_url}
              byLine={podcast => `hosted by ${podcast.contributors.join(',')}`}
              getDescription={podcast => podcast.summary}
            />
            <Resources
              title="Lessons"
              resources={lessons}
              getImage={lesson => lesson.image_url}
              byLine={({instructor = ''}) => `by ${instructor.full_name}`}
              getDescription={lesson => lesson.summary}
            />
          </MjmlSection>
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
        <MjmlText>{title}</MjmlText>
        <MjmlSection>
          {resources.map(resource => {
            return (
              <MjmlColumn
                width={columnWidth}
                padding="16px"
                key={resource.slug}
                fontFamily="Open Sans, sans-serif"
              >
                <MjmlSection
                  width="50%"
                  borderBottom="1px solid #f1f1f1"
                  paddingTop="0px"
                >
                  {getImage && (
                    <MjmlImage
                      align="left"
                      width="200px"
                      fluid-on-mobile={true}
                      src={getImage(resource)}
                    />
                  )}
                  <MjmlSection padding="24px 0 0 0">
                    <MjmlButton
                      href={`https://egghead.io${resource.path}`}
                      fontSize="20px"
                      innerPadding="0"
                      paddingBottom="0px"
                      color="#007AFF"
                      textAlign="left"
                      backgroundColor="transparent"
                      textDecoration="none"
                    >
                      {resource.title}
                    </MjmlButton>
                  </MjmlSection>
                  <MjmlSection text-align="left" padding="8px 0">
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
                </MjmlSection>
              </MjmlColumn>
            )
          })}
        </MjmlSection>
      </>
    )
  )
}
