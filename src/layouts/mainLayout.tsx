import * as React from 'react'
// import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Page from '../components/Page'
// import Container from '../components/Container'
import IndexLayout from '../layouts'
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

import ListItem from '@material-ui/core/ListItem'

import ListItemText from '@material-ui/core/ListItemText'

import { Link, navigate } from 'gatsby'
// import { Router, Location } from '@reach/router'
import Hidden from '@material-ui/core/Hidden'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import DeleteIcon from '@material-ui/icons/Delete'
const mainQuery = graphql`
  query mainQuery {
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
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#fff',
    color: '#000'
  },
  appBarHeader: {
    textAlign: 'center',
    fontSize: '33px',
    padding: '10px'
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
  },
  mainlistItem: {
    backgroundColor: '#fff',
    color: '#000',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#cccccc'
    },
    '&:active': {
      backgroundColor: '#dddddd'
    }
  },
  menutab: {
    root: {
      textTransform: 'none',
      color: '#fff',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      '&:focus': {
        opacity: 1
      }
    }
  }
}))

const menu = [
  {
    id: 0,
    label: '게시물 목록',
    path: '/'
  },
  {
    id: 1,
    label: '소개',
    path: '/About'
  }
]
const mainLayout: React.FC = ({ children }) => {
  const data = useStaticQuery(mainQuery)
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  // tab을 위한 작업
  const handleChange = (event: any, newValue: number) => {
    let tabidx = menu.filter(item => item.id == newValue)
    navigate(tabidx[0].path)
  }
  // tab이 눌려져있는 효과를 표현하기 위한 memohook
  React.useMemo(() => {
    let tabidx = menu.filter(item => item.path == location.pathname)
    setValue(tabidx[0].id)
  }, [value])

  return (
    <div className={classes.root}>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: data.site.siteMetadata.description },
          { name: 'keywords', content: data.site.siteMetadata.keywords }
        ]}
      />
      <CssBaseline />

      <Hidden smDown>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={true}
        >
          <Link className={classes.mainLogo} to="/">
            <Typography component="h1" variant="h5" color="inherit" noWrap className={classes.title}>
              {data.site.siteMetadata.title}
            </Typography>
          </Link>
          <List>
            <div>
              <Divider />
              <Link to={'/'} className={classes.mainlistItem}>
                <ListItem selected={location.pathname === '/'} button>
                  <ListItemText primary="게시글 목록" />
                </ListItem>
              </Link>
              <Divider />
              <Link to={'/About'} className={classes.mainlistItem}>
                <ListItem selected={location.pathname === '/About'} button>
                  <ListItemText primary="소개" />
                </ListItem>
              </Link>
              <Divider />
            </div>
          </List>
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <Hidden mdUp>
          <div className={classes.appBar}>
            <div className={classes.appBarHeader}>
              <IconButton style={{ float: 'left' }} aria-label="delete">
                <MenuIcon />
              </IconButton>
              <IconButton style={{ float: 'right' }} aria-label="delete">
                <MenuIcon />
              </IconButton>

              <Typography variant="h4">{data.site.siteMetadata.title}</Typography>
            </div>

            <Tabs variant="fullWidth" value={value} onChange={handleChange} centered indicatorColor="primary">
              {menu.map(item => (
                <Tab className={classes.menutab} key={item.id} label={item.label} />
              ))}
            </Tabs>
          </div>
          <Divider></Divider>
        </Hidden>
        <div className={classes.appBarSpacer}></div>
        {children}
      </main>
    </div>
  )
}

export default mainLayout
