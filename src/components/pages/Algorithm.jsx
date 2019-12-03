import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import SearchIcon from "@material-ui/icons/Search";

import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import * as SRD from "@projectstorm/react-diagrams";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    fontFamily: "Times New Roman"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    // marginRight: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    width: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  addNodePopover: {
    padding: "2px 10px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  SRDWrapper: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // height: theme.mixins.toolbar.minHeight
    height: `calc(98vh - ${theme.mixins.toolbar.minHeight}px)`
    // height: "100vh"
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [engine, setEngine] = React.useState(null);
  const [anchorElAddNode, setAnchorElAddNode] = React.useState(null);
  const [anchorElEditNode, setAnchorElEditNode] = React.useState(null);

  React.useEffect(() => {
    var engine = new SRD.DiagramEngine();
    engine.installDefaultFactories();

    var model = new SRD.DiagramModel();

    var root = new SRD.DefaultNodeModel("root", "rgb(0,192,255)");
    let port1 = root.addOutPort("out");
    root.setPosition(500, 100);
    root.addListener({
      selectionChanged: e => {
        this.handleSelected(e);
      }
    });

    var node1 = new SRD.DefaultNodeModel("node1", "rgb(0,0,255)");
    let port2 = node1.addInPort("in");
    node1.addOutPort("out");
    node1.setPosition(200, 100);
    node1.addListener({
      selectionChanged: e => {
        this.handleSelected(e);
      }
    });

    let link1 = port1.link(port2);

    var node2 = new SRD.DefaultNodeModel("node2", "rgb(255,0,0)");
    let port3 = node2.addInPort("in");
    node2.addOutPort("out");
    node2.setPosition(200, 300);
    node2.addListener({
      selectionChanged: e => {
        this.handleSelected(e);
      }
    });

    let link2 = port1.link(port3);

    model.addAll(root, node1, link1, node2, link2);

    engine.setDiagramModel(model);

    window.engine = engine;
    window.model = model;

    setEngine(engine);
  }, []);

  // const id = Boolean(anchorElAddNode) ? "simple-popover" : undefined;

  return (
    <div className={classes.root} style={{ fontFamily: "Times New Roman" }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="open drawer"
            className={clsx(classes.menuButton, classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Algorithm
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Grid container>
          <Grid item xs={3}>
            <div className={classes.toolbarIcon}>actions</div>
            <Divider />

            <List>
              <div>
                <ListItem
                  aria-describedby={
                    Boolean(anchorElAddNode) ? "addnode-popover" : undefined
                  }
                  button
                  onClick={e => setAnchorElAddNode(e.currentTarget)}
                >
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText>Add Node</ListItemText>
                </ListItem>

                <ListItem
                  aria-describedby={
                    Boolean(anchorElAddNode) ? "editnode-popover" : undefined
                  }
                  button
                  onClick={e => setAnchorElEditNode(e.currentTarget)}
                >
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText>Edit Node</ListItemText>
                </ListItem>
              </div>
            </List>
            <Divider />
            <List>
              <div>
                <ListSubheader inset>General Actions</ListSubheader>
                <ListItem
                  button
                  color="secondary"
                  onClick={() => {
                    engine.zoomToFit();
                  }}
                >
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText color="secondary" primary="Zoom to fit" />
                  {/* <Button color="secondary"></Button> */}
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Last quarter" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Year-end sale" />
                </ListItem>
              </div>
            </List>
          </Grid>

          <Grid item xs={9}>
            <div
              // className="diagram"
              className={classes.SRDWrapper}
              style={
                {
                  // height: "100vh",
                  // flexGrow: 18
                }
              }
            >
              {engine && (
                <SRD.DiagramWidget
                  className="srd-diagram"
                  diagramEngine={engine}
                  maxNumberPointsPerLink="0"
                  deleteKeys={[46]}
                />
              )}
            </div>
          </Grid>
        </Grid>
        {/* <div className={classes.appBarSpacer} /> */}
        {/* <Container
          maxWidth="lg"
          className={classes.container}
          style={{ padding: 0 }}
        >

        </Container> */}
      </main>

      <Popover
        style={{ padding: "2px 10px" }}
        // classes={{ paper: clsx(classes.addNodePopover) }}
        id={Boolean(anchorElAddNode) ? "addnode-popover" : undefined}
        open={Boolean(anchorElAddNode)}
        anchorEl={anchorElAddNode}
        onClose={() => setAnchorElAddNode(null)}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right"
        }}
      >
        <FormControl>
          <TextField
            label="Node Value"
            className={classes.textField}
            autoFocus
          />
          <TextField label="X" type="number" className={classes.textField} />
          <Button>
            <AddIcon />
          </Button>
        </FormControl>
      </Popover>
    </div>
  );
}
