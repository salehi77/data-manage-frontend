import React from "react";
import "./App.css";

import * as SRD from "@projectstorm/react-diagrams";
import {
  Button,
  Label,
  Menu,
  Input,
  Icon,
  Header,
  Segment,
  TextArea,
  Form
} from "semantic-ui-react";

class App extends React.Component {
  state = {
    engine: null,
    addNodeText: "",
    selecetedNode: { name: "" },
    editNodeText: "",
    rootID: 0
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSelected = e => {
    let defNodes = this.state.engine.diagramModel
      .getSelectedItems()
      .filter(selected => {
        return selected instanceof SRD.DefaultNodeModel;
      });

    if (e.isSelected && defNodes.length === 1) {
      this.setState({
        selecetedNode: this.state.engine.diagramModel.nodes[e.entity.id],
        editNodeText: this.state.engine.diagramModel.nodes[e.entity.id].name
      });
    } else {
      this.setState({
        selecetedNode: { name: "" },
        editNodeText: ""
      });
    }
  };

  model2tree = nodeID => {
    let jmodel = this.state.engine.diagramModel.serializeDiagram();

    let t = jmodel.links.filter((link, i) => link.source === nodeID);

    if (t.length === 0) {
      return [];
    }

    t = t.map(tt => {
      return { targetID: tt.target };
    });

    t = t.map(tt => {
      let s = jmodel.nodes.find(ss => {
        return ss.id === tt.targetID;
      });
      return { id: s.id, name: s.name, childs: this.model2tree(s.id) };
    });

    return t;
  };

  componentDidMount() {
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

    // model.addListener({
    //   selectionChanged: e => {
    //   }
    // Events for DiagramModel:
    // nodesUpdated
    // linksUpdated
    // offsetUpdated
    // zoomUpdated
    // gridUpdated
    // selectionChanged
    // entityRemoved

    // Events for LinkModel:
    // sourcePortChanged
    // targetPortChanged
    // selectionChanged
    // entityRemoved

    // Events for NodeModel and PointModel:
    // selectionChanged
    // entityRemoved
    // });

    engine.setDiagramModel(model);

    window.engine = engine;
    window.model = model;

    this.setState({
      engine,
      rootID: root.id
    });
  }

  render() {
    return (
      <div
        style={{
          display: "flex"
        }}
      >
        <div
          className="sidebar"
          style={{
            height: "100vh",
            width: "200px",
            flexGrow: 2,
            backgroundColor: "#2f2f2f",
            padding: "1% 2%"
          }}
        >
          <Header as="h2" style={{ color: "white" }}>
            <Icon name="setting" color="#2255dd" />
            <Header.Content>tools</Header.Content>
          </Header>

          <Segment inverted color="brown">
            <Header>add node</Header>

            <TextArea
              rows={2}
              cols={30}
              style={{
                resize: "none",
                outline: "none",
                borderRadius: 10,
                padding: 10
              }}
              name="addNodeText"
              value={this.state.addNodeText}
              onChange={this.handleChange}
            />

            <Button
              onClick={(e, data) => {
                var node = new SRD.DefaultNodeModel(
                  this.state.addNodeText,
                  "rgb(0,192,255)"
                );
                node.addInPort("in");
                node.addOutPort("out");
                node.setPosition(300, 100);
                node.addListener({
                  selectionChanged: e => {
                    this.handleSelected(e);
                  }
                });
                this.state.engine.diagramModel.addNode(node);
                this.state.engine.repaintCanvas();
              }}
            >
              add node
            </Button>
          </Segment>

          <Button
            color="teal"
            onClick={() => {
              this.state.engine.zoomToFit();
            }}
          >
            zoom to fit
          </Button>

          <Button
            color="orange"
            onClick={() => {
              let jmodel = this.state.engine.diagramModel.serializeDiagram();

              let tree = {
                ID: this.state.rootID,
                name: jmodel.nodes.find(node => node.id === this.state.rootID)
                  .name,
                childs: this.model2tree(this.state.rootID)
              };
            }}
          >
            Save
          </Button>

          <Segment>
            <TextArea
              rows={2}
              cols={30}
              style={{
                resize: "none",
                outline: "none",
                borderRadius: 10,
                padding: 10
              }}
              name="editNodeText"
              value={this.state.editNodeText}
              onChange={(e, data) => {
                // this.setState({
                //   selecetedNode: {
                //     ...this.state.selecetedNode,
                //     name: data.value
                //   }
                // });
                this.handleChange(e, data);
              }}
            />

            <Button
              color="red"
              onClick={() => {
                // console.log("publish");
                // console.log(this.state.selecetedNode);
                if (this.state.selecetedNode.name !== "") {
                  // console.log(this.state.selecetedNode.id);
                  console.log(
                    (this.state.engine.diagramModel.nodes[
                      this.state.selecetedNode.id
                    ].name = this.state.editNodeText)
                  );
                  this.state.engine.repaintCanvas();
                }
              }}
            >
              edit
            </Button>
          </Segment>
        </div>

        <div
          className="diagram"
          style={{
            height: "100vh",
            flexGrow: 18
          }}
        >
          {this.state.engine && (
            <SRD.DiagramWidget
              className="srd-diagram"
              diagramEngine={this.state.engine}
              maxNumberPointsPerLink="0"
              deleteKeys={[46]}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
