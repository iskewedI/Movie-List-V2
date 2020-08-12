class ProjectList {
  createProjectListItem(project) {
    let byline = project.acf.project_byline;
    let client = project.acf.project_client;
    return (
      <li key={"project-" + project.id}>
        <a to={"/projects/" + project.slug}>
          <h3 className="projectlist--client">{client}</h3>
          <h4 className="projectlist--byline">{byline}</h4>
        </a>
      </li>
    );
  }
  render() {
    return (
      <div className="project-list">
        <ul className="menu vertical">
          {this.props.projects.map(this.createProjectListItem)}
        </ul>
      </div>
    );
  }
}

class ProjectCategory extends React.Component {
  constructor(props) {
    super(props);

    this.setActive = this.setActive.bind(this);

    this.state = {
      projects: [],
    };
  }
  setActive() {
    this.props.handleClick(this.props.Index);
  }
  getWidth(isActive) {
    let w = !isActive ? "calc(20vw - 20px)" : "500px";
    return w;
  }
  render() {
    let { active, focused, shiftLeft, isLast } = this.props;

    let styles = {
      container: {
        transform: (function () {
          return active
            ? "scale(1.1) translate3d(0, 0, 0)"
            : "scale(1) translate3d(0, 0, 0)";
        })(),
      },
      item: {
        transform: (function () {
          let direction = shiftLeft ? "-" : "";
          let transform =
            focused && !active
              ? "translate3d(" + direction + "100%, 0, 0)"
              : "translate3d(0, 0, 0)";
          return transform;
        })(),
      },
      background: {
        background:
          "url(" + this.props.cat.thumbnail + ") no-repeat center center",
        backgroundSize: "cover",
        height: "500px",
        width: this.getWidth(active),
      },
    };
    let classes = classNames({
      category: true,
      isActive: active,
      isLast,
      shiftLeft,
    });
    return (
      <li className={classes} style={styles.item}>
        <div className="category--content">
          <h2>{this.props.cat.name}</h2>
          <ProjectList projects={this.state.projects} />
        </div>
        <div
          className="category--image-container"
          onClick={this.setActive}
          style={styles.container}
        >
          <div className="category--image" style={styles.background}></div>
        </div>
        <div className="category--name">
          <h6>{this.props.cat.name}</h6>
        </div>
        <div className="category--closeButton">
          <a href="#">Back</a>
        </div>
      </li>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
    this.categoryNode = this.categoryNode.bind(this);
    this._focusOff = this._focusOff.bind(this);

    this.state = {
      open: false,
      activeIndex: null,
      categories: [],
    };
  }
  _handleClick(i) {
    this.setState({
      activeIndex: i,
      open: true,
    });
  }
  _focusOff(e) {
    e.preventDefault();
    if (e.target.className !== "category--image") {
      this.setState({
        activeIndex: null,
        open: false,
      });
    }
  }
  categoryNode(cat, i) {
    let isLast =
      i === this.state.categories.length - 1 ||
      i === this.state.categories.length - 2;
    let shiftLeft = i < this.state.activeIndex;

    return (
      <ProjectCategory
        cat={cat}
        key={"cat-" + i}
        handleClick={this._handleClick}
        active={i === this.state.activeIndex}
        focusOff={this._focusOff}
        focused={this.state.open}
        shiftLeft={shiftLeft}
        Index={i}
        isLast={isLast}
      />
    );
  }
  render() {
    let catNodes = this.state.categories.map(this.categoryNode);
    let classes = classNames({
      focused: this.state.open,
    });
    return (
      <div
        className={"categories--menu-container " + classes}
        onClick={this._focusOff}
        style={{ height: window.innerHeight }}
      >
        <ul className="categories menu">{catNodes}</ul>
      </div>
    );
  }
}
