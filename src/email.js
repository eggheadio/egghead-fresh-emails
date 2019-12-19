import React from 'react'
import ReactMarkdown from 'react-markdown'

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
} from 'mjml-react'

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
        <MjmlTitle>Last Minute Offer</MjmlTitle>
        <MjmlPreview>Last Minute Offer...</MjmlPreview>

        <MjmlRaw>
          <style>{`a {color: #007AFF;} body { font-family: "Open Sans", sans-serif;}`}</style>
        </MjmlRaw>
      </MjmlHead>
      <MjmlBody width={600}>
        {/*  <MjmlSection fullWidth backgroundColor="#efefef">
          <MjmlColumn>
            <MjmlImage src="https://static.wixstatic.com/media/5cb24728abef45dabebe7edc1d97ddd2.jpg" />
          </MjmlColumn>
        </MjmlSection> */}
        <MjmlSection fontFamily="Open Sans, sans-serif">
          <MjmlText fontFamily="Open Sans, sans-serif">
            <h1>What's up at egghead for the last {DAYS_BACK} days...</h1>
            <div>
              <ul>
                <li>Podcasts: {podcasts.length}</li>
                <li>Full Workshops: {courses.length}</li>
                <li>Instructor Playlists: {playlists.length}</li>
                <li>Bite-sized Lessons: {lessons.length}</li>
              </ul>
            </div>
          </MjmlText>

          <Resources
            title="New Courses"
            resources={courses}
            getImage={series => series.square_cover_url}
            byLine={({instructor = ''}) => `by ${instructor.full_name}`}
          />
          <Resources
            title="Podcasts"
            resources={podcasts}
            getImage={podcast => podcast.image_url}
            byLine={podcast => `hosted by ${podcast.contributors.join(',')}`}
            getDescription={podcast => podcast.summary}
          />
        </MjmlSection>
        <MjmlSection>
          <MjmlColumn>
            <MjmlText>
              <a href="/">Go Back</a>
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
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
}) {
  return (
    resources.length > 0 && (
      <>
        <MjmlText>{title}</MjmlText>
        <MjmlSection>
          {resources.map(resource => {
            return (
              <MjmlColumn
                width="50%"
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
                      padding="0"
                      width="80px"
                      src={getImage(resource)}
                    ></MjmlImage>
                  )}

                  <MjmlButton
                    href={`https://egghead.io${resource.path}`}
                    fontSize="18px"
                    innerPadding="0"
                    paddingBottom="0px"
                    color="#007AFF"
                    textAlign="left"
                    backgroundColor="transparent"
                    textDecoration="none"
                  >
                    {resource.title}
                  </MjmlButton>
                  <MjmlText paddingTop="20px" fontSize="12px" color="gray">
                    {byLine(resource)}
                  </MjmlText>
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
