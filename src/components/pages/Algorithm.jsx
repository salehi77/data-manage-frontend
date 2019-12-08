import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import clsx from "clsx";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
import SaveIcon from "@material-ui/icons/Save";

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
import { getClinic, updateDiagram } from "../../actions/clinicActions";
import { ToastContainer, toast } from "react-toastify";

toast.configure({
  position: "top-left",
  autoClose: 3000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: true,
  pauseOnVisibilityChange: true,
  draggable: true,
  pauseOnHover: true
});

const drawerWidth = 240;

const useStyles2 = theme => {
  return {
    root: {
      display: "flex",
      fontFamily: "Times New Roman"
    },
    toolbar: {
      paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarTitle: {
      display: "flex",
      alignItems: "center",
      // justifyContent: "flex-end",
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
  };
};

class Algorithm extends React.Component {
  state = {
    clinicID: "",
    engine: null,
    rootID: 0,
    anchorElAddNode: null,
    anchorElEditNode: null,
    selecetedNode: null,
    texts: { add: "we", addX: 100, addY: 300 }
  };

  handleSelected = e => {
    let defNodes = this.state.engine.diagramModel
      .getSelectedItems()
      .filter(selected => {
        return selected instanceof SRD.DefaultNodeModel;
      });

    if (e.isSelected && defNodes.length === 1) {
      console.log(this.state.engine.diagramModel.nodes[e.entity.id].name);
      this.setState({
        selecetedNode: { ...this.state.engine.diagramModel.nodes[e.entity.id] }
      });
    } else {
      this.setState({
        selecetedNode: null
      });
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ clinicID: id });

    getClinic(id).then(data => {
      console.log(data);
      if (data.success) {
        const engine = new SRD.DiagramEngine(),
          model = new SRD.DiagramModel();
        engine.installDefaultFactories();

        try {
          model.deSerializeDiagram(
            JSON.parse(data.result.diagramModel),
            engine
          );
          for (let n in model.nodes) {
            model.nodes[n].addListener({
              selectionChanged: this.handleSelected
            });
          }

          engine.setDiagramModel(model);
          this.setState({ engine });
        } catch (exc) {
          console.log(exc);
          var root = new SRD.DefaultNodeModel("root", "rgb(0,192,255)");
          let port1 = root.addOutPort("out");
          root.setPosition(500, 100);
          root.addListener({
            selectionChanged: this.handleSelected
          });

          var node1 = new SRD.DefaultNodeModel("node1", "rgb(0,0,255)");
          let port2 = node1.addInPort("in");
          node1.addOutPort("out");
          node1.setPosition(200, 100);
          node1.addListener({
            selectionChanged: this.handleSelected
          });

          model.addAll(root, node1);

          engine.setDiagramModel(model);

          this.setState({ engine, rootID: root.id });
        }
        window.engine = engine;
        window.model = model;
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.root}>
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
                <Typography className={classes.toolbarTitle}>تغییر در دیاگرام</Typography>
                <Divider />

                <List>
                  <div>
                    <ListItem
                      aria-describedby={
                        Boolean(this.state.anchorElAddNode)
                          ? "addnode-popover"
                          : undefined
                      }
                      button
                      onClick={e =>
                        this.setState({ anchorElAddNode: e.currentTarget })
                      }
                    >
                      <ListItemIcon>
                        <AddIcon />
                      </ListItemIcon>
                      <ListItemText>اضافه‌کردن گره</ListItemText>
                    </ListItem>

                    <ListItem
                      aria-describedby={
                        Boolean(this.state.anchorElAddNode)
                          ? "editnode-popover"
                          : undefined
                      }
                      button
                      onClick={e =>
                        this.setState({ anchorElEditNode: e.currentTarget })
                      }
                    >
                      <ListItemIcon>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText>تغییر گره</ListItemText>
                    </ListItem>
                  </div>
                </List>

                <Divider />

                <List>
                  <div>
                    <ListSubheader >عملیات‌های دیاگرام</ListSubheader>
                    <ListItem
                      button
                      onClick={() => {
                        this.state.engine.zoomToFit();
                      }}
                    >
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <ListItemText primary="زوم خودکار" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        let jmodel = this.state.engine.diagramModel.serializeDiagram();
                        updateDiagram(
                          this.state.clinicID,
                          JSON.stringify(jmodel)
                        ).then(data => {
                          // console.log(data);
                          if (data.success) {
                            console.log("success");
                            toast.success("تغییرات ذخیره شدند");
                          } else {
                            toast.error("یک خطای نامشخص رخ داده است");
                          }
                        });
                      }}
                    >
                      <ListItemIcon>
                        <SaveIcon />
                      </ListItemIcon>
                      <ListItemText primary="ذخیره" />
                    </ListItem>
                    <ListItem button>
                      {/* <ToastContainer /> */}

                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <ListItemText primary="Year-end sale" />
                    </ListItem>
                  </div>
                </List>
              </Grid>

              <Grid item xs={9}>
                <div className={classes.SRDWrapper}>
                  {this.state.engine && (
                    <SRD.DiagramWidget
                      className="srd-diagram"
                      diagramEngine={this.state.engine}
                      maxNumberPointsPerLink="0"
                      deleteKeys={[46]}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </main>
        </div>

        <Popover
          style={{ padding: "2px 10px" }}
          id={
            Boolean(this.state.anchorElAddNode) ? "addnode-popover" : undefined
          }
          open={Boolean(this.state.anchorElAddNode)}
          anchorEl={this.state.anchorElAddNode}
          onClose={() => this.setState({ anchorElAddNode: null })}
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
              label="مقدار گره"
              className={classes.textField}
              autoFocus
              value={this.state.texts.add}
              onChange={(e, d) =>
                this.setState({
                  texts: { ...this.state.texts, add: e.target.value }
                })
              }
            />
            <TextField
              label="X"
              type="number"
              className={classes.textField}
              value={this.state.texts.addX}
              onChange={(e, d) =>
                this.setState({
                  texts: { ...this.state.texts, addX: parseInt(e.target.value) }
                })
              }
            />
            <TextField
              label="Y"
              type="number"
              className={classes.textField}
              value={this.state.texts.addY}
              onChange={(e, d) =>
                this.setState({
                  texts: { ...this.state.texts, addY: parseInt(e.target.value) }
                })
              }
            />
            <Button
              onClick={() => {
                console.log(this.state.texts);

                if (
                  this.state.texts.add &&
                  this.state.texts.addX &&
                  this.state.texts.addY
                ) {
                  let node = new SRD.DefaultNodeModel(
                    this.state.texts.add,
                    "rgb(0,192,255)"
                  );
                  node.addInPort("in");
                  node.addOutPort("out");
                  node.setPosition(
                    this.state.texts.addX,
                    this.state.texts.addY
                  );
                  node.addListener({
                    selectionChanged: this.handleSelected
                  });
                  this.state.engine.diagramModel.addNode(node);
                  this.state.engine.repaintCanvas();
                }
              }}
            >
              <AddIcon />
            </Button>
          </FormControl>
        </Popover>
      </>
    );
  }
}

export default withStyles(useStyles2)(Algorithm);
