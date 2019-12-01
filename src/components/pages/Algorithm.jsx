import React from "react";
// import "../../assets/my_css.css";

import * as SRD from "@projectstorm/react-diagrams";

const App = () => {
  const [engine, setEngine] = React.useState(null);

  React.useEffect(() => {
    var engine = new SRD.DiagramEngine();
    engine.installDefaultFactories();

    var model = new SRD.DiagramModel();

    var root = new SRD.DefaultNodeModel("root", "rgb(0,192,255)");
    let port1 = root.addOutPort("out");
    root.setPosition(500, 100);

    var node1 = new SRD.DefaultNodeModel("node1", "rgb(0,0,255)");
    let port2 = node1.addInPort("in");
    node1.addOutPort("out");
    node1.setPosition(200, 100);

    let link1 = port1.link(port2);

    model.addAll(root, node1, link1);

    engine.setDiagramModel(model);

    window.engine = engine;
    window.model = model;

    setEngine(engine);
  }, []);

  return (
    <div>
      <div
        className="diagram"
        style={{
          height: "100vh"
        }}
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
    </div>
  );
};

export default App;
