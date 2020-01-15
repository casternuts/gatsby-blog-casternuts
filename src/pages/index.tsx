import * as React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Page from '../components/Page'
// import Container from '../components/Container'
import MainLayout from '../layouts/mainLayout'
import { graphql, useStaticQuery } from 'gatsby'
///
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
// import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import styled from '@emotion/styled'
import { heights, dimensions, colors } from '../styles/variables'
///
import { Router } from '@reach/router'

const mainIndexQuery = graphql`
  query mainIndexQuery {
    allMarkdownRemark {
      edges {
        node {
          excerpt(truncate: true, pruneLength: 200)
          frontmatter {
            title
            path
          }
          id
        }
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

const drawerWidth = 300

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  mainLogo: {
    padding: '0 2rem',
    textDecoration: 'none',
    marginTop: '1.75rem',
    marginBottom: '1.75rem',
    fontSize: '2rem',
    lineHeight: '2rem',
    color: '#212529',
    display: 'block',
    position: 'relative'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}))

const IndexPage: React.FC = () => {
  const data = useStaticQuery(mainIndexQuery)

  return (
    <MainLayout>
      <Page>
        <Container>
          <h1>최근 작성한 게시글 목록</h1>
          <ul>
            {data.allMarkdownRemark.edges.map(({ node }: any) => (
              <li key={node.id}>
                <h2>
                  <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
                </h2>
                <h3>{node.frontmatter.date}</h3>
                <p>{node.excerpt}</p>
                <hr />
              </li>
            ))}
          </ul>
        </Container>
      </Page>
    </MainLayout>
  )
}

export default IndexPage
