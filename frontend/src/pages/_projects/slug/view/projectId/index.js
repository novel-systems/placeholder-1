import React, { useState, useEffect, useCallback } from 'react'
import { goBack } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router'
import PageWrapper from '@/components/layouts/PageWrapper'
import ProjectDetail from '@/components/projects/ProjectDetail'
import ShareProject from '@/components/projects/ProjectDetail/ShareProject'
import moment from 'moment-timezone'
import { EventHelpers } from '@novel-systems/shared'
import ProjectsService from '@/services/projects'

export default ({ event, showFullTeam }) => {
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const { projectId } = match.params
    const [project, setProject] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchProject = useCallback(async () => {
        setLoading(true)
        try {
            const project = await ProjectsService.getPublicProjectById(
                projectId,
            )
            setProject(project)
        } catch (err) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [projectId])

    const onBack = useCallback(() => {
        dispatch(goBack())
    }, [dispatch])

    useEffect(() => {
        fetchProject()
    }, [fetchProject])
    return (
        <PageWrapper loading={loading} error={error}>
            <ProjectDetail
                project={project}
                event={event}
                onBack={onBack}
                showFullTeam={showFullTeam}
                showTableLocation={!EventHelpers.isEventOver(event, moment)}
            />

            <ShareProject project={project} event={event} />
        </PageWrapper>
    )
}
